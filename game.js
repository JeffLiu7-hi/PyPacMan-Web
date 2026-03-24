const CANVAS_SIZE = 606;
const BG_COLOR = '#000000';
const WALL_COLOR = 'rgb(0,191,255)';
const GATE_COLOR = '#ffffff';
const FOOD_COLOR = '#ffff00';
const SCORE_COLOR = '#ff0000';
const HUD_FONT = "18px 'Algerian', sans-serif";
const MESSAGE_FONT = "24px 'Algerian', sans-serif";
const FRAME_INTERVAL = 100; // 10 FPS like pygame version

const ASSET_PATHS = {
    hero: 'resources/images/pacman.png',
    ghosts: {
        Blinky: 'resources/images/Blinky.png',
        Clyde: 'resources/images/Clyde.png',
        Inky: 'resources/images/Inky.png',
        Pinky: 'resources/images/Pinky.png',
    },
    audio: 'resources/sounds/bg.mp3',
};

const WALL_DEFS = [
    [0, 0, 6, 600],
    [0, 0, 600, 6],
    [0, 600, 606, 6],
    [600, 0, 6, 606],
    [300, 0, 6, 66],
    [60, 60, 186, 6],
    [360, 60, 186, 6],
    [60, 120, 66, 6],
    [60, 120, 6, 126],
    [180, 120, 246, 6],
    [300, 120, 6, 66],
    [480, 120, 66, 6],
    [540, 120, 6, 126],
    [120, 180, 126, 6],
    [120, 180, 6, 126],
    [360, 180, 126, 6],
    [480, 180, 6, 126],
    [180, 240, 6, 126],
    [180, 360, 246, 6],
    [420, 240, 6, 126],
    [240, 240, 42, 6],
    [324, 240, 42, 6],
    [240, 240, 6, 66],
    [240, 300, 126, 6],
    [360, 240, 6, 66],
    [0, 300, 66, 6],
    [540, 300, 66, 6],
    [60, 360, 66, 6],
    [60, 360, 6, 186],
    [480, 360, 66, 6],
    [540, 360, 6, 186],
    [120, 420, 366, 6],
    [120, 420, 6, 66],
    [480, 420, 6, 66],
    [180, 480, 246, 6],
    [300, 480, 6, 66],
    [120, 540, 126, 6],
    [360, 540, 126, 6],
];

const GATE_DEF = [282, 242, 42, 2];

const HERO_START = { x: 287, y: 439 };
const GHOST_STARTS = {
    Blinky: { x: 287, y: 199 },
    Clyde: { x: 319, y: 259 },
    Inky: { x: 255, y: 259 },
    Pinky: { x: 287, y: 259 },
};

const GHOST_TRACKS = {
    Blinky: [
        [0, -0.5, 4],
        [0.5, 0, 9],
        [0, 0.5, 11],
        [0.5, 0, 3],
        [0, 0.5, 7],
        [-0.5, 0, 11],
        [0, 0.5, 3],
        [0.5, 0, 15],
        [0, -0.5, 15],
        [0.5, 0, 3],
        [0, -0.5, 11],
        [-0.5, 0, 3],
        [0, -0.5, 11],
        [-0.5, 0, 3],
        [0, -0.5, 3],
        [-0.5, 0, 7],
        [0, -0.5, 3],
        [0.5, 0, 15],
        [0, 0.5, 15],
        [-0.5, 0, 3],
        [0, 0.5, 3],
        [-0.5, 0, 3],
        [0, -0.5, 7],
        [-0.5, 0, 3],
        [0, 0.5, 7],
        [-0.5, 0, 11],
        [0, -0.5, 7],
        [0.5, 0, 5],
    ],
    Clyde: [
        [-1, 0, 2],
        [0, -0.5, 4],
        [0.5, 0, 5],
        [0, 0.5, 7],
        [-0.5, 0, 11],
        [0, -0.5, 7],
        [-0.5, 0, 3],
        [0, 0.5, 7],
        [-0.5, 0, 7],
        [0, 0.5, 15],
        [0.5, 0, 15],
        [0, -0.5, 3],
        [-0.5, 0, 11],
        [0, -0.5, 7],
        [0.5, 0, 3],
        [0, -0.5, 11],
        [0.5, 0, 9],
    ],
    Inky: [
        [1, 0, 2],
        [0, -0.5, 4],
        [0.5, 0, 10],
        [0, 0.5, 7],
        [0.5, 0, 3],
        [0, -0.5, 3],
        [0.5, 0, 3],
        [0, -0.5, 15],
        [-0.5, 0, 15],
        [0, 0.5, 3],
        [0.5, 0, 15],
        [0, 0.5, 11],
        [-0.5, 0, 3],
        [0, -0.5, 7],
        [-0.5, 0, 11],
        [0, 0.5, 3],
        [-0.5, 0, 11],
        [0, 0.5, 7],
        [-0.5, 0, 3],
        [0, -0.5, 3],
        [-0.5, 0, 3],
        [0, -0.5, 15],
        [0.5, 0, 15],
        [0, 0.5, 3],
        [-0.5, 0, 15],
        [0, 0.5, 11],
        [0.5, 0, 3],
        [0, -0.5, 11],
        [0.5, 0, 11],
        [0, 0.5, 3],
        [0.5, 0, 1],
    ],
    Pinky: [
        [0, -1, 4],
        [0.5, 0, 9],
        [0, 0.5, 11],
        [-0.5, 0, 23],
        [0, 0.5, 7],
        [0.5, 0, 3],
        [0, -0.5, 3],
        [0.5, 0, 19],
        [0, 0.5, 3],
        [0.5, 0, 3],
        [0, 0.5, 3],
        [0.5, 0, 3],
        [0, -0.5, 15],
        [-0.5, 0, 7],
        [0, 0.5, 3],
        [-0.5, 0, 19],
        [0, -0.5, 11],
        [0.5, 0, 9],
    ],
};

