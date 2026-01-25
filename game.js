// Wings of Fire - Dragon Adventure Game
// Enhanced Edition with Bosses, Items, Status Effects, and Combos

// ============================================
// GAME DATA
// ============================================

const TRIBES = {
    MudWing: {
        name: 'MudWing',
        description: 'Strong and resilient dragons from the swamps.',
        baseStats: { hp: 120, attack: 12, defense: 15 },
        special: 'Mud Shield',
        specialDesc: 'Greatly increase defense for 3 turns',
        color: '#8B4513'
    },
    SandWing: {
        name: 'SandWing',
        description: 'Desert warriors with venomous tail barbs.',
        baseStats: { hp: 100, attack: 18, defense: 10 },
        special: 'Venom Strike',
        specialDesc: 'Poison the enemy for 3 turns',
        color: '#DEB887'
    },
    SkyWing: {
        name: 'SkyWing',
        description: 'Fastest flyers with powerful fire breath.',
        baseStats: { hp: 100, attack: 20, defense: 8 },
        special: 'Inferno',
        specialDesc: 'Devastating fire attack that burns enemy',
        color: '#DC143C'
    },
    SeaWing: {
        name: 'SeaWing',
        description: 'Aquatic dragons who glow in the dark.',
        baseStats: { hp: 110, attack: 14, defense: 12 },
        special: 'Tidal Crush',
        specialDesc: 'Water attack that may stun for 1 turn',
        color: '#20B2AA'
    },
    RainWing: {
        name: 'RainWing',
        description: 'Color-changing scales and deadly venom.',
        baseStats: { hp: 85, attack: 22, defense: 8 },
        special: 'Death Spit',
        specialDesc: 'Deadly venom that melts armor',
        color: '#9932CC'
    },
    IceWing: {
        name: 'IceWing',
        description: 'Frost breath and razor-sharp claws.',
        baseStats: { hp: 105, attack: 14, defense: 14 },
        special: 'Absolute Zero',
        specialDesc: 'Freeze enemy, reducing their speed',
        color: '#87CEEB'
    },
    NightWing: {
        name: 'NightWing',
        description: 'Mysterious dragons of prophecy and secrets.',
        baseStats: { hp: 100, attack: 16, defense: 12 },
        special: 'Nightmare',
        specialDesc: 'Psychic attack that confuses enemy',
        color: '#4B0082'
    }
};

const BOSSES = {
    mudKingdom: {
        name: 'Marsh King Crocodile',
        title: 'Ancient Guardian of the Swamps',
        level: 5,
        hp: 300,
        attack: 25,
        defense: 20,
        icon: '🐊',
        abilities: ['tail_swipe', 'mud_trap', 'regenerate'],
        drops: ['swamp_armor', 'healing_potion', 'healing_potion'],
        xpReward: 200,
        goldReward: 150
    },
    sandKingdom: {
        name: 'Queen Scorpion',
        title: 'Venomous Empress of the Dunes',
        level: 7,
        hp: 350,
        attack: 30,
        defense: 15,
        icon: '🦂',
        abilities: ['poison_sting', 'burrow', 'swarm'],
        drops: ['venom_fang', 'antidote', 'antidote'],
        xpReward: 300,
        goldReward: 200
    },
    skyKingdom: {
        name: 'Thunderwing',
        title: 'Storm Lord of the Peaks',
        level: 9,
        hp: 400,
        attack: 35,
        defense: 18,
        icon: '⚡',
        abilities: ['lightning_strike', 'wind_blast', 'dive_bomb'],
        drops: ['storm_claw', 'energy_potion', 'energy_potion'],
        xpReward: 400,
        goldReward: 250
    },
    seaKingdom: {
        name: 'Leviathan',
        title: 'Terror of the Deep',
        level: 8,
        hp: 450,
        attack: 28,
        defense: 25,
        icon: '🐙',
        abilities: ['tentacle_grab', 'ink_cloud', 'whirlpool'],
        drops: ['ocean_scale', 'healing_potion', 'bomb'],
        xpReward: 350,
        goldReward: 220
    },
    rainforest: {
        name: 'Jungle Hydra',
        title: 'Many-Headed Menace',
        level: 10,
        hp: 500,
        attack: 32,
        defense: 16,
        icon: '🐍',
        abilities: ['multi_bite', 'poison_breath', 'regenerate'],
        drops: ['hydra_fang', 'mega_potion', 'antidote'],
        xpReward: 450,
        goldReward: 280
    },
    iceKingdom: {
        name: 'Frost Wyrm',
        title: 'Frozen Death',
        level: 11,
        hp: 480,
        attack: 34,
        defense: 28,
        icon: '❄️',
        abilities: ['ice_breath', 'frozen_tomb', 'blizzard'],
        drops: ['frost_heart', 'mega_potion', 'thaw_potion'],
        xpReward: 500,
        goldReward: 300
    },
    nightKingdom: {
        name: 'Darkstalker',
        title: 'The Eternal Nightmare',
        level: 15,
        hp: 666,
        attack: 40,
        defense: 30,
        icon: '👁️',
        abilities: ['shadow_blast', 'mind_break', 'dark_resurrection'],
        drops: ['shadow_crown', 'mega_potion', 'mega_potion', 'legendary_scale'],
        xpReward: 1000,
        goldReward: 500
    }
};

const ITEMS = {
    healing_potion: {
        name: 'Healing Potion',
        icon: '🧪',
        type: 'consumable',
        effect: 'heal',
        value: 50,
        description: 'Restores 50 HP'
    },
    mega_potion: {
        name: 'Mega Potion',
        icon: '💊',
        type: 'consumable',
        effect: 'heal',
        value: 150,
        description: 'Restores 150 HP'
    },
    antidote: {
        name: 'Antidote',
        icon: '💉',
        type: 'consumable',
        effect: 'cure_poison',
        description: 'Cures poison'
    },
    thaw_potion: {
        name: 'Thaw Potion',
        icon: '🔥',
        type: 'consumable',
        effect: 'cure_freeze',
        description: 'Cures freeze'
    },
    energy_potion: {
        name: 'Energy Drink',
        icon: '⚡',
        type: 'consumable',
        effect: 'attack_boost',
        value: 10,
        duration: 3,
        description: '+10 Attack for 3 turns'
    },
    bomb: {
        name: 'Dragon Bomb',
        icon: '💣',
        type: 'consumable',
        effect: 'damage',
        value: 80,
        description: 'Deals 80 damage to enemy'
    },
    swamp_armor: {
        name: 'Swamp Scale Armor',
        icon: '🛡️',
        type: 'equipment',
        slot: 'armor',
        stats: { defense: 8 },
        description: '+8 Defense'
    },
    venom_fang: {
        name: 'Venom Fang',
        icon: '🗡️',
        type: 'equipment',
        slot: 'weapon',
        stats: { attack: 10 },
        description: '+10 Attack'
    },
    storm_claw: {
        name: 'Storm Talon',
        icon: '⚔️',
        type: 'equipment',
        slot: 'weapon',
        stats: { attack: 15 },
        description: '+15 Attack'
    },
    ocean_scale: {
        name: 'Ocean Scale Shield',
        icon: '🔰',
        type: 'equipment',
        slot: 'armor',
        stats: { defense: 12, hp: 20 },
        description: '+12 Defense, +20 Max HP'
    },
    hydra_fang: {
        name: 'Hydra Fang Blade',
        icon: '🔱',
        type: 'equipment',
        slot: 'weapon',
        stats: { attack: 18 },
        description: '+18 Attack, chance to poison'
    },
    frost_heart: {
        name: 'Frost Heart Amulet',
        icon: '💎',
        type: 'equipment',
        slot: 'accessory',
        stats: { defense: 5, attack: 5 },
        description: '+5 Attack, +5 Defense'
    },
    shadow_crown: {
        name: 'Shadow Crown',
        icon: '👑',
        type: 'equipment',
        slot: 'accessory',
        stats: { attack: 12, defense: 8, hp: 30 },
        description: '+12 Attack, +8 Defense, +30 HP'
    },
    legendary_scale: {
        name: 'Legendary Dragon Scale',
        icon: '✨',
        type: 'equipment',
        slot: 'armor',
        stats: { defense: 20, hp: 50 },
        description: '+20 Defense, +50 Max HP'
    }
};

