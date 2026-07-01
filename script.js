const celebrities = {
    B: [
        'Anitta', 'Bruna Marquezine', 'Bruno Mars', 'Beyoncé', 'Brad Pitt',
        'Bruce Willis', 'Britney Spears', 'Benício Del Toro', 'Bella Hadid', 'Bad Bunny',
        'Breno Lopes', 'Beth Carvalho', 'Backstreet Boys', 'Bon Jovi', 'Baiano',
        'Beto Barbosa', 'Billie Eilish', 'Biel Barbosa', 'Bruno Gagliasso', 'Brandy'
    ],
    I: [
        'Iza', 'Ivete Sangalo', 'Ian McKellen', 'Idris Elba', 'Irene Kim',
        'Isabelle Drummond', 'Igor Jansen', 'Iker Casillas', 'Idina Menzel', 'Ice Cube',
        'Ivana Trump', 'Ian Somerhalder', 'Irmã Dulce', 'Irina Shayk', 'Ironman',
        'Isadora Duncan', 'Isabella Merced', 'Iggy Azalea', 'Iced Tea', 'Ian Astbury'
    ],
    N: [
        'Naomi Campbell', 'Neymar', 'Nicolas Cage', 'Novak Djokovic', 'Natti Natasha',
        'Naldo Benny', 'Natalie Portman', 'Nicolas Hoult', 'Neil Patrick Harris', 'Naya Rivera',
        'Nego do Borel', 'Ney Matogrosso', 'Nadine Jansen', 'Nanda Costa', 'Nando Reis',
        'Natalia Vodianova', 'Nelson Piquet', 'Nego Vilela', 'Neguinho da Beija-Flor', 'Noah Centineo'
    ],
    G: [
        'Gigi Hadid', 'Gisele Bündchen', 'George Clooney', 'Gloria Groove', 'Guillermo del Toro',
        'Gustavo Lima', 'Gal Gadot', 'Guilherme Vieira', 'Gwen Stefani', 'Giancarlo Stanton',
        'Gabriel Pensador', 'Gil do Vigor', 'Gaby Amarantos', 'Graciele Lacerda', 'Gui Napolitano',
        'Glória Menezes', 'Gonzaga', 'Guido Weiss', 'Guta Stresser', 'Giovanna Lancellotti'
    ],
    O: [
        'Oscar Isaac', 'Oprah Winfrey', 'Orlando Bloom', 'Olivia Wilde', 'Oliveira Santos',
        'Octavia Spencer', 'Olivia Rodrigo', 'Owen Wilson', 'Oasis', 'Ozzy Osbourne',
        'Osmar Santos', 'Odilon Wagner', 'Otto', 'Oberdan Cattani', 'Oscar Niemeyer',
        'Odete Roitman', 'Orquídea', 'Omar Sharif', 'Occidente', 'Olívia Prestes'
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
                cell.textContent = 'FREE';
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
