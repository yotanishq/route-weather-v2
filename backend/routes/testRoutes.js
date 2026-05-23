const express = require('express');
const router = express.Router();
const { getRoute } = require('../services/tomtomRoutingService');

/**
 * Test route for TomTom Routing API
 * GET /api/test-route
 * 
 * Tests routing between Delhi and Gurgaon with hardcoded coordinates
 */
router.get('/test-route', async (req, res) => {
  try {
    console.log('🚀 Controller: Starting /api/test-route');
    
    // Hardcoded coordinates for Delhi to Gurgaon
    const startLat = 28.6139;
    const startLng = 77.2090;
    const endLat = 28.4595;
    const endLng = 77.0266;

    console.log(`📍 Route: ${startLat}, ${startLng} → ${endLat}, ${endLng}`);

    const routeData = await getRoute(startLat, startLng, endLat, endLng);

    console.log('✅ Route fetch success');
    console.log(`📊 Distance: ${routeData.distance} km`);
    console.log(`⏱️  Duration: ${routeData.duration} min`);
    console.log(`📍 Points count: ${routeData.pointsCount}`);

    // Return simplified response
    const response = {
      success: true,
      distance: routeData.distance,
      duration: routeData.duration,
      pointsCount: routeData.pointsCount
    };

    console.log(`📤 Response size: ${JSON.stringify(response).length} bytes`);
    console.log('✅ Controller: /api/test-route completed');

    res.json(response);

  } catch (error) {
    console.error('❌ Controller error:', error.message);
    console.error('Stack:', error.stack);
    
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
