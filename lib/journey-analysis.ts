import type {
  Journey,
  JourneyAnalysis,
  WeatherFactor,
  TrafficFactor,
  JourneyWarning,
  TransportRecommendation,
  RouteCheckpoint
} from "@/lib/journey"
import type { AccidentZone } from "@/lib/accidents"

/**
 * Generate comprehensive journey analysis from weather and traffic data
 */
export function generateJourneyAnalysis(journey: Journey): JourneyAnalysis {
  const weatherFactors = analyzeWeatherFactors(journey)
  const trafficFactors = analyzeTrafficFactors(journey)
  const warnings = generateWarnings(weatherFactors, trafficFactors, journey)
  const overallRiskScore = calculateOverallRiskScore(weatherFactors, trafficFactors)
  const overallRiskLevel = determineRiskLevel(overallRiskScore)
  const transportRecommendations = generateTransportRecommendations(
    weatherFactors,
    trafficFactors,
    overallRiskLevel
  )

  return {
    overallRiskScore,
    overallRiskLevel,
    weatherFactors,
    trafficFactors,
    warnings,
    transportRecommendations,
    analysisTimestamp: new Date()
  }
}

/**
 * Analyze weather factors from journey checkpoints
 */
function analyzeWeatherFactors(journey: Journey): WeatherFactor[] {
  const factors: WeatherFactor[] = []
  const checkpoints = journey.checkpoints || []

  if (checkpoints.length === 0) {
    return factors
  }

  // Analyze precipitation
  const precipitationScore = analyzePrecipitation(checkpoints)
  if (precipitationScore.score > 0) {
    factors.push(precipitationScore)
  }

  // Analyze thunderstorms
  const thunderstormScore = analyzeThunderstorms(checkpoints)
  if (thunderstormScore.score > 0) {
    factors.push(thunderstormScore)
  }

  // Analyze wind
  const windScore = analyzeWind(checkpoints)
  if (windScore.score > 0) {
    factors.push(windScore)
  }

  // Analyze visibility
  const visibilityScore = analyzeVisibility(checkpoints)
  if (visibilityScore.score > 0) {
    factors.push(visibilityScore)
  }

  // Analyze temperature extremes
  const temperatureScore = analyzeTemperature(checkpoints)
  if (temperatureScore.score > 0) {
    factors.push(temperatureScore)
  }

  // Analyze forecast confidence
  const forecastConfidenceScore = analyzeForecastConfidence(checkpoints)
  if (forecastConfidenceScore.score > 0) {
    factors.push(forecastConfidenceScore)
  }

  return factors
}

/**
 * Analyze precipitation risk
 * Scoring: 0-30 light rain, 30-60 moderate rain, 60-100 heavy rain
 */
function analyzePrecipitation(checkpoints: RouteCheckpoint[]): WeatherFactor {
  let maxPrecipProbability = 0
  let hasRain = false

  for (const checkpoint of checkpoints) {
    if (checkpoint.forecast) {
      const precipProb = checkpoint.forecast.precipitationProbability || 0
      maxPrecipProbability = Math.max(maxPrecipProbability, precipProb)
      
      if (checkpoint.forecast.condition === 'Rain' || checkpoint.forecast.condition === 'Drizzle') {
        hasRain = true
      }
    }
  }

  if (!hasRain && maxPrecipProbability < 0.3) {
    return { category: 'Precipitation', score: 0, description: 'No significant precipitation expected', severity: 'low' }
  }

  let score = 0
  let description = ''
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low'

  if (maxPrecipProbability >= 0.7) {
    score = 80
    description = 'Heavy precipitation expected with high probability'
    severity = 'high'
  } else if (maxPrecipProbability >= 0.5) {
    score = 50
    description = 'Moderate precipitation expected'
    severity = 'medium'
  } else if (maxPrecipProbability >= 0.3) {
    score = 25
    description = 'Light precipitation possible'
    severity = 'low'
  }

  return { category: 'Precipitation', score, description, severity }
}

/**
 * Analyze thunderstorm risk
 * Scoring: 0-100 based on thunderstorm presence
 */
function analyzeThunderstorms(checkpoints: RouteCheckpoint[]): WeatherFactor {
  let hasThunderstorm = false

  for (const checkpoint of checkpoints) {
    if (checkpoint.forecast && checkpoint.forecast.condition === 'Thunderstorm') {
      hasThunderstorm = true
      break
    }
  }

  if (!hasThunderstorm) {
    return { category: 'Thunderstorms', score: 0, description: 'No thunderstorms expected', severity: 'low' }
  }

  return {
    category: 'Thunderstorms',
    score: 90,
    description: 'Thunderstorms expected along route',
    severity: 'critical'
  }
}

