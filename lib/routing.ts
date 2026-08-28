const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:50001';

/* GEOCODING */

export async function getCoordinates(
  place: string
): Promise<[number, number] | null>{

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/geocode?q=${encodeURIComponent(place)}`
    )

    if (!res.ok) {
      console.error('Geocoding failed:', res.status, res.statusText);
      return null;
    }

    const data = await res.json()

    if (!data.coordinates) {
      return null
    }

    return data.coordinates as [number, number]
  } catch (error) {
    console.error('Error in getCoordinates:', error);
    return null;
  }
}

/* ROUTING */

export async function getRoute(
  start: [number, number],
  end: [number, number]
) {

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/route?start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`
    )

    if (!res.ok) {
      console.error('Routing failed:', res.status, res.statusText);
      throw new Error('Failed to calculate route');
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error('Error in getRoute:', error);
    throw error;
  }
}