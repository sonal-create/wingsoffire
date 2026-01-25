// Wings of Fire - Visual Adventure Game
// Keyboard-controlled with moving dragon character

// ============================================
// GAME CONFIGURATION
// ============================================

const CONFIG = {
    TILE_SIZE: 40,
    PLAYER_SPEED: 4,
    FLYING_SPEED: 6,
    STAMINA_DRAIN: 0.5,
    STAMINA_REGEN: 0.2
};

// ============================================
// TRIBE DATA
// ============================================

const TRIBES = {
    MudWing: {
        name: 'MudWing',
        color: '#8B4513',
        baseStats: { hp: 120, attack: 12, defense: 15 },
        special: 'Mud Shield',
        specialDesc: '+50% defense for 3 turns',
        flightBonus: { stamina: 80, speed: 0.8 }
    },
    SandWing: {
        name: 'SandWing',
        color: '#DEB887',
        baseStats: { hp: 100, attack: 18, defense: 10 },
        special: 'Venom Strike',
        specialDesc: 'Poison enemy for 3 turns',
        flightBonus: { stamina: 100, speed: 1.0 }
    },
    SkyWing: {
        name: 'SkyWing',
        color: '#DC143C',
        baseStats: { hp: 100, attack: 20, defense: 8 },
        special: 'Inferno',
        specialDesc: 'Fire damage + burn',
        flightBonus: { stamina: 150, speed: 1.5 }
    },
    SeaWing: {
        name: 'SeaWing',
        color: '#20B2AA',
        baseStats: { hp: 110, attack: 14, defense: 12 },
        special: 'Tidal Crush',
        specialDesc: 'Water attack + stun chance',
        flightBonus: { stamina: 90, speed: 0.9 }
    },
    RainWing: {
        name: 'RainWing',
        color: '#9932CC',
        baseStats: { hp: 85, attack: 22, defense: 8 },
        special: 'Death Spit',
        specialDesc: 'Acid melts armor',
        flightBonus: { stamina: 110, speed: 1.1 }
    },
    IceWing: {
        name: 'IceWing',
        color: '#87CEEB',
        baseStats: { hp: 105, attack: 14, defense: 14 },
        special: 'Frost Breath',
        specialDesc: 'Freeze enemy, slow them',
        flightBonus: { stamina: 120, speed: 1.2 }
    },
    NightWing: {
        name: 'NightWing',
        color: '#4B0082',
        baseStats: { hp: 100, attack: 16, defense: 12 },
        special: 'Nightmare',
        specialDesc: 'Psychic attack + confuse',
        flightBonus: { stamina: 100, speed: 1.0 }
    }
};

// ============================================
// LOCATION DATA
// ============================================

const LOCATIONS = {
    mudKingdom: {
        name: 'The Mud Kingdom',
        color: '#3d2817',
        groundColor: '#5a3d1a',
        enemies: ['Swamp Snake', 'Mud Crawler', 'MudWing Scout'],
        enemyLevel: [1, 3],
        bossLevel: 5,
        bossName: 'Marsh King'
    },
    sandKingdom: {
        name: 'The Sand Kingdom',
        color: '#c4a35a',
        groundColor: '#e6c87a',
        enemies: ['Sand Viper', 'Scorpion', 'SandWing Patrol'],
        enemyLevel: [2, 4],
        bossLevel: 7,
        bossName: 'Queen Scorpion'
    },
    skyKingdom: {
        name: 'The Sky Kingdom',
        color: '#4a6fa5',
        groundColor: '#7a8a8a',
        enemies: ['Mountain Eagle', 'Rock Snake', 'SkyWing Guard'],
        enemyLevel: [3, 5],
        bossLevel: 9,
        bossName: 'Thunderwing'
    },
    seaKingdom: {
        name: 'The Sea Kingdom',
        color: '#1a5a6a',
        groundColor: '#2a7a8a',
        enemies: ['Giant Crab', 'Shark', 'SeaWing Warrior'],
        enemyLevel: [2, 4],
        bossLevel: 8,
        bossName: 'Leviathan'
    },
    rainforest: {
        name: 'The Rainforest',
        color: '#1a4a2a',
        groundColor: '#2a6a3a',
        enemies: ['Jungle Cat', 'Poison Frog', 'RainWing Sentry'],
        enemyLevel: [3, 5],
        bossLevel: 10,
        bossName: 'Jungle Hydra'
    },
    iceKingdom: {
        name: 'The Ice Kingdom',
        color: '#a0c0d0',
        groundColor: '#d0e0f0',
        enemies: ['Frost Wolf', 'Ice Bear', 'IceWing Soldier'],
        enemyLevel: [4, 6],
        bossLevel: 11,
        bossName: 'Frost Wyrm'
    },
    nightKingdom: {
        name: 'The Night Kingdom',
        color: '#1a1a2a',
        groundColor: '#2a2a4a',
        enemies: ['Shadow Bat', 'Lava Serpent', 'NightWing Shadow'],
        enemyLevel: [5, 7],
        bossLevel: 15,
        bossName: 'Darkstalker'
    }
};

