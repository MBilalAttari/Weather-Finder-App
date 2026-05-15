const ApiKey = "2a3b818511664fba8f345723261305";

const city = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const container = document.getElementById("container");
const weatherIcon = document.getElementById("weather-icon");
const temp = document.getElementById("temp");
const cityName = document.getElementById("city-name");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const backBtn = document.getElementById("back-btn");

const getWeather = async () => {
  let cityInput = city.value;
  if (cityInput === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a city name!",
    });
    return;
  }

  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${cityInput}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      Swal.fire({
        title: "Success",
        icon: "success",
        draggable: true,
      });
    }
    if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.error.message,
      });
      return;
    }
    weatherIcon.src = `https:${data.current.condition.icon}`;
    weatherIcon.alt = data.current.condition.text;
    temp.innerText = `${Math.floor(data.current.temp_c)}°C`;
    cityName.innerText = data.location.name;
    condition.innerText = data.current.condition.text;
    humidity.innerText = `${data.current.humidity}%`;
    windSpeed.innerText = `${data.current.wind_kph} km/h`;

    container.classList.add("flip");

  } 
  catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: `<a href="#">Why do I have this issue?</a> ${error}`,
    });
  }
};

searchBtn.addEventListener("click", getWeather);

backBtn.addEventListener("click", () => {
  container.classList.remove("flip");
});
