import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reverseGeocode } from './geocoding';

function mockFetch(data: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => data,
  }) as unknown as typeof fetch;
}

describe('reverseGeocode', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns PLZ and city for a German location', async () => {
    global.fetch = mockFetch({
      address: { country_code: 'de', postcode: '89522', city: 'Heidenheim an der Brenz' },
    });

    const result = await reverseGeocode(48.6732, 10.1544);
    expect(result).toEqual({ plz: '89522', city: 'Heidenheim an der Brenz' });
  });

  it('falls back through town → village → municipality for city name', async () => {
    global.fetch = mockFetch({
      address: { country_code: 'de', postcode: '99999', town: 'Kleinhausen' },
    });

    const result = await reverseGeocode(51.0, 10.0);
    expect(result).toEqual({ plz: '99999', city: 'Kleinhausen' });
  });

  it('returns empty string when no locality name is present', async () => {
    global.fetch = mockFetch({
      address: { country_code: 'de', postcode: '25999' },
    });

    const result = await reverseGeocode(54.9, 8.3);
    expect(result).toEqual({ plz: '25999', city: '' });
  });

  it('returns not_german error for non-German location', async () => {
    global.fetch = mockFetch({
      address: { country_code: 'at', postcode: '1010', city: 'Wien' },
    });

    const result = await reverseGeocode(48.2082, 16.3738);
    expect(result).toEqual({ type: 'not_german' });
  });

  it('returns no_plz error when postcode is missing', async () => {
    global.fetch = mockFetch({
      address: { country_code: 'de' },
    });

    const result = await reverseGeocode(54.4, 7.8);
    expect(result).toEqual({ type: 'no_plz' });
  });

  it('returns network_error when fetch throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch')) as unknown as typeof fetch;

    const result = await reverseGeocode(48.6732, 10.1544);
    expect(result).toEqual({ type: 'network_error', message: 'Failed to fetch' });
  });

  it('returns network_error on non-ok HTTP response', async () => {
    global.fetch = mockFetch({}, false, 503);

    const result = await reverseGeocode(48.6732, 10.1544);
    expect(result).toEqual({ type: 'network_error', message: 'HTTP 503' });
  });

  it('sends the required User-Agent header', async () => {
    const spy = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ address: { country_code: 'de', postcode: '89522', city: 'Heidenheim' } }),
    });
    global.fetch = spy as unknown as typeof fetch;

    await reverseGeocode(48.6732, 10.1544);

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('nominatim.openstreetmap.org'),
      expect.objectContaining({
        headers: expect.objectContaining({ 'User-Agent': 'LocalEvents24/1.0' }),
      }),
    );
  });

  it('encodes lat/lon correctly in the request URL', async () => {
    const spy = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ address: { country_code: 'de', postcode: '89522', city: 'Heidenheim' } }),
    });
    global.fetch = spy as unknown as typeof fetch;

    await reverseGeocode(48.6732, 10.1544);

    const calledUrl: string = (spy as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(calledUrl).toContain('lat=48.6732');
    expect(calledUrl).toContain('lon=10.1544');
    expect(calledUrl).toContain('format=json');
  });
});
