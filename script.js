const celebrities = [
    // B Column
    ['Anitta', 'Bruna Marquezine', 'Beyoncé', 'Bruno Mars', 'Brad Pitt', 'Breno Lopes', 'Bruce Willis', 'Britney Spears'],
    // I Column
    ['Ivete Sangalo', 'Iza', 'Ian McKellen', 'Idris Elba', 'Irene Kim', 'Isabelle Drummond', 'Igor Jansen', 'Iker Casillas'],
    // N Column
    ['Neymar', 'Naomi Campbell', 'Nicolas Cage', 'Novak Djokovic', 'Natti Natasha', 'Naldo Benny', 'Natalie Portman', 'Neymar Jr'],
    // G Column
    ['Gisele Bündchen', 'Gloria Groove', 'George Clooney', 'Gigi Hadid', 'Guillermo del Toro', 'Gustavo Lima', 'Gal Gadot', 'Guilherme Vieira'],
    // O Column
    ['Oprah Winfrey', 'Orlando Bloom', 'Oasis', 'Olivia Wilde', 'Oscar Isaac', 'Oliveira Santos', 'Orquídea', 'Obama']
];

let currentCard = [];
let marked = new Set();

function generateCard() {
    currentCard = [];
    marked.clear();
    
    for (let col = 0; col < 5; col++) {
        const shuffled = [...celebrities[col]].sort(() => Math.random() - 0.5);
        currentCard.push(shuffled[0]);
    }
    
    renderCard();
}

function renderCard() {
    const grid = document.getElementById('bingoGrid');
    grid.innerHTML = '';
    
    currentCard.forEach((celebrity, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (marked.has(index)) {
            cell.classList.add('marked');
        }
        cell.textContent = celebrity;
        cell.onclick = () => toggleCell(index);
        grid.appendChild(cell);
    });
}

function toggleCell(index) {
    if (marked.has(index)) {
        marked.delete(index);
    } else {
        marked.add(index);
    }
    renderCard();
}

function resetCard() {
    marked.clear();
    renderCard();
}

document.getElementById('newCardBtn').addEventListener('click', generateCard);
document.getElementById('resetBtn').addEventListener('click', resetCard);

// Gera o primeiro cartão ao carregar
generateCard();
