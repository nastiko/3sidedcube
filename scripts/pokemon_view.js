// init "Pokedex" javascript library for "pokeapi.co" API
const PokedexApi = new Pokedex.Pokedex();


$(document).ready(async function () {
    let params = new window.URLSearchParams(window.location.search);
    let pokemonId = params.get('id');

    let pokemon = await PokedexApi.getPokemonByName(pokemonId);
    console.log(pokemon);


    for (let type of pokemon.types) {
        let typeData = '<span class="highlight-power">' + type.type.name + '</span>';
        $("td.pokemon-type").append(typeData);
    }

    for (let ability of pokemon.abilities) {
        let abilityName = '<td class="info-point inside-border">'+ ability.ability.name +'</td>';
        $("td.pokemon-ability").append(abilityName);
    }

    for (let items of pokemon.held_items) {
        let heldItems = '<td class="info-point inside-border">'+ items.item.name +'</td>';
        $("td.pokemon-held_items").append(heldItems);
    }

    $("img.pokemon-img").attr("src", pokemon.sprites.front_default);
    $(".name-pokemon").text(pokemon.name);
    $(".height-pokemon").text(pokemon.height);
    $(".weight-pokemon").text(pokemon.weight);
    $(".base-experience-pokemon").text(pokemon.base_experience);
});
