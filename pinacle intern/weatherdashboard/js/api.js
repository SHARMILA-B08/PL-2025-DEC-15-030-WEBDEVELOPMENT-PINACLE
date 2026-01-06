async function getWeather(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city},IN&units=metric&appid=${API_KEY}`
  );

  const data = await response.json();

  if (data.cod !== 200) {
    throw new Error("City not found. Try correct spelling.");
  }

  return data;
}

async function getAirQuality(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  return await response.json();
}
