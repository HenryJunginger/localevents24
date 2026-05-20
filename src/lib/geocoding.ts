export interface GeocodeResult {
  plz: string;
  city: string;
}

export type GeocodeError =
  | { type: 'not_german' }
  | { type: 'no_plz' }
  | { type: 'network_error'; message: string };

export async function reverseGeocode(
  lat: number,
  lon: number,
): Promise<GeocodeResult | GeocodeError> {
  let response: Response;

  try {
    response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          'User-Agent': 'LocalEvents24/1.0',
        },
      },
    );
  } catch (err) {
    return {
      type: 'network_error',
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }

  if (!response.ok) {
    return { type: 'network_error', message: `HTTP ${response.status}` };
  }

  const data = await response.json();

  if (data.address?.country_code !== 'de') {
    return { type: 'not_german' };
  }

  const plz: string | undefined = data.address?.postcode;
  if (!plz) {
    return { type: 'no_plz' };
  }

  return {
    plz,
    city:
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.municipality ||
      '',
  };
}