const LOCATIONS = {
    mudKingdom: {
        id: 'mudKingdom',
        name: 'The Mud Kingdom',
        description: 'A vast swampy land where the MudWings make their home.',
        enemies: ['MudWing Scout', 'Swamp Crocodile', 'Marsh Snake'],
        enemyLevel: [1, 3],
        bossMinLevel: 4
    },
    sandKingdom: {
        id: 'sandKingdom',
        name: 'The Sand Kingdom',
        description: 'Endless dunes stretch across the horizon.',
        enemies: ['SandWing Patrol', 'Desert Scorpion', 'Sand Viper'],
        enemyLevel: [2, 4],
        bossMinLevel: 5
    },
    skyKingdom: {
        id: 'skyKingdom',
        name: 'The Sky Kingdom',
        description: 'Mountain peaks pierce the clouds.',
        enemies: ['SkyWing Guard', 'Mountain Eagle', 'Rock Serpent'],
        enemyLevel: [3, 5],
        bossMinLevel: 6
    },
    seaKingdom: {
        id: 'seaKingdom',
        name: 'The Sea Kingdom',
        description: 'Crystal blue waters hide magnificent secrets.',
        enemies: ['SeaWing Warrior', 'Giant Octopus', 'Shark'],
        enemyLevel: [2, 4],
        bossMinLevel: 5
    },
    rainforest: {
        id: 'rainforest',
        name: 'The Rainforest Kingdom',
        description: 'Lush jungle canopy hides colorful dangers.',
        enemies: ['RainWing Sentry', 'Jungle Panther', 'Poison Dart Frog'],
        enemyLevel: [3, 5],
        bossMinLevel: 7
    },
    iceKingdom: {
        id: 'iceKingdom',
        name: 'The Ice Kingdom',
        description: 'Frozen tundra and glacial fortresses.',
        enemies: ['IceWing Soldier', 'Polar Bear', 'Frost Wolf'],
        enemyLevel: [4, 6],
        bossMinLevel: 8
    },
    nightKingdom: {
        id: 'nightKingdom',
        name: 'The Night Kingdom',
        description: 'Volcanic islands shrouded in mystery.',
        enemies: ['NightWing Shadow', 'Lava Serpent', 'Ash Phoenix'],
        enemyLevel: [5, 7],
        bossMinLevel: 10
    }
};

const QUESTS = [
    {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Explore the world and prove your worth.',
        objective: 'Explore 3 times',
        type: 'explore',
        target: 3,
        reward: { xp: 50, gold: 25 }
    },
    {
        id: 'warrior_training',
        name: 'Warrior Training',
        description: 'Defeat enemies to hone your combat skills.',
        objective: 'Win 5 battles',
        type: 'battle',
        target: 5,
        reward: { xp: 100, gold: 50 }
    },
    {
        id: 'world_traveler',
        name: 'World Traveler',
        description: 'Visit all the kingdoms of Pyrrhia.',
        objective: 'Visit 5 different locations',
        type: 'travel',
        target: 5,
        reward: { xp: 150, gold: 75 }
    },
    {
        id: 'boss_hunter',
        name: 'Boss Hunter',
        description: 'Defeat your first boss.',
        objective: 'Defeat 1 boss',
        type: 'boss',
        target: 1,
        reward: { xp: 300, gold: 150, item: 'healing_potion' }
    },
    {
        id: 'combo_master',
        name: 'Combo Master',
        description: 'Achieve a 5-hit combo in battle.',
        objective: 'Get a 5+ combo',
        type: 'combo',
        target: 5,
        reward: { xp: 200, gold: 100 }
    },
    {
        id: 'dragon_slayer',
        name: 'Dragon Slayer',
        description: 'Prove yourself as a formidable warrior.',
        objective: 'Win 15 battles',
        type: 'battle',
        target: 15,
        reward: { xp: 400, gold: 200 }
    },
    {
        id: 'boss_conqueror',
        name: 'Boss Conqueror',
        description: 'Defeat 3 different bosses.',
        objective: 'Defeat 3 bosses',
        type: 'boss',
        target: 3,
        reward: { xp: 600, gold: 300, item: 'mega_potion' }
    },
    {
        id: 'legendary_hunter',
        name: 'Legendary Hunter',
        description: 'Defeat the Darkstalker.',
        objective: 'Defeat Darkstalker',
        type: 'specific_boss',
        target: 'nightKingdom',
        reward: { xp: 1500, gold: 1000 }
    }
];

// ============================================
// GAME STATE
// ============================================

