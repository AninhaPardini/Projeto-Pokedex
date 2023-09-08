const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat) // o map retorna um array com os valores de base_stat
    const [hp, attack, defense, specialAttack, specialDefense, speed] = stats // o destructuring atribui os valores do array a cada variável

    pokemon.stats = stats // o array de stats é atribuído à propriedade stats do pokemon
    pokemon.hp = hp
    pokemon.attack = attack
    pokemon.defense = defense
    pokemon.specialAttack = specialAttack
    pokemon.specialDefense = specialDefense
    pokemon.speed = speed

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getSearchPokemons = async (search) => {
    const pokemons = await pokeApi.getPokemons(0, 151)
    const matchingPokemons = pokemons.filter((pokemon) => {
        const pokemonName = pokemon.name.toLowerCase()
        return pokemonName.includes(search)
    })
    return matchingPokemons
}

pokeApi.getPokemonDetail = async (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}