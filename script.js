const pokeSection = document.querySelector('.poke-section');
const type = document.getElementById('type');
const searchInput = document.getElementById('search-input');
const search = document.getElementById('search');
const reset = document.getElementById('reset');
let allPoke = [];
let filtered = [];

async function showAll() {
    for (let i = 1; i < 151; i ++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokeData = await res.json();
        allPoke.push(pokeData);
    }
    showFiltered(allPoke);
    console.log(allPoke[0]);
}

window.addEventListener('load', showAll);

function showFiltered(arr) {
    pokeSection.innerHTML = '';
    arr.forEach(obj => {
        let pDiv = document.createElement('div');
        pDiv.style.position = 'relative';
        let fDiv = `
            <div class="front-part">
                <h3 id="id">#${obj.id}</h3>
                <img src="${obj.sprites.front_shiny}" alt="${obj.name}"></img>
                <p>${obj.name}</p>
                <p>${obj.types[0].type.name}</p>
            </div>
        `;
        let bDiv = `
            <div class="back-part">
                <h3 id="id">#${obj.id}</h3>
                <img src="${obj.sprites.back_shiny}" alt="${obj.name}"></img>
                <p>${obj.name}</p>
                <p>${obj.abilities[0].ability.name}</p>
            </div>
        `;
        pDiv.innerHTML += fDiv;
        pDiv.innerHTML += bDiv;
        pDiv.addEventListener('click', () => {
            let infoDiv = `
                <div class="info-div">
                    <h3 id="id">#${obj.id}</h3>
                    <img src="${obj.sprites.front_shiny}" alt="${obj.name}"></img>
                    <div class="pokie-info">
                        <p><strong>BASE EXPERIENCE : </strong>${obj.base_experience}</p>
                        <p><strong>HEIGHT : </strong>${obj.height}</p>
                        <p><strong>WEIGHT : </strong>${obj.weight}</p>
                        <button type="button" class="close">X</button>
                    </div>
                </div>
            `;
            let div = document.createElement('div');
            div.innerHTML = infoDiv;
            document.body.append(div);
        });
        pokeSection.append(pDiv);
    });
}

document.addEventListener('click', (eve) => {
    if (eve.target.classList.contains('close')) {
        eve.target.closest('.info-div').remove();
    }
});

search.addEventListener('click', () => {
    if (type.value === 'Select a type') {
        alert("Choose some type");
        return;
    }
    filtered = allPoke.filter(obj => obj.types[0].type.name === type.value);
    type.value = 'select';
    showFiltered(filtered);
});

searchInput.addEventListener('input', () => {
    filtered = allPoke.filter(obj => obj.name.includes(searchInput.value));
    showFiltered(filtered);
});

reset.addEventListener('click', showAll);