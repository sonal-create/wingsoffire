// Wings of Fire - Dragon Adventure Game

// ============================================
// GAME DATA
// ============================================

const TRIBES = {
    MudWing: {
        name: 'MudWing',
        description: 'Strong and resilient dragons from the swamps.',
        baseStats: { hp: 120, attack: 12, defense: 15 },
        special: 'Mud Shield',
        specialDesc: 'Increase defense for this turn',
        color: '#8B4513'
    },
    SandWing: {
        name: 'SandWing',
        description: 'Desert warriors with venomous tail barbs.',
        baseStats: { hp: 100, attack: 18, defense: 10 },
        special: 'Venom Strike',
        specialDesc: 'Poison attack that deals damage over time',
        color: '#DEB887'
    },
    SkyWing: {
        name: 'SkyWing',
        description: 'Fastest flyers with powerful fire breath.',
        baseStats: { hp: 100, attack: 20, defense: 8 },
        special: 'Fire Breath',
        specialDesc: 'Devastating fire attack',
        color: '#DC143C'
    },
    SeaWing: {
        name: 'SeaWing',
        description: 'Aquatic dragons who glow in the dark.',
        baseStats: { hp: 110, attack: 14, defense: 12 },
        special: 'Tidal Wave',
        specialDesc: 'Water attack that may stun',
        color: '#20B2AA'
    },
    RainWing: {
        name: 'RainWing',
        description: 'Color-changing scales and deadly venom.',
        baseStats: { hp: 85, attack: 22, defense: 8 },
        special: 'Venom Spit',
        specialDesc: 'Deadly accurate venom attack',
        color: '#9932CC'
    },
    IceWing: {
        name: 'IceWing',
        description: 'Frost breath and razor-sharp claws.',
        baseStats: { hp: 105, attack: 14, defense: 14 },
        special: 'Frost Breath',
        specialDesc: 'Freezing attack that slows enemy',
        color: '#87CEEB'
    },
    NightWing: {
        name: 'NightWing',
        description: 'Mysterious dragons of prophecy and secrets.',
        baseStats: { hp: 100, attack: 16, defense: 12 },
        special: 'Shadow Strike',
        specialDesc: 'Attack from the shadows with bonus damage',
        color: '#4B0082'
    }
};

const LOCATIONS = {
    mudKingdom: {
        id: 'mudKingdom',
        name: 'The Mud Kingdom',
        description: 'A vast swampy land where the MudWings make their home. The air is thick and humid.',
        enemies: ['MudWing Scout', 'Swamp Crocodile', 'Marsh Snake'],
        enemyLevel: [1, 3],
        exploreEvents: ['found_gold', 'found_item', 'enemy_encounter', 'nothing', 'quest_progress']
    },
    sandKingdom: {
        id: 'sandKingdom',
        name: 'The Sand Kingdom',
        description: 'Endless dunes stretch across the horizon. SandWing territory is harsh but beautiful.',
        enemies: ['SandWing Patrol', 'Desert Scorpion', 'Sand Viper'],
        enemyLevel: [2, 4],
        exploreEvents: ['found_gold', 'found_item', 'enemy_encounter', 'nothing', 'quest_progress']
    },
    skyKingdom: {
        id: 'skyKingdom',
        name: 'The Sky Kingdom',
        description: 'Mountain peaks pierce the clouds. SkyWings rule from their high perches.',
        enemies: ['SkyWing Guard', 'Mountain Eagle', 'Rock Serpent'],
        enemyLevel: [3, 5],
        exploreEvents: ['found_gold', 'found_item', 'enemy_encounter', 'nothing', 'quest_progress']
    },
    seaKingdom: {
        id: 'seaKingdom',
        name: 'The Sea Kingdom',
        description: 'Crystal blue waters hide the magnificent underwater palace of the SeaWings.',
        enemies: ['SeaWing Warrior', 'Giant Octopus', 'Shark'],
        enemyLevel: [2, 4],
        exploreEvents: ['found_gold', 'found_item', 'enemy_encounter', 'nothing', 'quest_progress']
    },
    rainforest: {
        id: 'rainforest',
        name: 'The Rainforest Kingdom',
        description: 'Lush jungle canopy hides the colorful RainWings. Beauty masks danger here.',
        enemies: ['RainWing Sentry', 'Jungle Panther', 'Poison Dart Frog'],
        enemyLevel: [3, 5],
        exploreEvents: ['found_gold', 'found_item', 'enemy_encounter', 'nothing', 'quest_progress']
    },
    iceKingdom: {
        id: 'iceKingdom',
        name: 'The Ice Kingdom',
        description: 'Frozen tundra and glacial fortresses. Only the strong survive IceWing territory.',
        enemies: ['IceWing Soldier', 'Polar Bear', 'Frost Wolf'],
        enemyLevel: [4, 6],
        exploreEvents: ['found_gold', 'found_item', 'enemy_encounter', 'nothing', 'quest_progress']
    },
    nightKingdom: {
        id: 'nightKingdom',
        name: 'The Night Kingdom',
        description: 'Volcanic islands shrouded in smoke and mystery. The NightWings guard their secrets.',
        enemies: ['NightWing Shadow', 'Lava Serpent', 'Ash Phoenix'],
        enemyLevel: [5, 7],
        exploreEvents: ['found_gold', 'found_item', 'enemy_encounter', 'nothing', 'quest_progress']
    }
};

