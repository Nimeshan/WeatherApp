const API_KEY = '797e1180ad0ac9692dd3b4094bbb8358';

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.querySelector(".sbox");
  const inputValue = input.value.trim();

  if (!inputValue) {
    displayMessage("Please enter a city name");
    return;
  }

  const list = document.querySelector(".ajax-section .cities");
  const listItems = list.querySelectorAll(".city");

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    const { main, name, sys, weather } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

    const cityElement = createCityElement(name, sys.country, main.temp, weather[0].description, iconUrl);
    list.appendChild(cityElement);

    input.value = '';
    input.focus();
  } catch (error) {
    displayMessage("City not found. Please try again.");
    console.error('Error fetching weather data:', error);
  }
});

function createCityElement(name, country, temp, description, iconUrl) {
  const li = document.createElement("li");
  li.classList.add("city");

  const markup = `
    <h2 class="city-name" data-name="${name},${country}">
      <span>${name}</span>
      <sup>${country}</sup>
    </h2>
    <div class="city-temp">${Math.round(temp)}<sup>°C</sup></div>
    <figure>
      <img class="city-icon" src="${iconUrl}" alt="${description}">
      <figcaption>${description}</figcaption>
    </figure>
  `;

  li.innerHTML = markup;
  return li;
}

function displayMessage(message) {
  const msg = document.querySelector(".msg");
  msg.textContent = message;
}
