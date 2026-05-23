const axios = require('axios');

const TOMTOM_API_KEY = process.env.TOMTOM_API_KEY;

/**
 * Get route information from TomTom Routing API
 * @param {number} startLat - Starting latitude
 * @param {number} startLng - Starting longitude
 * @param {number} endLat - Ending latitude
 * @param {number} endLng - Ending longitude
 * @returns {Promise<Object>} Normalized route data
 */
async function getRoute(startLat, startLng, endLat, endLng) {
  console.log('🔍 Service: getRoute called');
  console.log('🔑 API Key exists:', !!TOMTOM_API_KEY);
  console.log('📍 Start:', startLat, startLng);
  console.log('📍 End:', endLat, endLng);

  if (!TOMTOM_API_KEY) {
    console.error('❌ TOMTOM_API_KEY is not set');
    throw new Error('TOMTOM_API_KEY is not configured');
  }

  try {
    // TomTom API format: https://api.tomtom.com/routing/1/calculateRoute/{start}:{end}/json
    const start = `${startLat},${startLng}`;
    const end = `${endLat},${endLng}`;
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${start}:${end}/json`;
    
    console.log('🌐 Request URL:', url);

    const response = await axios.get(url, {
      params: {
        key: TOMTOM_API_KEY,
        traffic: true,
        routeRepresentation: 'polyline',
        computeBestOrder: false,
        routeType: 'fastest',
        travelMode: 'car'
      }
    });

    console.log('✅ Axios response status:', response.status);
    console.log('📊 Response data keys:', Object.keys(response.data));

    if (!response.data.routes || response.data.routes.length === 0) {
      console.error('❌ No routes found in response');
      throw new Error('No routes found');
    }

    const routeData = response.data.routes[0];
    const summary = routeData.summary;
    
    // Extract coordinates from the route legs
    const coordinates = [];
    routeData.legs.forEach(leg => {
      leg.points.forEach(point => {
        coordinates.push([point.longitude, point.latitude]);
      });
    });

    console.log('📍 Total points:', coordinates.length);

    // Simplify coordinates by sampling (every 10th point to reduce data size)
    const simplifiedCoordinates = coordinates.filter((_, index) => index % 10 === 0);
    console.log('📍 Simplified points:', simplifiedCoordinates.length);

    const result = {
      distance: parseFloat((summary.lengthInMeters / 1000).toFixed(2)),
      duration: Math.round(summary.travelTimeInSeconds / 60),
      pointsCount: simplifiedCoordinates.length > 0 ? simplifiedCoordinates.length : coordinates.length
    };

    console.log('✅ Service: Route data normalized');
    console.log('📊 Distance:', result.distance, 'km');
    console.log('⏱️  Duration:', result.duration, 'min');
    console.log('📍 Points count:', result.pointsCount);

    return result;

  } catch (error) {
    console.error('❌ Service: Error fetching route from TomTom');
    
    if (error.response) {
      console.error('📡 Response status:', error.response.status);
      console.error('📡 Response data:', error.response.data);
      console.error('📡 Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('📡 No response received');
      console.error('📡 Request config:', error.config);
    } else {
      console.error('📡 Error message:', error.message);
      console.error('📡 Error stack:', error.stack);
    }

    throw new Error(`Failed to fetch route data: ${error.message}`);
  }
}

module.exports = { getRoute };
