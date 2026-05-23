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