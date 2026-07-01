// Database de celebridades - 75+ famosos!
const celebrities = {
    football: [
        { name: 'Neymar Jr', emoji: '⚽' },
        { name: 'Pelé', emoji: '⚽' },
        { name: 'Ronaldinho', emoji: '⚽' },
        { name: 'Vinicius Jr', emoji: '⚽' },
        { name: 'Ronaldo Fenômeno', emoji: '⚽' },
        { name: 'Ronaldo Nazário', emoji: '⚽' },
        { name: 'Kaká', emoji: '⚽' },
        { name: 'Rivelino', emoji: '⚽' },
        { name: 'Maradona', emoji: '⚽' },
        { name: 'Messi', emoji: '⚽' },
        { name: 'Cristiano Ronaldo', emoji: '⚽' },
        { name: 'Zico', emoji: '⚽' },
        { name: 'Dinho', emoji: '⚽' },
        { name: 'Thiago Silva', emoji: '⚽' },
        { name: 'Oscar', emoji: '⚽' },
        { name: 'Pele', emoji: '⚽' },
        { name: 'Garrincha', emoji: '⚽' },
        { name: 'Tostão', emoji: '⚽' },
        { name: 'Didi', emoji: '⚽' },
        { name: 'Nilton Santos', emoji: '⚽' }
    ],
    singers: [
        { name: 'Anitta', emoji: '🎤' },
        { name: 'Ivete Sangalo', emoji: '🎤' },
        { name: 'Gustavo Lima', emoji: '🎤' },
        { name: 'Wesley Safadão', emoji: '🎤' },
        { name: 'Luísa Sonza', emoji: '🎤' },
        { name: 'Pabllo Vittar', emoji: '🎤' },
        { name: 'The Weeknd', emoji: '🎤' },
        { name: 'Beyoncé', emoji: '🎤' },
        { name: 'Ariana Grande', emoji: '🎤' },
        { name: 'Bad Bunny', emoji: '🎤' },
        { name: 'Marshmello', emoji: '🎤' },
        { name: 'David Guetta', emoji: '🎤' },
        { name: 'Diplo', emoji: '🎤' },
        { name: 'Skrillex', emoji: '🎤' },
        { name: 'Calvin Harris', emoji: '🎤' },
        { name: 'Tiësto', emoji: '🎤' },
        { name: 'Avicii', emoji: '🎤' },
        { name: 'Deadmau5', emoji: '🎤' },
        { name: 'Diplo', emoji: '🎤' },
        { name: 'Major Lazer', emoji: '🎤' },
        { name: 'Billie Eilish', emoji: '🎤' },
        { name: 'Dua Lipa', emoji: '🎤' },
        { name: 'Bruno Mars', emoji: '🎤' },
        { name: 'Post Malone', emoji: '🎤' },
        { name: 'Lil Nas X', emoji: '🎤' }
    ],
    characters: [
        { name: 'Homem-Aranha', emoji: '🕷️' },
        { name: 'Batman', emoji: '🦇' },
        { name: 'Superman', emoji: '🦸' },
        { name: 'Capitão América', emoji: '🛡️' },
        { name: 'Homem de Ferro', emoji: '🤖' },
        { name: 'Mulher Maravilha', emoji: '👩' },
        { name: 'Viúva Negra', emoji: '🖤' },
        { name: 'Hulk', emoji: '💚' },
        { name: 'Thor', emoji: '⚡' },
        { name: 'Pantera Negra', emoji: '🐆' },
        { name: 'Gavião Arqueiro', emoji: '🏹' },
        { name: 'Feiticeira Escarlate', emoji: '🔴' },
        { name: 'Visão', emoji: '👁️' },
        { name: 'Homem-Formiga', emoji: '🐜' },
        { name: 'Vespa', emoji: '🐝' },
        { name: 'Doutor Estranho', emoji: '🔮' },
        { name: 'Capitã Marvel', emoji: '⭐' },
        { name: 'Eternos', emoji: '✨' },
        { name: 'Loki', emoji: '👹' },
        { name: 'Thanos', emoji: '💜' },
        { name: 'Homem-Morcego', emoji: '🦇' },
        { name: 'Flash', emoji: '⚡' },
        { name: 'Aquaman', emoji: '🌊' },
        { name: 'Lanterna Verde', emoji: '💚' },
        { name: 'Cigana Negra', emoji: '🖤' }
    ]
};

let currentCard = [];
let markedCells = new Set();

// Função para embaralhar array
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Função para gerar novo cartão
function generateNewCard() {
    const allCelebrities = [
        ...celebrities.football,
        ...celebrities.singers,
        ...celebrities.characters
    ];
    
    const shuffled = shuffle(allCelebrities);
    currentCard = shuffled.slice(0, 25);
    markedCells.clear();
    renderCard();
    updateMessage();
}

// Função para renderizar o cartão
function renderCard() {
    const card = document.getElementById('bingoCard');
    card.innerHTML = '';

    currentCard.forEach((celebrity, index) => {
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';
        if (markedCells.has(index)) {
            cell.classList.add('marked');
        }

        cell.innerHTML = `
            <span style="font-size: 1.5em; margin-bottom: 5px;">${celebrity.emoji}</span>
            <span>${celebrity.name}</span>
        `;

        cell.addEventListener('click', () => toggleCell(index, cell));
        card.appendChild(cell);
    });
}

// Função para marcar/desmarcar célula
function toggleCell(index, cellElement) {
    if (markedCells.has(index)) {
        markedCells.delete(index);
        cellElement.classList.remove('marked');
    } else {
        markedCells.add(index);
        cellElement.classList.add('marked');
        cellElement.classList.add('celebration');
        setTimeout(() => cellElement.classList.remove('celebration'), 600);
    }
    updateMessage();
}

// Função para verificar bingo
function checkBingo() {
    if (markedCells.size === 0) return false;

    // Verificar linhas
    for (let row = 0; row < 5; row++) {
        let count = 0;
        for (let col = 0; col < 5; col++) {
            if (markedCells.has(row * 5 + col)) count++;
        }
        if (count === 5) return true;
    }

    // Verificar colunas
    for (let col = 0; col < 5; col++) {
        let count = 0;
        for (let row = 0; row < 5; row++) {
            if (markedCells.has(row * 5 + col)) count++;
        }
        if (count === 5) return true;
    }

    // Verificar diagonal principal
    let diag1 = 0;
    for (let i = 0; i < 5; i++) {
        if (markedCells.has(i * 5 + i)) diag1++;
    }
    if (diag1 === 5) return true;

    // Verificar diagonal secundária
    let diag2 = 0;
    for (let i = 0; i < 5; i++) {
        if (markedCells.has(i * 5 + (4 - i))) diag2++;
    }
    if (diag2 === 5) return true;

    return false;
}

// Função para atualizar mensagem
function updateMessage() {
    const messageText = document.getElementById('messageText');
    if (checkBingo()) {
        messageText.textContent = '🎉 BINGO! Parabéns! 🎉';
        messageText.style.color = '#00c853';
        messageText.style.fontSize = '1.3em';
    } else {
        messageText.textContent = '🎲 Clique nas celebridades para marcar!';
        messageText.style.color = '#667eea';
        messageText.style.fontSize = '1.1em';
    }
}

// Event listeners
document.getElementById('newCardBtn').addEventListener('click', generateNewCard);
document.getElementById('resetBtn').addEventListener('click', () => {
    markedCells.clear();
    renderCard();
    updateMessage();
});

// Inicializar
generateNewCard();