// ============================================
// ITEMS DATA
// ============================================

const ITEMS = {
    healingPotion: { name: 'Healing Potion', icon: '🧪', effect: 'heal', value: 50 },
    megaPotion: { name: 'Mega Potion', icon: '💊', effect: 'heal', value: 150 },
    antidote: { name: 'Antidote', icon: '💉', effect: 'cure', cures: 'poison' },
    energyDrink: { name: 'Energy Drink', icon: '⚡', effect: 'stamina', value: 50 }
};

// ============================================
// GAME STATE
// ============================================

const game = {
    currentScreen: 'title',
    player: null,
    world: null,
    battle: null,
    keys: {},
    selectedTribe: 0,
    tribeList: Object.keys(TRIBES),
    canvas: null,
    ctx: null,
    animationFrame: null,
    lastTime: 0
};

// ============================================
// PLAYER CLASS
// ============================================

class Player {
    constructor(name, tribe) {
        this.name = name;
        this.tribe = tribe;
        this.level = 1;
        this.xp = 0;
        this.xpToLevel = 100;
        this.gold = 0;

        const t = TRIBES[tribe];
        this.maxHp = t.baseStats.hp;
        this.hp = this.maxHp;
        this.baseAttack = t.baseStats.attack;
        this.baseDefense = t.baseStats.defense;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;

        this.maxStamina = t.flightBonus.stamina;
        this.stamina = this.maxStamina;
        this.flightSpeed = t.flightBonus.speed;

        this.special = t.special;
        this.specialCooldown = 0;

        this.inventory = [
            { id: 'healingPotion', count: 3 },
            { id: 'energyDrink', count: 1 }
        ];

        this.equipment = { weapon: null, armor: null };
        this.statusEffects = [];

        // Position in world
        this.x = 400;
        this.y = 250;
        this.vx = 0;
        this.vy = 0;
        this.flying = false;
        this.facing = 'right';
        this.animFrame = 0;
    }

    heal(amount) {
        const healed = Math.min(amount, this.maxHp - this.hp);
        this.hp += healed;
        return healed;
    }

    takeDamage(amount) {
        const reduced = Math.max(1, amount - Math.floor(this.defense / 3));
        this.hp = Math.max(0, this.hp - reduced);
        return reduced;
    }

    gainXP(amount) {
        this.xp += amount;
        if (this.xp >= this.xpToLevel) {
            return this.levelUp();
        }
        return false;
    }

    levelUp() {
        this.xp -= this.xpToLevel;
        this.level++;
        this.xpToLevel = Math.floor(this.xpToLevel * 1.4);
        this.maxHp += 10;
        this.hp = this.maxHp;
        this.baseAttack += 2;
        this.baseDefense += 2;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;
        return true;
    }

    useItem(itemId) {
        const itemSlot = this.inventory.find(i => i.id === itemId);
        if (!itemSlot || itemSlot.count <= 0) return null;

        const item = ITEMS[itemId];
        itemSlot.count--;
        if (itemSlot.count <= 0) {
            this.inventory = this.inventory.filter(i => i.count > 0);
        }

        return item;
    }

    addItem(itemId, count = 1) {
        const existing = this.inventory.find(i => i.id === itemId);
        if (existing) {
            existing.count += count;
        } else {
            this.inventory.push({ id: itemId, count });
        }
    }
}

// ============================================
// ENEMY CLASS
// ============================================

class Enemy {
    constructor(name, level, isBoss = false) {
        this.name = name;
        this.level = level;
        this.isBoss = isBoss;

        if (isBoss) {
            this.maxHp = 200 + level * 30;
            this.attack = 15 + level * 3;
            this.defense = 10 + level * 2;
            this.xpReward = 100 + level * 20;
            this.goldReward = 50 + level * 10;
        } else {
            this.maxHp = 30 + level * 15;
            this.attack = 5 + level * 3;
            this.defense = 3 + level * 2;
            this.xpReward = 15 + level * 8;
            this.goldReward = 5 + level * 5;
        }

        this.hp = this.maxHp;
        this.statusEffects = [];
    }

    takeDamage(amount) {
        const reduced = Math.max(1, amount - Math.floor(this.defense / 3));
        this.hp = Math.max(0, this.hp - reduced);
        return reduced;
    }
}

// ============================================
// WORLD CLASS
// ============================================