let gameState = {
    player: null,
    currentLocation: null,
    currentScreen: 'title',
    quests: [],
    battleState: null,
    visitedLocations: [],
    defeatedBosses: [],
    pendingVictory: null
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

        const tribeData = TRIBES[tribe];
        this.baseMaxHp = tribeData.baseStats.hp;
        this.maxHp = this.baseMaxHp;
        this.hp = this.maxHp;
        this.baseAttack = tribeData.baseStats.attack;
        this.baseDefense = tribeData.baseStats.defense;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;

        this.special = tribeData.special;
        this.specialDesc = tribeData.specialDesc;
        this.specialCooldown = 0;

        this.inventory = [];
        this.equipment = {
            weapon: null,
            armor: null,
            accessory: null
        };

        this.statusEffects = [];
        this.comboCount = 0;
        this.critChance = 0.1;

        // Starting items
        this.addItem('healing_potion');
        this.addItem('healing_potion');
    }

    addItem(itemId) {
        this.inventory.push(itemId);
    }

    removeItem(itemId) {
        const index = this.inventory.indexOf(itemId);
        if (index > -1) {
            this.inventory.splice(index, 1);
            return true;
        }
        return false;
    }

    getItemCount(itemId) {
        return this.inventory.filter(i => i === itemId).length;
    }

    equip(itemId) {
        const item = ITEMS[itemId];
        if (!item || item.type !== 'equipment') return false;

        // Unequip current item in slot
        if (this.equipment[item.slot]) {
            this.unequip(item.slot);
        }

        // Remove from inventory and equip
        this.removeItem(itemId);
        this.equipment[item.slot] = itemId;
        this.recalculateStats();
        return true;
    }

    unequip(slot) {
        if (this.equipment[slot]) {
            this.addItem(this.equipment[slot]);
            this.equipment[slot] = null;
            this.recalculateStats();
        }
    }

    recalculateStats() {
        const tribeData = TRIBES[this.tribe];
        let bonusAttack = 0;
        let bonusDefense = 0;
        let bonusHp = 0;

        Object.values(this.equipment).forEach(itemId => {
            if (itemId) {
                const item = ITEMS[itemId];
                if (item.stats) {
                    bonusAttack += item.stats.attack || 0;
                    bonusDefense += item.stats.defense || 0;
                    bonusHp += item.stats.hp || 0;
                }
            }
        });

        this.baseAttack = tribeData.baseStats.attack + (this.level - 1) * 2 + bonusAttack;
        this.baseDefense = tribeData.baseStats.defense + (this.level - 1) * 2 + bonusDefense;
        this.baseMaxHp = tribeData.baseStats.hp + (this.level - 1) * 10 + bonusHp;

        this.attack = this.baseAttack;
        this.defense = this.baseDefense;

        const hpPercent = this.hp / this.maxHp;
        this.maxHp = this.baseMaxHp;
        this.hp = Math.floor(this.maxHp * hpPercent);
    }

    addStatusEffect(effect, duration) {
        const existing = this.statusEffects.find(e => e.type === effect);
        if (existing) {
            existing.duration = Math.max(existing.duration, duration);
        } else {
            this.statusEffects.push({ type: effect, duration });
        }
    }

    removeStatusEffect(effect) {
        this.statusEffects = this.statusEffects.filter(e => e.type !== effect);
    }

    processStatusEffects() {
        let damage = 0;
        this.statusEffects.forEach(effect => {
            if (effect.type === 'poison') {
                damage += Math.floor(this.maxHp * 0.05);
            } else if (effect.type === 'burn') {
                damage += Math.floor(this.maxHp * 0.08);
            }
            effect.duration--;
        });
        this.statusEffects = this.statusEffects.filter(e => e.duration > 0);
        if (damage > 0) {
            this.hp = Math.max(0, this.hp - damage);
        }
        return damage;
    }

    heal(amount) {
        const healed = Math.min(amount, this.maxHp - this.hp);
        this.hp = Math.min(this.hp + amount, this.maxHp);
        return healed;
    }

    takeDamage(amount, ignoreDefense = false) {
        let defense = ignoreDefense ? 0 : this.defense;
        const actualDamage = Math.max(1, amount - Math.floor(defense / 3));
        this.hp = Math.max(0, this.hp - actualDamage);
        return actualDamage;
    }

    gainXP(amount) {
        this.xp += amount;
        let leveledUp = false;
        while (this.xp >= this.xpToLevel) {
            this.xp -= this.xpToLevel;
            this.levelUp();
            leveledUp = true;
        }
        return leveledUp;
    }

    levelUp() {
        this.level++;
        this.xpToLevel = Math.floor(this.xpToLevel * 1.4);
        this.recalculateStats();
        this.hp = this.maxHp;
        this.critChance = Math.min(0.3, 0.1 + (this.level - 1) * 0.02);
    }

    gainGold(amount) {
        this.gold += amount;
    }
}

// ============================================
// ENEMY CLASS
// ============================================

class Enemy {
    constructor(name, level, isBoss = false, bossData = null) {
        this.name = name;
        this.level = level;
        this.isBoss = isBoss;

        if (isBoss && bossData) {
            this.maxHp = bossData.hp;
            this.hp = this.maxHp;
            this.attack = bossData.attack;
            this.defense = bossData.defense;
            this.icon = bossData.icon;
            this.abilities = bossData.abilities;
            this.drops = bossData.drops;
            this.xpReward = bossData.xpReward;
            this.goldReward = bossData.goldReward;
            this.title = bossData.title;
        } else {
            this.maxHp = 50 + (level * 15);
            this.hp = this.maxHp;
            this.attack = 8 + (level * 3);
            this.defense = 5 + (level * 2);
            this.icon = '🐉';
            this.xpReward = 20 + (level * 10);
            this.goldReward = 10 + (level * 5);
        }

        this.statusEffects = [];
        this.isStunned = false;
    }

    addStatusEffect(effect, duration) {
        const existing = this.statusEffects.find(e => e.type === effect);
        if (existing) {
            existing.duration = Math.max(existing.duration, duration);
        } else {
            this.statusEffects.push({ type: effect, duration });
        }
    }

    processStatusEffects() {
        let damage = 0;
        this.isStunned = false;

        this.statusEffects.forEach(effect => {
            if (effect.type === 'poison') {
                damage += Math.floor(this.maxHp * 0.05);
            } else if (effect.type === 'burn') {
                damage += Math.floor(this.maxHp * 0.08);
            } else if (effect.type === 'stun') {
                this.isStunned = true;
            } else if (effect.type === 'freeze') {
                this.attack = Math.max(5, this.attack - 2);
            }
            effect.duration--;
        });

        this.statusEffects = this.statusEffects.filter(e => e.duration > 0);
        if (damage > 0) {
            this.hp = Math.max(0, this.hp - damage);
        }
        return damage;
    }

    takeDamage(amount, ignoreDefense = false) {
        let defense = ignoreDefense ? 0 : this.defense;
        const actualDamage = Math.max(1, amount - Math.floor(defense / 3));
        this.hp = Math.max(0, this.hp - actualDamage);
        return actualDamage;
    }

    chooseAbility() {
        if (!this.abilities || this.abilities.length === 0) return 'attack';
        if (Math.random() < 0.4) return 'attack';
        return this.abilities[Math.floor(Math.random() * this.abilities.length)];
    }
}

// ============================================
// DOM ELEMENTS
// ============================================

const screens = {
    title: document.getElementById('title-screen'),
    character: document.getElementById('character-screen'),
    game: document.getElementById('game-screen'),
    battle: document.getElementById('battle-screen'),
    quest: document.getElementById('quest-screen'),
    travel: document.getElementById('travel-screen'),
    inventory: document.getElementById('inventory-screen'),
    battleItem: document.getElementById('battle-item-screen'),
    victory: document.getElementById('victory-screen'),
    gameover: document.getElementById('gameover-screen')
};

// ============================================
// SCREEN MANAGEMENT
// ============================================

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
    gameState.currentScreen = screenName;
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

function updatePlayerUI() {
    const player = gameState.player;
    if (!player) return;

    document.getElementById('player-name').textContent = player.name;
    document.getElementById('player-tribe').textContent = player.tribe;
    document.getElementById('player-tribe').style.background = TRIBES[player.tribe].color;
    document.getElementById('player-level').textContent = `Level ${player.level}`;

    const hpPercent = (player.hp / player.maxHp) * 100;
    document.getElementById('hp-bar').style.width = `${hpPercent}%`;
    document.getElementById('hp-text').textContent = `${player.hp}/${player.maxHp}`;

    const xpPercent = (player.xp / player.xpToLevel) * 100;
    document.getElementById('xp-bar').style.width = `${xpPercent}%`;
    document.getElementById('xp-text').textContent = `${player.xp}/${player.xpToLevel}`;

    document.getElementById('attack-stat').textContent = player.attack;
    document.getElementById('defense-stat').textContent = player.defense;
    document.getElementById('gold-stat').textContent = player.gold;
    document.getElementById('inventory-count').textContent = player.inventory.length;

    // Status effects
    updateStatusEffectsDisplay('player-status-effects', player.statusEffects);

    // Boss indicator
    const location = LOCATIONS[gameState.currentLocation];
    const bossIndicator = document.getElementById('boss-indicator');
    const bossAvailable = player.level >= location.bossMinLevel &&
                          !gameState.defeatedBosses.includes(gameState.currentLocation);

    if (bossAvailable) {
        bossIndicator.classList.remove('hidden');
    } else {
        bossIndicator.classList.add('hidden');
    }
}

