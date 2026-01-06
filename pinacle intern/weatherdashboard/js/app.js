const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");

searchBtn.addEventListener("click", async () => {
  let city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  city = encodeURIComponent(city); // 🔥 IMPORTANT FIX

  loading.classList.remove("hidden");
  weatherCard.classList.add("hidden");

  try {
    const weather = await getWeather(city);
    const air = await getAirQuality(
      weather.coord.lat,
      weather.coord.lon
    );

    document.getElementById("cityName").innerText =
      `${weather.name}, ${weather.sys.country}`;

    document.getElementById("temperature").innerText =
      `🌡️ Temperature: ${weather.main.temp} °C`;

    document.getElementById("condition").innerText =
      `☁️ ${weather.weather[0].description}`;

    document.getElementById("details").innerText =
      `💧 Humidity: ${weather.main.humidity}% | 💨 Wind: ${weather.wind.speed} m/s`;

    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    document.getElementById("aqi").innerText =
      `🌱 Air Quality Index: ${air.list[0].main.aqi}`;

    weatherCard.classList.remove("hidden");
  } catch (error) {
    alert(error.message);
  } finally {
    loading.classList.add("hidden");
  }
});
