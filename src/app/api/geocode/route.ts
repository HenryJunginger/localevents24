import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim();
  if (!q) return NextResponse.json(null);

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=de`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'LocalEvents24/1.0 (henryjunginger@gmail.com)',
        'Accept-Language': 'de',
      },
      next: { revalidate: 3600 },
    });
    const data: { lat: string; lon: string }[] = await res.json();
    if (!data.length) return NextResponse.json(null);
    return NextResponse.json({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