function updateStatusEffectsDisplay(elementId, effects) {
    const container = document.getElementById(elementId);
    if (!container) return;

    container.innerHTML = effects.map(e =>
        `<span class="status-effect ${e.type}">${getStatusIcon(e.type)} ${e.duration}</span>`
    ).join('');
}

function getStatusIcon(type) {
    const icons = {
        poison: '🤢',
        burn: '🔥',
        freeze: '❄️',
        stun: '💫',
        'defense-up': '🛡️',
        'attack-up': '⚔️'
    };
    return icons[type] || '❓';
}

function updateLocationUI() {
    const location = LOCATIONS[gameState.currentLocation];
    if (!location) return;

    document.getElementById('location-name').textContent = location.name;
    document.getElementById('location-description').textContent = location.description;
}

function addLogEntry(message, type = 'normal') {
    const logContent = document.getElementById('log-content');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    logContent.appendChild(entry);
    logContent.scrollTop = logContent.scrollHeight;

    while (logContent.children.length > 50) {
        logContent.removeChild(logContent.firstChild);
    }
}

function addBattleMessage(message, type = 'system') {
    const logContent = document.getElementById('battle-log-content');
    const entry = document.createElement('div');
    entry.className = `battle-message ${type}`;
    entry.textContent = message;
    logContent.appendChild(entry);
    logContent.scrollTop = logContent.scrollHeight;
}

function clearBattleLog() {
    document.getElementById('battle-log-content').innerHTML = '';
}

function updateBattleUI() {
    const player = gameState.player;
    const enemy = gameState.battleState?.enemy;

    if (player) {
        const hpPercent = (player.hp / player.maxHp) * 100;
        document.getElementById('battle-hp-bar').style.width = `${hpPercent}%`;
        document.getElementById('battle-hp-text').textContent = `${player.hp}/${player.maxHp}`;
        document.getElementById('battle-player-name').textContent = player.name;
        updateStatusEffectsDisplay('player-battle-status', player.statusEffects);
    }

    if (enemy) {
        const hpPercent = (enemy.hp / enemy.maxHp) * 100;
        const enemyHpBar = document.getElementById('enemy-hp-bar');
        enemyHpBar.style.width = `${hpPercent}%`;
        if (enemy.isBoss) {
            enemyHpBar.classList.add('boss-hp');
        }
        document.getElementById('enemy-hp-text').textContent = `${enemy.hp}/${enemy.maxHp}`;
        document.getElementById('enemy-name').textContent = enemy.isBoss ?
            `👑 ${enemy.name} (Lv.${enemy.level})` :
            `${enemy.name} (Lv.${enemy.level})`;
        document.getElementById('enemy-icon').textContent = enemy.icon;

        if (enemy.isBoss) {
            document.getElementById('enemy-icon').classList.add('boss-icon');
            document.getElementById('enemy-panel').classList.add('boss');
        } else {
            document.getElementById('enemy-icon').classList.remove('boss-icon');
            document.getElementById('enemy-panel').classList.remove('boss');
        }

        updateStatusEffectsDisplay('enemy-status-effects', enemy.statusEffects);
    }

    // Combo display
    const comboDisplay = document.getElementById('combo-display');
    if (gameState.battleState && gameState.battleState.combo > 1) {
        comboDisplay.classList.remove('hidden');
        document.getElementById('combo-count').textContent = gameState.battleState.combo;
    } else {
        comboDisplay.classList.add('hidden');
    }

    // Boss title
    const bossTitle = document.getElementById('boss-title');
    if (enemy?.isBoss) {
        bossTitle.classList.remove('hidden');
    } else {
        bossTitle.classList.add('hidden');
    }
}

// ============================================
// QUEST FUNCTIONS
// ============================================

function initQuests() {
    gameState.quests = QUESTS.map(q => ({
        ...q,
        progress: 0,
        completed: false,
        visited: []
    }));
}

function updateQuestProgress(type, data = null) {
    gameState.quests.forEach(quest => {
        if (quest.completed) return;

        if (quest.type === type) {
            if (type === 'travel' && data) {
                if (!quest.visited.includes(data)) {
                    quest.visited.push(data);
                    quest.progress = quest.visited.length;
                }
            } else if (type === 'combo' && data) {
                quest.progress = Math.max(quest.progress, data);
            } else if (type === 'specific_boss' && data) {
                if (data === quest.target) {
                    quest.progress = 1;
                }
            } else {
                quest.progress++;
            }

            if (quest.progress >= (typeof quest.target === 'number' ? quest.target : 1)) {
                completeQuest(quest);
            }
        }
    });
}

function completeQuest(quest) {
    quest.completed = true;
    const player = gameState.player;

    addLogEntry(`Quest Complete: ${quest.name}!`, 'quest');
    addLogEntry(`Rewards: +${quest.reward.xp} XP, +${quest.reward.gold} Gold`, 'reward');

    const leveledUp = player.gainXP(quest.reward.xp);
    player.gainGold(quest.reward.gold);

    if (quest.reward.item) {
        player.addItem(quest.reward.item);
        addLogEntry(`Received: ${ITEMS[quest.reward.item].name}!`, 'item');
    }

    if (leveledUp) {
        addLogEntry(`Level Up! You are now level ${player.level}!`, 'reward');
    }

    updatePlayerUI();
}

function renderQuests() {
    const questList = document.getElementById('quest-list');
    questList.innerHTML = '';

    gameState.quests.forEach(quest => {
        const card = document.createElement('div');
        const isBossQuest = quest.type === 'boss' || quest.type === 'specific_boss';
        card.className = `quest-card ${quest.completed ? 'completed' : ''} ${isBossQuest ? 'boss-quest' : ''}`;

        let progressText = quest.completed ? '✅ Completed!' :
            `Progress: ${quest.progress}/${typeof quest.target === 'number' ? quest.target : 1}`;

        card.innerHTML = `
            <h3>${isBossQuest ? '👑 ' : ''}${quest.name}</h3>
            <p>${quest.description}</p>
            <div class="quest-reward">
                Reward: ${quest.reward.xp} XP, ${quest.reward.gold} Gold
                ${quest.reward.item ? `, ${ITEMS[quest.reward.item].name}` : ''}
            </div>
            <div class="quest-progress">${progressText}</div>
        `;
        questList.appendChild(card);
    });
}

// ============================================
// INVENTORY FUNCTIONS
// ============================================

