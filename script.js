// Configuração tradicional do Bingo 75 (15 números por coluna)
const bingoNumbers = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),      // 1 a 15
    I: Array.from({ length: 15 }, (_, i) => i + 16),     // 16 to 30
    N: Array.from({ length: 15 }, (_, i) => i + 31),     // 31 a 45
    G: Array.from({ length: 15 }, (_, i) => i + 46),     // 46 a 60
    O: Array.from({ length: 15 }, (_, i) => i + 61)      // 61 a 75
};

let currentCard = [];
let marked = new Set();

// Função geradora de números pseudo-aleatórios com base em um texto (Seed)
function seededRandom(seed) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Pega o código da URL (?jogo=codigo) ou cria um baseado na data atual
function getGameSeed() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('jogo');
    if (gameId) return gameId;
    
    // Se não tiver código no link, usa o dia atual para manter fixo durante o dia
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
}

function generateCard() {
    currentCard = [];
    marked.clear();
    marked.add(12); // Posição do FREE
    
    const seedBase = getGameSeed();
    const columns = ['B', 'I', 'N', 'G', 'O'];
    const selectedNumbers = { B: [], I: [], N: [], G: [], O: [] };
    
    columns.forEach((col, colIdx) => {
        let list = [...bingoNumbers[col]];
        let seed = hashString(seedBase + col);
        
        // Embaralha a lista de forma previsível usando a seed
        for (let i = list.length - 1; i > 0; i--) {
            const r = seededRandom(seed);
            seed += i;
            const j = Math.floor(r * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        selectedNumbers[col] = list.slice(0, 5);
    });
    
    // Monta a cartela linha por linha
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const num = selectedNumbers[columns[col]][row];
            currentCard.push(num);
        }
    }
    
    saveGameState();
    renderCard();
}

// Transforma texto em número para a seed
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function renderCard() {
    const grid = document.getElementById('bingGrid') || document.getElementById('bingoGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const index = row * 5 + col;
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            if (row === 2 && col === 2) {
                cell.textContent = 'FREE 🌟';
                cell.classList.add('free');
                cell.classList.add('marked');
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
    if (index === 12) return;
    
    if (marked.has(index)) {
        marked.delete(index);
    } else {
        marked.add(index);
    }
    saveGameState();
    renderCard();
}

function resetCard() {
    marked.clear();
    marked.add(12);
    saveGameState();
    renderCard();
}

// Salva o estado atual no navegador da pessoa
function saveGameState() {
    const seed = getGameSeed();
    const state = {
        currentCard: currentCard,
        marked: Array.from(marked)
    };
    localStorage.setItem(`bingo_state_${seed}`, JSON.stringify(state));
}

// Carrega o estado antigo se existir, evitando resetar ao sair da página
function loadGameState() {
    const seed = getGameSeed();
    const saved = localStorage.getItem(`bingo_state_${seed}`);
    if (saved) {
        const state = JSON.parse(saved);
        currentCard = state.currentCard;
        marked = new Set(state.marked);
        renderCard();
    } else {
        generateCard();
    }
}

document.getElementById('newCardBtn').addEventListener('click', () => {
    if (marked.size > 1 && !confirm("Deseja gerar uma nova cartela? Você perderá as marcações atuais.")) {
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get('jogo')) {
        window.location.search = `?jogo=user_${Math.floor(Math.random() * 100000)}`;
    } else {
        generateCard();
    }
});

document.getElementById('resetBtn').addEventListener('click', resetCard);

// Inicializa carregando o jogo fixado
loadGameState();

function celebrarBingo() {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
        confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
    }, 300);
}

document.getElementById('bingoBtn').addEventListener('click', celebrarBingo);
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
// Função para soltar confetes na tela inteira
function celebrarBingo() {
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.6 }
        });
    }, 300);
}

// Ativa o botão de Gritar Bingo
document.getElementById('bingoBtn').addEventListener('click', celebrarBingo);

