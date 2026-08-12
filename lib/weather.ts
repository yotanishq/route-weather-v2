const OPENWEATHER_API_KEY =
  process.env.NEXT_PUBLIC_OPENWEATHER_KEY

async function fetchJson(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`)
  }
  return res.json()
}

export async function getWeather(lat: number, lon: number) {
  const key = OPENWEATHER_API_KEY
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
  const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`
  const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${key}`

  const [weatherResult, pollutionResult, oneCallResult] =
    await Promise.allSettled([
      fetchJson(weatherUrl),
      fetchJson(pollutionUrl),
      fetchJson(oneCallUrl)
    ])

  if (weatherResult.status === "rejected") {
    throw weatherResult.reason
  }

  const weather = weatherResult.value

  const air_quality =
    pollutionResult.status === "fulfilled"
      ? pollutionResult.value?.list?.[0]?.main?.aqi
      : undefined

  const uvi =
    oneCallResult.status === "fulfilled"
      ? oneCallResult.value?.current?.uvi
      : undefined

  return {
    ...weather,
    air_quality,
    uvi
  }
}

export async function getForecast(lat: number, lon: number) {
  const key = OPENWEATHER_API_KEY
  // Use 5-day forecast endpoint (3-hour intervals)
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`

  const forecastResult = await fetchJson(forecastUrl)

  if (!forecastResult.list || !Array.isArray(forecastResult.list)) {
    throw new Error('Invalid forecast response')
  }

  // Transform raw API response to our internal model
  return forecastResult.list.map((entry: any) => ({
    forecastTime: new Date(entry.dt * 1000),
    temperature: entry.main.temp,
    feelsLike: entry.main.feels_like,
    humidity: entry.main.humidity,
    condition: entry.weather[0]?.main || 'Unknown',
    description: entry.weather[0]?.description || '',
    windSpeed: entry.wind?.speed || 0,
    visibility: entry.visibility,
    precipitationProbability: entry.pop
  }))
}