const inputField = document.getElementById("search-input");
inputField.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        //event.preventDefault();
        document.getElementById("button-search").click();
    }
});

const searchCountry = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    console.log(searchText);
    // searchInput.value = '';

    // const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySearchMeal(data.meals))
}
const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
}
loadCountries()

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
    sortedCountires.forEach(country => {
        //console.log(country);
        let language;
        const languages = country.languages
        if (languages) {
            language = Object.values(languages)
        }

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
}