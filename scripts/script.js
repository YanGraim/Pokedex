async function searchPokemon() {
    const input = document.getElementById("id-pokemon").value;
    const pokemon = await getPokemonById(input);
    const response = {
        name: getName(pokemon),
        img: getImage(pokemon),
        types: getTypes(pokemon)
    }

    pokemon ? console.log(response) : console.log(`this pokemon ${input} dont exist.`);

    printPokemons(response);
}

async function getPokemonById(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = null;

    await fetch(url)
        .then((response) => response.json())
        .then((data) => response = data)
        .catch((error) => {
            console.log(error);
        })
    return response;
}

function getName(pokemon) {
    return pokemon.forms[0].name;
}

function getImage(pokemon) {
    return pokemon.sprites.front_default;
}

function getTypes(pokemon) {
    let types = [];


    pokemon.types.forEach((type) => {
        types.push(type.type.name)
    });;
    return types;
}

function printPokemons(pokemon) {
    let typesHtml = '';
    pokemon.types.forEach((type) => {
        typesHtml += `<div class="type ${type}">${type}</div>`
    });
    const html = `
        <div id="img-pokemon">
            <img src="${pokemon.img}"
            alt="So por enquanto">
        </div>
        <div id="about-pokemon">
            <div id="name">${pokemon.name}</div>
            <div id="types">
                ${typesHtml}
            </div>
        </div>        
    `;

    const modal = document.getElementById("modal");
    modal.style.display = 'flex';

    modal.innerHTML = html;
}