const QUESTS = [
    {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Explore the world and prove your worth as a young dragon.',
        objective: 'Explore 3 times',
        type: 'explore',
        target: 3,
        reward: { xp: 50, gold: 25 },
        progress: 0
    },
    {
        id: 'warrior_training',
        name: 'Warrior Training',
        description: 'Defeat enemies to hone your combat skills.',
        objective: 'Win 3 battles',
        type: 'battle',
        target: 3,
        reward: { xp: 75, gold: 40 },
        progress: 0
    },
    {
        id: 'world_traveler',
        name: 'World Traveler',
        description: 'Visit all the kingdoms of Pyrrhia.',
        objective: 'Visit 4 different locations',
        type: 'travel',
        target: 4,
        reward: { xp: 100, gold: 60 },
        progress: 0,
        visited: []
    },
    {
        id: 'dragon_slayer',
        name: 'Dragon Slayer',
        description: 'Prove yourself as a formidable warrior.',
        objective: 'Win 10 battles',
        type: 'battle',
        target: 10,
        reward: { xp: 200, gold: 100 },
        progress: 0
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
    visitedLocations: []
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
        this.maxHp = tribeData.baseStats.hp;
        this.hp = this.maxHp;
        this.baseAttack = tribeData.baseStats.attack;
        this.baseDefense = tribeData.baseStats.defense;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;

        this.special = tribeData.special;
        this.specialDesc = tribeData.specialDesc;
        this.specialCooldown = 0;
    }

    heal(amount) {
        this.hp = Math.min(this.hp + amount, this.maxHp);
    }

    takeDamage(amount) {
        const actualDamage = Math.max(1, amount - Math.floor(this.defense / 3));
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
        this.xpToLevel = Math.floor(this.xpToLevel * 1.5);
        this.maxHp += 10;
        this.hp = this.maxHp;
        this.baseAttack += 2;
        this.baseDefense += 2;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;
    }

    gainGold(amount) {
        this.gold += amount;
    }
}

// ============================================
// ENEMY CLASS
// ============================================

class Enemy {
    constructor(name, level) {
        this.name = name;
        this.level = level;

        // Scale stats based on level
        this.maxHp = 50 + (level * 15);
        this.hp = this.maxHp;
        this.attack = 8 + (level * 3);
        this.defense = 5 + (level * 2);

        // Rewards
        this.xpReward = 20 + (level * 10);
        this.goldReward = 10 + (level * 5);
    }

    takeDamage(amount) {
        const actualDamage = Math.max(1, amount - Math.floor(this.defense / 3));
        this.hp = Math.max(0, this.hp - actualDamage);
        return actualDamage;
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

    // HP Bar
    const hpPercent = (player.hp / player.maxHp) * 100;
    document.getElementById('hp-bar').style.width = `${hpPercent}%`;
    document.getElementById('hp-text').textContent = `${player.hp}/${player.maxHp}`;

    // XP Bar
    const xpPercent = (player.xp / player.xpToLevel) * 100;
    document.getElementById('xp-bar').style.width = `${xpPercent}%`;
    document.getElementById('xp-text').textContent = `${player.xp}/${player.xpToLevel}`;

    // Stats
    document.getElementById('attack-stat').textContent = player.attack;
    document.getElementById('defense-stat').textContent = player.defense;
    document.getElementById('gold-stat').textContent = player.gold;
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

    // Keep log manageable
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
    }

