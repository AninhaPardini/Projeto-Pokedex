const pokemonsElement = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

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

// faça um search que leia todos os pokemons do pokeAPI.getpokemons e filtre os pokemons que contem o nome ou número digitado no input

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
limit = 151;

searchButton.addEventListener('click', async (offset, limit) => {
    const search = searchInput.value.toLowerCase();

    const pokemons = await pokeApi.getSearchPokemons(search);
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
    pokemonsElement.innerHTML = newHtml
    
    const removeLoadMoreButton = document.getElementById('loadMoreButton');
    removeLoadMoreButton.classList.add('hidden');
});






