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

searchButton.addEventListener('click', async () => {
    const search = searchInput.value.toLowerCase();

    const pokemonsAll = await pokeApi.getPokemons(limit = 151).then((pokemons = []) => {
        return pokemons;
    });
    // Filtrar os pokemons que correspondem à pesquisa
    const matchingPokemons = pokemonsAll.filter(pokemon => {
        const pokemonName = pokemon.name.toLowerCase();
        return pokemonName.includes(search);
    });

    // Exibir os pokemons correspondentes na sua interface
    const pokemons = document.querySelectorAll('.pokemon');
    pokemons.forEach(pokemon => {
        const pokemonName = pokemon.querySelector('.name').textContent.toLowerCase();
        const pokemonNumber = pokemon.querySelector('.number').textContent.toLowerCase();
        if (matchingPokemons.some(matchingPokemon => matchingPokemon.name === pokemonName) || pokemonNumber.includes(search)) {
            pokemon.classList.remove('hidden');
        } else {
            pokemon.classList.add('hidden');
        }
    });
});






