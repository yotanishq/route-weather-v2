const express = require('express');
const router = express.Router();
const { getCoordinates, getRoute } = require('../services/graphhopperService');

/**
 * GET /api/geocode
 * Geocode a place name to coordinates
 * Query params: q - place name
 */
router.get('/geocode', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        error: 'Missing required parameter: q (place name)'
      });
    }

    const coordinates = await getCoordinates(q);

    if (!coordinates) {
      return res.status(404).json({
        error: 'Location not found'
      });
    }

    res.json({
      coordinates
    });
  } catch (error) {
    console.error('Geocoding error:', error);
    res.status(500).json({
      error: 'Failed to geocode location',
      message: error.message
    });
  }
});

/**
 * GET /api/route
 * Get route between two points
 * Query params: start - "lng,lat" format
 * Query params: end - "lng,lat" format
 */
router.get('/route', async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        error: 'Missing required parameters: start and end (format: "lng,lat")'
      });
    }

    // Parse coordinates from "lng,lat" format
    const startCoords = start.split(',').map(Number);
    const endCoords = end.split(',').map(Number);

    if (startCoords.length !== 2 || endCoords.length !== 2) {
      return res.status(400).json({
        error: 'Invalid coordinate format. Use "lng,lat"'
      });
    }

    if (startCoords.some(isNaN) || endCoords.some(isNaN)) {
      return res.status(400).json({
        error: 'Coordinates must be numbers'
      });
    }

    const route = await getRoute(startCoords, endCoords);

    res.json(route);
  } catch (error) {
    console.error('Routing error:', error);
    res.status(500).json({
      error: 'Failed to calculate route',
      message: error.message
    });
  }
});

module.exports = router;
