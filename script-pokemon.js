const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound());
}

const renderPokemonData = data => {
    const sprite =  data.sprites.other.home.front_default;
    const { stats, types, moves } = data;

    document.getElementById('show-pokemon').removeAttribute('style');
    document.getElementById('input-pokemon').style.display="none";
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-image').setAttribute('src', sprite);

    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonMoves(moves);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    document.getElementById('pokemon-image').style.backgroundColor=`${colorOne}`;
}

const renderPokemonTypes = types => {
    document.getElementById('pokemon-type').innerHTML = '';
    const typeLabelElement = document.createElement("span");
    typeLabelElement.classList.add("pokemon-types");
    typeLabelElement.textContent = 'TYPE(S): ';
    typeLabelElement.classList.add("pokemon-font");
    typeLabelElement.classList.add("pokemon-header");
    document.getElementById('pokemon-type').appendChild(typeLabelElement);
    console.log('TYPEs -> ', types);
    types.forEach(type => {
        const typeTextElement = document.createElement("span");
        typeTextElement.classList.add("badge");
        typeTextElement.classList.add("rounded-pill");
        typeTextElement.classList.add("pokemon-types");
        typeTextElement.style.backgroundColor = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name.toUpperCase();
        document.getElementById('pokemon-type').appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    document.getElementById('pokemon-hp').textContent = stats[0].base_stat;
    document.getElementById('pokemon-attack').textContent = stats[1].base_stat;
    document.getElementById('pokemon-defense').textContent = stats[2].base_stat;
    document.getElementById('pokemon-sp-attack').textContent = stats[3].base_stat;
    document.getElementById('pokemon-sp-defense').textContent = stats[4].base_stat;
    document.getElementById('pokemon-speed').textContent = stats[5].base_stat;
}

const renderPokemonMoves = moves => {
    document.getElementById('pokemon-mov1-name').textContent = moves[0].move.name.toUpperCase();
    document.getElementById('pokemon-mov2-name').textContent = moves[1].move.name.toUpperCase();
    document.getElementById('pokemon-mov3-name').textContent = moves[2].move.name.toUpperCase();
    document.getElementById('pokemon-mov4-name').textContent = moves[3].move.name.toUpperCase();
    document.getElementById('pokemon-mov5-name').textContent = moves[4].move.name.toUpperCase();
    document.getElementById('pokemon-mov6-name').textContent = moves[5].move.name.toUpperCase();
}

const renderNotFound = () => {
    swal('Oops!', 'Pokemon Not Found', 'error');
}

const cleanPokemon = event => {
    event.preventDefault();
    document.getElementById('show-pokemon').style.display="none";
    document.getElementById('input-pokemon').removeAttribute('style');
    document.getElementById('poke-input-name').value = '';
}