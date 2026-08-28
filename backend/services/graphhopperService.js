const GRAPHHOPPER_API_KEY = process.env.GRAPHHOPPER_API_KEY;

if (!GRAPHHOPPER_API_KEY) {
  console.warn('⚠️  GRAPHHOPPER_API_KEY not found in environment variables');
}

/**
 * Geocode a place name to coordinates
 * @param {string} place - Place name to geocode
 * @returns {Promise<[number, number] | null>} - [lng, lat] or null if not found
 */
async function getCoordinates(place) {
  try {
    const res = await fetch(
      `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(place)}&limit=1&key=${GRAPHHOPPER_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`GraphHopper geocoding failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.hits || data.hits.length === 0) {
      return null;
    }

    return [data.hits[0].point.lng, data.hits[0].point.lat];
  } catch (error) {
    console.error('Error in getCoordinates:', error);
    throw error;
  }
}

/**
 * Get route between two points
 * @param {[number, number]} start - [lng, lat]
 * @param {[number, number]} end - [lng, lat]
 * @returns {Promise<Object>} - GeoJSON FeatureCollection with route
 */
async function getRoute(start, end) {
  try {
    const res = await fetch(
      `https://graphhopper.com/api/1/route?point=${start[1]},${start[0]}&point=${end[1]},${end[0]}&vehicle=car&points_encoded=false&key=${GRAPHHOPPER_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`GraphHopper routing failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Convert to GeoJSON format
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            summary: {
              distance: data.paths[0].distance,
              duration: data.paths[0].time / 1000
            }
          },
          geometry: {
            type: "LineString",
            coordinates: data.paths[0].points.coordinates
          }
        }
      ]
    };
  } catch (error) {
    console.error('Error in getRoute:', error);
    throw error;
  }
}

module.exports = {
  getCoordinates,
  getRoute
};
