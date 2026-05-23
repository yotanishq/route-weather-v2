const axios = require('axios');

const TOMTOM_API_KEY = process.env.TOMTOM_API_KEY;

/**
 * Get traffic incidents from TomTom Traffic API
 * @param {Array} routeCoordinates - Array of [lng, lat] coordinates
 * @returns {Promise<Array>} Normalized traffic incidents
 */
async function getTrafficIncidents(routeCoordinates) {
  try {
    // Compute bounding box from route coordinates
    const lngs = routeCoordinates.map(coord => coord[0]);
    const lats = routeCoordinates.map(coord => coord[1]);
    
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    
    // Add buffer to bounding box (approximately 10km)
    const buffer = 0.1;
    const bbox = `${minLng - buffer},${minLat - buffer},${maxLng + buffer},${maxLat + buffer}`;

    const url = `https://api.tomtom.com/traffic/services/5/incidentDetails`;
    
    const response = await axios.get(url, {
      params: {
        key: TOMTOM_API_KEY,
        bbox: bbox,
        fields: '{incidents{type,geometry{type,coordinates},properties{iconCategory,magnitudeOfDelay,events{description},roadNumbers}}}',
        language: 'en-GB',
        t: Date.now()
      }
    });

    const incidents = response.data.incidents || [];

    // Filter meaningful incidents
    const meaningfulIncidents = incidents.filter(incident => {
      const iconCategory = incident.properties?.iconCategory;
      const magnitudeOfDelay = incident.properties?.magnitudeOfDelay || 0;
      
      // Include: accidents (1), congestion (5-7), road closures (8-9), construction (10), broken vehicles (11)
      const meaningfulCategories = [1, 5, 6, 7, 8, 9, 10, 11];
      
      return meaningfulCategories.includes(iconCategory) && magnitudeOfDelay > 0;
    });

    // Normalize incident data
    const normalizedIncidents = meaningfulIncidents.map((incident, index) => {
      const geometry = incident.geometry;
      const properties = incident.properties;
      const coords = geometry.type === 'Point' 
        ? geometry.coordinates 
        : geometry.coordinates[0];
      
      const iconCategory = properties.iconCategory;
      const magnitudeOfDelay = properties.magnitudeOfDelay || 0;
      
      // Determine severity based on iconCategory and delay
      let severity = 'LOW';
      if (iconCategory === 1 || iconCategory === 8 || iconCategory === 9 || magnitudeOfDelay >= 4) {
        severity = 'HIGH';
      } else if (iconCategory === 5 || iconCategory === 6 || magnitudeOfDelay >= 2) {
        severity = 'MEDIUM';
      }

      // Determine incident type
      const typeMap = {
        1: 'ACCIDENT',
        2: 'FOG',
        3: 'ROAD_CLOSURE',
        4: 'WIND',
        5: 'CONGESTION',
        6: 'CONGESTION',
        7: 'CONGESTION',
        8: 'ROAD_CLOSURE',
        9: 'ROAD_CLOSURE',
        10: 'CONSTRUCTION',
        11: 'BROKEN_VEHICLE'
      };
      
      const type = typeMap[iconCategory] || 'OTHER';

      return {
        id: `incident-${index}`,
        lat: coords[1],
        lng: coords[0],
        type: type,
        severity: severity,
        delay: magnitudeOfDelay,
        description: properties.events?.[0]?.description || 'Traffic incident',
        roadName: properties.roadNumbers?.[0] || 'Unknown road'
      };
    });

    return normalizedIncidents;

  } catch (error) {
    console.error('Error fetching traffic incidents from TomTom:', error.response?.data || error.message);
    throw new Error('Failed to fetch traffic incident data');
  }
}

module.exports = { getTrafficIncidents };