    if (enemy) {
        const hpPercent = (enemy.hp / enemy.maxHp) * 100;
        document.getElementById('enemy-hp-bar').style.width = `${hpPercent}%`;
        document.getElementById('enemy-hp-text').textContent = `${enemy.hp}/${enemy.maxHp}`;
        document.getElementById('enemy-name').textContent = `${enemy.name} (Lv.${enemy.level})`;
    }
}

// ============================================
// QUEST FUNCTIONS
// ============================================

function initQuests() {
    gameState.quests = QUESTS.map(q => ({ ...q, progress: 0, completed: false, visited: [] }));
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
            } else {
                quest.progress++;
            }

            if (quest.progress >= quest.target) {
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
        card.className = `quest-card ${quest.completed ? 'completed' : ''}`;
        card.innerHTML = `
            <h3>${quest.name}</h3>
            <p>${quest.description}</p>
            <div class="quest-reward">Reward: ${quest.reward.xp} XP, ${quest.reward.gold} Gold</div>
            <div class="quest-progress">
                ${quest.completed ? '✅ Completed!' : `Progress: ${quest.progress}/${quest.target}`}
            </div>
        `;
        questList.appendChild(card);
    });
}

// ============================================
// EXPLORATION FUNCTIONS
// ============================================

function explore() {
    const location = LOCATIONS[gameState.currentLocation];
    const events = location.exploreEvents;
    const event = events[Math.floor(Math.random() * events.length)];

    updateQuestProgress('explore');

    switch (event) {
        case 'found_gold':
            const goldAmount = Math.floor(Math.random() * 20) + 5;
            gameState.player.gainGold(goldAmount);
            addLogEntry(`You found ${goldAmount} gold while exploring!`, 'reward');
            break;

        case 'found_item':
            const hpRestore = Math.floor(Math.random() * 20) + 10;
            gameState.player.heal(hpRestore);
            addLogEntry(`You found healing herbs and restored ${hpRestore} HP!`, 'reward');
            break;

        case 'enemy_encounter':
            startBattle();
            return;

        case 'quest_progress':
            addLogEntry('You discovered ancient dragon markings on the rocks...');
            break;

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
        card.className = `location-card ${gameState.currentLocation === id ? 'current' : ''}`;
        card.innerHTML = `
            <h3>${location.name}</h3>
            <p>Enemies: Lv.${location.enemyLevel[0]}-${location.enemyLevel[1]}</p>
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

function startBattle() {
    const location = LOCATIONS[gameState.currentLocation];
    const enemyName = location.enemies[Math.floor(Math.random() * location.enemies.length)];
    const enemyLevel = Math.floor(Math.random() * (location.enemyLevel[1] - location.enemyLevel[0] + 1)) + location.enemyLevel[0];

    const enemy = new Enemy(enemyName, enemyLevel);

    gameState.battleState = {
        enemy: enemy,
        playerDefending: false,
        turn: 'player'
    };

    gameState.player.specialCooldown = 0;
    clearBattleLog();
    addBattleMessage(`A wild ${enemy.name} (Level ${enemy.level}) appears!`, 'system');
    updateBattleUI();
    showScreen('battle');
}

function playerAttack() {
    if (gameState.battleState.turn !== 'player') return;

    const player = gameState.player;
    const enemy = gameState.battleState.enemy;

    const damage = enemy.takeDamage(player.attack);
    addBattleMessage(`You attack for ${damage} damage!`, 'player-action');

    gameState.battleState.playerDefending = false;
    checkBattleEnd() || enemyTurn();
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

    gameState.player.specialCooldown = 3;
    gameState.battleState.playerDefending = false;

    switch (tribe) {
        case 'MudWing':
            player.defense += 10;
            addBattleMessage(`Mud Shield! Defense increased!`, 'player-action');
            break;
        case 'SandWing':
            const venomDamage = enemy.takeDamage(player.attack * 1.5);
            addBattleMessage(`Venom Strike deals ${venomDamage} damage!`, 'player-action');
            break;
        case 'SkyWing':
            const fireDamage = enemy.takeDamage(player.attack * 2);
            addBattleMessage(`Fire Breath scorches for ${fireDamage} damage!`, 'player-action');
            break;
        case 'SeaWing':
            const tidalDamage = enemy.takeDamage(player.attack * 1.3);
            addBattleMessage(`Tidal Wave crashes for ${tidalDamage} damage!`, 'player-action');
            break;
        case 'RainWing':
            const spitDamage = enemy.takeDamage(player.attack * 2.2);
            addBattleMessage(`Venom Spit melts for ${spitDamage} damage!`, 'player-action');
            break;
        case 'IceWing':
            const frostDamage = enemy.takeDamage(player.attack * 1.4);
            enemy.attack = Math.max(5, enemy.attack - 3);
            addBattleMessage(`Frost Breath freezes for ${frostDamage} damage! Enemy slowed!`, 'player-action');
            break;
        case 'NightWing':
            const shadowDamage = enemy.takeDamage(player.attack * 1.8);
            addBattleMessage(`Shadow Strike hits from darkness for ${shadowDamage} damage!`, 'player-action');
            break;
    }

    checkBattleEnd() || enemyTurn();
}

function playerDefend() {
    if (gameState.battleState.turn !== 'player') return;

    gameState.battleState.playerDefending = true;
    addBattleMessage('You brace yourself for the attack!', 'player-action');
    enemyTurn();
}

function playerFlee() {
    if (Math.random() < 0.5) {
        addBattleMessage('You escaped!', 'system');
        endBattle(false);
    } else {
        addBattleMessage('Failed to escape!', 'system');
        enemyTurn();
    }
}

function enemyTurn() {
    gameState.battleState.turn = 'enemy';

    setTimeout(() => {
        const player = gameState.player;
        const enemy = gameState.battleState.enemy;

        let damage = enemy.attack;
        if (gameState.battleState.playerDefending) {
            damage = Math.floor(damage / 2);
        }

        const actualDamage = player.takeDamage(damage);
        addBattleMessage(`${enemy.name} attacks for ${actualDamage} damage!`, 'enemy-action');

        if (player.specialCooldown > 0) {
            player.specialCooldown--;
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
        const xpGain = enemy.xpReward;
        const goldGain = enemy.goldReward;

        const leveledUp = gameState.player.gainXP(xpGain);
        gameState.player.gainGold(goldGain);

        addLogEntry(`Victory! Gained ${xpGain} XP and ${goldGain} gold.`, 'combat');

        if (leveledUp) {
            addLogEntry(`Level Up! You are now level ${gameState.player.level}!`, 'reward');
        }

        updateQuestProgress('battle');
    }

    // Reset defense if it was boosted
    gameState.player.defense = gameState.player.baseDefense;
    gameState.battleState = null;
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
    const healAmount = Math.floor(gameState.player.maxHp * 0.3);
    gameState.player.heal(healAmount);
    addLogEntry(`You rest and recover ${healAmount} HP.`);
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
    initQuests();
    updateQuestProgress('travel', 'mudKingdom');

    updatePlayerUI();
    updateLocationUI();
    addLogEntry(`Welcome, ${name} the ${selectedTribe}! Your adventure begins...`);
    addLogEntry(`You find yourself in ${LOCATIONS.mudKingdom.name}.`);
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
            case 'quest':
                renderQuests();
                showScreen('quest');
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
                playerAttack();
                break;
            case 'special':
                playerSpecial();
                break;
            case 'defend':
                playerDefend();
                break;
            case 'flee':
                playerFlee();
                break;
        }
    });
});

// Quest screen
document.getElementById('close-quests-btn').addEventListener('click', () => {
    showScreen('game');
});

// Travel screen
document.getElementById('close-travel-btn').addEventListener('click', () => {
    showScreen('game');
});

// Game over
document.getElementById('restart-btn').addEventListener('click', () => {
    gameState = {
        player: null,
        currentLocation: null,
        currentScreen: 'title',
        quests: [],
        battleState: null,
        visitedLocations: []
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
