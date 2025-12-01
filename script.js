// fetch('https://restcountries.com/v3.1/all')
// Clean, fixed script: fetch once, render, and filter client-side
const countriesContainer = document.querySelector('.countries-container');
const filterRegion = document.getElementById('filterRegion');
const searchInput = document.getElementById('search-box');
const darkMode = document.getElementById('dark-mode');

// Apply saved theme (if any) so theme persists across navigation
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.remove('light-mode');
  document.body.classList.add('dark-mode');
} else if (savedTheme === 'light') {
  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
}

let allCountries = [];

function createCountryCard(country) {
  const countryCard = document.createElement('a');
  countryCard.classList.add(
    'country-card', 'w-full', 'sm:w-[250px]', 'pb-6','rounded-md', 'shadow-md','overflow-hidden', 'transition-all','duration-200','ease-in-out','hover:scale-[1.02]','hover:shadow-lg'
  );
  countryCard.href = `./country.html?name=${country.name.common}`;
  const population = country.population ? country.population.toLocaleString('en-PK') : 'N/A';
  const capital = Array.isArray(country.capital) ? country.capital.join(', ') : (country.capital || 'N/A');
  countryCard.innerHTML = `
    <img src="${country.flags.svg}" alt="${country.name.common} flag" class="w-full h-[150px]" />
    <div class="card-text px-4">
      <h3 class="text-[28px] my-4 font-bold">${country.name.common}</h3>
      <p class="my-2"><b>Population: </b>&nbsp; ${population}</p>
      <p class="my-2"><b>Region: </b>&nbsp;${country.region}</p>
      <p class="my-2"><b>Capital: </b>&nbsp;${capital}</p>
    </div>
  `;
  return countryCard;
}

function renderCountries(list) {
  countriesContainer.innerHTML = '';
  list.forEach((country) => countriesContainer.append(createCountryCard(country)));
}

// initial fetch
fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital')
  .then((res) => res.json())
  .then((data) => {
    allCountries = Array.isArray(data) ? data : [];
    renderCountries(allCountries)
     
  .catch((err) => console.error('Failed to fetch countries:', err));
  })
// filter client-side (faster, no extra network calls)
if (filterRegion) {
  filterRegion.addEventListener('change', (e) => {
    const val = e.target.value;
    if (!val || val === 'All') {
      renderCountries(allCountries);
      return;
    }
    const filtered = allCountries.filter((c) => c.region === val);
    renderCountries(filtered);
  });
}
                  src="${country.flags.svg}"
                  alt="${country.name.common} flag"
 





searchInput.addEventListener('input',  (e) => {
  const filteredCountries = allCountries.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  //  if (filteredCountries.length > 0) {
  //   renderCountries(filteredCountries);
  // } else {
  //   // show a clear "no results" message
  //   countriesContainer.innerHTML = '<h2 class="col-span-full text-center text-lg font-bold">No country found</h2>';
  // }
  filteredCountries.length > 0
  ? renderCountries(filteredCountries)
  : (countriesContainer.innerHTML =
      '<h2 class="col-span-full text-center text-lg font-bold">No country found</h2>');
})

if (darkMode) {
  darkMode.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else if (document.body.classList.contains('light-mode')) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      }
    }
  });
}

