//control spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//control phones result
const toggleSearchResult = displayStyle => {
    document.getElementById('search-results').style.display = displayStyle;
}
// const showErrorEmptyInput = displayStyle => {
//     document.getElementById('error-emptyInput').style.display = displayStyle;
// }

// loading all countries
const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
}
loadCountries()

// displaying all countries
const displayCountries = countries => {
    // for (const country of countries) {
    //     console.log(country);
    // }
    const sortedCountires = countries.sort(function (a, b) {
        if (a.name.common.toLowerCase() < b.name.common.toLowerCase())
            return -1;
        if (a.name.common.toLowerCase() > b.name.common.toLowerCase())
            return 1;
    });
    console.log(sortedCountires);
    const countriesDiv = document.getElementById('countries');
    countriesDiv.innerHTML = ''
    sortedCountires.forEach(country => {
        //console.log(country);
        let language;
        const languages = country.languages
        if (languages) {
            language = Object.values(languages)
        }
        toggleSpinner('none')
        const div = document.createElement('div');
        div.classList.add('country')
        div.innerHTML = `
                <figure>
                    <img src=${country.flags.png} alt="Movie">
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${country.name.common}</h2>
                    <p>Capital: ${country.capital}</p>
                    <p>Languages: ${language ? language.slice(0, 2) : 'not available'}</p>
                   
                    <div class="card-actions">
                        <button onclick="loadCountryByName('${country.name.common}')" class="btn details-btn">Details</button>
                    </div>
                </div>
        
        `;
        countriesDiv.appendChild(div);
    });
    toggleSearchResult('block')
    toggleSpinner('none')
}


const inputField = document.getElementById("search-input");
inputField.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        //event.preventDefault();
        document.getElementById("button-search").click();
    }
});
// taking search text
const searchCountry = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    console.log(searchText);
    searchInput.value = '';
    toggleSpinner('block')
    toggleSearchResult('none')
    // showErrorEmptyInput('none')
    if (searchText != '') {
        // showErrorEmptyInput('none')
        const url = `https://restcountries.com/v3.1/name/${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayCountries(data))
    }
    else {
        toggleSpinner('none')
        showErrorEmptyInput('block')

    }

}

const displayCountryDetail = country => {
    console.log(country);
    const countryDiv = document.getElementById('country-detail');
    countryDiv.innerHTML = `
        <h5>${country.name.common}</h4>
        <p>population: ${country.population}</p>
        <img width="200px" src="${country.flag}">
    `
}
