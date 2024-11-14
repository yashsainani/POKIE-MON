const pokeSection = document.querySelector('.poke-section');
const type = document.getElementById('type');
const searchInput = document.getElementById('search-input');
const search = document.getElementById('search');
const reset = document.getElementById('reset');
let allPoke = [];
let filtered = [];
const bgColor = {
    grass: "#02B816ef",
    fire: "#DC3307ef",
    water: "#4143BDef",
    bug: "#61A513ef",
    normal: "#D994C2ef",
    poison: "#84066Def",
    electric: "#e7c325ef",
    ground: "#DA8507ef",
    fairy: "#E164CAef",
    fighting: "#A22813ef",
    psychic: "#C03897ef",
    ice: "#5EE7D0ef",
    rock: "#BEB1B6ef",
    ghost: "#9498ABef",
    dragon: "#AF120Bef",
    dark: "#31372Bef"
};

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
        let extraDiv = document.createElement('div');
        extraDiv.classList.add('extra-div');
        let pDiv = document.createElement('div');
        pDiv.classList.add('poke-card');
        pDiv.style.backgroundColor = bgColor[obj.types[0].type.name];
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
                <div class="info-div" style="background-color: ${bgColor[obj.types[0].type.name]}">
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
            document.body.classList.add('active');
        });
        extraDiv.append(pDiv);
        pokeSection.append(extraDiv);
    });
}

document.addEventListener('click', (eve) => {
    if (eve.target.classList.contains('close')) {
        eve.target.closest('.info-div').remove();
        document.body.classList.remove('active');
    }
});

search.addEventListener('click', () => {
    if (type.value === 'select') {
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