/**
 * Analyze wind risk
 * Scoring: 0-30 light wind, 30-60 moderate wind, 60-100 strong wind
 */
function analyzeWind(checkpoints: RouteCheckpoint[]): WeatherFactor {
  let maxWindSpeed = 0

  for (const checkpoint of checkpoints) {
    if (checkpoint.forecast) {
      maxWindSpeed = Math.max(maxWindSpeed, checkpoint.forecast.windSpeed)
    }
  }

  // Wind speed in m/s: <10 light, 10-20 moderate, >20 strong
  if (maxWindSpeed < 10) {
    return { category: 'Wind', score: 0, description: 'Light winds expected', severity: 'low' }
  }

  let score = 0
  let description = ''
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low'

  if (maxWindSpeed >= 20) {
    score = 75
    description = 'Strong winds expected, may affect driving'
    severity = 'high'
  } else if (maxWindSpeed >= 15) {
    score = 50
    description = 'Moderate to strong winds expected'
    severity = 'medium'
  } else if (maxWindSpeed >= 10) {
    score = 30
    description = 'Moderate winds expected'
    severity = 'low'
  }

  return { category: 'Wind', score, description, severity }
}

/**
 * Analyze visibility risk
 * Scoring: 0-30 good visibility, 30-60 reduced visibility, 60-100 poor visibility
 */
function analyzeVisibility(checkpoints: RouteCheckpoint[]): WeatherFactor {
  let minVisibility = Infinity

  for (const checkpoint of checkpoints) {
    if (checkpoint.forecast && checkpoint.forecast.visibility) {
      minVisibility = Math.min(minVisibility, checkpoint.forecast.visibility)
    }
  }

  if (minVisibility === Infinity) {
    return { category: 'Visibility', score: 0, description: 'Visibility data unavailable', severity: 'low' }
  }

  // Visibility in meters: >5000 good, 2000-5000 reduced, <2000 poor
  if (minVisibility >= 5000) {
    return { category: 'Visibility', score: 0, description: 'Good visibility expected', severity: 'low' }
  }

  let score = 0
  let description = ''
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low'

  if (minVisibility < 1000) {
    score = 85
    description = 'Poor visibility expected, hazardous driving conditions'
    severity = 'critical'
  } else if (minVisibility < 2000) {
    score = 60
    description = 'Reduced visibility expected'
    severity: 'high'
  } else if (minVisibility < 5000) {
    score = 35
    description = 'Slightly reduced visibility expected'
    severity = 'low'
  }

  return { category: 'Visibility', score, description, severity }
}

/**
 * Analyze temperature extremes
 * Scoring: 0-30 comfortable, 30-60 uncomfortable, 60-100 extreme
 */
function analyzeTemperature(checkpoints: RouteCheckpoint[]): WeatherFactor {
  let minTemp = Infinity
  let maxTemp = -Infinity

  for (const checkpoint of checkpoints) {
    if (checkpoint.forecast) {
      minTemp = Math.min(minTemp, checkpoint.forecast.temperature)
      maxTemp = Math.max(maxTemp, checkpoint.forecast.temperature)
    }
  }

  if (minTemp === Infinity) {
    return { category: 'Temperature', score: 0, description: 'Temperature data unavailable', severity: 'low' }
  }

  // Temperature in Celsius: 15-25 comfortable, <0 or >35 extreme
  if (minTemp >= 15 && maxTemp <= 25) {
    return { category: 'Temperature', score: 0, description: 'Comfortable temperatures expected', severity: 'low' }
  }

  let score = 0
  let description = ''
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low'

  if (minTemp < -10 || maxTemp > 40) {
    score = 80
    description = 'Extreme temperatures expected, dangerous conditions'
    severity = 'critical'
  } else if (minTemp < 0 || maxTemp > 35) {
    score = 50
    description = 'Uncomfortable temperatures expected'
    severity = 'medium'
  } else if (minTemp < 10 || maxTemp > 30) {
    score = 25
    description = 'Temperature outside comfortable range'
    severity = 'low'
  }

  return { category: 'Temperature', score, description, severity }
}

/**
 * Analyze forecast confidence
 * Scoring: 0-100 based on unavailable forecasts
 */
