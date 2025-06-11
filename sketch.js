// Ajuano a cidade a crescer
// O profeto é sobre um peronagem que ajuda a cidade a crescer colhendo suas frutas para que os predios sejam criados por su amiga Nara e dois vão festejar a uniar entre campo e cidade.

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let cena = "campo";
let frutas = [];
let frutasColetadas = 0;
let cidadeNivel = 0;
let maxFrutas = 5;

function setup() {
  createCanvas(700, 400);
  gerarFrutas();//  criar a frutas para ajudar a cidade
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);

  if (cena === "campo") {
    mostrarCampo(); // voltar para o senario o campo
  } else if (cena === "cidade") {
    mostrarCidade();
  } else if (cena === "festa") {
    mostrarFesta();
  }
}

// Mostrar o campo com Juca colhendo frutas
function mostrarCampo() {
  background(135, 206, 235);
  fill(34, 139, 34);
  rect(0, 300, width, 100);

  fill(0);
  textSize(24);// tamanho que vai ficar o texto
  text("Ajude Juca a colher frutas! (clique nas frutas)", width / 2, 30);

  for (let fruta of frutas) {
    if (!fruta.coletada) {
      fill(255, 0, 0);
      ellipse(fruta.x, fruta.y, 20);//  criar as frutas
    }
  }

  fill(0);
  textSize(18);
  text(`Frutas coletadas: ${frutasColetadas}/${maxFrutas}`, width / 2, 60);

  if (frutasColetadas >= maxFrutas) {
    fill(0, 100, 0);
    text("Pressione ESPAÇO para visitar Nara na cidade!", width / 2, 100);
  }

  // Juca (personagem do campo)
  fill(200, 150, 100);
  ellipse(100, 250, 40); // cabeça
  rect(85, 270, 30, 50); // corpo
  fill(0);
  text("Juca", 100, 330);
}

function mostrarCidade() {
// Mostrar a cidade com progresso da construção
  background(180);
  fill(100);
  rect(0, 300, width, 100);

  textSize(22);
  fill(0);
  text("Nara usa as frutas para construir melhorias!", width / 2, 40);

  for (let i = 0; i < cidadeNivel; i++) {
    fill(150 + i * 20, 100, 150);
    rect(100 + i * 100, 200 - i * 20, 60, 100 + i * 20);
  }

  textSize(18);
  text(`Nível da cidade: ${cidadeNivel}/3`, width / 2, 80);//cidade evoluida

  // Nara (personagem da cidade)
  fill(180, 200, 255);
  ellipse(600, 250, 40); // cabeça
  rect(585, 270, 30, 50); // corpo
  fill(0);
  text("Nara", 600, 330);

  if (cidadeNivel < 3) {
    fill(0, 120, 0);
    text("Pressione ENTER para voltar ao campo", width / 2, 350);
  } else {
    fill(0, 100, 200);
    text("Tudo pronto! Pressione ENTER para celebrar!", width / 2, 350);
  }
}

// Mostrar a festa final
function mostrarFesta() {
  background(255, 228, 181);
  textSize(28);
  fill(0);
  text("Parabéns! Campo e cidade estão unidos!", width / 2, 50);

  for (let i = 0; i < width; i += 40) {
    fill(random(255), random(255), random(255));
    triangle(i, 80, i + 20, 100, i + 40, 80);
  }

  // Personagens
  fill(200, 150, 100);
  ellipse(250, 250, 40);
  rect(235, 270, 30, 50);
  fill(0);
  text("Juca", 250, 330);

  fill(180, 200, 255);
  ellipse(450, 250, 40);
  rect(435, 270, 30, 50);
  fill(0);
  text("Nara", 450, 330);

  textSize(18);
  text("A festa celebra uma nova amizade entre campo e cidade!", width / 2, 370);
}

// Lógica de clique nas frutas
function mousePressed() {
  if (cena === "campo") {
    for (let fruta of frutas) {
      if (!fruta.coletada && dist(mouseX, mouseY, fruta.x, fruta.y) < 15) {
        fruta.coletada = true;
        frutasColetadas++;
      }
    }
  }
}

// Transições entre cenas
function keyPressed() {
  if (cena === "campo" && key === ' ') {
    if (frutasColetadas >= maxFrutas) {
      cidadeNivel++;
      frutasColetadas = 0;
      cena = "cidade";
    }
  } else if (cena === "cidade" && keyCode === ENTER) {
    if (cidadeNivel < 3) {
      gerarFrutas();
      cena = "campo";
    } else {
      cena = "festa";
    }
  }
}

// Gerar frutas aleatórias
function gerarFrutas() {
  frutas = [];
  for (let i = 0; i < maxFrutas; i++) {
    frutas.push({
      x: random(50, width - 50),
      y: random(120, 250),
      coletada: false
    });
  }
}
