import { reverseGeocode } from '@/lib/geocoding';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return Response.json({ error: 'Missing lat/lon' }, { status: 400 });
  }

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  if (isNaN(latNum) || isNaN(lonNum)) {
    return Response.json({ error: 'Invalid lat/lon' }, { status: 400 });
  }

  const result = await reverseGeocode(latNum, lonNum);

  if ('type' in result) {
    return Response.json(result, { status: 422 });
  }

  return Response.json(result);
}
