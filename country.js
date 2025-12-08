/**
 * 🌐 What is URLSearchParams?

URLSearchParams is a built-in JavaScript object used to read, get, set, and manage query parameters in a URL.

Query parameters are the part of a URL that come after the question mark (?).

✅ What does URLSearchParams do?

It allows you to extract values from the URL easily.
 */
const countryName = (new URLSearchParams(window.location.search).get('name') || '').trim().toLowerCase();
const flagImg = document.querySelector('.country-details img')
const singleCountry = document.querySelector(".countryName")
const sologen = document.querySelector('.sologen')
const nativeName = document.querySelector(".native-name")
const population = document.querySelector('.population')
const Region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const TopLevel = document.querySelector('.top-level')
const currency = document.querySelector('.currency')
const language = document.querySelector('.language')
const borderCountries = document.querySelector('.border-countries')
const darkMode = document.getElementById('dark-mode');


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode')
    document.body.classList.remove('light-mode')
} else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
}




fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {//destructing first key of array 
        console.log(country)
        //flag
        flagImg.classList.add('max-w-[47%]', 'max-h-fit', 'shadow-lg')
        flagImg.src = country.flags.svg;
        //name of country in h1
        singleCountry.innerText = country.name.common;
        console.log(country.name.official)
        sologen.innerText = country.name.official
        // population
        population.innerText = country.population.toLocaleString('ur-PK');
        // region
        Region.innerText = country.region;
        //tdl
        TopLevel.innerText = country.tld.join(' , ')
        console.log(country.tld)
        //currencies
        currency.innerText = (country.currencies) ? Object.values(country.currencies).map((currency) => (`(${currency.symbol}) ${currency.name}`)).join(', ') : 'N/A'
        // language
        // languages: join all language names

        language.innerText = (country.languages) ? Object.values(country.languages).join(' , ') : 'N/A';

        //native name
        if (country.name.nativeName) {
            //    nativeName.innerText =country.name.nativeName.eng.common
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        } else if (country.name.common) {
            nativeName.innerText = country.name.common
        } else {
            nativeName.innerText = "N/A"; // fallback if even common is missing
        }
        //captial

        capital.innerText = (country.capital) ? country.capital?.[0] : 'N/A';
        //subregion
        subRegion.innerText = (country.capital) ? country.subregion : 'N/A';
        // region.innerText = country?.capital ;
        //  border countries
        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        /*🎯 So why destructure?
 🔸 Because it makes the code shorter
 🔸 Cleaner
 🔸 Easier to read
 🔸 Directly gives you the object you need */
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.className = 'py-1.5 px-4 shadow-[0_0_4px_0_rgba(0,0,0,0.2)] hover:shadow-[0_0_8px_0_rgba(0,0,0,0.3)] rounded text-sm bg-[var(--elements-color)] text-[var(--text-color)] transition-all duration-200 inline-block'
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        console.log(borderCountryTag)
                        borderCountries.append(borderCountryTag)
                    })
            })
        } else {
            const notborder = document.createElement('span')
            notborder.innerText = 'N/A'
            borderCountries.append(notborder)
        }


    })


if (darkMode) {
    darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save theme choice
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}












