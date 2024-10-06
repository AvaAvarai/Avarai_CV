document.querySelector('.button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#cv').scrollIntoView({ behavior: 'smooth' });
});

// Matrix rain effect
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

let rainbowMode = false;
let angle = 0;

const rainbowButton = document.getElementById('rainbow-mode');
rainbowButton.addEventListener('click', () => {
    rainbowMode = !rainbowMode;
    rainbowButton.textContent = rainbowMode ? 'Normal Mode' : 'Rainbow Mode';
});

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        if (rainbowMode) {
            const hue = (i / rainDrops.length) * 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            
            const wave = Math.sin(angle + i * 0.1) * 5;
            ctx.fillText(text, i * fontSize + wave, rainDrops[i] * fontSize);
        } else {
            ctx.fillStyle = '#0F0';
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        }

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }

    angle += 0.05;
};

setInterval(draw, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Conway's Game of Life implementation
const golCanvas = document.getElementById('game-of-life');
const golCtx = golCanvas.getContext('2d');

const CELL_SIZE = 10;
let COLS, ROWS, grid;

function resizeGameOfLife() {
    const contentPane = document.querySelector('.content');
    golCanvas.width = contentPane.offsetWidth;
    golCanvas.height = contentPane.offsetHeight;
    COLS = Math.floor(golCanvas.width / CELL_SIZE);
    ROWS = Math.floor(golCanvas.height / CELL_SIZE);
    grid = createGrid();
}

function createGrid() {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
            .map(() => Math.random() > 0.7));
}

function drawGrid() {
    golCtx.clearRect(0, 0, golCanvas.width, golCanvas.height);
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            if (grid[i][j]) {
                golCtx.fillStyle = rainbowMode ? `hsl(${(i * j) % 360}, 100%, 50%)` : '#FFF';
                golCtx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
            }
        }
    }
}

function updateGrid() {
    const newGrid = createGrid();
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j]) {
                newGrid[i][j] = neighbors === 2 || neighbors === 3;
            } else {
                newGrid[i][j] = neighbors === 3;
            }
        }
    }
    grid = newGrid;
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const col = (x + i + COLS) % COLS;
            const row = (y + j + ROWS) % ROWS;
            count += grid[col][row] ? 1 : 0;
        }
    }
    return count;
}

function gameOfLifeLoop() {
    updateGrid();
    drawGrid();
    requestAnimationFrame(gameOfLifeLoop);
}

// Initialize and start the Game of Life
resizeGameOfLife();
gameOfLifeLoop();

// Update Game of Life canvas on window resize
window.addEventListener('resize', resizeGameOfLife);
