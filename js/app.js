
document.addEventListener('DOMContentLoaded', () => {
    allCountries();
})

async function allCountries(){
    const main = document.querySelector('main');
    const darkModeChange = document.querySelector('header');

    let darkMode = false;

    let allCountriesArray = [];

    const API = await fetch('https://restcountries.com/v2/all', {mode: "cors"});
    const resp = await API.json();
    allCountriesArray = resp;
    createCountryDOM(allCountriesArray);

    darkModeChange.addEventListener('click', (e) => {
        if(e.target.id === 'mode'){
            darkMode ? darkMode = false : darkMode = true;
            if(darkMode){
                const main = document.querySelector('main');
                const body = document.querySelector('body');
                const header = document.querySelector('header');
                const inputSearch = document.querySelector('.input-search');
                const search = document.querySelector('#search');
                const filter = document.querySelector('#filter');
                const dropdown = document.querySelector('.menu');
                const boxCountry = document.querySelectorAll('.box-country');
                const icon = document.querySelectorAll('.icon');
                const btnBack = document.querySelector('.btn-back');
                const border = document.querySelectorAll('.bdc-name');
                
                main.classList.add('dark');
                body.classList.add('dark');
                header.classList.add('dark');
                if(inputSearch) inputSearch.classList.add('dark');
                if(search) search.classList.add('dark');
                if(filter) filter.classList.add('dark');
                if(dropdown) dropdown.classList.add('dark');
                boxCountry.forEach(colorBox => colorBox.classList.add('dark'));
                icon.forEach(colorIcon => colorIcon.classList.add('dark'));
                if(btnBack) btnBack.classList.add('dark');
                if(border) border.forEach( borderColor => borderColor.classList.add('dark'));

            } else{
                const main = document.querySelector('main');
                const body = document.querySelector('body');
                const header = document.querySelector('header');
                const inputSearch = document.querySelector('.input-search');
                const search = document.querySelector('#search');
                const filter = document.querySelector('#filter');
                const dropdown = document.querySelector('.menu');
                const boxCountry = document.querySelectorAll('.box-country');
                const icon = document.querySelectorAll('.icon');
                const btnBack = document.querySelector('.btn-back');
                const border = document.querySelectorAll('.bdc-name');
                
                main.classList.remove('dark');
                body.classList.remove('dark');
                header.classList.remove('dark');
                if(inputSearch) inputSearch.classList.remove('dark');
                if(search) search.classList.remove('dark');
                if(filter) filter.classList.remove('dark');
                if(dropdown) dropdown.classList.remove('dark');
                boxCountry.forEach(colorBox => colorBox.classList.remove('dark'));
                icon.forEach(colorIcon => colorIcon.classList.remove('dark'));
                if(btnBack) btnBack.classList.remove('dark');
                if(border) border.forEach( borderColor => borderColor.classList.remove('dark'));
            };
        };
    });

    main.addEventListener('click', (e) => {


        if(e.target.id === 'search'){
            const form = document.querySelector('.input-search');
            const inputSearch = document.querySelector('#search');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if(allCountriesArray.find(({name}) => name === inputSearch.value.replace(/\b\w/g, l => l.toUpperCase()))){
                    searchCountriesForCca2(allCountriesArray.find(({name}) => name === inputSearch.value.replace(/\b\w/g, l => l.toUpperCase())).alpha3Code);
                };

            });
        };

        if(e.target.classList.contains('open-dropdown')){
            const dropdown = document.querySelector('.dropdown');
            const magnifyingGlass = document.querySelector('#dropdown-menu');

            if(dropdown.classList.contains('open')){
                dropdown.classList.remove('open');
                magnifyingGlass.src = '/assets/dropdownOpen.svg';

            } else{
                dropdown.classList.add('open');
                magnifyingGlass.src = '/assets/dropdownClose.svg';
            };

        };

        if(e.target.className === 'filter-by-region'){
            const btnRegion = document.querySelector(`.filter-by-region#${e.target.id}`);
            const arrFilterRegion = allCountriesArray.filter(({region}) => region === btnRegion.id.replace(/\b\w/g, l => l.toUpperCase()));
            
            
            main.innerHTML = '';
            createCountryDOM(arrFilterRegion);
            
            const nameFilter = document.querySelector('#filterBy');
            nameFilter.innerText = e.target.id.replace(/\b\w/g, l => l.toUpperCase());
        };

        if(e.target.className === 'country-flag') searchCountriesForCca2(e.target.id);

        if(e.target.className === 'btn-back' || e.target.innerText === 'Back' || e.target.id === 'arrow-left'){
            main.innerHTML = '';

            createCountryDOM(allCountriesArray);
        };

        if(e.target.classList.contains('bdc-name') || e.target.classList.contains('bdc-name dark')){
            main.innerHTML = '';
            searchCountriesForCca2(e.target.id);
        };
        
    });

    function createCountryDOM(arr){
        createDOMSearchNFilter();
        const divContentAllContries = document.createElement('div');
        divContentAllContries.setAttribute('id', 'content-all-contries');
        main.appendChild(divContentAllContries);

        arr.forEach(country => {
            const div = document.createElement('div');
            darkMode ? div.classList.add('box-country', 'dark') : div.classList.add('box-country');
            div.innerHTML = `
                <img src="${country.flags.png}" alt="country" class="country-flag" id="${country.alpha3Code}">
                    <div class="content-country">
                        <div class="name">${country.name}</div>
                        <div class="info">
                            <div class="population"><span class="info-title">Population:</span> ${country.population}</div>
                            <div class="region"><span class="info-title">Region:</span> ${country.region}</div>
                            <div class="capital"><span class="info-title">Capital:</span> ${country.capital}</div>
                        </div>
                    </div>
            `;
            divContentAllContries.appendChild(div);
        })
    }

    function createDOMSearchNFilter(){
        const div = document.createElement('div');
        div.classList.add('search-filter');
        if(darkMode){
            div.innerHTML = `
            <form action="#" class="input-search dark">
                <img src="/assets/magnifying-glass.svg" alt="magnifying-glass" id="magnifying-glass" class="icon dark">
                <input type="text" name="search" id="search" class="box dark" placeholder="Search for a country">
            </form>
            <div id="filter-dropdown-menu" class="box dark">
                <div id="filter" class="open-dropdown dark">
                    <span id="filterBy" class="open-dropdown">Filter by Region</span>
                    <img src="/assets/dropdownOpen.svg" alt="Menu" id="dropdown-menu" class="icon open-dropdown dark">
                </div>
                <div class="dropdown">
                    <ul class="menu dark">
                        <li id="africa" class="filter-by-region">Africa</li>
                        <li id="americas" class="filter-by-region">America</li>
                        <li id="asia" class="filter-by-region">Asia</li>
                        <li id="europe" class="filter-by-region">Europe</li>
                        <li id="oceania" class="filter-by-region">Oceania</li>
                    </ul>
                </div>
            </div>
        `;
        } else{
            div.innerHTML = `
            <form action="#" class="input-search">
                <img src="/assets/magnifying-glass.svg" alt="magnifying-glass" id="magnifying-glass" class="icon">
                <input type="text" name="search" id="search" class="box" placeholder="Search for a country">
            </form>
            <div id="filter-dropdown-menu" class="box">
                <div id="filter" class="open-dropdown">
                    <span id="filterBy" class="open-dropdown">Filter by Region</span>
                    <img src="/assets/dropdownOpen.svg" alt="Menu" id="dropdown-menu" class="icon open-dropdown">
                </div>
                <div class="dropdown">
                    <ul class="menu">
                        <li id="africa" class="filter-by-region">Africa</li>
                        <li id="americas" class="filter-by-region">America</li>
                        <li id="asia" class="filter-by-region">Asia</li>
                        <li id="europe" class="filter-by-region">Europe</li>
                        <li id="oceania" class="filter-by-region">Oceania</li>
                    </ul>
                </div>
            </div>
        `;
        }
        main.prepend(div);
    };


    function searchCountriesForCca2(code){
        const countryResult = allCountriesArray.find(({alpha3Code}) => alpha3Code === code);

        let corrunciesString = '';
        countryResult.currencies.forEach( corrience => corrunciesString += corrience.name + ', ');

        let languagesString = '';
        countryResult.languages.forEach( language => languagesString += language.name + ', ');

        const divBtnContainer = document.createElement('div');
        divBtnContainer.classList.add('btn-container');
        if(darkMode){
            divBtnContainer.innerHTML = `
            <button class="btn-back dark">
                <img src="/assets/arrow-left.svg" alt="back" id="arrow-left" class="icon dark"> 
                <span>Back</span>
            </button>
        `;
        } else{
            divBtnContainer.innerHTML = `
            <button class="btn-back">
                <img src="/assets/arrow-left.svg" alt="back" id="arrow-left" class="icon"> 
                <span>Back</span>
            </button>
        `;
        }

        main.innerHTML = '';
        main.appendChild(divBtnContainer);
        
        const divCountryCompleteInfo = document.createElement('div');
        divCountryCompleteInfo.classList.add('country-complete-info');
        divCountryCompleteInfo.innerHTML = `
            <div class="flag-container"><img src="${countryResult.flags.png}" alt="country" class="flag-cci"></div>
            <div class="content-cci">
                <div class="name-cci">${countryResult.name}</div>
                <div class="info-cci">
                    <div class="native-name-cci"><span class="info-title">Native Name:</span> ${countryResult.nativeName}</div>
                    <div class="population-cci"><span class="info-title">Population:</span> ${countryResult.population}</div>
                    <div class="region-cci"><span class="info-title">Region:</span> ${countryResult.region}</div>
                    <div class="seb-region-cci"><span class="info-title">Sub Region:</span> ${countryResult.subregion}</div>
                    <div class="capital-cci"><span class="info-title">Capital:</span> ${countryResult.subregion}</div>
                    <div class="top-level-domain"><span class="info-title">Top Level Domain:</span> ${countryResult.capital}</div>
                    <div class="currencies-cci"><span class="info-title">Currencies:</span> ${corrunciesString}</div>
                    <div class="languages"><span class="info-title">Languages:</span> ${languagesString}</div>
                </div>
                <div class="bd-countries">
                    <span id="bdc-title" class="info-title">Border Countries:</span>
                    <div class="bdc-container"></div>
                </div>
            </div>
        `;

        main.appendChild(divCountryCompleteInfo);

        const bdcContainer = document.querySelector('.bdc-container');
        if(countryResult.borders){
            countryResult.borders.forEach( border => {
                const div = document.createElement('div');
                darkMode ? div.classList.add('bdc-name', 'dark') : div.classList.add('bdc-name');
                div.setAttribute('id', allCountriesArray.find(({alpha3Code}) => alpha3Code === border).alpha3Code)
                div.innerText = allCountriesArray.find(({alpha3Code}) => alpha3Code === border).name;
                bdcContainer.appendChild(div);
            });
        } else{
            const div = document.createElement('div');
            div.innerText = 'None';
            bdcContainer.appendChild(div);

        };
    };
    
};
