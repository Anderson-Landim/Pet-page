/* ===============================
   BASE DE DADOS - PETS
================================ */

const pets = [
    { id: 4, name: 'Thor', specie: 'Cachorro', breed: 'Pastor Alemão', age: 'Adulto', desc: 'Protetor e inteligente', img: 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=800&q=60' },
    { id: 10, name: 'Tom', specie: 'Gato', breed: 'Europeu', age: 'Adulto', desc: 'Adora brincar', img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=60' },
    { id: 11, name: 'Laika', specie: 'Cachorro', breed: 'Husky', age: 'Adulto', desc: 'Ativa e divertida', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=60' },
    { id: 14, name: 'Lola', specie: 'Gato', breed: 'Sphynx', age: 'Adulto', desc: 'Muito sociável', img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=60' }
];

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

/* ===============================
   ELEMENTOS
================================ */

const listaPets = document.getElementById("listaPets");
const listaFavoritos = document.getElementById("listaFavoritos");
const totalPets = document.getElementById("totalPets");

const toggleTheme = document.getElementById("toggleTheme");

/* ===============================
   TEMA
================================ */

function aplicarTemaInicial() {
    const tema = localStorage.getItem("tema");
    if (tema === "dark") document.body.classList.add("dark");
}

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});

/* ===============================
   CARDS
================================ */

function cardPet(pet) {
    const fav = favoritos.includes(pet.id);
    return `
        <article class="pet-card">
            <img src="${pet.img}">
            <div class="body">
                <h4>${pet.name}</h4>
                <p>${pet.desc}<br><small>${pet.breed} • ${pet.age}</small></p>

                <button class="btn-primary" onclick="abrirAdocao(${pet.id})">
                    Solicitar adoção
                </button>

                <button class="fav-btn" onclick="toggleFavorito(${pet.id})">
                    ${fav ? "Remover dos favoritos" : "Favoritar"}
                </button>
            </div>
        </article>
    `;
}

/* ===============================
   RENDERIZAÇÃO
================================ */

function renderizarPets(lista = pets) {
    listaPets.innerHTML = lista.map(cardPet).join("");
}

function renderizarFavoritos() {
    if (!favoritos.length) {
        listaFavoritos.innerHTML = `<p class="muted">Nenhum pet favorito ainda.</p>`;
        return;
    }

    const favPets = pets.filter(p => favoritos.includes(p.id));
    listaFavoritos.innerHTML = favPets.map(cardPet).join("");
}

function render() {
    renderizarPets();
    renderizarFavoritos();
    totalPets.textContent = pets.length;
}

/* ===============================
   FILTROS
================================ */

function filtrar() {
    const q = document.getElementById("q").value.toLowerCase();
    const tipo = document.getElementById("filtroTipo").value;
    const idade = document.getElementById("filtroIdade").value;

    let lista = pets.filter(p =>
        (p.name + p.desc + p.breed).toLowerCase().includes(q)
    );

    if (tipo) lista = lista.filter(p => p.specie === tipo);
    if (idade) lista = lista.filter(p => p.age === idade);

    renderizarPets(lista);
}

/* ===============================
   FAVORITOS
================================ */

function toggleFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(f => f !== id);
    } else {
        favoritos.push(id);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    render();
}

/* ===============================
   ABRIR OS 3 MODAIS SEPARADOS
================================ */

function openModal(id) {
    document.getElementById(id).classList.add("open");
}

function closeModal(id) {
    document.getElementById(id).classList.remove("open");
}

/* ===============================
   ADOÇÃO — preenche automaticamente
================================ */

function abrirAdocao(id) {
    const pet = pets.find(p => p.id === id);
    const form = document.getElementById("formAdocao");

    form.mensagem.value = `Tenho interesse em adotar ${pet.name}.`;
    openModal("modalAdocao");
}

/* ===============================
   FORMULÁRIOS
================================ */

document.getElementById("formAdocao").addEventListener("submit", e => {
    e.preventDefault();
    closeModal("modalAdocao");
    alert("Solicitação enviada com sucesso!");
});

document.getElementById("formCadastro").addEventListener("submit", e => {
    e.preventDefault();
    closeModal("modalCadastro");
    alert("Pet cadastrado (exemplo).");
});

document.getElementById("formContato").addEventListener("submit", e => {
    e.preventDefault();
    closeModal("modalContato");
    alert("Mensagem enviada!");
});

/* ===============================
   START
================================ */

aplicarTemaInicial();
render();

/* EXPOSE */
window.filtrar = filtrar;
window.abrirAdocao = abrirAdocao;
window.toggleFavorito = toggleFavorito;
window.openModal = openModal;
window.closeModal = closeModal;
