function formatTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentyear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = Months[date.getMonth()];
  let todaydate = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let time = `${currentDay}(${todaydate}) ${hour}:${minute}`;
  return time;
}

function showtemp(response) {
  console.log(response);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let Humidity = document.querySelector("#Humidity");
  Humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  let sky = document.querySelector("#description");
  sky.innerHTML = `${response.data.weather[0].main}`;
  let cityname = document.querySelector("#city");

  cityname.innerHTML = response.data.name;

  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(response.data.main.temp)} °C`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showtemp);
  let now = new Date();
  let timee1 = document.querySelector("#timee");
  timee1.innerText = `${formatTime(now)}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showtemp);
  let now = new Date();
  let timee1 = document.querySelector("#timee");
  timee1.innerText = `${formatTime(now)}`;
}
function currentCase(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.querySelector("#current");

let citysearch = document.querySelector("#citysearch");
console.log(citysearch);
citysearch.addEventListener("submit", search);
current.addEventListener("click", currentCase);
