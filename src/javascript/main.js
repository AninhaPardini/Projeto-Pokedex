const pokemonsElement = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonElement = document.querySelectorAll('.pokemon');
const modal = document.querySelector('.modal');


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
    const pokemonAncora = document.querySelectorAll('.pokemon-enveloper');
    console.log('aaaaa', pokemonAncora);

    pokemonAncora.forEach(async (pokemon) => {
        pokemon.addEventListener('click', async (e) => {
            e.preventDefault();
            const pokemon = e.target.closest('.pokemon-enveloper');

            if (pokemon) {
                const pokemonName = pokemon.querySelector('.name').textContent;
                const pokemonsAll = await pokeApi.getSearchPokemons(pokemonName);

                let modalHtml = ``

                pokemonsAll.forEach((pokemon) => {
                    modalHtml += `

                        <section class="modal-pokemon">
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
                                    <!-- <div class="modal-description">
                                        <p>O Pokémon Semente, é a escolha perfeita para treinadores iniciantes. Ele é do tipo Planta e Veneno, possui uma semente nas costas que cresce à medida que evolui.</p>
                                    </div> -->

                                    <section class="modal-details">
                                        <nav class="modal-menu">
                                            <button type="button" class="modal-menu-button active fire" id="stats">Status Base</button>
                                            <button type="button" class="modal-menu-button" id="evolutions">Evoluções</button>
                                        </nav>
                                        <section class="modal-stats">
                                            <div class="modal-stats-items">
                                                <div class="stats-item">
                                                    <h4>HP</h4>
                                                    <p class="hp-value">${pokemon.hp}</p>
                                                </div>
                                                

                                            </div>
                                            <div class="modal-stats-items">
                                                <div class="stats-item">
                                                    <h4>ATK</h4>
                                                    <p class="atk-value">${pokemon.attack}</p>
                                                </div>
                                                

                                            </div>
                                            <div class="modal-stats-items">
                                                <div class="stats-item">
                                                    <h4>DEF</h4>
                                                    <p class="def-value">${pokemon.defense}</p>
                                                </div>
                                                

                                            </div>
                                            <div class="modal-stats-items">
                                                <div class="stats-item">
                                                    <h4>STATK</h4>
                                                    <p class="statk-value">${pokemon.specialAttack}</p>
                                                </div>
                                                
                                            </div>
                                            <div class="modal-stats-items">
                                                <div class="stats-item">
                                                    <h4>SDEF</h4>
                                                    <p class="sdef-value">${pokemon.specialDefense}</p>
                                                </div>
                                                

                                            </div>
                                            <div class="modal-stats-items">
                                                <div class="stats-item">
                                                    <h4>SPO</h4>
                                                    <p class="spo-value">${pokemon.speed}</p>
                                                </div>
                                                

                                            </div>

                                        </section>
                                        <section class="modal-evolutions">
                                            <p>Esse conteúdo está em construção</p>
                                        </section>
                                    </section>
                                </div>
                            </div>
                        </section> 
                        
                    `;

                });

                modal.innerHTML = modalHtml;
                const modalPokemon = document.querySelector('.modal-pokemon');

                const pokemonType = pokemon.querySelector('.pokemon').classList[1];
                modalPokemon.classList.add(`${pokemonType}`);

                modalPokemon.style.display = 'block';
                modalPokemon.style.animation = 'bottonToTop 1s forwards';

                function closeModal() {
                    modalPokemon.style.animation = 'topToBotton 1s forwards';
                    timeoutId = window.setTimeout(() => {
                        modalPokemon.style.display = 'none';
                    }, 1000);

                }

                const modalClose = document.getElementById('close-modal');
                console.log(modalClose)
                modalClose.addEventListener('click', closeModal);

                function toggleElements(activeElementId, deactivateElementId) {
                    const activeElement = document.querySelector(activeElementId);
                    const deactivateElement = document.querySelector(deactivateElementId);

                    if (activeElement && deactivateElement) {
                        activeElement.style.display = 'flex';
                        deactivateElement.style.display = 'none';

                    }
                }

                function toggleButtons(activeButtonId, deactivateButtonId) {
                    const activeButton = document.getElementById(activeButtonId);
                    const deactivateButton = document.getElementById(deactivateButtonId);

                    if (activeButton && deactivateButton) {
                        activeButton.classList.add('active');
                        deactivateButton.classList.remove('active');

                    }
                }

                // Adicionar manipuladores de eventos aos botões
                document.getElementById('stats').addEventListener('click', function () {
                    toggleButtons('stats', 'evolutions');
                    toggleElements('.modal-stats', '.modal-evolutions');
                });

                document.getElementById('evolutions').addEventListener('click', function () {
                    toggleButtons('evolutions', 'stats');
                    toggleElements('.modal-evolutions', '.modal-stats');
                });

            }

        }
        );
    });

}, 1000);




