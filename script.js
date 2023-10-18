const apiKey = 'aa14a7116e7bb7d97cdfa4e5c760d76e';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    let data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' Km/h';

    if (data.weather[0].main === 'Clouds') {
      weatherIcon.src = 'images/clouds.png';
    } else if (data.weather[0].main === 'Clear') {
      weatherIcon.src = 'images/clear.png';
    } else if (data.weather[0].main === 'Drizzle') {
      weatherIcon.src = 'images/drizzle.png';
    } else if (data.weather[0].main === 'Rain') {
      weatherIcon.src = 'images/rain.png';
    } else if (data.weather[0].main === 'Mist') {
      weatherIcon.src = 'images/mist.png';
    }
    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }
}

let inactivityTime = function () {
  let timer;
  window.onload = timerReset;
  document.onkeypress = timerReset;
  document.onmousemove = timerReset;
  document.onmousedown = timerReset;
  document.ontouchstart = timerReset;
  document.onclick = timerReset;
  document.onscroll = timerReset;
  document.onkeypress = timerReset;
  function timerElapsed() {
    console.log('Timer elapsed');
    location.reload();
  }
  function timerReset() {
    console.log('Reseting timer');
    clearTimeout(timer);
    timer = setTimeout(timerElapsed, 1 * 60 * 1000); // 5 mins
  }
};

inactivityTime();
searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