function renderInventory() {
    const player = gameState.player;

    // Equipment slots
    document.getElementById('equipped-weapon').textContent =
        player.equipment.weapon ? ITEMS[player.equipment.weapon].name : 'None';
    document.getElementById('equipped-armor').textContent =
        player.equipment.armor ? ITEMS[player.equipment.armor].name : 'None';
    document.getElementById('equipped-accessory').textContent =
        player.equipment.accessory ? ITEMS[player.equipment.accessory].name : 'None';

    // Inventory list
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';

    // Group items by ID
    const itemCounts = {};
    player.inventory.forEach(itemId => {
        itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
    });

    Object.entries(itemCounts).forEach(([itemId, count]) => {
        const item = ITEMS[itemId];
        const div = document.createElement('div');
        div.className = `inventory-item ${item.type}`;
        div.innerHTML = `
            <span class="item-icon">${item.icon}</span>
            <span class="item-name">${item.name}</span>
            <span class="item-count">x${count}</span>
        `;
        div.addEventListener('click', () => useInventoryItem(itemId));
        inventoryList.appendChild(div);
    });
}

function useInventoryItem(itemId) {
    const player = gameState.player;
    const item = ITEMS[itemId];

    if (item.type === 'equipment') {
        player.equip(itemId);
        addLogEntry(`Equipped ${item.name}!`, 'item');
        renderInventory();
        updatePlayerUI();
    } else if (item.type === 'consumable' && gameState.currentScreen === 'inventory') {
        if (item.effect === 'heal') {
            const healed = player.heal(item.value);
            player.removeItem(itemId);
            addLogEntry(`Used ${item.name}. Restored ${healed} HP!`, 'item');
            renderInventory();
            updatePlayerUI();
        } else if (item.effect === 'cure_poison') {
            player.removeStatusEffect('poison');
            player.removeItem(itemId);
            addLogEntry(`Used ${item.name}. Cured poison!`, 'item');
            renderInventory();
            updatePlayerUI();
        }
    }
}

function renderBattleItems() {
    const player = gameState.player;
    const battleItemList = document.getElementById('battle-item-list');
    battleItemList.innerHTML = '';

    const consumables = player.inventory.filter(id => ITEMS[id].type === 'consumable');
    const itemCounts = {};
    consumables.forEach(id => {
        itemCounts[id] = (itemCounts[id] || 0) + 1;
    });

    if (Object.keys(itemCounts).length === 0) {
        battleItemList.innerHTML = '<p style="text-align:center;color:#aaa;">No items available</p>';
        return;
    }

    Object.entries(itemCounts).forEach(([itemId, count]) => {
        const item = ITEMS[itemId];
        const div = document.createElement('div');
        div.className = 'battle-item-card';
        div.innerHTML = `
            <span class="item-icon">${item.icon}</span>
            <div>${item.name} (x${count})</div>
            <div class="item-effect">${item.description}</div>
        `;
        div.addEventListener('click', () => useBattleItem(itemId));
        battleItemList.appendChild(div);
    });
}

function useBattleItem(itemId) {
    const player = gameState.player;
    const item = ITEMS[itemId];
    const enemy = gameState.battleState?.enemy;

    if (!player.removeItem(itemId)) return;

    showScreen('battle');

    switch (item.effect) {
        case 'heal':
            const healed = player.heal(item.value);
            addBattleMessage(`Used ${item.name}! Restored ${healed} HP!`, 'player-action');
            break;
        case 'cure_poison':
            player.removeStatusEffect('poison');
            addBattleMessage(`Used ${item.name}! Cured poison!`, 'player-action');
            break;
        case 'cure_freeze':
            player.removeStatusEffect('freeze');
            addBattleMessage(`Used ${item.name}! Thawed out!`, 'player-action');
            break;
        case 'attack_boost':
            player.addStatusEffect('attack-up', item.duration);
            player.attack += item.value;
            addBattleMessage(`Used ${item.name}! Attack increased!`, 'player-action');
            break;
        case 'damage':
            if (enemy) {
                const damage = enemy.takeDamage(item.value, true);
                addBattleMessage(`Used ${item.name}! Dealt ${damage} damage!`, 'player-action');
            }
            break;
    }

    gameState.battleState.combo = 0;
    updateBattleUI();

    if (enemy && enemy.hp <= 0) {
        setTimeout(() => endBattle(true), 500);
    } else {
        setTimeout(() => enemyTurn(), 800);
    }
}

// ============================================
// EXPLORATION FUNCTIONS
// ============================================

function explore() {
    const location = LOCATIONS[gameState.currentLocation];
    const events = ['found_gold', 'found_item', 'enemy_encounter', 'enemy_encounter', 'nothing', 'rare_item'];
    const event = events[Math.floor(Math.random() * events.length)];

    updateQuestProgress('explore');

    switch (event) {
        case 'found_gold':
            const goldAmount = Math.floor(Math.random() * 30) + 10;
            gameState.player.gainGold(goldAmount);
            addLogEntry(`You found ${goldAmount} gold while exploring!`, 'reward');
            break;

        case 'found_item':
            const healAmount = Math.floor(Math.random() * 30) + 15;
            gameState.player.heal(healAmount);
            addLogEntry(`You found healing herbs and restored ${healAmount} HP!`, 'reward');
            break;

        case 'rare_item':
            if (Math.random() < 0.3) {
                gameState.player.addItem('healing_potion');
                addLogEntry(`You found a Healing Potion!`, 'item');
            } else {
                const goldAmount = Math.floor(Math.random() * 20) + 15;
                gameState.player.gainGold(goldAmount);
                addLogEntry(`You found a hidden stash with ${goldAmount} gold!`, 'reward');
            }
            break;

        case 'enemy_encounter':
            startBattle(false);
            return;

        default:
            const messages = [
                'You explore the area but find nothing of interest.',
                'The landscape stretches endlessly before you.',
                'You hear distant dragon calls echoing through the air.',
                'You rest briefly and take in the sights.'
            ];
            addLogEntry(messages[Math.floor(Math.random() * messages.length)]);
    }

    updatePlayerUI();
}

// ============================================
// TRAVEL FUNCTIONS
// ============================================

function renderTravelOptions() {
    const locationList = document.getElementById('location-list');
    locationList.innerHTML = '';

    Object.entries(LOCATIONS).forEach(([id, location]) => {
        const card = document.createElement('div');
        const isCurrent = gameState.currentLocation === id;
        const bossDefeated = gameState.defeatedBosses.includes(id);

        card.className = `location-card ${isCurrent ? 'current' : ''} ${bossDefeated ? 'boss-defeated' : ''}`;
        card.innerHTML = `
            <h3>${location.name}</h3>
            <p>Enemies: Lv.${location.enemyLevel[0]}-${location.enemyLevel[1]}</p>
            <p>Boss: Lv.${location.bossMinLevel}+</p>
        `;
        card.addEventListener('click', () => travelTo(id));
        locationList.appendChild(card);
    });
}

function travelTo(locationId) {
    if (gameState.currentLocation === locationId) {
        addLogEntry('You are already here!');
        showScreen('game');
        return;
    }

    gameState.currentLocation = locationId;
    const location = LOCATIONS[locationId];

    if (!gameState.visitedLocations.includes(locationId)) {
        gameState.visitedLocations.push(locationId);
        updateQuestProgress('travel', locationId);
    }

    addLogEntry(`You traveled to ${location.name}.`);
    updateLocationUI();
    updatePlayerUI();
    showScreen('game');
}

