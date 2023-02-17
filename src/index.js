function formatDate(timestamp) {
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
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showtemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#Humidity");
  let windElemet = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  tempElement.innerHTML = Math.round(response.data.main.temp);
  celTemp = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElemet.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=new york&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showtemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city-input");
  search(cityInputElement.value);
}

function showfarTemp(event) {
  event.preventDefault();
  let farTemp = (celTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farTemp);
  celsiuslink.classList.remove("active");
  farenlink.classList.add("active");
}
function showCelTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celTemp);
  celsiuslink.classList.add("active");
  farenlink.classList.remove("active");
}

let celTemp = null;

let form = document.querySelector("#citysearch");
form.addEventListener("submit", handleSubmit);

let farenlink = document.querySelector("#faren-link");
farenlink.addEventListener("click", showfarTemp);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showCelTemp);
search("Isfahan");
