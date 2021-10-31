function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  return `${day} ${hours}: ${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity");
  let heading = document.querySelector(".cities");
  let city = cityInput.value;
  let units = "metric";
  let apiKey = "5354b60afda2b7800186c06153932396";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  heading.innerHTML = `${cityInput.value}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  let cityTemp = Math.round(response.data.main.temp);
  let listTemperature = document.querySelector("#currentTemperature");
  listTemperature.innerHTML = `${cityTemp}°C`;
  let cityName = document.querySelector(".cities");
  cityName.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}% humidity`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed} wind`;
}

function findMe(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "5354b60afda2b7800186c06153932396";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let urlLocation = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  console.log(urlLocation);
  axios.get(urlLocation).then(showTemperature);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(findMe);
}

let dateElement = document.querySelector("#now");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector(".searchCity");
searchForm.addEventListener("submit", search);

let currentLocation = document.querySelector("#here");
currentLocation.addEventListener("click", currentPosition);