class World {
    constructor(locationId) {
        this.locationId = locationId;
        this.location = LOCATIONS[locationId];
        this.entities = [];
        this.particles = [];
        this.width = 1000;
        this.height = 500;

        this.generateEntities();
    }

    generateEntities() {
        // Add some collectibles
        for (let i = 0; i < 5; i++) {
            this.entities.push({
                type: 'gold',
                x: 100 + Math.random() * 800,
                y: 100 + Math.random() * 300,
                value: 10 + Math.floor(Math.random() * 20),
                collected: false
            });
        }

        // Add healing spots
        for (let i = 0; i < 2; i++) {
            this.entities.push({
                type: 'heal',
                x: 100 + Math.random() * 800,
                y: 100 + Math.random() * 300,
                value: 20 + Math.floor(Math.random() * 30),
                collected: false
            });
        }

        // Add enemies
        const loc = this.location;
        for (let i = 0; i < 3; i++) {
            const enemyName = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
            const level = loc.enemyLevel[0] + Math.floor(Math.random() * (loc.enemyLevel[1] - loc.enemyLevel[0] + 1));
            this.entities.push({
                type: 'enemy',
                x: 150 + Math.random() * 700,
                y: 100 + Math.random() * 300,
                name: enemyName,
                level: level,
                defeated: false,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        }

        // Add boss if available
        this.entities.push({
            type: 'boss',
            x: 850,
            y: 250,
            name: loc.bossName,
            level: loc.bossLevel,
            defeated: false
        });

        // Add exit portals
        this.entities.push({
            type: 'portal',
            x: 50,
            y: 250,
            destination: this.getPreviousLocation()
        });
        this.entities.push({
            type: 'portal',
            x: 950,
            y: 250,
            destination: this.getNextLocation()
        });
    }

    getPreviousLocation() {
        const locs = Object.keys(LOCATIONS);
        const idx = locs.indexOf(this.locationId);
        return locs[(idx - 1 + locs.length) % locs.length];
    }

    getNextLocation() {
        const locs = Object.keys(LOCATIONS);
        const idx = locs.indexOf(this.locationId);
        return locs[(idx + 1) % locs.length];
    }

    update(player, dt) {
        // Move enemies
        this.entities.forEach(e => {
            if (e.type === 'enemy' && !e.defeated) {
                e.x += e.vx;
                e.y += e.vy;

                // Bounce off walls
                if (e.x < 100 || e.x > 900) e.vx *= -1;
                if (e.y < 50 || e.y > 400) e.vy *= -1;

                e.x = Math.max(100, Math.min(900, e.x));
                e.y = Math.max(50, Math.min(400, e.y));
            }
        });

        // Check collisions with player
        this.entities.forEach(e => {
            if (e.collected || e.defeated) return;

            const dist = Math.sqrt((player.x - e.x) ** 2 + (player.y - e.y) ** 2);

            if (dist < 30) {
                this.handleCollision(player, e);
            }
        });

        // Update particles
        this.particles = this.particles.filter(p => {
            p.life -= dt;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            return p.life > 0;
        });
    }

    handleCollision(player, entity) {
        switch (entity.type) {
            case 'gold':
                entity.collected = true;
                player.gold += entity.value;
                addLog(`Found ${entity.value} gold!`, 'reward');
                this.spawnParticles(entity.x, entity.y, '#FFD700', 10);
                break;

            case 'heal':
                entity.collected = true;
                const healed = player.heal(entity.value);
                addLog(`Found healing herbs! +${healed} HP`, 'reward');
                this.spawnParticles(entity.x, entity.y, '#2ecc71', 10);
                break;

            case 'enemy':
                if (!entity.defeated) {
                    startBattle(entity.name, entity.level, false, entity);
                }
                break;

            case 'boss':
                if (!entity.defeated) {
                    if (player.level >= this.location.bossLevel) {
                        startBattle(entity.name, entity.level, true, entity);
                    } else {
                        addLog(`Need level ${this.location.bossLevel} to fight ${entity.name}!`, 'info');
                    }
                }
                break;

            case 'portal':
                addLog(`Traveling to ${LOCATIONS[entity.destination].name}...`, 'info');
                setTimeout(() => {
                    game.world = new World(entity.destination);
                    player.x = entity.destination === this.getNextLocation() ? 100 : 900;
                    updateHUD();
                }, 500);
                break;
        }
    }

    spawnParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 5,
                vy: -Math.random() * 5,
                color,
                life: 1
            });
        }
    }

    draw(ctx, player) {
        const loc = this.location;

        // Background
        ctx.fillStyle = loc.color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Ground
        ctx.fillStyle = loc.groundColor;
        ctx.fillRect(0, ctx.canvas.height - 100, ctx.canvas.width, 100);

        // Draw decorations based on location
        this.drawDecorations(ctx);

        // Draw entities
        this.entities.forEach(e => {
            if (e.collected || e.defeated) return;
            this.drawEntity(ctx, e);
        });

        // Draw particles
        this.particles.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Draw player
        this.drawPlayer(ctx, player);
    }

    drawDecorations(ctx) {
        // Simple decorations based on location
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(100 + i * 200, ctx.canvas.height - 80, 30, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawEntity(ctx, e) {
        ctx.save();
        ctx.translate(e.x, e.y);

        switch (e.type) {
            case 'gold':
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFA500';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('$', 0, 5);
                break;

            case 'heal':
                ctx.fillStyle = '#2ecc71';
                ctx.beginPath();
                ctx.arc(0, 0, 12, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('+', 0, 6);
                break;

            case 'enemy':
                ctx.fillStyle = '#c0392b';
                ctx.beginPath();
                ctx.arc(0, 0, 20, 0, Math.PI * 2);
                ctx.fill();
                // Eyes
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(-6, -5, 4, 0, Math.PI * 2);
                ctx.arc(6, -5, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(-5, -5, 2, 0, Math.PI * 2);
                ctx.arc(7, -5, 2, 0, Math.PI * 2);
                ctx.fill();
                // Level
                ctx.fillStyle = '#fff';
                ctx.font = '10px Arial';
                ctx.fillText(`Lv.${e.level}`, 0, 35);
                break;

            case 'boss':
                ctx.fillStyle = '#8e44ad';
                ctx.beginPath();
                ctx.arc(0, 0, 35, 0, Math.PI * 2);
                ctx.fill();
                // Crown
                ctx.fillStyle = '#FFD700';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('👑', 0, -25);
                // Eyes
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(-10, -5, 6, 0, Math.PI * 2);
                ctx.arc(10, -5, 6, 0, Math.PI * 2);
                ctx.fill();
                // Name
                ctx.fillStyle = '#FFD700';
                ctx.font = '12px Arial';
                ctx.fillText(e.name, 0, 55);
                ctx.fillText(`Lv.${e.level}`, 0, 70);
                break;

            case 'portal':
                ctx.strokeStyle = '#9b59b6';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 25, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = 'rgba(155, 89, 182, 0.3)';
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('EXIT', 0, 5);
                break;
        }

        ctx.restore();
    }

    drawPlayer(ctx, player) {
        ctx.save();
        ctx.translate(player.x, player.y);

        // Shadow when flying
        if (player.flying) {
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(0, 30, 25, 10, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.translate(0, -20); // Float up when flying
        }

        // Body
        const tribe = TRIBES[player.tribe];
        ctx.fillStyle = tribe.color;

        // Main body
        ctx.beginPath();
        ctx.ellipse(0, 0, 25, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        const headX = player.facing === 'right' ? 20 : -20;
        ctx.beginPath();
        ctx.arc(headX, -10, 12, 0, Math.PI * 2);
        ctx.fill();

        // Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(headX + (player.facing === 'right' ? 5 : -5), -12, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(headX + (player.facing === 'right' ? 6 : -6), -12, 2, 0, Math.PI * 2);
        ctx.fill();

        // Wings
        ctx.fillStyle = tribe.color;
        const wingY = player.flying ? Math.sin(Date.now() / 100) * 10 - 20 : -5;
        ctx.beginPath();
        ctx.moveTo(-10, -5);
        ctx.lineTo(-30, wingY);
        ctx.lineTo(-15, 0);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(10, -5);
        ctx.lineTo(30, wingY);
        ctx.lineTo(15, 0);
        ctx.closePath();
        ctx.fill();

        // Tail
        ctx.beginPath();
        ctx.moveTo(player.facing === 'right' ? -25 : 25, 5);
        ctx.lineTo(player.facing === 'right' ? -45 : 45, 15);
        ctx.lineTo(player.facing === 'right' ? -40 : 40, 5);
        ctx.closePath();
        ctx.fill();

        // Flying indicator
        if (player.flying) {
            ctx.fillStyle = '#20b2aa';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('FLYING', 0, -45);
        }

        ctx.restore();
    }
}

// ============================================
// SCREEN MANAGEMENT
// ============================================

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenName + '-screen');
    if (screen) screen.classList.add('active');
    game.currentScreen = screenName;

    // Close overlays
    document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden'));
}

function toggleOverlay(overlayId) {
    const overlay = document.getElementById(overlayId + '-overlay');
    if (overlay) {
        overlay.classList.toggle('hidden');
    }
}

// ============================================
// HUD UPDATES
// ============================================

function updateHUD() {
    if (!game.player) return;

    const p = game.player;

    document.getElementById('player-name-display').textContent = p.name;
    document.getElementById('player-tribe-badge').textContent = p.tribe;
    document.getElementById('player-tribe-badge').style.background = TRIBES[p.tribe].color;
    document.getElementById('player-level').textContent = `Lv.${p.level}`;

    document.getElementById('hud-hp-bar').style.width = `${(p.hp / p.maxHp) * 100}%`;
    document.getElementById('hp-text').textContent = `${p.hp}/${p.maxHp}`;

    document.getElementById('hud-stamina-bar').style.width = `${(p.stamina / p.maxStamina) * 100}%`;
    document.getElementById('stamina-text').textContent = `${Math.floor(p.stamina)}/${p.maxStamina}`;

    document.getElementById('hud-xp-bar').style.width = `${(p.xp / p.xpToLevel) * 100}%`;
    document.getElementById('xp-text').textContent = `${p.xp}/${p.xpToLevel}`;

    document.getElementById('atk-stat').textContent = p.attack;
    document.getElementById('def-stat').textContent = p.defense;
    document.getElementById('gold-stat').textContent = p.gold;

    if (game.world) {
        document.getElementById('location-display').textContent = game.world.location.name;
    }

    const flightInd = document.getElementById('flight-indicator');
    if (p.flying) {
        flightInd.classList.remove('hidden');
    } else {
        flightInd.classList.add('hidden');
    }
}

// ============================================
// GAME LOG
// ============================================

function addLog(message, type = 'info') {
    const logContent = document.getElementById('log-content');
    if (!logContent) return;

    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    logContent.appendChild(entry);
    logContent.scrollTop = logContent.scrollHeight;

    while (logContent.children.length > 20) {
        logContent.removeChild(logContent.firstChild);
    }
}

// ============================================
// BATTLE SYSTEM
// ============================================

function startBattle(enemyName, level, isBoss, entityRef) {
    game.battle = {
        enemy: new Enemy(enemyName, level, isBoss),
        entityRef: entityRef,
        turn: 'player',
        combo: 0,
        defending: false,
        canAct: true
    };

    showScreen('battle');
    updateBattleUI();
    addBattleLog(`A wild ${enemyName} appears!`, 'system');

    if (isBoss) {
        document.getElementById('battle-title').textContent = '👑 BOSS BATTLE! 👑';
    } else {
        document.getElementById('battle-title').textContent = 'Battle!';
    }
}

function updateBattleUI() {
    if (!game.battle) return;

    const p = game.player;
    const e = game.battle.enemy;

    document.getElementById('battle-player-name').textContent = p.name;
    document.getElementById('player-hp-bar').style.width = `${(p.hp / p.maxHp) * 100}%`;
    document.getElementById('player-hp-text').textContent = `${p.hp}/${p.maxHp}`;
    document.getElementById('player-battle-display').textContent = '🐉';
    document.getElementById('player-battle-display').style.color = TRIBES[p.tribe].color;

    document.getElementById('enemy-name').textContent = `${e.name} (Lv.${e.level})`;
    document.getElementById('enemy-hp-bar').style.width = `${(e.hp / e.maxHp) * 100}%`;
    document.getElementById('enemy-hp-text').textContent = `${e.hp}/${e.maxHp}`;
    document.getElementById('enemy-display').textContent = e.isBoss ? '👑🐲' : '🐲';

    const comboDisplay = document.getElementById('combo-display');
    if (game.battle.combo > 1) {
        comboDisplay.classList.remove('hidden');
        document.getElementById('combo-count').textContent = game.battle.combo;
    } else {
        comboDisplay.classList.add('hidden');
    }
}

function addBattleLog(message, type = 'system') {
    const logContent = document.getElementById('battle-log-content');
    if (!logContent) return;

    const entry = document.createElement('div');
    entry.className = `battle-message ${type}`;
    entry.textContent = message;
    logContent.appendChild(entry);
    logContent.scrollTop = logContent.scrollHeight;
}

function battleAction(action) {
    if (!game.battle || !game.battle.canAct || game.battle.turn !== 'player') return;

    const p = game.player;
    const e = game.battle.enemy;
    game.battle.canAct = false;

    switch (action) {
        case 'attack':
            const dmg = p.attack + Math.floor(Math.random() * 5);
            const dealt = e.takeDamage(dmg);
            game.battle.combo++;
            addBattleLog(`You attack for ${dealt} damage!`, 'player');
            if (game.battle.combo > 2) {
                addBattleLog(`${game.battle.combo}x Combo!`, 'critical');
            }
            break;

        case 'heavy':
            const heavyDmg = Math.floor(p.attack * 1.5) + Math.floor(Math.random() * 10);
            const heavyDealt = e.takeDamage(heavyDmg);
            game.battle.combo++;
            addBattleLog(`Heavy attack for ${heavyDealt} damage!`, 'player');
            break;

        case 'special':
            if (p.specialCooldown > 0) {
                addBattleLog(`${p.special} on cooldown (${p.specialCooldown} turns)`, 'system');
                game.battle.canAct = true;
                return;
            }
            const specialDmg = Math.floor(p.attack * 2);
            const specialDealt = e.takeDamage(specialDmg);
            p.specialCooldown = 4;
            game.battle.combo++;
            addBattleLog(`${p.special}! ${specialDealt} damage!`, 'critical');
            break;

        case 'defend':
            game.battle.defending = true;
            game.battle.combo = 0;
            addBattleLog('You brace for attack! (50% damage reduction)', 'player');
            break;

        case 'item':
            toggleOverlay('inventory');
            game.battle.canAct = true;
            return;

        case 'flee':
            if (e.isBoss) {
                addBattleLog("Can't flee from a boss!", 'system');
                game.battle.canAct = true;
                return;
            }
            if (Math.random() < 0.6) {
                addBattleLog('You escaped!', 'system');
                endBattle(false);
                return;
            }
            addBattleLog('Failed to escape!', 'system');
            game.battle.combo = 0;
            break;
    }

    updateBattleUI();

    if (e.hp <= 0) {
        setTimeout(() => endBattle(true), 500);
        return;
    }

    // Enemy turn
    setTimeout(() => {
        enemyTurn();
    }, 800);
}

function enemyTurn() {
    if (!game.battle) return;

    const p = game.player;
    const e = game.battle.enemy;

    game.battle.turn = 'enemy';

    let dmg = e.attack + Math.floor(Math.random() * 5);
    if (game.battle.defending) {
        dmg = Math.floor(dmg / 2);
        game.battle.defending = false;
    }

    const dealt = p.takeDamage(dmg);
    addBattleLog(`${e.name} attacks for ${dealt} damage!`, 'enemy');

    // Reduce cooldowns
    if (p.specialCooldown > 0) p.specialCooldown--;

    updateBattleUI();
    updateHUD();

    if (p.hp <= 0) {
        setTimeout(() => gameOver(), 500);
        return;
    }

    game.battle.turn = 'player';
    game.battle.canAct = true;
}

function endBattle(victory) {
    if (victory) {
        const e = game.battle.enemy;
        const leveledUp = game.player.gainXP(e.xpReward);
        game.player.gold += e.goldReward;

        if (game.battle.entityRef) {
            game.battle.entityRef.defeated = true;
        }

        document.getElementById('victory-title').textContent = e.isBoss ? '👑 BOSS DEFEATED! 👑' : 'Victory!';
        document.getElementById('victory-message').textContent = `Defeated ${e.name}!`;
        document.getElementById('victory-rewards').textContent = `+${e.xpReward} XP, +${e.goldReward} Gold`;

        if (Math.random() < 0.3) {
            game.player.addItem('healingPotion');
            document.getElementById('loot-drops').innerHTML = '<div class="loot-item">🧪 Healing Potion</div>';
        } else {
            document.getElementById('loot-drops').innerHTML = '';
        }

        showScreen('victory');

        if (leveledUp) {
            setTimeout(() => {
                document.getElementById('levelup-message').textContent =
                    `${game.player.name} is now Level ${game.player.level}!`;
                showScreen('levelup');
            }, 1500);
        }
    } else {
        showScreen('game');
        addLog('Escaped from battle!', 'info');
    }

    game.battle = null;
    updateHUD();
}

function gameOver() {
    document.getElementById('gameover-message').textContent =
        `${game.player.name} was defeated at level ${game.player.level}...`;
    showScreen('gameover');
    game.battle = null;
}

// ============================================
// INVENTORY
// ============================================

function renderInventory() {
    if (!game.player) return;

    const equipSlots = document.getElementById('equipment-slots');
    equipSlots.innerHTML = `
        <div class="equipment-slot">
            <div class="label">Weapon</div>
            <div class="item">${game.player.equipment.weapon || 'None'}</div>
        </div>
        <div class="equipment-slot">
            <div class="label">Armor</div>
            <div class="item">${game.player.equipment.armor || 'None'}</div>
        </div>
    `;

    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    game.player.inventory.forEach(slot => {
        const item = ITEMS[slot.id];
        if (!item) return;

        const div = document.createElement('div');
        div.className = 'inventory-item';
        div.innerHTML = `
            <div class="icon">${item.icon}</div>
            <div class="name">${item.name}</div>
            <div class="count">x${slot.count}</div>
        `;
        div.onclick = () => useItemFromInventory(slot.id);
        itemsList.appendChild(div);
    });
}

function useItemFromInventory(itemId) {
    const item = game.player.useItem(itemId);
    if (!item) return;

    switch (item.effect) {
        case 'heal':
            const healed = game.player.heal(item.value);
            addLog(`Used ${item.name}! +${healed} HP`, 'reward');
            if (game.battle) {
                addBattleLog(`Used ${item.name}! +${healed} HP`, 'player');
                game.battle.combo = 0;
                setTimeout(() => enemyTurn(), 500);
            }
            break;
        case 'stamina':
            game.player.stamina = Math.min(game.player.maxStamina, game.player.stamina + item.value);
            addLog(`Used ${item.name}! +${item.value} Stamina`, 'reward');
            break;
    }

    updateHUD();
    renderInventory();
    toggleOverlay('inventory');
}

// ============================================
// MAP
// ============================================

function renderMap() {
    const canvas = document.getElementById('map-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;

    // Draw ocean
    ctx.fillStyle = '#1a3a4a';
    ctx.fillRect(0, 0, 400, 300);

    // Draw locations
    const locs = Object.entries(LOCATIONS);
    const positions = [
        { x: 100, y: 150 }, // mud
        { x: 50, y: 220 },  // sand
        { x: 200, y: 80 },  // sky
        { x: 80, y: 80 },   // sea
        { x: 150, y: 250 }, // rain
        { x: 300, y: 60 },  // ice
        { x: 350, y: 200 }  // night
    ];

    locs.forEach(([id, loc], i) => {
        const pos = positions[i];
        const isCurrent = game.world && game.world.locationId === id;

        ctx.fillStyle = loc.color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isCurrent ? 25 : 18, 0, Math.PI * 2);
        ctx.fill();

        if (isCurrent) {
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(loc.name.replace('The ', ''), pos.x, pos.y + 35);
    });

    // Info
    if (game.world) {
        document.getElementById('map-info').innerHTML = `
            <strong>Current: ${game.world.location.name}</strong><br>
            Enemies: Lv.${game.world.location.enemyLevel.join('-')}<br>
            Boss: ${game.world.location.bossName} (Lv.${game.world.location.bossLevel})
        `;
    }
}

// ============================================
// GAME LOOP
// ============================================

function gameLoop(timestamp) {
    const dt = (timestamp - game.lastTime) / 1000;
    game.lastTime = timestamp;

    if (game.currentScreen === 'game' && game.player && game.world) {
        update(dt);
        render();
    }

    game.animationFrame = requestAnimationFrame(gameLoop);
}

function update(dt) {
    const p = game.player;
    const speed = p.flying ? CONFIG.FLYING_SPEED : CONFIG.PLAYER_SPEED;

    // Movement
    p.vx = 0;
    p.vy = 0;

    if (game.keys['KeyW'] || game.keys['ArrowUp']) p.vy = -speed;
    if (game.keys['KeyS'] || game.keys['ArrowDown']) p.vy = speed;
    if (game.keys['KeyA'] || game.keys['ArrowLeft']) { p.vx = -speed; p.facing = 'left'; }
    if (game.keys['KeyD'] || game.keys['ArrowRight']) { p.vx = speed; p.facing = 'right'; }

    p.x += p.vx;
    p.y += p.vy;

    // Boundaries
    p.x = Math.max(30, Math.min(game.world.width - 30, p.x));
    p.y = Math.max(30, Math.min(game.world.height - 130, p.y));

    // Flight stamina
    if (p.flying) {
        p.stamina -= CONFIG.STAMINA_DRAIN;
        if (p.stamina <= 0) {
            p.stamina = 0;
            p.flying = false;
            addLog('Out of stamina! Landed.', 'info');
        }
    } else {
        p.stamina = Math.min(p.maxStamina, p.stamina + CONFIG.STAMINA_REGEN);
    }

    // Update world
    game.world.update(p, dt);
    updateHUD();
}

function render() {
    if (!game.canvas || !game.ctx) return;

    game.canvas.width = game.canvas.parentElement.clientWidth;
    game.canvas.height = game.canvas.parentElement.clientHeight;

    game.world.draw(game.ctx, game.player);
}

// ============================================
// INPUT HANDLING
// ============================================

function handleKeyDown(e) {
    game.keys[e.code] = true;

    // Prevent default for game keys
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }

    switch (game.currentScreen) {
        case 'title':
            if (e.code === 'Enter') {
                showScreen('character');
                setupCharacterScreen();
            }
            break;

        case 'character':
            handleCharacterInput(e);
            break;

        case 'game':
            handleGameInput(e);
            break;

        case 'battle':
            handleBattleInput(e);
            break;

        case 'victory':
        case 'levelup':
            if (e.code === 'Enter') {
                showScreen('game');
            }
            break;

        case 'gameover':
            if (e.code === 'Enter') {
                resetGame();
            }
            break;
    }
}

function handleKeyUp(e) {
    game.keys[e.code] = false;
}

function handleCharacterInput(e) {
    const cards = document.querySelectorAll('.tribe-card');

    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        game.selectedTribe = (game.selectedTribe - 1 + game.tribeList.length) % game.tribeList.length;
        updateTribeSelection();
    }
    else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        game.selectedTribe = (game.selectedTribe + 1) % game.tribeList.length;
        updateTribeSelection();
    }
    else if (e.code === 'Enter') {
        const nameInput = document.getElementById('dragon-name');
        const name = nameInput.value.trim() || 'Dragon';
        const tribe = game.tribeList[game.selectedTribe];

        game.player = new Player(name, tribe);
        game.world = new World('mudKingdom');

        showScreen('game');
        updateHUD();
        addLog(`Welcome, ${name} the ${tribe}! Your adventure begins...`, 'info');
        addLog('Use WASD to move. Press H for help.', 'info');
    }
}

function handleGameInput(e) {
    // Close overlays first
    if (e.code === 'Escape') {
        document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden'));
        return;
    }

    // Check if overlay is open
    const overlayOpen = !document.getElementById('inventory-overlay').classList.contains('hidden') ||
                        !document.getElementById('map-overlay').classList.contains('hidden') ||
                        !document.getElementById('help-overlay').classList.contains('hidden');

    if (overlayOpen) {
        if (e.code === 'KeyI') toggleOverlay('inventory');
        if (e.code === 'KeyM') toggleOverlay('map');
        if (e.code === 'KeyH') toggleOverlay('help');
        return;
    }

    switch (e.code) {
        case 'KeyF':
            if (game.player.stamina > 10) {
                game.player.flying = !game.player.flying;
                addLog(game.player.flying ? 'Taking flight!' : 'Landing...', 'info');
            } else {
                addLog('Not enough stamina to fly!', 'info');
            }
            break;
        case 'KeyI':
            renderInventory();
            toggleOverlay('inventory');
            break;
        case 'KeyM':
            renderMap();
            toggleOverlay('map');
            break;
        case 'KeyH':
            toggleOverlay('help');
            break;
        case 'KeyR':
            const hpRecovered = game.player.heal(Math.floor(game.player.maxHp * 0.3));
            game.player.stamina = Math.min(game.player.maxStamina, game.player.stamina + 30);
            addLog(`Resting... +${hpRecovered} HP, +30 Stamina`, 'reward');
            updateHUD();
            break;
    }
}

function handleBattleInput(e) {
    if (!game.battle || !game.battle.canAct) return;

    // Check for inventory overlay
    if (!document.getElementById('inventory-overlay').classList.contains('hidden')) {
        if (e.code === 'Escape' || e.code === 'KeyI') {
            toggleOverlay('inventory');
        }
        return;
    }

    switch (e.code) {
        case 'Space':
            if (e.shiftKey) {
                battleAction('heavy');
            } else {
                battleAction('attack');
            }
            break;
        case 'KeyE':
            battleAction('special');
            break;
        case 'KeyQ':
            battleAction('defend');
            break;
        case 'KeyI':
            renderInventory();
            toggleOverlay('inventory');
            break;
        case 'Escape':
            battleAction('flee');
            break;
    }
}

function updateTribeSelection() {
    const cards = document.querySelectorAll('.tribe-card');
    cards.forEach((card, i) => {
        if (i === game.selectedTribe) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

function setupCharacterScreen() {
    // Add dragon icons to tribe cards
    document.querySelectorAll('.tribe-card').forEach((card, i) => {
        const tribe = game.tribeList[i];
        const icon = card.querySelector('.tribe-icon');
        icon.innerHTML = `<div style="width:50px;height:50px;background:${TRIBES[tribe].color};border-radius:50%;display:flex;justify-content:center;align-items:center;font-size:24px;">🐉</div>`;
    });

    updateTribeSelection();
    document.getElementById('dragon-name').focus();
}

function resetGame() {
    game.player = null;
    game.world = null;
    game.battle = null;
    game.selectedTribe = 0;

    document.getElementById('dragon-name').value = '';
    document.getElementById('log-content').innerHTML = '';

    showScreen('title');
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Get canvas
    game.canvas = document.getElementById('game-canvas');
    if (game.canvas) {
        game.ctx = game.canvas.getContext('2d');
    }

    // Event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Click handlers for tribe cards
    document.querySelectorAll('.tribe-card').forEach((card, i) => {
        card.addEventListener('click', () => {
            game.selectedTribe = i;
            updateTribeSelection();
        });
    });

    // Start game loop
    game.lastTime = performance.now();
    gameLoop(game.lastTime);

    console.log('Wings of Fire initialized! Press ENTER to start.');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