// ============================================
// BATTLE FUNCTIONS
// ============================================

function startBattle(isBoss = false) {
    const location = LOCATIONS[gameState.currentLocation];
    let enemy;

    if (isBoss) {
        const bossData = BOSSES[gameState.currentLocation];
        enemy = new Enemy(bossData.name, bossData.level, true, bossData);
        addLogEntry(`You challenge ${bossData.name}, ${bossData.title}!`, 'boss');
    } else {
        const enemyName = location.enemies[Math.floor(Math.random() * location.enemies.length)];
        const enemyLevel = Math.floor(Math.random() * (location.enemyLevel[1] - location.enemyLevel[0] + 1)) + location.enemyLevel[0];
        enemy = new Enemy(enemyName, enemyLevel);
    }

    gameState.battleState = {
        enemy: enemy,
        playerDefending: false,
        turn: 'player',
        combo: 0,
        isBoss: isBoss
    };

    gameState.player.specialCooldown = 0;
    clearBattleLog();

    if (isBoss) {
        addBattleMessage(`👑 ${enemy.name} appears!`, 'system');
        addBattleMessage(`"${enemy.title}"`, 'system');
    } else {
        addBattleMessage(`A wild ${enemy.name} (Level ${enemy.level}) appears!`, 'system');
    }

    updateBattleUI();
    showScreen('battle');
}

function calculateDamage(attacker, isHeavy = false, isCritical = false) {
    let baseDamage = attacker.attack;
    if (isHeavy) baseDamage *= 1.5;
    if (isCritical) baseDamage *= 2;

    // Combo bonus
    if (gameState.battleState.combo > 1) {
        baseDamage *= (1 + gameState.battleState.combo * 0.1);
    }

    return Math.floor(baseDamage);
}

function playerAttack(isHeavy = false) {
    if (gameState.battleState.turn !== 'player') return;

    const player = gameState.player;
    const enemy = gameState.battleState.enemy;

    const isCritical = Math.random() < player.critChance;
    const damage = calculateDamage(player, isHeavy, isCritical);
    const actualDamage = enemy.takeDamage(damage);

    gameState.battleState.combo++;
    updateQuestProgress('combo', gameState.battleState.combo);

    if (isCritical) {
        addBattleMessage(`💥 CRITICAL HIT! ${actualDamage} damage!`, 'critical');
    } else if (isHeavy) {
        addBattleMessage(`Heavy attack deals ${actualDamage} damage!`, 'player-action');
    } else {
        addBattleMessage(`You attack for ${actualDamage} damage!`, 'player-action');
    }

    if (gameState.battleState.combo >= 3) {
        addBattleMessage(`${gameState.battleState.combo}x Combo!`, 'combo');
    }

    gameState.battleState.playerDefending = false;
    updateBattleUI();

    if (!checkBattleEnd()) {
        if (isHeavy) {
            // Heavy attacks have recovery time
            addBattleMessage('Recovering from heavy attack...', 'system');
        }
        enemyTurn();
    }
}

function playerSpecial() {
    if (gameState.battleState.turn !== 'player') return;
    if (gameState.player.specialCooldown > 0) {
        addBattleMessage(`${gameState.player.special} is on cooldown (${gameState.player.specialCooldown} turns)`, 'system');
        return;
    }

    const player = gameState.player;
    const enemy = gameState.battleState.enemy;
    const tribe = player.tribe;

    player.specialCooldown = 4;
    gameState.battleState.playerDefending = false;
    gameState.battleState.combo++;

    switch (tribe) {
        case 'MudWing':
            player.addStatusEffect('defense-up', 3);
            player.defense += 15;
            addBattleMessage(`Mud Shield! Defense greatly increased!`, 'player-action');
            break;
        case 'SandWing':
            const venomDamage = enemy.takeDamage(player.attack * 1.2);
            enemy.addStatusEffect('poison', 3);
            addBattleMessage(`Venom Strike deals ${venomDamage} damage!`, 'player-action');
            addBattleMessage(`Enemy is poisoned!`, 'status');
            break;
        case 'SkyWing':
            const fireDamage = enemy.takeDamage(player.attack * 2);
            enemy.addStatusEffect('burn', 3);
            addBattleMessage(`Inferno scorches for ${fireDamage} damage!`, 'player-action');
            addBattleMessage(`Enemy is burning!`, 'status');
            break;
        case 'SeaWing':
            const tidalDamage = enemy.takeDamage(player.attack * 1.5);
            if (Math.random() < 0.5) {
                enemy.addStatusEffect('stun', 1);
                addBattleMessage(`Tidal Crush deals ${tidalDamage} damage and stuns!`, 'player-action');
            } else {
                addBattleMessage(`Tidal Crush deals ${tidalDamage} damage!`, 'player-action');
            }
            break;
        case 'RainWing':
            const spitDamage = enemy.takeDamage(player.attack * 2.5);
            enemy.defense = Math.max(0, enemy.defense - 5);
            addBattleMessage(`Death Spit melts for ${spitDamage} damage!`, 'player-action');
            addBattleMessage(`Enemy armor corroded!`, 'status');
            break;
        case 'IceWing':
            const frostDamage = enemy.takeDamage(player.attack * 1.5);
            enemy.addStatusEffect('freeze', 3);
            addBattleMessage(`Absolute Zero freezes for ${frostDamage} damage!`, 'player-action');
            addBattleMessage(`Enemy is slowed!`, 'status');
            break;
        case 'NightWing':
            const shadowDamage = enemy.takeDamage(player.attack * 1.8);
            if (Math.random() < 0.3) {
                enemy.addStatusEffect('stun', 1);
                addBattleMessage(`Nightmare hits for ${shadowDamage} damage and confuses!`, 'player-action');
            } else {
                addBattleMessage(`Nightmare strikes for ${shadowDamage} damage!`, 'player-action');
            }
            break;
    }

    updateBattleUI();
    if (!checkBattleEnd()) {
        enemyTurn();
    }
}

function playerDefend() {
    if (gameState.battleState.turn !== 'player') return;

    gameState.battleState.playerDefending = true;
    gameState.battleState.combo = 0;
    addBattleMessage('You brace yourself for the attack!', 'player-action');
    enemyTurn();
}

function playerFlee() {
    const enemy = gameState.battleState.enemy;

    if (enemy.isBoss) {
        addBattleMessage('Cannot flee from a boss battle!', 'system');
        return;
    }

    if (Math.random() < 0.6) {
        addBattleMessage('You escaped!', 'system');
        endBattle(false);
    } else {
        addBattleMessage('Failed to escape!', 'system');
        gameState.battleState.combo = 0;
        enemyTurn();
    }
}

