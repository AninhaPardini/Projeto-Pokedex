const pokemonsElement = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonElement = document.querySelectorAll('.pokemon');

const maxRecords = 151
let offset = 0;
let limit = 10;


function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
                <a href="#" class="pokemon-enveloper">
                    <li class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
        
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
            
                            <img src="${pokemon.image}"
                                alt="${pokemon.name}">
                        </div>
                    </li>
                </a>
            `
        ).join('')
        pokemonsElement.innerHTML += newHtml;
    })
}

loadPokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemons(offset, limit);
    if (offset + limit >= maxRecords) {
        loadMoreButton.classList.add('hidden');
    }
})


const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
limit = 151;

const debounce = (callback, wait) => { // função para esperar um tempo antes de executar a função
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

searchInput.addEventListener('keyup', debounce(async (offset, limit) => {
    const search = searchInput.value.toLowerCase();
    console.log('change', searchInput.value);
    const pokemonsAll = await pokeApi.getSearchPokemons(search);
    const newHtml = pokemonsAll.map((pokemon) =>
        `
            <a href="#" class="pokemon-enveloper">
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
        
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
            
                        <img src="${pokemon.image}"
                            alt="${pokemon.name}">
                    </div>
                </li>
            </a>
        `
    ).join('')
    pokemonsElement.innerHTML = newHtml;

    const removeLoadMoreButton = document.getElementById('loadMoreButton');
    removeLoadMoreButton.classList.add('hidden');
}, 100));


setTimeout(() => {
    const modal = document.querySelector('.modal-pokemon');
    const modalContent = document.querySelector('.modal-content');
    const modalClose = document.getElementById('close-modal');
    const pokemonAncora = document.querySelectorAll('.pokemon-enveloper');
    console.log('aaaaa', pokemonAncora);


    pokemonAncora.forEach(async (pokemon) => {
        pokemon.addEventListener('click', async (e) => {
            e.preventDefault();
            const pokemon = e.target.closest('.pokemon-enveloper');
            console.log('pokemon', pokemon);

            if (pokemon) {
                const pokemonName = pokemon.querySelector('.name').textContent;
                const pokemonsAll = await pokeApi.getSearchPokemons(pokemonName);
                console.log('pokemonsAll', pokemonsAll);

                let modalHtml = ``

                pokemonsAll.forEach((pokemon) => {
                    modalHtml += `
                        <div class= "modal-container" >
                            <button type="button" class="close-modal" id="close-modal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right" style="transform: rotate(90deg);">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>

                            <img src="${pokemon.image}" alt="${pokemon.name}">
                        
                            <div class="modal-content">

                                <section class="modal-header">
                                    <h1 class="modal-header-number ">#${pokemon.number}</h1>
                                    <h1 class="modal-header-name">${pokemon.name}</h1>
                                    <div class="modal-header-types">
                                        ${pokemon.types.map((type) => `<li class="modal-header-type ${type}">${type}</li>`).join('')}

                                    </div>
                                </section>
                                <div class="modal-description">
                                    <p>O Pokémon Semente, é a escolha perfeita para treinadores iniciantes. Ele é do tipo Planta e Veneno, possui uma semente nas costas que cresce à medida que evolui.</p>
                                </div>

                                <section class="modal-details">
                                    <nav class="modal-menu">
                                        <button type="button" class="modal-menu-button" id="active">Status Base</button>
                                        <button type="button" class="modal-menu-button" id="desative">Evoluções</button>
                                    </nav>
                                    <section class="modal-stats">
                                        <div class="modal-stats-items">
                                            <div class="stats-item">
                                                <p>HP</p>
                                                <p class="hp-value">000</p>
                                            </div>
                                            <div class="modal-stats-item-bar">
                                                <div class="modal-stats-item-bar-fill">

                                                </div>
                                            </div>

                                        </div>
                                        <div class="modal-stats-items">
                                            <div class="stats-item">
                                                <p>ATK</p>
                                                <p class="atk-value">000</p>
                                            </div>
                                            <div class="modal-stats-item-bar">
                                                <div class="modal-stats-item-bar-fill">

                                                </div>
                                            </div>

                                        </div>
                                        <div class="modal-stats-items">
                                            <div class="stats-item">
                                                <p>DEF</p>
                                                <p class="def-value">000</p>
                                            </div>
                                            <div class="modal-stats-item-bar">
                                                <div class="modal-stats-item-bar-fill">

                                                </div>
                                            </div>

                                        </div>
                                        <div class="modal-stats-items">
                                            <div class="stats-item">
                                                <p>STATK</p>
                                                <p class="statk-value">000</p>
                                            </div>
                                            <div class="modal-stats-item-bar">
                                                <div class="modal-stats-item-bar-fill">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-stats-items">
                                            <div class="stats-item">
                                                <p>SDEF</p>
                                                <p class="sdef-value">000</p>
                                            </div>
                                            <div class="modal-stats-item-bar">
                                                <div class="modal-stats-item-bar-fill">

                                                </div>
                                            </div>

                                        </div>
                                        <div class="modal-stats-items">
                                            <div class="stats-item">
                                                <p>SPO</p>
                                                <p class="spo-value">000</p>
                                            </div>
                                            <div class="modal-stats-item-bar">
                                                <div class="modal-stats-item-bar-fill">

                                                </div>
                                            </div>

                                        </div>

                                    </section>
                                    <section class="modal-evolutions">

                                    </section>
                                </section>
                            </div>
                        </div>
                    `;

                    modal.classList.add(`${pokemon.type}`);
                });

                modal.innerHTML = modalHtml;

                modal.style.display = 'block';
                modal.style.animation = 'bottonToTop 1s forwards';

            }



        }
        );
    });

    modalClose.addEventListener('click', () => {
        modal.style.animation = 'topToBotton 1s forwards';
        timeoutId = window.setTimeout(() => {
            modal.style.display = 'none';
        }, 1000);

    }
    );


}, 1000);







