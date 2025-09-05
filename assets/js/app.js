const racasData = {
  "Planta": [
    { id: 300239, texto: "Maya Silent 50% dmg → escudo" },
    { id: 300556, texto: "Spiding 17% dmg → bota" }
  ],
  "Bruto": [
    { id: 300239, texto: "Maya Silent 50% dmg → escudo" },
    { id: 300295, texto: "General Orc 17% dmg → bota" }
  ],
  "Anjo e Humanoide": [
    { id: 4441, texto: "Bispo decadente 50% dmg → bota" },
    { id: 4539, texto: "Bispo decadente selada 35% dmg → bota" }
  ],
  "Peixe e Inseto": [
    { id: 300281, texto: "R001-Bestia 50% dmg → bota" }
  ],
  "Morto-Vivo e Dragão": [
    { id: 300262, texto: "The One 50% dmg → bota" }
  ],
  "Amorfo e Demônio": [
    { id: 300248, texto: "Death Witch 50% dmg → bota" }
  ]
};

const elementosData = {
  "Vento": [
    { id: 27362, texto: "Contaminated Spider Queen 100% dmg → capa" },
    { id: 300211, texto: "Ash Toad 35% dmg → acessório" }
  ],
  "Terra": [
    { id: 27344, texto: "Witch Zilant 100% dmg → capa" },
    { id: 300216, texto: "Lava Toad 35% dmg → acessório" }
  ],
  "Fogo": [
    { id: 27362, texto: "Contaminated Spider Queen 100% dmg → capa" },
    { id: 300364, texto: "Calmaring 35% dmg → acessório" }
  ],
  "Água": [
    { id: 4576, texto: "Gioia 100% dmg → capa" },
    { id: 300222, texto: "Firewind 35% dmg → acessório" }
  ],
  "Veneno": [
    { id: 27362, texto: "Contaminated Spider Queen 100% dmg → capa" },
    { id: 300211, texto: "Ash Toad 35% dmg → acessório" },
    { id: 27344, texto: "Witch Zilant 100% dmg → capa" },
    { id: 300216, texto: "Lava Toad 35% dmg → acessório" },
    { id: 300364, texto: "Calmaring 35% dmg → acessório" },
    { id: 4576, texto: "Gioia 100% dmg → capa" },
    { id: 115, texto: "Firewind 35% dmg → acessório" }
  ],
  "Maldito": [
    { id: 27362, texto: "Contaminated Spider Queen 100% dmg → capa" },
    { id: 300364, texto: "Calmaring 35% dmg → acessório" }
  ]
};

let racaSelecionada = null;
let elementoSelecionado = null;

document.querySelectorAll("#racas button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#racas button").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    racaSelecionada = button.dataset.raca;
    mostrarCartas();
  });
});

document.querySelectorAll("#elementos button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#elementos button").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    elementoSelecionado = button.dataset.elemento;
    mostrarCartas();
  });
});

function formatarCarta(carta) {
  const regex = /(.*?)(\d+% dmg) → (escudo|bota|capa|acessório)/i;
  const match = carta.texto.match(regex);

  if (!match) return `<li>${carta.texto}</li>`;

  const nome = match[1].trim();
  const dano = match[2].trim();
  const equipamento = match[3].trim().toLowerCase();
  const id = carta.id;
  const link = `https://historyreborn.net/?module=item&action=view&id=${id}`;

  return `
    <li>
      <a href="${link}" target="_blank" class="tag id">#${id}</a>
      <span class="nome">${nome}</span>
      <span class="tag dano">${dano}</span>
      <span class="tag ${equipamento}">${equipamento}</span>
    </li>
  `;
}

function mostrarCartas() {
  const cartasDiv = document.getElementById("cartas");
  const boasVindas = document.getElementById("boasvindas");

  if (boasVindas && !boasVindas.classList.contains("hidden")) {
    boasVindas.classList.add("hidden");
  }

  cartasDiv.innerHTML = "";

  if (racaSelecionada) {
    const cartasRaca = racasData[racaSelecionada] || [];
    cartasDiv.innerHTML += `
      <h3>Cartas contra Raça: ${racaSelecionada}</h3>
      <ul>${cartasRaca.map(formatarCarta).join("")}</ul>
    `;
  }

  if (elementoSelecionado) {
    const cartasElemento = elementosData[elementoSelecionado] || [];
    cartasDiv.innerHTML += `
      <h3>Cartas contra Elemento: ${elementoSelecionado}</h3>
      <ul>${cartasElemento.map(formatarCarta).join("")}</ul>
    `;
  }
}