function analyzeForecastConfidence(checkpoints: RouteCheckpoint[]): WeatherFactor {
  const unavailableForecasts = checkpoints.filter(cp => !cp.forecast).length
  const totalCheckpoints = checkpoints.length
  const unavailableRatio = unavailableForecasts / totalCheckpoints

  if (unavailableRatio === 0) {
    return { category: 'Forecast Confidence', score: 0, description: 'All forecasts available', severity: 'low' }
  }

  let score = 0
  let description = ''
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low'

  if (unavailableRatio >= 0.5) {
    score = 70
    description = 'Limited forecast data available for journey'
    severity = 'high'
  } else if (unavailableRatio >= 0.25) {
    score = 40
    description = 'Some forecast data unavailable'
    severity = 'medium'
  } else if (unavailableRatio > 0) {
    score = 15
    description = 'Minor forecast data gaps'
    severity = 'low'
  }

  return { category: 'Forecast Confidence', score, description, severity }
}

/**
 * Analyze traffic factors from accident zones
 */
function analyzeTrafficFactors(journey: Journey): TrafficFactor[] {
  const factors: TrafficFactor[] = []
  const accidentZones = journey.accidentZones || []

  if (accidentZones.length === 0) {
    return factors
  }

  // Analyze accident severity
  const accidentScore = analyzeAccidentSeverity(accidentZones)
  if (accidentScore.score > 0) {
    factors.push(accidentScore)
  }

  // Analyze congestion (if data available)
  const congestionScore = analyzeCongestion(accidentZones)
  if (congestionScore.score > 0) {
    factors.push(congestionScore)
  }

  // Analyze road closures
  const closureScore = analyzeRoadClosures(accidentZones)
  if (closureScore.score > 0) {
    factors.push(closureScore)
  }

  return factors
}

/**
 * Analyze accident severity
 * Scoring: 0-30 minor, 30-60 moderate, 60-100 severe
 */
function analyzeAccidentSeverity(accidentZones: AccidentZone[]): TrafficFactor {
  if (accidentZones.length === 0) {
    return { category: 'Accidents', score: 0, description: 'No accidents reported', severity: 'low' }
  }

  const severeAccidents = accidentZones.filter(zone => 
    zone.severity === 'high'
  ).length

  const totalAccidents = accidentZones.length

  let score = 0
  let description = ''
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low'

  if (severeAccidents > 0) {
    score = 75
    description = `${severeAccidents} severe accident(s) reported on route`
    severity = 'critical'
  } else if (totalAccidents >= 3) {
    score = 50
    description = `${totalAccidents} accidents reported on route`
    severity = 'medium'
  } else if (totalAccidents >= 1) {
    score = 25
    description = `${totalAccidents} accident(s) reported on route`
    severity = 'low'
  }

  return { category: 'Accidents', score, description, severity }
}

/**
 * Analyze congestion (simplified based on accident count as proxy)
 */
function analyzeCongestion(accidentZones: AccidentZone[]): TrafficFactor {
  if (accidentZones.length === 0) {
    return { category: 'Congestion', score: 0, description: 'No congestion data', severity: 'low' }
  }

  const score = Math.min(accidentZones.length * 15, 70)
  let description = ''
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low'

  if (score >= 60) {
    description = 'Severe congestion likely due to multiple incidents'
    severity = 'high'
  } else if (score >= 30) {
    description = 'Moderate congestion expected'
    severity = 'medium'
  } else {
    description = 'Minor congestion possible'
    severity = 'low'
  }

  return { category: 'Congestion', score, description, severity }
}

/**
 * Analyze road closures
 */
function analyzeRoadClosures(accidentZones: AccidentZone[]): TrafficFactor {
  const closures = accidentZones.filter(zone => 
    zone.incidentType === 'closure'
  ).length

  if (closures === 0) {
    return { category: 'Road Closures', score: 0, description: 'No road closures reported', severity: 'low' }
  }

  return {
    category: 'Road Closures',
    score: 90,
    description: `${closures} road closure(s) reported - route may be affected`,
    severity: 'critical'
  }
}

/**
 * Calculate overall risk score from weather and traffic factors
 * Formula: Weighted average of weather (60%) and traffic (40%) factors
 */
function calculateOverallRiskScore(
  weatherFactors: WeatherFactor[],
  trafficFactors: TrafficFactor[]
): number {
  const weatherScore = calculateFactorScore(weatherFactors)
  const trafficScore = calculateFactorScore(trafficFactors)

  // Weighted average: weather 60%, traffic 40%
  const overallScore = (weatherScore * 0.6) + (trafficScore * 0.4)

  return Math.round(overallScore)
}