function enemyTurn() {
    gameState.battleState.turn = 'enemy';
    const enemy = gameState.battleState.enemy;

    // Process status effects
    const statusDamage = enemy.processStatusEffects();
    if (statusDamage > 0) {
        addBattleMessage(`${enemy.name} takes ${statusDamage} status damage!`, 'status');
        updateBattleUI();

        if (enemy.hp <= 0) {
            setTimeout(() => checkBattleEnd(), 500);
            return;
        }
    }

    if (enemy.isStunned) {
        addBattleMessage(`${enemy.name} is stunned and cannot act!`, 'system');
        setTimeout(() => {
            gameState.battleState.turn = 'player';
            if (gameState.player.specialCooldown > 0) {
                gameState.player.specialCooldown--;
            }
        }, 800);
        return;
    }

    setTimeout(() => {
        const player = gameState.player;
        const ability = enemy.chooseAbility();

        executeBossAbility(enemy, ability, player);

        if (player.specialCooldown > 0) {
            player.specialCooldown--;
        }

        // Process player status effects
        const playerStatusDamage = player.processStatusEffects();
        if (playerStatusDamage > 0) {
            addBattleMessage(`You take ${playerStatusDamage} status damage!`, 'status');
        }

        updateBattleUI();

        if (player.hp <= 0) {
            gameOver();
        } else {
            gameState.battleState.turn = 'player';
            gameState.battleState.playerDefending = false;
        }
    }, 800);
}

