const WEATHER_API_KEY = "53c81cd4b5645524faf013fc9b8c330b";

export async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const data = await response.json();

    // 🚨 IMPORTANT CHECK
    if (data.cod !== 200) {
      console.log("Weather API error:", data.message);
      return null;
    }

    return data;

  } catch (error) {
    console.log(error);
    return null;
  }
}