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
            `
        ).join('')
        pokemonsElement.innerHTML += newHtml
    })
}

loadPokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemons(offset, limit)
    if (offset + limit >= maxRecords) {
        loadMoreButton.classList.add('hidden')
    }
})

// faça um search que le todos os pokemons e retorna os que correspodem ao search

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
            `
    ).join('')
    pokemonsElement.innerHTML = newHtml

    const removeLoadMoreButton = document.getElementById('loadMoreButton');
    removeLoadMoreButton.classList.add('hidden');
}, 100));

// função que abre o modal quando clico no pokemon

const modal = document.querySelector('.modal-pokemon');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.getElementById('modal-close');

pokemonsElement.addEventListener('click', (event) => {
    const pokemon = event.target.closest('.pokemon');
    if (pokemon) {
        console.log('pokemon:', pokemon);
        modal.style.display = 'block';
        modal.style.animation = 'bottonToTop 2s forwards';
        modalContent.style.height = 'bottonToTop 2s forwards';

    }
}
);

/* 
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
}
); */