function executeBossAbility(enemy, ability, player) {
    let damage = enemy.attack;
    if (gameState.battleState.playerDefending) {
        damage = Math.floor(damage / 2);
    }

    switch (ability) {
        case 'attack':
            const actualDamage = player.takeDamage(damage);
            addBattleMessage(`${enemy.name} attacks for ${actualDamage} damage!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'tail_swipe':
            const swipeDamage = player.takeDamage(damage * 1.3);
            addBattleMessage(`${enemy.name} tail swipes for ${swipeDamage} damage!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'mud_trap':
            player.addStatusEffect('freeze', 2);
            addBattleMessage(`${enemy.name} traps you in mud! Speed reduced!`, 'enemy-action');
            break;

        case 'regenerate':
            const healAmount = Math.floor(enemy.maxHp * 0.1);
            enemy.hp = Math.min(enemy.hp + healAmount, enemy.maxHp);
            addBattleMessage(`${enemy.name} regenerates ${healAmount} HP!`, 'enemy-action');
            break;

        case 'poison_sting':
            const stingDamage = player.takeDamage(damage * 0.8);
            player.addStatusEffect('poison', 3);
            addBattleMessage(`${enemy.name} stings for ${stingDamage} damage! You're poisoned!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'burrow':
            addBattleMessage(`${enemy.name} burrows underground!`, 'enemy-action');
            enemy.defense += 10;
            break;

        case 'swarm':
            const swarmDamage = player.takeDamage(damage * 0.5, true);
            addBattleMessage(`${enemy.name} summons a swarm! ${swarmDamage} unavoidable damage!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'lightning_strike':
            const lightningDamage = player.takeDamage(damage * 1.5);
            if (Math.random() < 0.3) {
                player.addStatusEffect('stun', 1);
                addBattleMessage(`⚡ Lightning strikes for ${lightningDamage} damage! You're stunned!`, 'critical');
            } else {
                addBattleMessage(`⚡ Lightning strikes for ${lightningDamage} damage!`, 'enemy-action');
            }
            gameState.battleState.combo = 0;
            break;

        case 'wind_blast':
            const windDamage = player.takeDamage(damage * 0.7);
            gameState.battleState.combo = 0;
            addBattleMessage(`${enemy.name} blasts wind for ${windDamage} damage!`, 'enemy-action');
            break;

        case 'dive_bomb':
            const diveDamage = player.takeDamage(damage * 2);
            addBattleMessage(`${enemy.name} dive bombs for ${diveDamage} massive damage!`, 'critical');
            gameState.battleState.combo = 0;
            break;

        case 'tentacle_grab':
            const grabDamage = player.takeDamage(damage);
            player.addStatusEffect('freeze', 1);
            addBattleMessage(`${enemy.name} grabs you! ${grabDamage} damage, movement restricted!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'ink_cloud':
            addBattleMessage(`${enemy.name} releases ink! Your accuracy drops!`, 'enemy-action');
            gameState.player.critChance = Math.max(0, gameState.player.critChance - 0.1);
            break;

        case 'whirlpool':
            const whirlDamage = player.takeDamage(damage * 1.2, true);
            addBattleMessage(`${enemy.name} creates a whirlpool! ${whirlDamage} unavoidable damage!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'multi_bite':
            let totalBiteDamage = 0;
            for (let i = 0; i < 3; i++) {
                totalBiteDamage += player.takeDamage(damage * 0.5);
            }
            addBattleMessage(`${enemy.name} bites 3 times for ${totalBiteDamage} total damage!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'poison_breath':
            const breathDamage = player.takeDamage(damage * 0.6);
            player.addStatusEffect('poison', 4);
            addBattleMessage(`${enemy.name} breathes poison! ${breathDamage} damage, badly poisoned!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'ice_breath':
            const iceDamage = player.takeDamage(damage * 1.3);
            player.addStatusEffect('freeze', 2);
            addBattleMessage(`${enemy.name} breathes ice! ${iceDamage} damage, frozen!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'frozen_tomb':
            if (Math.random() < 0.4) {
                player.addStatusEffect('stun', 1);
                addBattleMessage(`${enemy.name} encases you in ice! You can't move!`, 'critical');
            } else {
                addBattleMessage(`${enemy.name} tries to freeze you but fails!`, 'enemy-action');
            }
            break;

        case 'blizzard':
            const blizzardDamage = player.takeDamage(damage * 0.8, true);
            player.addStatusEffect('freeze', 3);
            addBattleMessage(`${enemy.name} summons a blizzard! ${blizzardDamage} damage!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'shadow_blast':
            const shadowBlastDamage = player.takeDamage(damage * 1.5);
            addBattleMessage(`${enemy.name} fires shadow blast for ${shadowBlastDamage} damage!`, 'enemy-action');
            gameState.battleState.combo = 0;
            break;

        case 'mind_break':
            player.specialCooldown += 2;
            const mindDamage = player.takeDamage(damage * 0.5);
            addBattleMessage(`${enemy.name} attacks your mind! ${mindDamage} damage, abilities disrupted!`, 'critical');
            break;

        case 'dark_resurrection':
            if (enemy.hp < enemy.maxHp * 0.3) {
                const resurrectHeal = Math.floor(enemy.maxHp * 0.25);
                enemy.hp += resurrectHeal;
                addBattleMessage(`${enemy.name} draws power from darkness! Restored ${resurrectHeal} HP!`, 'critical');
            } else {
                const darkDamage = player.takeDamage(damage * 1.2);
                addBattleMessage(`${enemy.name} attacks with dark energy for ${darkDamage} damage!`, 'enemy-action');
                gameState.battleState.combo = 0;
            }
            break;

        default:
            const defaultDamage = player.takeDamage(damage);
            addBattleMessage(`${enemy.name} attacks for ${defaultDamage} damage!`, 'enemy-action');
            gameState.battleState.combo = 0;
    }
}

function checkBattleEnd() {
    updateBattleUI();

    if (gameState.battleState.enemy.hp <= 0) {
        const enemy = gameState.battleState.enemy;
        addBattleMessage(`You defeated ${enemy.name}!`, 'system');

        setTimeout(() => {
            endBattle(true);
        }, 1000);

        return true;
    }
    return false;
}

function endBattle(victory) {
    if (victory) {
        const enemy = gameState.battleState.enemy;
        const isBoss = gameState.battleState.isBoss;

        gameState.pendingVictory = {
            enemy: enemy,
            isBoss: isBoss,
            xp: enemy.xpReward,
            gold: enemy.goldReward,
            drops: isBoss ? enemy.drops : []
        };

        showVictoryScreen();
    } else {
        gameState.player.defense = gameState.player.baseDefense;
        gameState.player.attack = gameState.player.baseAttack;
        gameState.player.critChance = Math.min(0.3, 0.1 + (gameState.player.level - 1) * 0.02);
        gameState.battleState = null;
        updatePlayerUI();
        showScreen('game');
    }
}

function showVictoryScreen() {
    const victory = gameState.pendingVictory;
    const player = gameState.player;

    document.getElementById('victory-title').textContent = victory.isBoss ?
        '👑 BOSS DEFEATED! 👑' : 'Victory!';
    document.getElementById('victory-title').className = victory.isBoss ? 'boss-victory' : '';

    document.getElementById('victory-message').textContent =
        `You defeated ${victory.enemy.name}!`;

    document.getElementById('victory-rewards').textContent =
        `Rewards: +${victory.xp} XP, +${victory.gold} Gold`;

    const lootDrops = document.getElementById('loot-drops');
    lootDrops.innerHTML = '';

    if (victory.drops && victory.drops.length > 0) {
        victory.drops.forEach((itemId, index) => {
            setTimeout(() => {
                const item = ITEMS[itemId];
                const lootDiv = document.createElement('div');
                lootDiv.className = 'loot-item';
                lootDiv.textContent = `${item.icon} ${item.name}`;
                lootDrops.appendChild(lootDiv);
            }, index * 300);
        });
    }

    showScreen('victory');
}

function claimVictory() {
    const victory = gameState.pendingVictory;
    const player = gameState.player;

    const leveledUp = player.gainXP(victory.xp);
    player.gainGold(victory.gold);

    addLogEntry(`Victory! Gained ${victory.xp} XP and ${victory.gold} gold.`, 'combat');

    if (victory.drops && victory.drops.length > 0) {
        victory.drops.forEach(itemId => {
            player.addItem(itemId);
            addLogEntry(`Obtained: ${ITEMS[itemId].name}!`, 'item');
        });
    }

    if (leveledUp) {
        addLogEntry(`Level Up! You are now level ${player.level}!`, 'reward');
    }

    if (victory.isBoss) {
        gameState.defeatedBosses.push(gameState.currentLocation);
        updateQuestProgress('boss');
        updateQuestProgress('specific_boss', gameState.currentLocation);
        addLogEntry(`Boss defeated! ${BOSSES[gameState.currentLocation].name} has fallen!`, 'boss');
    } else {
        updateQuestProgress('battle');
    }

    player.defense = player.baseDefense;
    player.attack = player.baseAttack;
    player.critChance = Math.min(0.3, 0.1 + (player.level - 1) * 0.02);

    gameState.battleState = null;
    gameState.pendingVictory = null;

    updatePlayerUI();
    showScreen('game');
}

function gameOver() {
    document.getElementById('gameover-message').textContent =
        `${gameState.player.name} the ${gameState.player.tribe} has fallen in battle at level ${gameState.player.level}.`;
    showScreen('gameover');
}

// ============================================
// REST FUNCTION
// ============================================

function rest() {
    const player = gameState.player;
    const healAmount = Math.floor(player.maxHp * 0.4);
    const healed = player.heal(healAmount);
    player.statusEffects = [];
    addLogEntry(`You rest and recover ${healed} HP. Status effects cleared.`);
    updatePlayerUI();
}

// ============================================
// EVENT LISTENERS
// ============================================

// Title screen
document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('character');
});

// Character creation
let selectedTribe = null;
document.querySelectorAll('.tribe-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.tribe-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedTribe = card.dataset.tribe;
        checkCreateButton();
    });
});

document.getElementById('dragon-name').addEventListener('input', checkCreateButton);

function checkCreateButton() {
    const name = document.getElementById('dragon-name').value.trim();
    const btn = document.getElementById('create-dragon-btn');
    btn.disabled = !name || !selectedTribe;
}

document.getElementById('create-dragon-btn').addEventListener('click', () => {
    const name = document.getElementById('dragon-name').value.trim();
    if (!name || !selectedTribe) return;

    gameState.player = new Player(name, selectedTribe);
    gameState.currentLocation = 'mudKingdom';
    gameState.visitedLocations = ['mudKingdom'];
    gameState.defeatedBosses = [];
    initQuests();
    updateQuestProgress('travel', 'mudKingdom');

    updatePlayerUI();
    updateLocationUI();
    addLogEntry(`Welcome, ${name} the ${selectedTribe}! Your adventure begins...`);
    addLogEntry(`You find yourself in ${LOCATIONS.mudKingdom.name}.`);
    addLogEntry(`Tip: Build your combo for bonus damage! Explore to find items and gold.`);
    showScreen('game');
});

// Main game actions
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        switch (action) {
            case 'explore':
                explore();
                break;
            case 'boss':
                const location = LOCATIONS[gameState.currentLocation];
                if (gameState.defeatedBosses.includes(gameState.currentLocation)) {
                    addLogEntry('You have already defeated the boss here!');
                } else if (gameState.player.level < location.bossMinLevel) {
                    addLogEntry(`You need to be at least level ${location.bossMinLevel} to challenge this boss!`);
                } else {
                    startBattle(true);
                }
                break;
            case 'quest':
                renderQuests();
                showScreen('quest');
                break;
            case 'inventory':
                renderInventory();
                showScreen('inventory');
                break;
            case 'travel':
                renderTravelOptions();
                showScreen('travel');
                break;
            case 'rest':
                rest();
                break;
        }
    });
});

// Battle actions
document.querySelectorAll('.battle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.battle;
        switch (action) {
            case 'attack':
                playerAttack(false);
                break;
            case 'heavy':
                playerAttack(true);
                break;
            case 'special':
                playerSpecial();
                break;
            case 'defend':
                playerDefend();
                break;
            case 'item':
                renderBattleItems();
                showScreen('battleItem');
                break;
            case 'flee':
                playerFlee();
                break;
        }
    });
});

// Screen close buttons
document.getElementById('close-quests-btn').addEventListener('click', () => showScreen('game'));
document.getElementById('close-travel-btn').addEventListener('click', () => showScreen('game'));
document.getElementById('close-inventory-btn').addEventListener('click', () => showScreen('game'));
document.getElementById('close-battle-items-btn').addEventListener('click', () => showScreen('battle'));
document.getElementById('victory-continue-btn').addEventListener('click', claimVictory);

// Game over
document.getElementById('restart-btn').addEventListener('click', () => {
    gameState = {
        player: null,
        currentLocation: null,
        currentScreen: 'title',
        quests: [],
        battleState: null,
        visitedLocations: [],
        defeatedBosses: [],
        pendingVictory: null
    };
    selectedTribe = null;
    document.getElementById('dragon-name').value = '';
    document.querySelectorAll('.tribe-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('create-dragon-btn').disabled = true;
    document.getElementById('log-content').innerHTML = '';
    showScreen('title');
});

// Initialize
showScreen('title');
