const celebrities = [
    // B Column (1-15)
    ['Anitta', 'Bruna Marquezine', 'Beyoncé', 'Bruno Mars', 'Brad Pitt'],
    // I Column (16-30)
    ['Ivete Sangalo', 'Iza', 'Ian McKellen', 'Idris Elba', 'Irene Kim'],
    // N Column (31-45) - Com FREE no meio
    ['Neymar', 'Naomi Campbell', 'Nicolas Cage', 'Novak Djokovic', 'Natti Natasha'],
    // G Column (46-60)
    ['Gisele Bündchen', 'Gloria Groove', 'George Clooney', 'Gigi Hadid', 'Guillermo del Toro'],
    // O Column (61-75)
    ['Oprah Winfrey', 'Orlando Bloom', 'Oasis', 'Olivia Wilde', 'Oscar Isaac']
];

let currentCard = [];
let marked = new Set();

function generateCard() {
    currentCard = [];
    marked.clear();
    
    // Gera 5 celebridades - uma para cada coluna
    for (let col = 0; col < 5; col++) {
        const shuffled = [...celebrities[col]].sort(() => Math.random() - 0.5);
        currentCard.push(shuffled[0]);
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
                // Pega celebridade da coluna correspondente
                if (row === 0) {
                    cell.textContent = currentCard[col];
                } else if (row === 1) {
                    cell.textContent = currentCard[col];
                } else if (row === 3) {
                    cell.textContent = currentCard[col];
                } else if (row === 4) {
                    cell.textContent = currentCard[col];
                }
                
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
