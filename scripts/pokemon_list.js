// init "Pokedex" javascript library for "pokeapi.co" API
const P = new Pokedex.Pokedex();
// init starting page number
let current_page = 1;

// generate template for list item given id, name and image url
function getTemplateListItem(id, name, img) {
    return '<li data-id="' + id + '">\n' +
        '        <div class="block-pokemon">\n' +
        '            <input class="checkbox-style" id="' + id + '" value="' + id + '" type="checkbox" name="ckeckbox">\n' +
        '            <div class="card-block">\n' +
        '                <div class="blue-block">\n' +
        '                    <div class="img-position">\n' +
        '                        <a href="pokemon_page.html?id=' + id + '">\n' +
        '                            <img class="pokemon-img"\n' +
        '                                 src="' + img + '"\n' +
        '                                 alt="' + name + '">\n' +
        '                            <button class="button-style">' + name + '</button>\n' +
        '                        </a>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </li>';
}

// load pokemon image gy pokemon id
async function getImageByPokemonId(pokemonId) {
    // force await till data loaded from remote API
    let pokemon = await P.getPokemonByName(pokemonId);
    return pokemon.sprites.front_default;
}

$(document).ready(function () {
    // init pagination - starting item offset, limit of items per page
    const pagination = {
        offset: 18 * (current_page - 1),
        limit: 18,
    }

    // after we get all pokemon list, walk through all items (pokemons) and add them to the page as HTML code
    P.getPokemonsList(pagination).then(async function (response) {
        // given "response" is an object - then items should be stored in "results" object property as an array
        let items = response.results;
        // find container for pokemon list
        let container = $('#pokemon_list');
        //
        container.addClass('blurred');

        // loop through all items to generate template and paste it to the page
        for (let pokemon of items) {
            let pokemonId = pokemon.url.split('/')[6];
            let imageSrc = await getImageByPokemonId(pokemonId);
            let template = getTemplateListItem(pokemonId, pokemon.name, imageSrc);
            container.append(template);
        }

        //
        container.removeClass('blurred');
    });
});