function loadImage(path) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image at ${path}`));
        img.src = path;
    });
}

function loadAssets() {
    const ghostPromises = Object.entries(ASSET_PATHS.ghosts).map(([name, path]) =>
        loadImage(path).then((img) => [name, img])
    );
    return Promise.all([loadImage(ASSET_PATHS.hero), Promise.all(ghostPromises)]).then(
        ([heroImage, ghostEntries]) => {
            const ghostImages = ghostEntries.reduce((acc, [name, img]) => {
                acc[name] = img;
                return acc;
            }, {});
            return { heroImage, ghostImages };
        }
    );
}

function rectsOverlap(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

class Wall {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Food {
    constructor(x, y, width, height, color = FOOD_COLOR) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = Math.min(width, height) / 2;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Player {
    constructor(x, y, image, roleName) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.image = image;
        this.roleName = roleName;
        this.baseSpeed = 30;
        this.speedX = 0;
        this.speedY = 0;
        this.isMoving = false;
        this.direction = { x: 1, y: 0 };
    }

    changeSpeed(direction) {
        const [dx, dy] = direction;
        this.speedX = dx * this.baseSpeed;
        this.speedY = dy * this.baseSpeed;
        this.isMoving = true;
        if (dx !== 0 || dy !== 0) {
            this.direction = { x: dx, y: dy };
        }
        return [this.speedX, this.speedY];
    }

    stop() {
        this.isMoving = false;
        this.speedX = 0;
        this.speedY = 0;
    }

    update(walls, gate) {
        if (!this.isMoving) {
            return false;
        }
        const nextRect = {
            x: this.x + this.speedX,
            y: this.y + this.speedY,
            width: this.width,
            height: this.height,
        };
        const hitWall = walls.some((wall) => rectsOverlap(nextRect, wall));
        const hitGate = gate ? rectsOverlap(nextRect, gate) : false;
        if (hitWall || hitGate) {
            return false;
        }
        this.x = nextRect.x;
        this.y = nextRect.y;
        return true;
    }

    getRect() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    draw(ctx) {
        if (this.roleName === 'hero') {
            const angle = this.directionToAngle();
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(angle);
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        } else {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    directionToAngle() {
        const { x, y } = this.direction;
        if (x > 0) return 0;
        if (x < 0) return Math.PI;
        if (y > 0) return Math.PI / 2;
        if (y < 0) return -Math.PI / 2;
        return 0;
    }
}

class Ghost extends Player {
    constructor(x, y, image, roleName, tracks = []) {
        super(x, y, image, roleName);
        this.tracks = tracks;
        this.trackIndex = 0;
        this.trackStep = 0;
        this.isMoving = true;
    }

    advanceTrack() {
        if (!this.tracks.length) {
            return;
        }
        const track = this.tracks[this.trackIndex];
        this.changeSpeed([track[0], track[1]]);
        this.trackStep += 1;
        if (this.trackStep >= track[2]) {
            this.trackStep = 0;
            if (this.trackIndex < this.tracks.length - 1) {
                this.trackIndex += 1;
            } else if (this.roleName === 'Clyde') {
                this.trackIndex = 2;
            } else {
                this.trackIndex = 0;
            }
        }
    }
}

class PacmanGame {
    constructor(canvas, assets) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.assets = assets;
        this.overlayEl = document.getElementById('messageOverlay');
        this.messageTextEl = document.getElementById('messageText');
        this.bgAudio = new Audio(ASSET_PATHS.audio);
        this.bgAudio.loop = true;
        this.state = 'idle';
        this.score = 0;
        this.intervalId = null;
        this.foods = [];
        this.walls = [];
        this.ghosts = [];
        this.hero = null;
        this.gate = null;
        this.touchControlsContainer = document.querySelector('.touch-controls');
        this.touchControls = Array.from(document.querySelectorAll('.control-btn'));
        this.bindEvents();
        this.bindTouchControls();
        this.enableTouchControlsIfNeeded();
        this.resetLevel();
    }

    resetLevel() {
        this.stopLoop();
        this.score = 0;
        this.state = 'running';
        this.walls = WALL_DEFS.map((def) => new Wall(...def, WALL_COLOR));
        this.gate = new Wall(...GATE_DEF, GATE_COLOR);
        this.hero = new Player(HERO_START.x, HERO_START.y, this.assets.heroImage, 'hero');
        this.hero.stop();
        this.ghosts = Object.keys(GHOST_STARTS).map((name) => {
            const start = GHOST_STARTS[name];
            return new Ghost(start.x, start.y, this.assets.ghostImages[name], name, GHOST_TRACKS[name]);
        });
        this.foods = this.generateFood();
        this.hideMessage();
        this.canvas.focus();
    }

    startLoop() {
        this.stopLoop();
        this.intervalId = window.setInterval(() => this.tick(), FRAME_INTERVAL);
    }

    stopLoop() {
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    tick() {
        if (this.state !== 'running') {
            return;
        }
        this.hero.update(this.walls, this.gate);
        this.handleFood();
        this.ghosts.forEach((ghost) => {
            ghost.advanceTrack();
            ghost.update(this.walls, null);
        });
        this.checkCollisions();
        this.draw();
    }

    draw() {
        this.ctx.fillStyle = BG_COLOR;
        this.ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        [...this.walls, this.gate].forEach((wall) => wall.draw(this.ctx));
        this.foods.forEach((food) => food.draw(this.ctx));
        this.hero.draw(this.ctx);
        this.ghosts.forEach((ghost) => ghost.draw(this.ctx));
        this.drawScore();
    }

    showMessage(text) {
        this.messageTextEl.textContent = text;
        this.overlayEl.classList.remove('hidden');
    }

    hideMessage() {
        this.overlayEl.classList.add('hidden');
    }

    endGame(hasWon) {
        this.state = 'finished';
        this.stopLoop();
        const message = hasWon ? 'Congratulations, you won!' : 'Game Over!';
        this.showMessage(message);
    }

    restart() {
        this.resetLevel();
        this.startLoop();
        this.playAudio();
    }

    handleFood() {
        const heroRect = this.hero.getRect();
        for (let i = this.foods.length - 1; i >= 0; i -= 1) {
            if (rectsOverlap(heroRect, this.foods[i])) {
                this.foods.splice(i, 1);
                this.score += 1;
            }
        }
        if (this.foods.length === 0) {
            this.endGame(true);
        }
    }

    checkCollisions() {
        const heroRect = this.hero.getRect();
        for (const ghost of this.ghosts) {
            if (rectsOverlap(heroRect, ghost.getRect())) {
                this.endGame(false);
                return;
            }
        }
    }

    drawScore() {
        this.ctx.font = HUD_FONT;
        this.ctx.fillStyle = SCORE_COLOR;
        const text = `Score: ${this.score}`;
        const metrics = this.ctx.measureText(text);
        this.ctx.fillText(text, CANVAS_SIZE - metrics.width - 10, 20);
    }

    generateFood() {
        const foods = [];
        const heroRect = this.hero.getRect();
        for (let row = 0; row < 19; row += 1) {
            for (let col = 0; col < 19; col += 1) {
                if ((row === 7 || row === 8) && (col === 8 || col === 9 || col === 10)) {
                    continue;
                }
                const x = 30 * col + 32;
                const y = 30 * row + 32;
                const foodRect = { x, y, width: 4, height: 4 };
                const hitWall = this.walls.some((wall) => rectsOverlap(foodRect, wall));
                if (hitWall) {
                    continue;
                }
                if (rectsOverlap(foodRect, heroRect)) {
                    continue;
                }
                foods.push(new Food(x, y, 4, 4));
            }
        }
        return foods;
    }

    bindEvents() {
        this.keydownHandler = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            const key = event.key;
            if (!this.overlayEl.classList.contains('hidden')) {
                if (key === 'Enter') {
                    event.preventDefault();
                    this.restart();
                } else if (key === 'Escape') {
                    event.preventDefault();
                    this.stopLoop();
                    this.showMessage('Game paused. Refresh to quit.');
                }
                return;
            }
            if (this.state !== 'running') {
                return;
            }
            switch (key) {
                case 'ArrowLeft':
                    this.applyDirection('left');
                    break;
                case 'ArrowRight':
                    this.applyDirection('right');
                    break;
                case 'ArrowUp':
                    this.applyDirection('up');
                    break;
                case 'ArrowDown':
                    this.applyDirection('down');
                    break;
                default:
                    return;
            }
            event.preventDefault();
        };

        this.keyupHandler = (event) => {
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                this.stopHero();
            }
        };

        window.addEventListener('keydown', this.keydownHandler);
        window.addEventListener('keyup', this.keyupHandler);
    }

    bindTouchControls() {
        this.touchControls.forEach((button) => {
            const direction = button.dataset.direction;
            const handlePointerDown = (event) => {
                event.preventDefault();
                this.applyDirection(direction);
            };
            const handlePointerUp = (event) => {
                event.preventDefault();
                this.stopHero();
            };
            button.addEventListener('pointerdown', handlePointerDown);
            button.addEventListener('pointerup', handlePointerUp);
            button.addEventListener('pointerleave', handlePointerUp);
            button.addEventListener('pointercancel', handlePointerUp);
        });
    }

    enableTouchControlsIfNeeded() {
        if (!this.touchControlsContainer) {
            return;
        }
        const coarseQuery = window.matchMedia('(pointer: coarse)');
        const hasTouch =
            'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        if (hasTouch || coarseQuery.matches) {
            this.touchControlsContainer.classList.add('visible');
        }
        const handleChange = (event) => {
            if (event.matches) {
                this.touchControlsContainer.classList.add('visible');
            } else if (window.innerWidth > 768) {
                this.touchControlsContainer.classList.remove('visible');
            }
        };
        if (typeof coarseQuery.addEventListener === 'function') {
            coarseQuery.addEventListener('change', handleChange);
        } else if (typeof coarseQuery.addListener === 'function') {
            coarseQuery.addListener(handleChange);
        }
    }

    applyDirection(directionKey) {
        if (this.state !== 'running') {
            return;
        }
        if (!this.overlayEl.classList.contains('hidden')) {
            return;
        }
        if (!this.hero) {
            return;
        }
        const dirMap = {
            left: [-1, 0],
            right: [1, 0],
            up: [0, -1],
            down: [0, 1],
        };
        const vector = dirMap[directionKey];
        if (!vector) {
            return;
        }
        this.hero.changeSpeed(vector);
        this.hero.isMoving = true;
        this.playAudio();
    }

    stopHero() {
        if (this.hero) {
            this.hero.stop();
        }
    }

    playAudio() {
        if (!this.bgAudio) {
            return;
        }
        const playPromise = this.bgAudio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
        }
    }
}

function initGame() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        throw new Error('Missing game canvas.');
    }
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    loadAssets()
        .then((assets) => {
            const game = new PacmanGame(canvas, assets);
            game.draw();
            game.startLoop();
        })
        .catch((error) => {
            const overlay = document.getElementById('messageOverlay');
            const text = document.getElementById('messageText');
            if (overlay && text) {
                text.textContent = error.message;
                overlay.classList.remove('hidden');
            }
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', initGame);
