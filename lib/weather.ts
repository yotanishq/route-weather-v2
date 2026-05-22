const OPENWEATHER_API_KEY =
  process.env
    .NEXT_PUBLIC_OPENWEATHER_KEY

export async function getWeather(
  lat: number,
  lon: number
) {

  const res = await fetch(

    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`

  )

  return await res.json()

}