/**
 * Calculate average score from factors
 */
function calculateFactorScore(factors: { score: number }[]): number {
  if (factors.length === 0) return 0

  const totalScore = factors.reduce((sum, factor) => sum + factor.score, 0)
  return totalScore / factors.length
}

/**
 * Determine risk level from score
 */
function determineRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score >= 75) return 'critical'
  if (score >= 50) return 'high'
  if (score >= 25) return 'medium'
  return 'low'
}

/**
 * Generate warnings from factors
 */
function generateWarnings(
  weatherFactors: WeatherFactor[],
  trafficFactors: TrafficFactor[],
  journey: Journey
): JourneyWarning[] {
  const warnings: JourneyWarning[] = []

  // Weather warnings
  for (const factor of weatherFactors) {
    if (factor.severity === 'high' || factor.severity === 'critical') {
      let type: JourneyWarning['type'] = 'Heavy Rain'
      
      if (factor.category === 'Thunderstorms') {
        type = 'Thunderstorm'
      } else if (factor.category === 'Visibility') {
        type = 'Low Visibility'
      } else if (factor.category === 'Wind') {
        type = 'High Winds'
      } else if (factor.category === 'Temperature') {
        type = 'Extreme Temperature'
      }

      warnings.push({
        type,
        severity: factor.severity,
        description: factor.description
      })
    }
  }

  // Traffic warnings
  for (const factor of trafficFactors) {
    if (factor.severity === 'high' || factor.severity === 'critical') {
      let type: JourneyWarning['type'] = 'Severe Congestion'
      
      if (factor.category === 'Road Closures') {
        type = 'Road Closure'
      }

      warnings.push({
        type,
        severity: factor.severity,
        description: factor.description
      })
    }
  }

  return warnings
}

/**
 * Generate transport recommendations based on conditions
 */
function generateTransportRecommendations(
  weatherFactors: WeatherFactor[],
  trafficFactors: TrafficFactor[],
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
): TransportRecommendation[] {
  const recommendations: TransportRecommendation[] = []

  const weatherScore = calculateFactorScore(weatherFactors)
  const trafficScore = calculateFactorScore(trafficFactors)

  // Primary recommendation based on overall conditions
  if (riskLevel === 'critical') {
    recommendations.push({
      mode: 'Avoid Travel',
      confidence: 85,
      reason: 'Severe weather and traffic conditions make travel dangerous',
      alternatives: ['Postpone journey', 'Use public transport', 'Consider alternative routes']
    })
  } else if (riskLevel === 'high') {
    recommendations.push({
      mode: 'Drive with Caution',
      confidence: 70,
      reason: 'Challenging conditions require extra care and preparation',
      alternatives: ['Delay departure if possible', 'Consider public transport', 'Plan extra time']
    })
  } else if (riskLevel === 'medium') {
    recommendations.push({
      mode: 'Normal Driving',
      confidence: 60,
      reason: 'Moderate conditions - monitor situation during journey',
      alternatives: ['Allow extra time', 'Check weather updates']
    })
  } else {
    recommendations.push({
      mode: 'Normal Driving',
      confidence: 90,
      reason: 'Favorable conditions for travel',
      alternatives: ['Standard travel time expected']
    })
  }

  // Weather-specific recommendations
  if (weatherScore >= 50) {
    const hasPrecipitation = weatherFactors.some(f => f.category === 'Precipitation' && f.score >= 50)
    const hasWind = weatherFactors.some(f => f.category === 'Wind' && f.score >= 50)
    
    if (hasPrecipitation) {
      recommendations.push({
        mode: 'Reduced Speed',
        confidence: 75,
        reason: 'Precipitation requires reduced speed and increased following distance',
        alternatives: ['Use headlights', 'Avoid sudden braking']
      })
    }
    
    if (hasWind) {
      recommendations.push({
        mode: 'High Profile Vehicle Caution',
        confidence: 70,
        reason: 'Strong winds affect high profile vehicles',
        alternatives: ['Reduce speed', 'Both hands on steering wheel']
      })
    }
  }

  // Traffic-specific recommendations
  if (trafficScore >= 50) {
    recommendations.push({
      mode: 'Alternative Route',
      confidence: 65,
      reason: 'Traffic incidents may cause delays',
      alternatives: ['Check real-time traffic', 'Consider alternate paths']
    })
  }

  return recommendations
}
