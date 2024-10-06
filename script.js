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
