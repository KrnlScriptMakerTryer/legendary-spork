// --- CONFIGURATION ---
const PLAYER_SPEED = 10; // Pixels per move
const MAP_MIN = 0;
const MAP_MAX = 300; // Corresponds to the baseplate size in CSS

// --- DOM ELEMENTS ---
const player = document.getElementById('player');
const bot1 = document.getElementById('bot-1');
const bot2 = document.getElementById('bot-2');

// --- PLAYER MOVEMENT LOGIC ---
let playerX = 150; 
let playerY = 150; 

// Initial update to set the starting position
player.style.transform = `translate(${playerX}px, ${playerY}px) translateZ(15px)`;

document.addEventListener('keydown', (event) => {
    let key = event.key.toLowerCase();
    
    // W/S change the Y position (forward/backward)
    if (key === 'w') {
        playerY = Math.max(MAP_MIN, playerY - PLAYER_SPEED); // W: Move up (less Y)
    } else if (key === 's') {
        playerY = Math.min(MAP_MAX - 30, playerY + PLAYER_SPEED); // S: Move down (more Y)
    } 
    // A/D change the X position (left/right)
    else if (key === 'a') {
        playerX = Math.max(MAP_MIN, playerX - PLAYER_SPEED); // A: Move left (less X)
    } else if (key === 'd') {
        playerX = Math.min(MAP_MAX - 30, playerX + PLAYER_SPEED); // D: Move right (more X)
    }

    // Apply the new position
    player.style.transform = `translate(${playerX}px, ${playerY}px) translateZ(15px)`;
});

// --- BOT AI LOGIC ---

// Bot state storage (x, y position)
const botStates = {
    'bot-1': { x: 100, y: 50, targetX: 0, targetY: 0 },
    'bot-2': { x: 200, y: 250, targetX: 0, targetY: 0 }
};

// Function to calculate a new random target for a bot
function setRandomTarget(botId) {
    const state = botStates[botId];
    // Random target within the map boundaries
    state.targetX = Math.random() * (MAP_MAX - 30);
    state.targetY = Math.random() * (MAP_MAX - 30);
}

// Initialize targets
setRandomTarget('bot-1');
setRandomTarget('bot-2');

// Main game loop for Bot AI
function botAIUpdate() {
    const bots = [bot1, bot2];

    bots.forEach(botElement => {
        const botId = botElement.id;
        const state = botStates[botId];
        const BOT_MOVE_STEP = 1; // Speed of the bot

        // Check if the bot has reached its target (within 5 pixels)
        const distance = Math.sqrt(Math.pow(state.targetX - state.x, 2) + Math.pow(state.targetY - state.y, 2));

        if (distance < 5) {
            setRandomTarget(botId); // Get a new target
        } else {
            // Move towards the target
            const angle = Math.atan2(state.targetY - state.y, state.targetX - state.x);
            state.x += Math.cos(angle) * BOT_MOVE_STEP;
            state.y += Math.sin(angle) * BOT_MOVE_STEP;

            // Apply the new position
            botElement.style.transform = `translate(${state.x}px, ${state.y}px) translateZ(15px)`;
        }
    });

    // Loop the AI update
    requestAnimationFrame(botAIUpdate);
}

// Start the Bot AI loop
botAIUpdate();

