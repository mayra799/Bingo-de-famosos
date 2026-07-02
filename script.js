const celebrities = {
    B: [
        'Anitta 🎤', 'Bruna Marquezine 🎭', 'Belo 🎤', 'Bruno Gagliasso 🎭', 'Bebeto ⚽',
        'Beth Carvalho 🎤', 'Babu Santana 🎭', 'Bruna Linzmeyer 🎭', 'Bruno Henrique ⚽', 'Barões da Pisadinha 🎤',
        'Beto Barbosa 🎤', 'Bianca Comparato 🎭', 'Breno Lopes ⚽', 'Bárbara Paz 🎭', 'Baco Exu do Blues 🎤',
        'Bussunda 🎭', 'Bárbara Reis 🎭', 'Bernard ⚽', 'Buchecha 🎤', 'Bárbara Evans 🎭'
    ],
    I: [
        'Iza 🎤', 'Ivete Sangalo 🎤', 'Isabelle Drummond 🎭', 'Igor Jansen 🎭', 'Isis Valverde 🎭',
        'Ingrid Guimarães 🎭', 'Isabel Teixeira 🎭', 'Igor Coronado ⚽', 'Irandhir Santos 🎭', 'Igor Rickli 🎭',
        'Inácio ⚽', 'Ilva Niño 🎭', 'Isadora Ribeiro 🎭', 'Ithamar Roque ⚽', 'Isadora Pompeo 🎤',
        'Ivan Lins 🎤', 'Igor Kannário 🎤', 'Isabel Fillardis 🎭', 'Inezita Barroso 🎤', 'Ionaldo ⚽'
    ],
    N: [
        'Neymar ⚽', 'Naldo Benny 🎤', 'Ney Matogrosso 🎤', 'Nanda Costa 🎭', 'Nando Reis 🎤',
        'Nicolas Prattes 🎭', 'Neto ⚽', 'Nívea Maria 🎭', 'Nathalia Dill 🎭', 'Nego do Borel 🎤',
        'Nattan 🎤', 'Niltinho ⚽', 'Nívea Stelmann 🎭', 'Negra Li 🎤', 'Naldo ⚽',
        'Neguinho da Beija-Flor 🎤', 'Nuno Leal Maia 🎭', 'Nelson Xavier 🎭', 'Nivaldo ⚽', 'Nando Rodrigues 🎭'
    ],
    G: [
        'Gustavo Lima 🎤', 'Gaby Amarantos 🎤', 'Glória Menezes 🎭', 'Guta Stresser 🎭', 'Giovanna Lancellotti 🎭',
        'Gabriel Barbosa ⚽', 'Ganso ⚽', 'Giovanna Antonelli 🎭', 'Gaby Estrella 🎭', 'Gabriel Pensador 🎤',
        'Gilberto Gil 🎤', 'Gerson ⚽', 'Grazi Massafera 🎭', 'Gustavo Mioto 🎤', 'Guilherme Fontes 🎭',
        'Gal Costa 🎤', 'Guga ⚽', 'Guilherme Winter 🎭', 'Guilherme Arana ⚽', 'Geraldo Azevedo 🎤'
    ],
    O: [
        'Oliveira Santos ⚽', 'Odilon Wagner 🎭', 'Otto 🎤', 'Oberdan Cattani ⚽', 'Osmar Prado 🎭',
        'Otávio Müller 🎭', 'Orlando Silva 🎤', 'Othon Bastos 🎭', 'Oswaldo Montenegro 🎤', 'Oscar ⚽',
        'Othon ⚽', 'Otávio Augusto 🎭', 'Olinho ⚽', 'Orlando Morais 🎤', 'Oswaldo ⚽',
        'Orival Pessini 🎭', 'Olayr ⚽', 'Odaír José 🎤', 'Osmar Santos 🎤', 'Orestes ⚽'
    ]
};

let currentCard = [];
let marked = new Set();
let usedCelebrities = {
    B: new Set(),
    I: new Set(),
    N: new Set(),
    G: new Set(),
    O: new Set()
};

function getRandomCelebrity(column) {
    const available = celebrities[column].filter(c => !usedCelebrities[column].has(c));
    if (available.length === 0) {
        usedCelebrities[column].clear();
        return celebrities[column][Math.floor(Math.random() * celebrities[column].length)];
    }
    const celeb = available[Math.floor(Math.random() * available.length)];
    usedCelebrities[column].add(celeb);
    return celeb;
}

function generateCard() {
    currentCard = [];
    marked.clear();
    usedCelebrities = { B: new Set(), I: new Set(), N: new Set(), G: new Set(), O: new Set() };
    
    const columns = ['B', 'I', 'N', 'G', 'O'];
    
    // Gera 5 linhas
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const celeb = getRandomCelebrity(columns[col]);
            currentCard.push(celeb);
        }
    }
    
    renderCard();
}

function renderCard() {
    const grid = document.getElementById('bingoGrid');
    grid.innerHTML = '';
    
    // Renderiza 5 linhas x 5 colunas
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const index = row * 5 + col;
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            // Célula FREE no centro (linha 2, coluna 2)
            if (row === 2 && col === 2) {
                cell.textContent = 'FREE 🌟';
                cell.classList.add('free');
                cell.classList.add('marked');
                marked.add(index);
            } else {
                cell.textContent = currentCard[index];
                
                if (marked.has(index)) {
                    cell.classList.add('marked');
                }
                cell.onclick = () => toggleCell(index);
            }
            
            grid.appendChild(cell);
        }
    }
}

function toggleCell(index) {
    // Não permite clicar no FREE
    if (index === 12) return;
    
    if (marked.has(index)) {
        marked.delete(index);
    } else {
        marked.add(index);
    }
    renderCard();
}

function resetCard() {
    marked.clear();
    marked.add(12); // Sempre marca o FREE
    renderCard();
}

document.getElementById('newCardBtn').addEventListener('click', generateCard);
document.getElementById('resetBtn').addEventListener('click', resetCard);

// Gera o primeiro cartão ao carregar
generateCard();
                cell.textContent = 'FREE 🌟';
                cell.classList.add('free');
                cell.classList.add('marked');
                marked.add(index);
            } else {
                cell.textContent = currentCard[index];
                
                if (marked.has(index)) {
                    cell.classList.add('marked');
                }
                cell.onclick = () => toggleCell(index);
            }
            
            grid.appendChild(cell);
        }
    }
}

function toggleCell(index) {
    // Não permite clicar no FREE
    if (index === 12) return;
    
    if (marked.has(index)) {
        marked.delete(index);
    } else {
        marked.add(index);
    }
    renderCard();
}

function resetCard() {
    marked.clear();
    marked.add(12); // Sempre marca o FREE
    renderCard();
}

document.getElementById('newCardBtn').addEventListener('click', generateCard);
document.getElementById('resetBtn').addEventListener('click', resetCard);

// Gera o primeiro cartão ao carregar
generateCard();
