// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const levelElement = document.getElementById('level'); 
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

// Game state
let game = {
    running: false,
    score: 0,
    lives: 3,
    level: 1,
    speed: 1.5
};

// Player platform
const platform = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 8,
    color: '#4deeea'
};

// Ball properties
const ballColors = ['#FF5252', '#4CAF50', '#2196F3', '#FFEB3B'];
let balls = [];

// Projectiles
let projectiles = [];

// Key states
const keys = {};

// Create background stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        const brightness = 70 + Math.random() * 30;
        star.style.backgroundColor = `rgba(255, 255, 255, ${brightness / 100})`;
        
        // Random twinkle animation
        star.style.animationDuration = `${1 + Math.random() * 4}s`;
        
        starsContainer.appendChild(star);
    }
}

// Initialize game
function init() {
    game.running = true;
    game.score = 0;
    game.lives = 3;
    game.level = 1;
    game.speed = 1.5;
    
    platform.x = canvas.width / 2 - 50;
    balls = [];
    projectiles = [];
    
    scoreElement.textContent = game.score;
    livesElement.textContent = game.lives;
    levelElement.textContent = game.level;
    
    // Create initial balls
    createBalls();
    createStars();
    
    // Start game loop
    requestAnimationFrame(gameLoop);
}

// Create four balls
function createBalls() {
    balls = [];
    for (let i = 0; i < 4; i++) {
        balls.push({
            x: Math.random() * (canvas.width - 40) + 20,
            y: Math.random() * 100 + 20,
            radius: 15 + Math.random() * 10,
            color: ballColors[i],
            speed: game.speed,
            caught: false
        });
    }
}

// Draw platform
function drawPlatform() {
    ctx.save();
    
    // Platform
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    
    // Platform glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = platform.color;
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    
    ctx.restore();
}

// Draw balls
function drawBalls() {
    ctx.save();
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        
        // Ball
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Ball glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = ball.color;
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(ball.x - ball.radius/3, ball.y - ball.radius/3, ball.radius/3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

// Draw projectiles
function drawProjectiles() {
    ctx.save();
    for (let i = 0; i < projectiles.length; i++) {
        const projectile = projectiles[i];
        
        // Projectile
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Projectile glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#4deeea';
        ctx.fillStyle = '#4deeea';
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Trail effect
        ctx.fillStyle = 'rgba(77, 238, 234, 0.5)';
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y + 8, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

// Draw background
function drawBackground() {
    ctx.save();
    
    // Stars
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
}

// Create a projectile
function createProjectile() {
    if (projectiles.length < 5) { // Limit number of projectiles
        projectiles.push({
            x: platform.x + platform.width / 2,
            y: platform.y,
            speed: 10,
            active: true
        });
    }
}

// Update game state
function update() {
    // Move platform
    if (keys['ArrowLeft'] && platform.x > 0) {
        platform.x -= platform.speed;
    }
    if (keys['ArrowRight'] && platform.x + platform.width < canvas.width) {
        platform.x += platform.speed;
    }
    
    // Update projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        projectile.y -= projectile.speed;
        
        // Remove projectiles that go off screen
        if (projectile.y < 0) {
            projectiles.splice(i, 1);
            continue;
        }
        
        // Check for collision with balls
        for (let j = balls.length - 1; j >= 0; j--) {
            const ball = balls[j];
            const dx = projectile.x - ball.x;
            const dy = projectile.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < ball.radius + 5) {
                // Collision detected
                game.score += Math.floor(ball.radius * 2);
                scoreElement.textContent = game.score;
                
                // Remove the ball and projectile
                balls.splice(j, 1);
                projectiles.splice(i, 1);
                
                // Add a new ball if needed
                if (balls.length < 4) {
                    balls.push({
                        x: Math.random() * (canvas.width - 40) + 20,
                        y: Math.random() * 100 + 20,
                        radius: 15 + Math.random() * 10,
                        color: ballColors[Math.floor(Math.random() * 4)],
                        speed: game.speed,
                        caught: false
                    });
                }
                
                break;
            }
        }
    }
    
    // Update balls
    let allBallsCaught = true;
    
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        
        if (!ball.caught) {
            allBallsCaught = false;
            
            // Move ball with speed matching platform movement (but slower)
            if (keys['ArrowLeft']) {
                ball.x -= platform.speed * 0.1;
            }
            if (keys['ArrowRight']) {
                ball.x += platform.speed * 0.1;
            }
            
            // Apply gravity (slower falling)
            ball.y += ball.speed;
            
            // Check if ball is caught
            if (ball.y + ball.radius >= platform.y && 
                ball.x >= platform.x && 
                ball.x <= platform.x + platform.width) {
                ball.caught = true;
                game.score += Math.floor(ball.radius * 2);
                scoreElement.textContent = game.score;
            }
            
            // Check if ball is missed
            if (ball.y - ball.radius > canvas.height) {
                game.lives--;
                livesElement.textContent = game.lives;
                
                if (game.lives <= 0) {
                    gameOver();
                    return;
                }
                
                // Reset ball position
                ball.y = Math.random() * 100 + 20;
                ball.x = Math.random() * (canvas.width - 40) + 20;
            }
            
            // Ball wall collision
            if (ball.x - ball.radius < 0) {
                ball.x = ball.radius;
            }
            if (ball.x + ball.radius > canvas.width) {
                ball.x = canvas.width - ball.radius;
            }
        }
    }
    
    // If all balls are caught, create new ones and increase level
    if (allBallsCaught) {
        game.level++;
        game.speed += 0.3;
        levelElement.textContent = game.level;
        createBalls();
    }
}

// Game over
function gameOver() {
    game.running = false;
    finalScoreElement.textContent = game.score;
    gameOverScreen.style.display = 'flex';
}

// Main game loop
function gameLoop() {
    if (!game.running) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw game objects
    drawBackground();
    drawBalls();
    drawProjectiles();
    drawPlatform();
    
    // Update game state
    update();
    
    // Continue game loop
    requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (e.key === ' ' && !game.running) {
        startScreen.style.display = 'none';
        init();
    }
    
    if (e.key === ' ' && game.running) {
        createProjectile();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    init();
});

restartButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    init();
});

// Add touch support for mobile devices
let touchStart = 0;
canvas.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientX;
    e.preventDefault();
});

canvas.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].clientX;
    const diff = touchX - touchStart;
    
    if (diff > 5) {
        platform.x += platform.speed;
        if (platform.x + platform.width > canvas.width) {
            platform.x = canvas.width - platform.width;
        }
        touchStart = touchX;
    } else if (diff < -5) {
        platform.x -= platform.speed;
        if (platform.x < 0) {
            platform.x = 0;
        }
        touchStart = touchX;
    }
    
    e.preventDefault();
});

// Add click to shoot for mobile
canvas.addEventListener('click', () => {
    if (game.running) {
        createProjectile();
    }
});

// Create stars on initial load
createStars();
