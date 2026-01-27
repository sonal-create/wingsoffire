// Wings of Fire - 3D Dragon Adventure Game
// Three.js based with realistic book-accurate dragons and kingdom palaces

// ============================================
// GAME CONFIGURATION
// ============================================

const CONFIG = {
    MOVE_SPEED: 15,
    FLY_SPEED: 20,
    SPRINT_MULTIPLIER: 1.6,
    TURN_SPEED: 3.0,
    GRAVITY: 0.8,
    JUMP_FORCE: 15,
    FLY_LIFT: 0.5,
    STAMINA_DRAIN: 0.2,
    STAMINA_REGEN: 0.2,
    GROUND_LEVEL: 0,
    CAMERA_DISTANCE: 18,
    CAMERA_HEIGHT: 10,
    FRICTION: 0.88
};

// ============================================
// TRIBE DATA - Accurate to Wings of Fire books
// ============================================

const TRIBES = {
    MudWing: {
        name: 'MudWing',
        colors: {
            body: 0x8B4513,
            underbelly: 0xD2691E,
            wings: 0x654321,
            wingMembrane: 0x8B6914,
            horns: 0x3D2817,
            eyes: 0xD4A574,
            claws: 0x2F1810
        },
        features: {
            bulky: true,
            flatHead: true,
            thickScales: true,
            noseHorn: false,
            tailBarb: false,
            glowScales: false,
            ruff: false,
            sailFin: false
        },
        baseStats: { hp: 140, attack: 14, defense: 18, speed: 0.8 },
        special: 'Mud Armor',
        breathType: 'fire',
        breathColor: 0xFF4500,
        description: 'Large, powerful dragons with thick brown scales. Fire-resistant and incredibly strong.'
    },
    SandWing: {
        name: 'SandWing',
        colors: {
            body: 0xDEB887,
            underbelly: 0xFFF8DC,
            wings: 0xF5DEB3,
            wingMembrane: 0xFFE4B5,
            horns: 0x2F2F2F,
            eyes: 0x000000,
            claws: 0x8B4513,
            tailBarb: 0x1C1C1C
        },
        features: {
            bulky: false,
            flatHead: false,
            thickScales: false,
            noseHorn: true,
            tailBarb: true,
            glowScales: false,
            ruff: false,
            sailFin: true
        },
        baseStats: { hp: 100, attack: 20, defense: 10, speed: 1.0 },
        special: 'Venom Strike',
        breathType: 'fire',
        breathColor: 0xFF6600,
        description: 'Desert dragons with venomous barbed tails. Pale yellow scales and black eyes.'
    },
    SkyWing: {
        name: 'SkyWing',
        colors: {
            body: 0xDC143C,
            underbelly: 0xFF6347,
            wings: 0xFF4500,
            wingMembrane: 0xFF6347,
            horns: 0x8B0000,
            eyes: 0xFFD700,
            claws: 0x4A0000
        },
        features: {
            bulky: false,
            flatHead: false,
            thickScales: false,
            noseHorn: false,
            tailBarb: false,
            glowScales: false,
            ruff: false,
            sailFin: false,
            largeWings: true
        },
        baseStats: { hp: 95, attack: 22, defense: 8, speed: 1.5 },
        special: 'Inferno Dive',
        breathType: 'fire',
        breathColor: 0xFF0000,
        description: 'The fastest flyers with enormous wings. Red-orange scales and golden eyes.'
    },
    SeaWing: {
        name: 'SeaWing',
        colors: {
            body: 0x20B2AA,
            underbelly: 0x40E0D0,
            wings: 0x48D1CC,
            wingMembrane: 0x7FFFD4,
            horns: 0x008B8B,
            eyes: 0x00FFFF,
            claws: 0x006666,
            glowStripes: 0x00FFFF
        },
        features: {
            bulky: false,
            flatHead: false,
            thickScales: false,
            noseHorn: false,
            tailBarb: false,
            glowScales: true,
            ruff: true,
            sailFin: true,
            webbedFeet: true,
            gillSlits: true
        },
        baseStats: { hp: 115, attack: 16, defense: 14, speed: 1.1 },
        special: 'Tidal Wave',
        breathType: 'water',
        breathColor: 0x00BFFF,
        description: 'Aquatic dragons with bioluminescent stripes for underwater communication.'
    },
    RainWing: {
        name: 'RainWing',
        colors: {
            body: 0x9932CC,
            underbelly: 0xDA70D6,
            wings: 0xBA55D3,
            wingMembrane: 0xEE82EE,
            horns: 0x8B008B,
            eyes: 0x00FF00,
            claws: 0x4B0082,
            ruff: 0xFF69B4
        },
        features: {
            bulky: false,
            flatHead: false,
            thickScales: false,
            noseHorn: false,
            tailBarb: false,
            glowScales: false,
            ruff: true,
            sailFin: false,
            prehensileTail: true,
            colorChanging: true
        },
        baseStats: { hp: 85, attack: 25, defense: 7, speed: 1.0 },
        special: 'Venom Spit',
        breathType: 'acid',
        breathColor: 0x32CD32,
        description: 'Colorful dragons that can shift scale colors. Deadly corrosive venom.'
    },
    IceWing: {
        name: 'IceWing',
        colors: {
            body: 0xE0FFFF,
            underbelly: 0xF0FFFF,
            wings: 0xADD8E6,
            wingMembrane: 0xB0E0E6,
            horns: 0x87CEEB,
            eyes: 0x4169E1,
            claws: 0x708090,
            spikes: 0xE6E6FA
        },
        features: {
            bulky: false,
            flatHead: false,
            thickScales: false,
            noseHorn: false,
            tailBarb: false,
            glowScales: false,
            ruff: true,
            sailFin: false,
            serratedClaws: true,
            icicleSpines: true,
            ridgedHorns: true
        },
        baseStats: { hp: 105, attack: 18, defense: 16, speed: 1.2 },
        special: 'Frost Breath',
        breathType: 'ice',
        breathColor: 0x00FFFF,
        description: 'Arctic dragons with deadly frost breath. Pale blue-white scales.'
    },
    NightWing: {
        name: 'NightWing',
        colors: {
            body: 0x1C1C1C,
            underbelly: 0x2F2F4F,
            wings: 0x191970,
            wingMembrane: 0x000033,
            horns: 0x0D0D0D,
            eyes: 0xC0C0C0,
            claws: 0x0A0A0A,
            starScales: 0xC0C0C0
        },
        features: {
            bulky: false,
            flatHead: false,
            thickScales: false,
            noseHorn: false,
            tailBarb: false,
            glowScales: false,
            ruff: false,
            sailFin: false,
            starScales: true,
            tearmarkScales: true
        },
        baseStats: { hp: 100, attack: 19, defense: 13, speed: 1.1 },
        special: 'Nightmare',
        breathType: 'fire',
        breathColor: 0x800080,
        description: 'Mysterious dark dragons with silver scales under their wings like stars.'
    },
    // ============================================
    // PANTALA TRIBES - The Lost Continent
    // ============================================
    LeafWing: {
        name: 'LeafWing',
        colors: {
            body: 0x228B22,
            underbelly: 0x90EE90,
            wings: 0x32CD32,
            wingMembrane: 0x98FB98,
            horns: 0x006400,
            eyes: 0xADFF2F,
            claws: 0x2F4F2F,
            leafPatterns: 0x00FF00
        },
        features: {
            bulky: false,
            flatHead: false,
            thickScales: false,
            noseHorn: false,
            tailBarb: false,
            glowScales: false,
            ruff: true,
            sailFin: false,
            leafWings: true,
            leafspeak: true
        },
        baseStats: { hp: 110, attack: 17, defense: 14, speed: 1.0 },
        special: 'Leafspeak',
        breathType: 'plant',
        breathColor: 0x00FF00,
        description: 'Dragons with leaf-shaped wings who can communicate with plants. Once thought extinct.'
    },
    SilkWing: {
        name: 'SilkWing',
        colors: {
            body: 0xFFB6C1,
            underbelly: 0xFFF0F5,
            wings: 0xDDA0DD,
            wingMembrane: 0xE6E6FA,
            horns: 0xDB7093,
            eyes: 0x9370DB,
            claws: 0xC71585,
            antennae: 0xFF69B4
        },
        features: {
            bulky: false,
            flatHead: false,
            thickScales: false,
            noseHorn: false,
            tailBarb: false,
            glowScales: true,
            ruff: false,
            sailFin: false,
            fourWings: true,
            antennae: true,
            silkSpinners: true
        },
        baseStats: { hp: 90, attack: 14, defense: 10, speed: 1.3 },
        special: 'Flamesilk',
        breathType: 'silk',
        breathColor: 0xFFD700,
        description: 'Beautiful dragons with four butterfly-like wings. Some can produce flamesilk.'
    },
    HiveWing: {
        name: 'HiveWing',
        colors: {
            body: 0xFFD700,
            underbelly: 0xFFA500,
            wings: 0xDAA520,
            wingMembrane: 0xF0E68C,
            horns: 0x8B4513,
            eyes: 0x000000,
            claws: 0x8B0000,
            stripes: 0x000000
        },
        features: {
            bulky: false,
            flatHead: false,
            thickScales: false,
            noseHorn: false,
            tailBarb: true,
            glowScales: false,
            ruff: false,
            sailFin: false,
            waspStripes: true,
            stinger: true,
            wristStingers: true
        },
        baseStats: { hp: 105, attack: 21, defense: 12, speed: 1.1 },
        special: 'Nerve Strike',
        breathType: 'venom',
        breathColor: 0x8B0000,
        description: 'Wasp-like dragons with venomous stingers and paralyzing toxins. Ruled by Queen Wasp.'
    }
};

// ============================================
// LOCATION DATA WITH PALACES
// ============================================

const LOCATIONS = {
    mudKingdom: {
        name: 'The Mud Kingdom',
        skyColor: 0x6A5748,
        groundColor: 0x3D2817,
        fogColor: 0x7A6050,
        fogDensity: 0.004,
        features: 'swamp',
        enemies: ['Swamp Serpent', 'Mud Crawler', 'MudWing Scout', 'Cave Guard', 'Scavenger'],
        enemyLevel: [1, 3],
        baseLevel: 1,
        bossName: 'Marshal Marsh',
        bossLevel: 4,
        palace: {
            name: 'The Diamond Spray Delta Palace',
            style: 'mud',
            color: 0x8B4513,
            size: 40
        }
    },
    sandKingdom: {
        name: 'The Kingdom of Sand',
        skyColor: 0xC4A35A,
        groundColor: 0xE6C87A,
        fogColor: 0xD4B896,
        fogDensity: 0.006,
        features: 'desert',
        enemies: ['Sand Viper', 'Scorpion', 'SandWing Soldier'],
        enemyLevel: [2, 4],
        baseLevel: 2,
        bossName: 'Queen Thorn',
        bossLevel: 5,
        palace: {
            name: 'The Stronghold',
            style: 'sandstone',
            color: 0xDEB887,
            size: 50
        }
    },
    skyKingdom: {
        name: 'The Sky Kingdom',
        skyColor: 0x87CEEB,
        groundColor: 0x808080,
        fogColor: 0xB0C4DE,
        fogDensity: 0.004,
        features: 'mountains',
        enemies: ['Mountain Eagle', 'Rock Golem', 'SkyWing Guard'],
        enemyLevel: [3, 5],
        baseLevel: 3,
        bossName: 'General Ruby',
        bossLevel: 6,
        palace: {
            name: 'The SkyWing Palace',
            style: 'cliff',
            color: 0xDC143C,
            size: 60
        }
    },
    seaKingdom: {
        name: 'The Kingdom of the Sea',
        skyColor: 0x3A7A8A,
        groundColor: 0x2A7A8A,
        fogColor: 0x40C2CA,
        fogDensity: 0.005,
        features: 'underwater',
        enemies: ['Giant Crab', 'Shark', 'SeaWing Warrior'],
        enemyLevel: [2, 4],
        baseLevel: 2,
        bossName: 'Commander Tsunami',
        bossLevel: 5,
        palace: {
            name: 'The Deep Palace',
            style: 'coral',
            color: 0x20B2AA,
            size: 55
        }
    },
    rainforest: {
        name: 'The Rainforest Kingdom',
        skyColor: 0x4AAB42,
        groundColor: 0x2E8B57,
        fogColor: 0x5CB381,
        fogDensity: 0.005,
        features: 'jungle',
        enemies: ['Jungle Cat', 'Poison Frog', 'RainWing Guard'],
        enemyLevel: [3, 5],
        baseLevel: 3,
        bossName: 'Queen Glory',
        bossLevel: 6,
        palace: {
            name: 'The RainWing Village',
            style: 'treehouse',
            color: 0x9932CC,
            size: 45
        }
    },
    iceKingdom: {
        name: 'The Ice Kingdom',
        skyColor: 0xAFEEEE,
        groundColor: 0xE0FFFF,
        fogColor: 0xF0FFFF,
        fogDensity: 0.008,
        features: 'arctic',
        enemies: ['Frost Wolf', 'Ice Bear', 'IceWing Soldier'],
        enemyLevel: [4, 6],
        baseLevel: 4,
        bossName: 'Prince Winter',
        bossLevel: 7,
        palace: {
            name: 'The IceWing Palace',
            style: 'ice',
            color: 0xADD8E6,
            size: 65
        }
    },
    nightKingdom: {
        name: 'The Lost City of Night',
        skyColor: 0x1A1A3A,
        groundColor: 0x2A2A4A,
        fogColor: 0x3A3A5A,
        fogDensity: 0.006,
        features: 'volcanic',
        enemies: ['Shadow Bat', 'Lava Serpent', 'NightWing Assassin'],
        enemyLevel: [5, 7],
        baseLevel: 5,
        bossName: 'Darkstalker',
        bossLevel: 8,
        palace: {
            name: 'The NightWing Fortress',
            style: 'obsidian',
            color: 0x2F2F4F,
            size: 70
        }
    },
    // ============================================
    // PANTALA - The Lost Continent
    // ============================================
    poisonJungle: {
        name: 'The Poison Jungle',
        skyColor: 0x2D5A27,
        groundColor: 0x1A4D1A,
        fogColor: 0x3D7A37,
        fogDensity: 0.007,
        features: 'poisonJungle',
        enemies: ['Sundew Trap', 'Poison Dart Frog', 'LeafWing Warrior', 'Jungle Serpent'],
        enemyLevel: [4, 6],
        bossName: 'Sundew',
        bossLevel: 7,
        baseLevel: 4,
        palace: {
            name: 'The LeafWing Village',
            style: 'treehouse',
            color: 0x228B22,
            size: 45
        }
    },
    jewelHive: {
        name: 'Jewel Hive',
        skyColor: 0x87CEEB,
        groundColor: 0xFFD700,
        fogColor: 0xFFF8DC,
        fogDensity: 0.004,
        features: 'hive',
        enemies: ['HiveWing Soldier', 'HiveWing Guard', 'Wasp Drone', 'SilkWing Slave'],
        enemyLevel: [3, 5],
        bossName: 'Lady Jewel',
        bossLevel: 6,
        baseLevel: 3,
        palace: {
            name: 'Jewel Hive Palace',
            style: 'honeycomb',
            color: 0xFFD700,
            size: 55
        }
    },
    waspHive: {
        name: 'Wasp Hive',
        skyColor: 0x8B4513,
        groundColor: 0xDAA520,
        fogColor: 0xD2691E,
        fogDensity: 0.005,
        features: 'hive',
        enemies: ['HiveWing Elite', 'Mind-Controlled Dragon', 'Queen Guard', 'Wasp Swarm'],
        enemyLevel: [6, 8],
        bossName: 'Queen Wasp',
        bossLevel: 10,
        baseLevel: 6,
        palace: {
            name: 'Queen Wasps Throne',
            style: 'darkHive',
            color: 0x8B0000,
            size: 80
        }
    },
    silkwingCaves: {
        name: 'SilkWing Caves',
        skyColor: 0x9370DB,
        groundColor: 0x483D8B,
        fogColor: 0x7B68EE,
        fogDensity: 0.004,
        features: 'silkCaves',
        enemies: ['SilkWing Weaver', 'Cave Spider', 'Silk Guardian', 'Flamesilk Moth'],
        enemyLevel: [2, 4],
        bossName: 'Blue',
        bossLevel: 5,
        baseLevel: 2,
        palace: {
            name: 'The Silk Caverns',
            style: 'crystal',
            color: 0xE6E6FA,
            size: 40
        }
    }
};

// ============================================
// ITEMS DATA
// ============================================

const ITEMS = {
    healingPotion: { name: 'Healing Potion', icon: '🧪', effect: 'heal', value: 50 },
    megaPotion: { name: 'Mega Potion', icon: '💊', effect: 'heal', value: 100 },
    energyDrink: { name: 'Energy Drink', icon: '⚡', effect: 'stamina', value: 50 },
    strengthElixir: { name: 'Strength Elixir', icon: '💪', effect: 'attack', value: 10, duration: 3 },
    dragonScale: { name: 'Dragon Scale', icon: '🐉', effect: 'material', value: 0 },
    goldCoin: { name: 'Gold Coin', icon: '🪙', effect: 'currency', value: 10 },
    fireRuby: { name: 'Fire Ruby', icon: '🔴', effect: 'material', value: 0 },
    frostSapphire: { name: 'Frost Sapphire', icon: '🔵', effect: 'material', value: 0 },
    ancientScroll: { name: 'Ancient Scroll', icon: '📜', effect: 'quest', value: 0 }
};

// ============================================
// RPG EQUIPMENT SYSTEM
// ============================================

const EQUIPMENT = {
    // Armor (increases defense)
    bronzeScales: { name: 'Bronze Scale Armor', slot: 'armor', defense: 5, icon: '🛡️' },
    ironScales: { name: 'Iron Scale Armor', slot: 'armor', defense: 10, icon: '🛡️' },
    steelScales: { name: 'Steel Scale Armor', slot: 'armor', defense: 18, icon: '🛡️' },
    dragonsteelArmor: { name: 'Dragonsteel Armor', slot: 'armor', defense: 30, icon: '⚔️' },

    // Claws (increases attack)
    sharpClaws: { name: 'Sharpened Claws', slot: 'claws', attack: 5, icon: '🦅' },
    steelClaws: { name: 'Steel-Tipped Claws', slot: 'claws', attack: 12, icon: '🦅' },
    venomClaws: { name: 'Venom-Coated Claws', slot: 'claws', attack: 20, poison: true, icon: '☠️' },

    // Accessories (special bonuses)
    staminaRing: { name: 'Ring of Endurance', slot: 'accessory', staminaBonus: 30, icon: '💍' },
    healthAmulet: { name: 'Amulet of Vitality', slot: 'accessory', hpBonus: 50, icon: '📿' },
    fireCharm: { name: 'Charm of Flames', slot: 'accessory', fireBonus: 25, icon: '🔥' }
};

// ============================================
// RPG SKILLS SYSTEM
// ============================================

const SKILLS = {
    // Combat Skills
    powerStrike: { name: 'Power Strike', desc: 'Deal 150% damage', type: 'combat', cost: 1, unlockLevel: 1 },
    fireBreathPlus: { name: 'Fire Breath+', desc: 'Breath attacks deal 25% more', type: 'passive', cost: 1, unlockLevel: 3 },
    criticalEye: { name: 'Critical Eye', desc: '+10% critical hit chance', type: 'passive', cost: 2, unlockLevel: 5 },
    dragonRage: { name: 'Dragon Rage', desc: 'Double damage when HP < 25%', type: 'passive', cost: 2, unlockLevel: 7 },
    wingSlash: { name: 'Wing Slash', desc: 'AoE attack hitting all nearby', type: 'combat', cost: 2, unlockLevel: 4 },

    // Defense Skills
    scaleHarden: { name: 'Scale Harden', desc: '+20% defense', type: 'passive', cost: 1, unlockLevel: 2 },
    fireResist: { name: 'Fire Resistance', desc: 'Take 50% less fire damage', type: 'passive', cost: 1, unlockLevel: 3 },
    quickDodge: { name: 'Quick Dodge', desc: '+15% dodge chance', type: 'passive', cost: 2, unlockLevel: 6 },

    // Utility Skills
    swiftFlight: { name: 'Swift Flight', desc: '+30% fly speed', type: 'passive', cost: 1, unlockLevel: 2 },
    treasureScent: { name: 'Treasure Scent', desc: 'See nearby gold on minimap', type: 'passive', cost: 1, unlockLevel: 4 },
    healingRoar: { name: 'Healing Roar', desc: 'Restore 25% HP (3 min cooldown)', type: 'active', cost: 2, unlockLevel: 8 }
};

// ============================================
// RPG QUEST SYSTEM
// ============================================

const QUESTS = {
    // Main Story Quests
    theBeginning: {
        id: 'theBeginning',
        name: 'The Dragonet Prophecy',
        desc: 'You are one of the dragonets of destiny. Speak to the elder dragon to learn your fate.',
        type: 'main',
        objectives: [{ type: 'talk', target: 'Elder Webs', done: false }],
        rewards: { xp: 100, gold: 50 },
        nextQuest: 'escapeTheMountain'
    },
    escapeTheMountain: {
        id: 'escapeTheMountain',
        name: 'Escape the Mountain',
        desc: 'Find a way out of the mountain caves. Defeat the guards blocking your path.',
        type: 'main',
        objectives: [
            { type: 'kill', target: 'Cave Guard', count: 3, current: 0, done: false },
            { type: 'reach', target: 'Mountain Exit', done: false }
        ],
        rewards: { xp: 200, gold: 100, item: 'bronzeScales' },
        nextQuest: 'seekingAllies'
    },
    seekingAllies: {
        id: 'seekingAllies',
        name: 'Seeking Allies',
        desc: 'Travel to the Mud Kingdom and find dragons who will help your cause.',
        type: 'main',
        objectives: [
            { type: 'travel', target: 'mudKingdom', done: false },
            { type: 'talk', target: 'Commander Clay', done: false }
        ],
        rewards: { xp: 300, gold: 150 },
        nextQuest: 'theWarBegins'
    },

    // Side Quests
    lostEggs: {
        id: 'lostEggs',
        name: 'The Lost Eggs',
        desc: 'A worried mother dragon has lost her eggs. Find them in the swamp.',
        type: 'side',
        objectives: [{ type: 'collect', target: 'Dragon Egg', count: 3, current: 0, done: false }],
        rewards: { xp: 75, gold: 40, item: 'healingPotion' }
    },
    huntTheScavengers: {
        id: 'huntTheScavengers',
        name: 'Scavenger Problem',
        desc: 'Scavengers have been stealing from the village. Deal with them.',
        type: 'side',
        objectives: [{ type: 'kill', target: 'Scavenger', count: 5, current: 0, done: false }],
        rewards: { xp: 100, gold: 75 }
    },
    collectScales: {
        id: 'collectScales',
        name: 'Scale Collection',
        desc: 'The blacksmith needs dragon scales to forge new armor.',
        type: 'side',
        objectives: [{ type: 'collect', target: 'dragonScale', count: 5, current: 0, done: false }],
        rewards: { xp: 50, gold: 100, item: 'ironScales' }
    },
    bossSlayer: {
        id: 'bossSlayer',
        name: 'Champion of Pyrrhia',
        desc: 'Defeat the legendary boss of each kingdom.',
        type: 'side',
        objectives: [{ type: 'killBoss', count: 7, current: 0, done: false }],
        rewards: { xp: 1000, gold: 500, item: 'dragonsteelArmor' }
    }
};

// ============================================
// RPG NPC SYSTEM
// ============================================

const NPCS = {
    elderWebs: {
        id: 'elderWebs',
        name: 'Elder Webs',
        tribe: 'NightWing',
        role: 'Quest Giver',
        location: 'mudKingdom',
        dialogue: {
            greeting: "Ah, young dragonet... I have been expecting you. The prophecy speaks of five dragons who will end the war.",
            quest: "You must prove yourself worthy. Seek out the other dragonets and unite the tribes!",
            afterQuest: "You have done well. The prophecy unfolds as foretold..."
        },
        quests: ['theBeginning']
    },
    commanderClay: {
        id: 'commanderClay',
        name: 'Commander Clay',
        tribe: 'MudWing',
        role: 'Ally',
        location: 'mudKingdom',
        dialogue: {
            greeting: "Greetings, traveler. I am Clay, leader of the MudWing forces here.",
            quest: "We could use your help. The scavengers have been raiding our supplies.",
            afterQuest: "Thank you for your help! You are a true friend to the MudWings."
        },
        quests: ['huntTheScavengers']
    },
    blacksmithEmber: {
        id: 'blacksmithEmber',
        name: 'Ember the Smith',
        tribe: 'SkyWing',
        role: 'Blacksmith',
        location: 'skyKingdom',
        dialogue: {
            greeting: "Welcome to my forge! I craft the finest dragon armor in all of Pyrrhia.",
            shop: "Want to see my wares? I can upgrade your equipment if you bring materials.",
            quest: "I need dragon scales for a special project. Can you gather some for me?"
        },
        quests: ['collectScales'],
        shop: ['bronzeScales', 'ironScales', 'sharpClaws', 'steelClaws']
    },
    healerTsunami: {
        id: 'healerTsunami',
        name: 'Healer Tsunami',
        tribe: 'SeaWing',
        role: 'Healer',
        location: 'seaKingdom',
        dialogue: {
            greeting: "The seas welcome you, friend. I can heal your wounds.",
            heal: "Let me tend to your injuries... There, good as new!",
            shop: "I also sell healing supplies. Stay safe out there."
        },
        shop: ['healingPotion', 'megaPotion', 'energyDrink']
    },
    mysteriousStranger: {
        id: 'mysteriousStranger',
        name: 'Mysterious Stranger',
        tribe: 'NightWing',
        role: 'Secret',
        location: 'nightKingdom',
        dialogue: {
            greeting: "Shhh... I know secrets. Dark secrets about the war...",
            secret: "The queens are not what they seem. Trust no one.",
            quest: "Find the ancient scrolls hidden in each kingdom. They reveal the truth."
        },
        quests: ['bossSlayer']
    }
};

// ============================================
// GAME STATE
// ============================================

const game = {
    currentScreen: 'title',
    player: null,
    world: null,
    battle: null,

    // Three.js
    scene: null,
    camera: null,
    renderer: null,

    // Camera control
    cameraAngleY: 0,
    cameraAngleX: 0.3,
    cameraDist: CONFIG.CAMERA_DISTANCE,

    // Input
    keys: {},
    mouseDown: false,

    // Character creation
    selectedTribe: 0,
    tribeList: Object.keys(TRIBES),

    // Animation
    clock: null,
    animationFrame: null,

    // Real-time combat
    attackCooldown: 0,
    breathCooldown: 0,
    specialCooldown: 0,
    combatEffects: [],
    damageNumbers: [],

    // RPG Systems
    activeQuests: [],
    completedQuests: [],
    dialogueActive: false,
    currentNPC: null,
    currentDialogue: null,
    worldNPCs: [],

    // Enemy respawn system
    enemySpawnTimer: 0,
    ENEMY_SPAWN_INTERVAL: 20 // Spawn enemies every 20 seconds
};

// ============================================
// THREE.JS INITIALIZATION
// ============================================

function initThreeJS() {
    game.scene = new THREE.Scene();

    game.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    game.camera.position.set(0, 10, 20);

    game.renderer = new THREE.WebGLRenderer({ antialias: true });
    game.renderer.setSize(window.innerWidth, window.innerHeight);
    game.renderer.shadowMap.enabled = true;
    game.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(game.renderer.domElement);

    game.clock = new THREE.Clock();

    window.addEventListener('resize', () => {
        game.camera.aspect = window.innerWidth / window.innerHeight;
        game.camera.updateProjectionMatrix();
        game.renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// BOOK-ACCURATE 3D DRAGON MODEL BUILDER
// ============================================

function createDragon3D(tribe, scale = 1, isEnemy = false) {
    const t = TRIBES[tribe] || TRIBES.MudWing;
    const c = t.colors;
    const f = t.features;
    const dragon = new THREE.Group();

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
        color: isEnemy ? 0x8B0000 : c.body,
        roughness: 0.7,
        metalness: 0.1
    });

    const underbellyMat = new THREE.MeshStandardMaterial({
        color: isEnemy ? 0x660000 : c.underbelly,
        roughness: 0.6
    });

    const wingMat = new THREE.MeshStandardMaterial({
        color: isEnemy ? 0x550000 : c.wingMembrane,
        roughness: 0.8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
    });

    const hornMat = new THREE.MeshStandardMaterial({
        color: c.horns,
        roughness: 0.4,
        metalness: 0.2
    });

    const eyeMat = new THREE.MeshStandardMaterial({
        color: c.eyes,
        emissive: c.eyes,
        emissiveIntensity: 0.5
    });

    const clawMat = new THREE.MeshStandardMaterial({
        color: c.claws,
        roughness: 0.3,
        metalness: 0.3
    });

    // === BODY ===
    const bodyWidth = f.bulky ? 1.2 : 0.9;
    const bodyGeo = new THREE.SphereGeometry(1, 24, 18);
    bodyGeo.scale(2, bodyWidth, 1.1);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    dragon.add(body);

    // Underbelly
    const bellyGeo = new THREE.SphereGeometry(0.9, 16, 12);
    bellyGeo.scale(1.8, 0.5, 0.9);
    const belly = new THREE.Mesh(bellyGeo, underbellyMat);
    belly.position.set(0, -0.4, 0);
    dragon.add(belly);

    // === NECK ===
    const neckGeo = new THREE.CylinderGeometry(0.35, 0.55, 1.8, 12);
    const neck = new THREE.Mesh(neckGeo, bodyMat);
    neck.position.set(1.8, 0.5, 0);
    neck.rotation.z = -Math.PI / 3.5;
    neck.castShadow = true;
    dragon.add(neck);

    // Neck scales
    for (let i = 0; i < 6; i++) {
        const scaleGeo = new THREE.ConeGeometry(0.08, 0.2, 4);
        const neckScale = new THREE.Mesh(scaleGeo, bodyMat);
        const angle = -Math.PI / 3.5;
        neckScale.position.set(1.4 + i * 0.15, 0.7 + i * 0.12, 0);
        neckScale.rotation.z = angle + Math.PI / 6;
        dragon.add(neckScale);
    }

    // === HEAD ===
    const headGeo = new THREE.SphereGeometry(0.5, 20, 16);
    headGeo.scale(1.6, 1.1, 1.2);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.set(2.8, 1.3, 0);
    head.castShadow = true;
    dragon.add(head);

    // Snout
    const snoutGeo = new THREE.SphereGeometry(0.35, 16, 12);
    snoutGeo.scale(1.5, 0.8, 1);
    const snout = new THREE.Mesh(snoutGeo, bodyMat);
    snout.position.set(3.5, 1.15, 0);
    dragon.add(snout);

    // Nostrils
    const nostrilGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const nostrilMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const leftNostril = new THREE.Mesh(nostrilGeo, nostrilMat);
    leftNostril.position.set(3.85, 1.25, 0.15);
    dragon.add(leftNostril);
    const rightNostril = new THREE.Mesh(nostrilGeo, nostrilMat);
    rightNostril.position.set(3.85, 1.25, -0.15);
    dragon.add(rightNostril);

    // Nose horn (SandWing)
    if (f.noseHorn) {
        const noseHornGeo = new THREE.ConeGeometry(0.08, 0.35, 6);
        const noseHorn = new THREE.Mesh(noseHornGeo, hornMat);
        noseHorn.position.set(3.7, 1.5, 0);
        noseHorn.rotation.z = -0.3;
        dragon.add(noseHorn);
    }

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.14, 12, 12);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(3.0, 1.55, 0.35);
    dragon.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(3.0, 1.55, -0.35);
    dragon.add(rightEye);

    // Eye ridges
    const ridgeGeo = new THREE.BoxGeometry(0.25, 0.06, 0.18);
    const leftRidge = new THREE.Mesh(ridgeGeo, bodyMat);
    leftRidge.position.set(2.95, 1.72, 0.35);
    leftRidge.rotation.z = 0.2;
    dragon.add(leftRidge);
    const rightRidge = new THREE.Mesh(ridgeGeo, bodyMat);
    rightRidge.position.set(2.95, 1.72, -0.35);
    rightRidge.rotation.z = 0.2;
    dragon.add(rightRidge);

    // Jaw
    const jawGeo = new THREE.SphereGeometry(0.3, 12, 10);
    jawGeo.scale(1.3, 0.5, 1);
    const jaw = new THREE.Mesh(jawGeo, underbellyMat);
    jaw.position.set(3.3, 0.95, 0);
    dragon.add(jaw);

    // === HORNS ===
    const hornCount = f.ridgedHorns ? 4 : 2;
    for (let i = 0; i < hornCount; i++) {
        const hornSize = i < 2 ? 0.6 : 0.4;
        const hornGeo = new THREE.ConeGeometry(0.1, hornSize, 8);
        const horn = new THREE.Mesh(hornGeo, hornMat);
        const zOffset = i < 2 ? (i === 0 ? 0.25 : -0.25) : (i === 2 ? 0.35 : -0.35);
        const xOffset = i < 2 ? 2.5 : 2.3;
        horn.position.set(xOffset, 1.8 + (i < 2 ? 0 : -0.1), zOffset);
        horn.rotation.x = zOffset > 0 ? 0.4 : -0.4;
        horn.rotation.z = -0.3;
        dragon.add(horn);
    }

    // === RUFF (SeaWing, RainWing, IceWing) ===
    if (f.ruff) {
        const ruffColor = c.ruff || c.wingMembrane;
        const ruffMat = new THREE.MeshStandardMaterial({
            color: ruffColor,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85
        });
        for (let i = 0; i < 5; i++) {
            const ruffGeo = new THREE.CircleGeometry(0.25 - i * 0.03, 8);
            const ruff = new THREE.Mesh(ruffGeo, ruffMat);
            ruff.position.set(2.3 - i * 0.15, 1.5, 0.5);
            ruff.rotation.y = -Math.PI / 3;
            dragon.add(ruff);
            const ruff2 = new THREE.Mesh(ruffGeo.clone(), ruffMat);
            ruff2.position.set(2.3 - i * 0.15, 1.5, -0.5);
            ruff2.rotation.y = Math.PI / 3;
            dragon.add(ruff2);
        }
    }

    // === WINGS ===
    const wingSize = f.largeWings ? 4.5 : 3.5;
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.quadraticCurveTo(wingSize * 0.3, wingSize * 0.6, wingSize * 0.7, wingSize * 0.5);
    wingShape.quadraticCurveTo(wingSize * 0.9, wingSize * 0.55, wingSize, wingSize * 0.4);
    wingShape.quadraticCurveTo(wingSize * 0.95, wingSize * 0.2, wingSize * 0.85, 0);
    wingShape.quadraticCurveTo(wingSize * 0.6, 0.1, wingSize * 0.35, 0);
    wingShape.lineTo(0, 0);

    const wingGeo = new THREE.ShapeGeometry(wingShape);

    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(0, 0.8, 0.6);
    leftWing.rotation.x = Math.PI / 2.5;
    leftWing.rotation.y = 0.2;
    leftWing.castShadow = true;
    dragon.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo.clone(), wingMat);
    rightWing.position.set(0, 0.8, -0.6);
    rightWing.rotation.x = -Math.PI / 2.5;
    rightWing.rotation.y = -0.2;
    rightWing.castShadow = true;
    dragon.add(rightWing);

    // Wing bones
    const wingBoneMat = new THREE.MeshStandardMaterial({ color: c.wings || c.body });
    for (let w = 0; w < 2; w++) {
        const side = w === 0 ? 1 : -1;
        for (let i = 0; i < 4; i++) {
            const boneGeo = new THREE.CylinderGeometry(0.04, 0.02, wingSize * 0.9 - i * 0.3, 6);
            const bone = new THREE.Mesh(boneGeo, wingBoneMat);
            const angle = (i - 1.5) * 0.25;
            bone.position.set(
                0.3 + Math.cos(angle) * wingSize * 0.4,
                0.8,
                side * (0.7 + Math.sin(Math.abs(angle)) * 0.5)
            );
            bone.rotation.x = side * (Math.PI / 2 - angle * 0.5);
            bone.rotation.z = angle;
            dragon.add(bone);
        }
    }

    // === LEGS ===
    const legPositions = [
        { x: 0.8, z: 0.7, front: true },
        { x: 0.8, z: -0.7, front: true },
        { x: -0.9, z: 0.7, front: false },
        { x: -0.9, z: -0.7, front: false }
    ];

    legPositions.forEach((pos, idx) => {
        // Upper leg
        const upperLegGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.8, 8);
        const upperLeg = new THREE.Mesh(upperLegGeo, bodyMat);
        upperLeg.position.set(pos.x, -0.3, pos.z);
        upperLeg.rotation.z = pos.x > 0 ? 0.3 : -0.3;
        dragon.add(upperLeg);

        // Lower leg
        const lowerLegGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.7, 8);
        const lowerLeg = new THREE.Mesh(lowerLegGeo, bodyMat);
        lowerLeg.position.set(pos.x + (pos.x > 0 ? 0.15 : -0.15), -0.9, pos.z);
        dragon.add(lowerLeg);

        // Foot
        const footGeo = new THREE.SphereGeometry(0.15, 10, 8);
        footGeo.scale(1.3, 0.5, 1);
        const foot = new THREE.Mesh(footGeo, bodyMat);
        foot.position.set(pos.x + (pos.x > 0 ? 0.2 : -0.2), -1.25, pos.z);
        dragon.add(foot);

        // Claws
        for (let c = 0; c < 3; c++) {
            const clawGeo = new THREE.ConeGeometry(0.04, f.serratedClaws ? 0.25 : 0.18, 6);
            const claw = new THREE.Mesh(clawGeo, clawMat);
            claw.position.set(
                pos.x + (pos.x > 0 ? 0.35 : -0.35),
                -1.35,
                pos.z + (c - 1) * 0.12
            );
            claw.rotation.x = Math.PI;
            claw.rotation.z = pos.x > 0 ? 0.5 : -0.5;
            dragon.add(claw);
        }
    });

    // === TAIL ===
    const tailSegments = 8;
    let tailX = -2;
    let tailY = 0;
    for (let i = 0; i < tailSegments; i++) {
        const segSize = 0.35 - i * 0.035;
        const segLength = 0.5;
        const tailGeo = new THREE.SphereGeometry(segSize, 10, 8);
        tailGeo.scale(1.3, 1, 1);
        const tailSeg = new THREE.Mesh(tailGeo, bodyMat);
        tailSeg.position.set(tailX, tailY, 0);
        tailSeg.castShadow = true;
        dragon.add(tailSeg);
        tailX -= segLength;
        tailY -= 0.05;
    }

    // Tail barb (SandWing)
    if (f.tailBarb) {
        const barbGeo = new THREE.ConeGeometry(0.12, 0.5, 8);
        const barbMat = new THREE.MeshStandardMaterial({ color: c.tailBarb || 0x1a1a1a });
        const barb = new THREE.Mesh(barbGeo, barbMat);
        barb.position.set(tailX + 0.1, tailY, 0);
        barb.rotation.z = Math.PI / 2;
        dragon.add(barb);
    }

    // Sail fin (SandWing, SeaWing)
    if (f.sailFin) {
        const sailMat = new THREE.MeshStandardMaterial({
            color: c.wingMembrane,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });
        for (let i = 0; i < 12; i++) {
            const sailHeight = 0.3 - Math.abs(i - 6) * 0.03;
            const sailGeo = new THREE.PlaneGeometry(0.15, sailHeight);
            const sail = new THREE.Mesh(sailGeo, sailMat);
            sail.position.set(-0.5 - i * 0.35, 0.6 + sailHeight / 2, 0);
            dragon.add(sail);
        }
    }

    // === SPINES ===
    const spineCount = f.icicleSpines ? 15 : 10;
    for (let i = 0; i < spineCount; i++) {
        const spineHeight = f.icicleSpines ? 0.35 : 0.25;
        const spineGeo = new THREE.ConeGeometry(0.06, spineHeight, 6);
        const spineMat = f.icicleSpines ?
            new THREE.MeshStandardMaterial({ color: c.spikes || 0xE6E6FA, transparent: true, opacity: 0.8 }) :
            bodyMat;
        const spine = new THREE.Mesh(spineGeo, spineMat);
        spine.position.set(1.5 - i * 0.35, 0.9 - i * 0.01, 0);
        spine.rotation.z = 0.15;
        dragon.add(spine);
    }

    // === GLOW STRIPES (SeaWing) ===
    if (f.glowScales) {
        const glowMat = new THREE.MeshBasicMaterial({
            color: c.glowStripes,
            transparent: true,
            opacity: 0.8
        });
        for (let i = 0; i < 8; i++) {
            const stripeGeo = new THREE.BoxGeometry(0.4, 0.04, 0.7);
            const stripe = new THREE.Mesh(stripeGeo, glowMat);
            stripe.position.set(1.2 - i * 0.4, 0.3, 0);
            dragon.add(stripe);
        }
        // Glow on head
        for (let i = 0; i < 3; i++) {
            const dotGeo = new THREE.SphereGeometry(0.05, 8, 8);
            const dot = new THREE.Mesh(dotGeo, glowMat);
            dot.position.set(2.7 + i * 0.2, 1.4, 0.4);
            dragon.add(dot);
            const dot2 = dot.clone();
            dot2.position.z = -0.4;
            dragon.add(dot2);
        }
    }

    // === STAR SCALES (NightWing) ===
    if (f.starScales) {
        const starMat = new THREE.MeshBasicMaterial({ color: c.starScales });
        // Under wings
        for (let i = 0; i < 30; i++) {
            const starGeo = new THREE.SphereGeometry(0.03 + Math.random() * 0.02, 6, 6);
            const star = new THREE.Mesh(starGeo, starMat);
            const angle = (Math.random() - 0.5) * Math.PI;
            const dist = 0.5 + Math.random() * 2.5;
            star.position.set(
                Math.cos(angle) * dist * 0.5,
                0.75,
                (Math.random() > 0.5 ? 1 : -1) * (0.8 + Math.random() * 2)
            );
            dragon.add(star);
        }
    }

    // === TEAR MARKS (NightWing) ===
    if (f.tearmarkScales) {
        const tearMat = new THREE.MeshStandardMaterial({ color: 0x4B0082 });
        for (let side of [1, -1]) {
            for (let i = 0; i < 3; i++) {
                const tearGeo = new THREE.SphereGeometry(0.03, 6, 6);
                const tear = new THREE.Mesh(tearGeo, tearMat);
                tear.position.set(3.0, 1.4 - i * 0.1, side * 0.38);
                dragon.add(tear);
            }
        }
    }

    dragon.scale.set(scale, scale, scale);

    dragon.userData = {
        leftWing,
        rightWing,
        tribe,
        wingAngle: 0,
        isFlying: false
    };

    return dragon;
}

// ============================================
// PALACE BUILDER
// ============================================

function createPalace(palaceData, locationId) {
    const palace = new THREE.Group();
    const size = palaceData.size;
    const color = palaceData.color;

    const stoneMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.8
    });

    const accentMat = new THREE.MeshStandardMaterial({
        color: 0xFFD700,
        metalness: 0.6,
        roughness: 0.3
    });

    switch (palaceData.style) {
        case 'mud':
            // MudWing - sturdy fortress with multiple domes
            const baseGeo = new THREE.CylinderGeometry(size * 0.5, size * 0.6, size * 0.4, 8);
            const base = new THREE.Mesh(baseGeo, stoneMat);
            base.position.y = size * 0.2;
            base.castShadow = true;
            palace.add(base);

            // Central dome
            const domeGeo = new THREE.SphereGeometry(size * 0.35, 16, 12);
            const dome = new THREE.Mesh(domeGeo, stoneMat);
            dome.position.y = size * 0.5;
            palace.add(dome);

            // Side towers
            for (let i = 0; i < 4; i++) {
                const angle = (i / 4) * Math.PI * 2;
                const towerGeo = new THREE.CylinderGeometry(size * 0.12, size * 0.15, size * 0.6, 8);
                const tower = new THREE.Mesh(towerGeo, stoneMat);
                tower.position.set(Math.cos(angle) * size * 0.4, size * 0.3, Math.sin(angle) * size * 0.4);
                palace.add(tower);
            }
            break;

        case 'sandstone':
            // SandWing Stronghold - massive desert fortress
            const wallGeo = new THREE.BoxGeometry(size, size * 0.6, size);
            const walls = new THREE.Mesh(wallGeo, stoneMat);
            walls.position.y = size * 0.3;
            palace.add(walls);

            // Towers at corners
            for (let x of [-1, 1]) {
                for (let z of [-1, 1]) {
                    const tGeo = new THREE.CylinderGeometry(size * 0.1, size * 0.12, size * 0.9, 8);
                    const t = new THREE.Mesh(tGeo, stoneMat);
                    t.position.set(x * size * 0.45, size * 0.45, z * size * 0.45);
                    palace.add(t);

                    const topGeo = new THREE.ConeGeometry(size * 0.12, size * 0.2, 8);
                    const top = new THREE.Mesh(topGeo, accentMat);
                    top.position.set(x * size * 0.45, size * 0.95, z * size * 0.45);
                    palace.add(top);
                }
            }

            // Central spire
            const spireGeo = new THREE.ConeGeometry(size * 0.15, size * 0.8, 8);
            const spire = new THREE.Mesh(spireGeo, accentMat);
            spire.position.y = size;
            palace.add(spire);
            break;

        case 'cliff':
            // SkyWing Palace - built into mountain
            const mountainGeo = new THREE.ConeGeometry(size * 0.8, size * 1.5, 8);
            const mountain = new THREE.Mesh(mountainGeo, new THREE.MeshStandardMaterial({ color: 0x696969 }));
            mountain.position.y = size * 0.75;
            palace.add(mountain);

            // Carved palace in mountain
            for (let i = 0; i < 5; i++) {
                const levelGeo = new THREE.BoxGeometry(size * 0.5 - i * 0.08, size * 0.15, size * 0.3);
                const level = new THREE.Mesh(levelGeo, stoneMat);
                level.position.set(size * 0.3 - i * 0.05, size * 0.3 + i * 0.2, 0);
                palace.add(level);
            }

            // Landing platforms
            for (let i = 0; i < 3; i++) {
                const platGeo = new THREE.CylinderGeometry(size * 0.15, size * 0.15, 0.1, 16);
                const plat = new THREE.Mesh(platGeo, stoneMat);
                plat.position.set(size * 0.5, size * 0.4 + i * 0.3, (i - 1) * size * 0.25);
                palace.add(plat);
            }
            break;

        case 'coral':
            // SeaWing Deep Palace - coral structures
            const coralMat = new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.6
            });

            // Main coral structure
            for (let i = 0; i < 8; i++) {
                const coralGeo = new THREE.CylinderGeometry(
                    size * 0.05 + Math.random() * size * 0.1,
                    size * 0.08 + Math.random() * size * 0.1,
                    size * 0.3 + Math.random() * size * 0.5,
                    8
                );
                const coral = new THREE.Mesh(coralGeo, coralMat);
                const angle = (i / 8) * Math.PI * 2;
                coral.position.set(
                    Math.cos(angle) * size * 0.3,
                    size * 0.2 + Math.random() * size * 0.2,
                    Math.sin(angle) * size * 0.3
                );
                palace.add(coral);
            }

            // Central shell palace
            const shellGeo = new THREE.SphereGeometry(size * 0.4, 16, 12);
            const shell = new THREE.Mesh(shellGeo, coralMat);
            shell.scale.y = 0.6;
            shell.position.y = size * 0.25;
            palace.add(shell);

            // Glowing orbs
            const glowMat = new THREE.MeshBasicMaterial({ color: 0x00FFFF });
            for (let i = 0; i < 10; i++) {
                const orbGeo = new THREE.SphereGeometry(size * 0.03, 8, 8);
                const orb = new THREE.Mesh(orbGeo, glowMat);
                orb.position.set(
                    (Math.random() - 0.5) * size * 0.8,
                    Math.random() * size * 0.6,
                    (Math.random() - 0.5) * size * 0.8
                );
                palace.add(orb);
            }
            break;

        case 'treehouse':
            // RainWing Village - platform in giant tree
            const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
            const leavesMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });

            // Giant tree trunk
            const trunkGeo = new THREE.CylinderGeometry(size * 0.3, size * 0.4, size * 1.5, 12);
            const trunk = new THREE.Mesh(trunkGeo, trunkMat);
            trunk.position.y = size * 0.75;
            palace.add(trunk);

            // Platforms at different levels
            for (let i = 0; i < 4; i++) {
                const platGeo = new THREE.CylinderGeometry(size * 0.4 - i * 0.05, size * 0.4 - i * 0.05, 0.1, 16);
                const platform = new THREE.Mesh(platGeo, trunkMat);
                platform.position.y = size * 0.4 + i * 0.35;
                palace.add(platform);

                // Huts on platforms
                if (i > 0) {
                    const hutGeo = new THREE.ConeGeometry(size * 0.1, size * 0.15, 8);
                    const hut = new THREE.Mesh(hutGeo, new THREE.MeshStandardMaterial({ color: color }));
                    hut.position.set(size * 0.2, size * 0.5 + i * 0.35, 0);
                    palace.add(hut);
                }
            }

            // Foliage
            const foliageGeo = new THREE.SphereGeometry(size * 0.6, 12, 10);
            const foliage = new THREE.Mesh(foliageGeo, leavesMat);
            foliage.position.y = size * 1.5;
            palace.add(foliage);
            break;

        case 'ice':
            // IceWing Palace - crystalline ice castle
            const iceMat = new THREE.MeshStandardMaterial({
                color: color,
                transparent: true,
                opacity: 0.85,
                roughness: 0.1,
                metalness: 0.2
            });

            // Central tower
            const iceBaseGeo = new THREE.CylinderGeometry(size * 0.3, size * 0.4, size * 0.8, 6);
            const iceBase = new THREE.Mesh(iceBaseGeo, iceMat);
            iceBase.position.y = size * 0.4;
            palace.add(iceBase);

            // Ice spires
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const spireH = size * 0.5 + Math.random() * size * 0.4;
                const iceSpireGeo = new THREE.ConeGeometry(size * 0.08, spireH, 6);
                const iceSpire = new THREE.Mesh(iceSpireGeo, iceMat);
                iceSpire.position.set(
                    Math.cos(angle) * size * 0.35,
                    size * 0.8 + spireH * 0.5,
                    Math.sin(angle) * size * 0.35
                );
                palace.add(iceSpire);
            }

            // Main spire
            const mainSpireGeo = new THREE.ConeGeometry(size * 0.15, size, 6);
            const mainSpire = new THREE.Mesh(mainSpireGeo, iceMat);
            mainSpire.position.y = size * 1.3;
            palace.add(mainSpire);
            break;

        case 'obsidian':
            // NightWing Fortress - dark volcanic fortress
            const obsidianMat = new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.4,
                metalness: 0.3
            });

            const lavaMat = new THREE.MeshBasicMaterial({
                color: 0xFF4500,
                emissive: 0xFF2200
            });

            // Main fortress
            const fortGeo = new THREE.BoxGeometry(size * 0.8, size * 0.6, size * 0.8);
            const fort = new THREE.Mesh(fortGeo, obsidianMat);
            fort.position.y = size * 0.3;
            palace.add(fort);

            // Towers
            for (let x of [-1, 1]) {
                for (let z of [-1, 1]) {
                    const towerGeo = new THREE.CylinderGeometry(size * 0.08, size * 0.1, size * 0.8, 8);
                    const tower = new THREE.Mesh(towerGeo, obsidianMat);
                    tower.position.set(x * size * 0.35, size * 0.4, z * size * 0.35);
                    palace.add(tower);

                    // Lava glow at top
                    const glowGeo = new THREE.SphereGeometry(size * 0.05, 8, 8);
                    const glow = new THREE.Mesh(glowGeo, lavaMat);
                    glow.position.set(x * size * 0.35, size * 0.85, z * size * 0.35);
                    palace.add(glow);
                }
            }

            // Central dark spire
            const darkSpireGeo = new THREE.ConeGeometry(size * 0.2, size * 0.8, 8);
            const darkSpire = new THREE.Mesh(darkSpireGeo, obsidianMat);
            darkSpire.position.y = size;
            palace.add(darkSpire);
            break;

        // ============================================
        // PANTALA PALACE STYLES
        // ============================================

        case 'honeycomb':
            // HiveWing Hive Palace - hexagonal structures
            const hexMat = new THREE.MeshStandardMaterial({
                color: 0xFFD700,
                roughness: 0.3,
                metalness: 0.2
            });
            const darkHexMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

            // Main hexagonal tower
            const mainHexGeo = new THREE.CylinderGeometry(size * 0.5, size * 0.6, size * 1.2, 6);
            const mainHex = new THREE.Mesh(mainHexGeo, hexMat);
            mainHex.position.y = size * 0.6;
            palace.add(mainHex);

            // Surrounding hexagonal cells
            for (let ring = 0; ring < 3; ring++) {
                const numCells = 6 + ring * 6;
                for (let i = 0; i < numCells; i++) {
                    const cellAngle = (i / numCells) * Math.PI * 2;
                    const cellDist = size * 0.4 + ring * size * 0.25;
                    const cellSize = size * 0.15 - ring * 0.02;

                    const cellGeo = new THREE.CylinderGeometry(cellSize, cellSize * 1.1, size * 0.4 + Math.random() * size * 0.3, 6);
                    const cell = new THREE.Mesh(cellGeo, hexMat);
                    cell.position.set(
                        Math.cos(cellAngle) * cellDist,
                        size * 0.3 + ring * 0.15,
                        Math.sin(cellAngle) * cellDist
                    );
                    palace.add(cell);
                }
            }

            // Dark entrance
            const entranceGeo = new THREE.CylinderGeometry(size * 0.2, size * 0.2, size * 0.5, 6);
            const entrance = new THREE.Mesh(entranceGeo, darkHexMat);
            entrance.position.set(0, size * 0.25, size * 0.4);
            palace.add(entrance);
            break;

        case 'darkHive':
            // Queen Wasp's Dark Hive - menacing structure
            const darkWaxMat = new THREE.MeshStandardMaterial({
                color: 0x4A0000,
                roughness: 0.6,
                emissive: 0x2A0000,
                emissiveIntensity: 0.2
            });
            const eyeMat = new THREE.MeshBasicMaterial({
                color: 0xFF0000,
                emissive: 0xFF0000
            });

            // Massive dark hive
            const darkHiveGeo = new THREE.CylinderGeometry(size * 0.4, size * 0.7, size * 1.5, 6);
            const darkHive = new THREE.Mesh(darkHiveGeo, darkWaxMat);
            darkHive.position.y = size * 0.75;
            palace.add(darkHive);

            // Twisted spires
            for (let i = 0; i < 5; i++) {
                const spireAngle = (i / 5) * Math.PI * 2;
                const spireGeo = new THREE.ConeGeometry(size * 0.1, size * 0.6, 6);
                const spire = new THREE.Mesh(spireGeo, darkWaxMat);
                spire.position.set(
                    Math.cos(spireAngle) * size * 0.35,
                    size * 1.3,
                    Math.sin(spireAngle) * size * 0.35
                );
                palace.add(spire);
            }

            // Glowing red "eyes"
            for (let i = 0; i < 8; i++) {
                const eyeAngle = (i / 8) * Math.PI * 2;
                const eyeGeo = new THREE.SphereGeometry(size * 0.05, 8, 8);
                const eye = new THREE.Mesh(eyeGeo, eyeMat);
                eye.position.set(
                    Math.cos(eyeAngle) * size * 0.45,
                    size * 0.8 + Math.random() * size * 0.3,
                    Math.sin(eyeAngle) * size * 0.45
                );
                palace.add(eye);
            }
            break;

        case 'crystal':
            // SilkWing Silk Caverns - crystal formations
            const crystalPalaceMat = new THREE.MeshStandardMaterial({
                color: 0xE6E6FA,
                transparent: true,
                opacity: 0.8,
                emissive: 0x9370DB,
                emissiveIntensity: 0.3
            });
            const silkPalaceMat = new THREE.MeshStandardMaterial({
                color: 0xFFB6C1,
                transparent: true,
                opacity: 0.7
            });

            // Main crystal formation
            for (let i = 0; i < 7; i++) {
                const crystalH = size * 0.4 + Math.random() * size * 0.6;
                const crystalGeo = new THREE.ConeGeometry(size * 0.1 + Math.random() * size * 0.1, crystalH, 6);
                const crystal = new THREE.Mesh(crystalGeo, crystalPalaceMat);
                crystal.position.set(
                    (Math.random() - 0.5) * size * 0.5,
                    crystalH / 2,
                    (Math.random() - 0.5) * size * 0.5
                );
                crystal.rotation.z = (Math.random() - 0.5) * 0.3;
                palace.add(crystal);
            }

            // Silk cocoon structures
            for (let i = 0; i < 5; i++) {
                const cocoonGeo = new THREE.SphereGeometry(size * 0.15, 12, 12);
                const cocoon = new THREE.Mesh(cocoonGeo, silkPalaceMat);
                cocoon.position.set(
                    (Math.random() - 0.5) * size * 0.7,
                    size * 0.3 + Math.random() * size * 0.4,
                    (Math.random() - 0.5) * size * 0.7
                );
                cocoon.scale.y = 1.5;
                palace.add(cocoon);
            }
            break;
    }

    palace.position.set(0, 0, -60);
    palace.castShadow = true;
    palace.receiveShadow = true;

    return palace;
}

// ============================================
// TERRAIN GENERATION
// ============================================

function createTerrain(locationId) {
    const loc = LOCATIONS[locationId];
    const terrain = new THREE.Group();

    // Ground
    const groundGeo = new THREE.PlaneGeometry(300, 300, 80, 80);
    const vertices = groundGeo.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        vertices[i + 2] = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 3 + Math.random() * 0.5;
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
        color: loc.groundColor,
        roughness: 0.9
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    terrain.add(ground);

    // Add environment features
    addEnvironmentFeatures(terrain, loc);

    // Add palace
    if (loc.palace) {
        const palace = createPalace(loc.palace, locationId);
        terrain.add(palace);
    }

    return terrain;
}

function addEnvironmentFeatures(terrain, loc) {
    switch (loc.features) {
        case 'swamp':
            addSwampFeatures(terrain);
            break;
        case 'desert':
            addDesertFeatures(terrain);
            break;
        case 'mountains':
            addMountainFeatures(terrain);
            break;
        case 'underwater':
            addUnderwaterFeatures(terrain);
            break;
        case 'jungle':
            addJungleFeatures(terrain);
            break;
        case 'arctic':
            addArcticFeatures(terrain);
            break;
        case 'volcanic':
            addVolcanicFeatures(terrain);
            break;
        // Pantala environments
        case 'poisonJungle':
            addPoisonJungleFeatures(terrain);
            break;
        case 'hive':
            addHiveFeatures(terrain);
            break;
        case 'silkCaves':
            addSilkCaveFeatures(terrain);
            break;
    }
}

function addSwampFeatures(terrain) {
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x4A5D23, transparent: true, opacity: 0.7 });
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x3D2817 });
    const mossMat = new THREE.MeshStandardMaterial({ color: 0x556B2F });
    const lilyMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xFFB6C1 });
    const rootMat = new THREE.MeshStandardMaterial({ color: 0x4A3728 });
    const cattailMat = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const fogMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, transparent: true, opacity: 0.3 });

    // Murky water pools
    for (let i = 0; i < 20; i++) {
        const poolGeo = new THREE.CircleGeometry(5 + Math.random() * 12, 24);
        const pool = new THREE.Mesh(poolGeo, waterMat);
        pool.rotation.x = -Math.PI / 2;
        const px = (Math.random() - 0.5) * 150;
        const pz = (Math.random() - 0.5) * 150;
        pool.position.set(px, 0.1, pz);
        terrain.add(pool);

        // Lily pads on water
        for (let j = 0; j < 5 + Math.random() * 8; j++) {
            const lilyGeo = new THREE.CircleGeometry(0.8 + Math.random() * 0.5, 12);
            const lily = new THREE.Mesh(lilyGeo, lilyMat);
            lily.rotation.x = -Math.PI / 2;
            lily.position.set(px + (Math.random() - 0.5) * 8, 0.15, pz + (Math.random() - 0.5) * 8);
            terrain.add(lily);

            // Occasional flower
            if (Math.random() > 0.6) {
                const flowerGeo = new THREE.SphereGeometry(0.3, 8, 8);
                const flower = new THREE.Mesh(flowerGeo, flowerMat);
                flower.position.set(lily.position.x, 0.4, lily.position.z);
                terrain.add(flower);
            }
        }
    }

    // Gnarled cypress trees with roots
    for (let i = 0; i < 50; i++) {
        const tx = (Math.random() - 0.5) * 140;
        const tz = (Math.random() - 0.5) * 140;
        const treeHeight = 8 + Math.random() * 6;

        // Main trunk
        const trunkGeo = new THREE.CylinderGeometry(0.4, 1.2, treeHeight, 8);
        const trunk = new THREE.Mesh(trunkGeo, treeMat);
        trunk.position.set(tx, treeHeight / 2, tz);
        trunk.rotation.z = (Math.random() - 0.5) * 0.2;
        trunk.castShadow = true;
        terrain.add(trunk);

        // Exposed roots
        for (let r = 0; r < 4 + Math.random() * 4; r++) {
            const rootAngle = (r / 6) * Math.PI * 2 + Math.random() * 0.3;
            const rootLen = 2 + Math.random() * 3;
            const rootGeo = new THREE.CylinderGeometry(0.15, 0.3, rootLen, 6);
            const root = new THREE.Mesh(rootGeo, rootMat);
            root.position.set(
                tx + Math.cos(rootAngle) * 1.5,
                0.5,
                tz + Math.sin(rootAngle) * 1.5
            );
            root.rotation.z = Math.PI / 2 - 0.3;
            root.rotation.y = rootAngle;
            terrain.add(root);
        }

        // Hanging moss
        for (let m = 0; m < 3 + Math.random() * 4; m++) {
            const mossGeo = new THREE.ConeGeometry(0.3, 2 + Math.random() * 2, 6);
            const moss = new THREE.Mesh(mossGeo, mossMat);
            moss.position.set(
                tx + (Math.random() - 0.5) * 2,
                treeHeight - 1 - Math.random() * 2,
                tz + (Math.random() - 0.5) * 2
            );
            terrain.add(moss);
        }
    }

    // Cattails along water edges
    for (let i = 0; i < 80; i++) {
        const cx = (Math.random() - 0.5) * 150;
        const cz = (Math.random() - 0.5) * 150;

        const stalkGeo = new THREE.CylinderGeometry(0.05, 0.05, 3 + Math.random() * 1.5, 6);
        const stalk = new THREE.Mesh(stalkGeo, new THREE.MeshStandardMaterial({ color: 0x556B2F }));
        stalk.position.set(cx, 1.5, cz);
        terrain.add(stalk);

        const headGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
        const head = new THREE.Mesh(headGeo, cattailMat);
        head.position.set(cx, 3.2, cz);
        terrain.add(head);
    }

    // Fog patches
    for (let i = 0; i < 15; i++) {
        const fogGeo = new THREE.SphereGeometry(8 + Math.random() * 12, 12, 8);
        fogGeo.scale(1, 0.2, 1);
        const fog = new THREE.Mesh(fogGeo, fogMat);
        fog.position.set((Math.random() - 0.5) * 140, 2, (Math.random() - 0.5) * 140);
        terrain.add(fog);
    }

    // Fallen logs
    for (let i = 0; i < 15; i++) {
        const logGeo = new THREE.CylinderGeometry(0.4, 0.5, 6 + Math.random() * 4, 8);
        const log = new THREE.Mesh(logGeo, treeMat);
        log.position.set((Math.random() - 0.5) * 130, 0.4, (Math.random() - 0.5) * 130);
        log.rotation.z = Math.PI / 2;
        log.rotation.y = Math.random() * Math.PI;
        log.castShadow = true;
        terrain.add(log);
    }

    // Muddy mounds
    for (let i = 0; i < 25; i++) {
        const moundGeo = new THREE.SphereGeometry(2 + Math.random() * 3, 10, 8);
        moundGeo.scale(1, 0.3, 1);
        const mound = new THREE.Mesh(moundGeo, new THREE.MeshStandardMaterial({ color: 0x5D4E37 }));
        mound.position.set((Math.random() - 0.5) * 150, 0.5, (Math.random() - 0.5) * 150);
        terrain.add(mound);
    }
}

function addDesertFeatures(terrain) {
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xE6C87A });

    for (let i = 0; i < 20; i++) {
        const duneGeo = new THREE.SphereGeometry(8 + Math.random() * 15, 16, 10);
        duneGeo.scale(1, 0.25, 1);
        const dune = new THREE.Mesh(duneGeo, sandMat);
        dune.position.set((Math.random() - 0.5) * 150, 2, (Math.random() - 0.5) * 150);
        dune.castShadow = true;
        terrain.add(dune);
    }
}

function addMountainFeatures(terrain) {
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x696969 });
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });

    for (let i = 0; i < 12; i++) {
        const height = 25 + Math.random() * 35;
        const mountainGeo = new THREE.ConeGeometry(15 + Math.random() * 15, height, 8);
        const mountain = new THREE.Mesh(mountainGeo, rockMat);
        mountain.position.set((Math.random() - 0.5) * 200, height / 2, (Math.random() - 0.5) * 200);
        mountain.castShadow = true;
        terrain.add(mountain);

        const snowGeo = new THREE.ConeGeometry(6, 8, 8);
        const snow = new THREE.Mesh(snowGeo, snowMat);
        snow.position.set(mountain.position.x, height - 3, mountain.position.z);
        terrain.add(snow);
    }
}

function addUnderwaterFeatures(terrain) {
    const coralColors = [0xFF6B6B, 0xFFE66D, 0x4ECDC4, 0x95E1D3];

    for (let i = 0; i < 50; i++) {
        const coralMat = new THREE.MeshStandardMaterial({
            color: coralColors[Math.floor(Math.random() * coralColors.length)]
        });
        const coralGeo = new THREE.SphereGeometry(1 + Math.random() * 2, 8, 8);
        const coral = new THREE.Mesh(coralGeo, coralMat);
        coral.position.set((Math.random() - 0.5) * 100, Math.random() * 3, (Math.random() - 0.5) * 100);
        terrain.add(coral);
    }
}

function addJungleFeatures(terrain) {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });

    for (let i = 0; i < 40; i++) {
        const x = (Math.random() - 0.5) * 140;
        const z = (Math.random() - 0.5) * 140;

        const trunkGeo = new THREE.CylinderGeometry(0.8, 1.2, 12 + Math.random() * 8, 10);
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.set(x, 7, z);
        trunk.castShadow = true;
        terrain.add(trunk);

        const leavesGeo = new THREE.SphereGeometry(6 + Math.random() * 3, 10, 10);
        const leaves = new THREE.Mesh(leavesGeo, leavesMat);
        leaves.position.set(x, 15 + Math.random() * 4, z);
        leaves.castShadow = true;
        terrain.add(leaves);
    }
}

function addArcticFeatures(terrain) {
    const iceMat = new THREE.MeshStandardMaterial({
        color: 0xE0FFFF,
        transparent: true,
        opacity: 0.8,
        roughness: 0.1
    });

    for (let i = 0; i < 30; i++) {
        const height = 5 + Math.random() * 12;
        const iceGeo = new THREE.ConeGeometry(2 + Math.random() * 2, height, 6);
        const ice = new THREE.Mesh(iceGeo, iceMat);
        ice.position.set((Math.random() - 0.5) * 120, height / 2, (Math.random() - 0.5) * 120);
        ice.castShadow = true;
        terrain.add(ice);
    }
}

function addVolcanicFeatures(terrain) {
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x2F2F2F });
    const lavaMat = new THREE.MeshBasicMaterial({ color: 0xFF4500, emissive: 0xFF2200 });

    for (let i = 0; i < 12; i++) {
        const lavaGeo = new THREE.CircleGeometry(4 + Math.random() * 6, 16);
        const lava = new THREE.Mesh(lavaGeo, lavaMat);
        lava.rotation.x = -Math.PI / 2;
        lava.position.set((Math.random() - 0.5) * 100, 0.2, (Math.random() - 0.5) * 100);
        terrain.add(lava);
    }

    for (let i = 0; i < 35; i++) {
        const rockGeo = new THREE.DodecahedronGeometry(2 + Math.random() * 3);
        const rock = new THREE.Mesh(rockGeo, rockMat);
        rock.position.set((Math.random() - 0.5) * 120, 2, (Math.random() - 0.5) * 120);
        rock.rotation.set(Math.random(), Math.random(), Math.random());
        rock.castShadow = true;
        terrain.add(rock);
    }
}

// ============================================
// PANTALA ENVIRONMENT FEATURES
// ============================================

function addPoisonJungleFeatures(terrain) {
    const toxicMat = new THREE.MeshStandardMaterial({ color: 0x4B0082, emissive: 0x2A0050, emissiveIntensity: 0.2 });
    const venomMat = new THREE.MeshStandardMaterial({ color: 0x00FF00, emissive: 0x00FF00, emissiveIntensity: 0.4, transparent: true, opacity: 0.7 });
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x1A4D1A });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x2E8B57 });
    const sundewMat = new THREE.MeshStandardMaterial({ color: 0xFF1493, emissive: 0xFF1493, emissiveIntensity: 0.3 });

    // Toxic pools
    for (let i = 0; i < 15; i++) {
        const poolGeo = new THREE.CircleGeometry(4 + Math.random() * 8, 24);
        const pool = new THREE.Mesh(poolGeo, venomMat);
        pool.rotation.x = -Math.PI / 2;
        pool.position.set((Math.random() - 0.5) * 120, 0.15, (Math.random() - 0.5) * 120);
        terrain.add(pool);
    }

    // Giant twisted trees
    for (let i = 0; i < 40; i++) {
        const tx = (Math.random() - 0.5) * 130;
        const tz = (Math.random() - 0.5) * 130;
        const height = 12 + Math.random() * 10;

        const trunkGeo = new THREE.CylinderGeometry(0.8, 1.5, height, 8);
        const trunk = new THREE.Mesh(trunkGeo, treeMat);
        trunk.position.set(tx, height / 2, tz);
        trunk.rotation.z = (Math.random() - 0.5) * 0.3;
        trunk.castShadow = true;
        terrain.add(trunk);

        // Canopy
        const canopyGeo = new THREE.SphereGeometry(6 + Math.random() * 4, 12, 8);
        const canopy = new THREE.Mesh(canopyGeo, leafMat);
        canopy.position.set(tx, height + 3, tz);
        canopy.scale.y = 0.5;
        canopy.castShadow = true;
        terrain.add(canopy);

        // Hanging vines
        for (let v = 0; v < 5; v++) {
            const vineGeo = new THREE.CylinderGeometry(0.1, 0.1, 8 + Math.random() * 6, 6);
            const vine = new THREE.Mesh(vineGeo, vineMat);
            vine.position.set(tx + (Math.random() - 0.5) * 6, height - 2, tz + (Math.random() - 0.5) * 6);
            terrain.add(vine);
        }
    }

    // Carnivorous sundew plants (glowing)
    for (let i = 0; i < 25; i++) {
        const sundewGeo = new THREE.SphereGeometry(1 + Math.random() * 1.5, 12, 12);
        const sundew = new THREE.Mesh(sundewGeo, sundewMat);
        sundew.position.set((Math.random() - 0.5) * 100, 1.5, (Math.random() - 0.5) * 100);
        terrain.add(sundew);

        // Tendrils
        for (let t = 0; t < 8; t++) {
            const tendrilGeo = new THREE.CylinderGeometry(0.05, 0.1, 2, 6);
            const tendril = new THREE.Mesh(tendrilGeo, sundewMat);
            const angle = (t / 8) * Math.PI * 2;
            tendril.position.set(
                sundew.position.x + Math.cos(angle) * 1,
                2,
                sundew.position.z + Math.sin(angle) * 1
            );
            tendril.rotation.z = Math.PI / 4;
            tendril.rotation.y = angle;
            terrain.add(tendril);
        }
    }
}

function addHiveFeatures(terrain) {
    const hiveMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.4 });
    const honeycombMat = new THREE.MeshStandardMaterial({ color: 0xFFA500, emissive: 0xFFA500, emissiveIntensity: 0.2 });
    const waxMat = new THREE.MeshStandardMaterial({ color: 0xF5DEB3 });
    const darkHiveMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

    // Hexagonal honeycomb platforms
    for (let i = 0; i < 30; i++) {
        const hexGeo = new THREE.CylinderGeometry(4 + Math.random() * 4, 4 + Math.random() * 4, 2, 6);
        const hex = new THREE.Mesh(hexGeo, honeycombMat);
        hex.position.set(
            (Math.random() - 0.5) * 120,
            Math.random() * 15,
            (Math.random() - 0.5) * 120
        );
        hex.castShadow = true;
        terrain.add(hex);
    }

    // Hive towers/structures
    for (let i = 0; i < 15; i++) {
        const towerGeo = new THREE.CylinderGeometry(5, 8, 20 + Math.random() * 15, 6);
        const tower = new THREE.Mesh(towerGeo, hiveMat);
        tower.position.set(
            (Math.random() - 0.5) * 100,
            10 + Math.random() * 5,
            (Math.random() - 0.5) * 100
        );
        tower.castShadow = true;
        terrain.add(tower);

        // Windows/openings
        for (let w = 0; w < 5; w++) {
            const windowGeo = new THREE.CircleGeometry(1.5, 6);
            const windowMesh = new THREE.Mesh(windowGeo, darkHiveMat);
            const angle = (w / 5) * Math.PI * 2;
            windowMesh.position.set(
                tower.position.x + Math.cos(angle) * 5.5,
                tower.position.y + (Math.random() - 0.5) * 10,
                tower.position.z + Math.sin(angle) * 5.5
            );
            windowMesh.rotation.y = -angle;
            terrain.add(windowMesh);
        }
    }

    // Wax pillars
    for (let i = 0; i < 20; i++) {
        const pillarGeo = new THREE.CylinderGeometry(1, 2, 8 + Math.random() * 8, 8);
        const pillar = new THREE.Mesh(pillarGeo, waxMat);
        pillar.position.set(
            (Math.random() - 0.5) * 110,
            4,
            (Math.random() - 0.5) * 110
        );
        pillar.castShadow = true;
        terrain.add(pillar);
    }
}

function addSilkCaveFeatures(terrain) {
    const silkMat = new THREE.MeshStandardMaterial({
        color: 0xE6E6FA,
        emissive: 0xDDA0DD,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.8
    });
    const crystalMat = new THREE.MeshStandardMaterial({
        color: 0x9370DB,
        emissive: 0x9370DB,
        emissiveIntensity: 0.5
    });
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x483D8B });
    const flamesilkMat = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        transparent: true,
        opacity: 0.9
    });

    // Cave ceiling stalactites
    for (let i = 0; i < 40; i++) {
        const stalGeo = new THREE.ConeGeometry(1 + Math.random(), 5 + Math.random() * 8, 6);
        const stal = new THREE.Mesh(stalGeo, rockMat);
        stal.position.set(
            (Math.random() - 0.5) * 130,
            30 + Math.random() * 10,
            (Math.random() - 0.5) * 130
        );
        stal.rotation.x = Math.PI;
        terrain.add(stal);
    }

    // Silk webs stretched across
    for (let i = 0; i < 20; i++) {
        const webGeo = new THREE.PlaneGeometry(15 + Math.random() * 15, 15 + Math.random() * 15);
        const web = new THREE.Mesh(webGeo, silkMat);
        web.position.set(
            (Math.random() - 0.5) * 100,
            5 + Math.random() * 15,
            (Math.random() - 0.5) * 100
        );
        web.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.3;
        web.rotation.z = Math.random() * Math.PI;
        terrain.add(web);
    }

    // Glowing crystals
    for (let i = 0; i < 25; i++) {
        const crystalGeo = new THREE.OctahedronGeometry(2 + Math.random() * 2);
        const crystal = new THREE.Mesh(crystalGeo, crystalMat);
        crystal.position.set(
            (Math.random() - 0.5) * 110,
            1 + Math.random() * 3,
            (Math.random() - 0.5) * 110
        );
        crystal.rotation.set(Math.random(), Math.random(), Math.random());
        terrain.add(crystal);
    }

    // Flamesilk lanterns
    for (let i = 0; i < 15; i++) {
        const lanternGeo = new THREE.SphereGeometry(1.5, 12, 12);
        const lantern = new THREE.Mesh(lanternGeo, flamesilkMat);
        lantern.position.set(
            (Math.random() - 0.5) * 80,
            8 + Math.random() * 10,
            (Math.random() - 0.5) * 80
        );
        terrain.add(lantern);
    }

    // Rock formations
    for (let i = 0; i < 25; i++) {
        const rockGeo = new THREE.DodecahedronGeometry(3 + Math.random() * 4);
        const rock = new THREE.Mesh(rockGeo, rockMat);
        rock.position.set(
            (Math.random() - 0.5) * 120,
            2,
            (Math.random() - 0.5) * 120
        );
        rock.castShadow = true;
        terrain.add(rock);
    }
}

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
        this.gold = 50; // Start with some gold

        const t = TRIBES[tribe];
        this.baseHp = t.baseStats.hp;
        this.baseAttack = t.baseStats.attack;
        this.baseDefense = t.baseStats.defense;
        this.speedMod = t.baseStats.speed;

        this.maxStamina = 100;
        this.stamina = this.maxStamina;

        this.special = t.special;
        this.specialCooldown = 0;
        this.breathType = t.breathType;

        // RPG: Equipment slots
        this.equipment = {
            armor: null,
            claws: null,
            accessory: null
        };

        // RPG: Skills and skill points
        this.skillPoints = 1; // Start with 1 skill point
        this.unlockedSkills = [];

        // Calculate stats with equipment
        this.recalculateStats();

        this.inventory = [
            { id: 'healingPotion', count: 5 },
            { id: 'energyDrink', count: 3 }
        ];

        this.mesh = null;
        this.position = new THREE.Vector3(0, 2, 0);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.rotation = 0;
        this.isFlying = false;
        this.isGrounded = true;
        this.isSprinting = false;

        // RPG: Tracked kills for quests
        this.killCount = {};
        this.bossKills = 0;
    }

    recalculateStats() {
        // Base stats
        this.maxHp = this.baseHp;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;

        // Add equipment bonuses
        if (this.equipment.armor) {
            const armor = EQUIPMENT[this.equipment.armor];
            if (armor) this.defense += armor.defense;
        }
        if (this.equipment.claws) {
            const claws = EQUIPMENT[this.equipment.claws];
            if (claws) this.attack += claws.attack;
        }
        if (this.equipment.accessory) {
            const acc = EQUIPMENT[this.equipment.accessory];
            if (acc) {
                if (acc.hpBonus) this.maxHp += acc.hpBonus;
                if (acc.staminaBonus) this.maxStamina += acc.staminaBonus;
            }
        }

        // Add skill bonuses
        if (this.hasSkill('scaleHarden')) {
            this.defense = Math.floor(this.defense * 1.2);
        }
        if (this.hasSkill('criticalEye')) {
            this.critBonus = 0.1;
        }

        // Level bonuses
        this.maxHp += (this.level - 1) * 15;
        this.attack += (this.level - 1) * 3;
        this.defense += (this.level - 1) * 2;

        // Make sure HP doesn't exceed max
        if (this.hp > this.maxHp) this.hp = this.maxHp;
    }

    equipItem(itemId) {
        const item = EQUIPMENT[itemId];
        if (!item) return false;

        // Unequip current item in slot
        if (this.equipment[item.slot]) {
            this.addItem(this.equipment[item.slot]);
        }

        // Equip new item
        this.equipment[item.slot] = itemId;
        this.removeItem(itemId);
        this.recalculateStats();

        showMessage(`Equipped ${item.name}!`, 'reward');
        return true;
    }

    hasSkill(skillId) {
        return this.unlockedSkills.includes(skillId);
    }

    unlockSkill(skillId) {
        const skill = SKILLS[skillId];
        if (!skill) return false;
        if (this.hasSkill(skillId)) return false;
        if (this.level < skill.unlockLevel) return false;
        if (this.skillPoints < skill.cost) return false;

        this.skillPoints -= skill.cost;
        this.unlockedSkills.push(skillId);
        this.recalculateStats();

        showMessage(`Learned ${skill.name}!`, 'critical');
        return true;
    }

    createMesh() {
        this.mesh = createDragon3D(this.tribe, 1);
        this.mesh.position.copy(this.position);
        return this.mesh;
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
        this.xpToLevel = Math.floor(this.xpToLevel * 1.3);

        // RPG: Give skill points on level up
        this.skillPoints += 1;
        if (this.level % 3 === 0) this.skillPoints += 1; // Bonus every 3 levels

        // Increase base stats
        this.baseHp += 15;
        this.baseAttack += 3;
        this.baseDefense += 2;

        // Recalculate with equipment
        this.recalculateStats();
        this.hp = this.maxHp; // Full heal on level up
        this.stamina = this.maxStamina;

        return true;
    }

    useItem(itemId) {
        const slot = this.inventory.find(i => i.id === itemId);
        if (!slot || slot.count <= 0) return null;
        slot.count--;
        if (slot.count <= 0) {
            this.inventory = this.inventory.filter(i => i.count > 0);
        }
        return ITEMS[itemId];
    }

    addItem(itemId, count = 1) {
        const existing = this.inventory.find(i => i.id === itemId);
        if (existing) existing.count += count;
        else this.inventory.push({ id: itemId, count });
    }

    removeItem(itemId, count = 1) {
        const slot = this.inventory.find(i => i.id === itemId);
        if (!slot) return false;
        slot.count -= count;
        if (slot.count <= 0) {
            this.inventory = this.inventory.filter(i => i.count > 0);
        }
        return true;
    }

    hasItem(itemId, count = 1) {
        const slot = this.inventory.find(i => i.id === itemId);
        return slot && slot.count >= count;
    }

    // Track kills for quests
    recordKill(enemyName, isBoss = false) {
        if (!this.killCount[enemyName]) this.killCount[enemyName] = 0;
        this.killCount[enemyName]++;
        if (isBoss) this.bossKills++;

        // Update quest objectives
        updateQuestProgress('kill', enemyName);
        if (isBoss) updateQuestProgress('killBoss');
    }
}

// ============================================
// ENEMY CLASS - WEAKER BOSSES
// ============================================

class Enemy {
    constructor(name, level, isBoss = false) {
        this.name = name;
        this.level = level;
        this.isBoss = isBoss;

        if (isBoss) {
            // BOSSES ARE TOUGH - like in the books!
            this.maxHp = 250 + level * 40;
            this.attack = 15 + level * 5;
            this.defense = 10 + level * 3;
            this.xpReward = 150 + level * 25;
            this.goldReward = 75 + level * 15;
        } else {
            this.maxHp = 30 + level * 10;
            this.attack = 5 + level * 2;
            this.defense = 2 + level;
            this.xpReward = 15 + level * 8;
            this.goldReward = 5 + level * 3;
        }

        this.hp = this.maxHp;
        this.isFlying = Math.random() > 0.5;

        // Real-time combat properties
        this.attackCooldown = 0;
        this.aggroRange = isBoss ? 50 : 35;
        this.moveSpeed = isBoss ? 12 : 18;
        this.velocity = new THREE.Vector3(0, 0, 0);

        // Enemy tribe detection for appearance
        this.tribe = this.detectTribe(name);

        this.mesh = null;
        this.position = new THREE.Vector3(
            (Math.random() - 0.5) * 60,
            isBoss ? 8 : 3,
            (Math.random() - 0.5) * 60
        );
    }

    // Detect tribe from enemy name for proper appearance
    detectTribe(name) {
        const lowerName = name.toLowerCase();

        // Direct tribe matches
        if (lowerName.includes('mudwing') || lowerName.includes('mud')) return 'MudWing';
        if (lowerName.includes('sandwing') || lowerName.includes('sand') || lowerName.includes('scorpion') || lowerName.includes('viper')) return 'SandWing';
        if (lowerName.includes('skywing') || lowerName.includes('sky') || lowerName.includes('eagle') || lowerName.includes('ruby')) return 'SkyWing';
        if (lowerName.includes('seawing') || lowerName.includes('sea') || lowerName.includes('shark') || lowerName.includes('crab') || lowerName.includes('tsunami')) return 'SeaWing';
        if (lowerName.includes('rainwing') || lowerName.includes('rain') || lowerName.includes('frog') || lowerName.includes('glory') || lowerName.includes('jungle cat')) return 'RainWing';
        if (lowerName.includes('icewing') || lowerName.includes('ice') || lowerName.includes('frost') || lowerName.includes('winter') || lowerName.includes('bear') || lowerName.includes('wolf')) return 'IceWing';
        if (lowerName.includes('nightwing') || lowerName.includes('night') || lowerName.includes('shadow') || lowerName.includes('darkstalker') || lowerName.includes('lava')) return 'NightWing';

        // Pantala tribes
        if (lowerName.includes('leafwing') || lowerName.includes('leaf') || lowerName.includes('sundew') || lowerName.includes('plant')) return 'LeafWing';
        if (lowerName.includes('silkwing') || lowerName.includes('silk') || lowerName.includes('blue') || lowerName.includes('weaver') || lowerName.includes('flamesilk') || lowerName.includes('moth')) return 'SilkWing';
        if (lowerName.includes('hivewing') || lowerName.includes('hive') || lowerName.includes('wasp') || lowerName.includes('drone') || lowerName.includes('queen wasp') || lowerName.includes('jewel')) return 'HiveWing';

        // Generic creatures based on location context
        if (lowerName.includes('swamp') || lowerName.includes('crawler') || lowerName.includes('cave') || lowerName.includes('marsh')) return 'MudWing';
        if (lowerName.includes('desert') || lowerName.includes('scorpion')) return 'SandWing';
        if (lowerName.includes('mountain') || lowerName.includes('rock') || lowerName.includes('golem')) return 'SkyWing';
        if (lowerName.includes('serpent')) return 'SeaWing';
        if (lowerName.includes('poison') || lowerName.includes('dart')) return 'LeafWing';
        if (lowerName.includes('mind') || lowerName.includes('control')) return 'HiveWing';
        if (lowerName.includes('spider') || lowerName.includes('guardian')) return 'SilkWing';
        if (lowerName.includes('scavenger')) return 'SandWing'; // Humans are often in sand kingdom

        // Default based on random for variety
        const tribes = Object.keys(TRIBES);
        return tribes[Math.floor(Math.random() * tribes.length)];
    }

    createMesh() {
        const scale = this.isBoss ? 1.8 : 0.7;
        this.mesh = createDragon3D(this.tribe, scale, true);
        this.mesh.position.copy(this.position);
        return this.mesh;
    }

    takeDamage(amount) {
        const reduced = Math.max(1, amount - Math.floor(this.defense / 3));
        this.hp = Math.max(0, this.hp - reduced);
        return reduced;
    }

    // AI: Chase player if in range
    updateAI(delta, playerPos) {
        if (!this.mesh || this.hp <= 0) return;

        // Update attack cooldown
        if (this.attackCooldown > 0) {
            this.attackCooldown -= delta;
        }

        const dist = this.mesh.position.distanceTo(playerPos);
        const groundLevel = 3;

        // Gravity - bring enemies down to reasonable height
        if (!this.isFlying && this.mesh.position.y > groundLevel) {
            this.mesh.position.y -= 0.15;
        }
        if (this.isFlying && this.mesh.position.y > 20) {
            this.mesh.position.y -= 0.1;
        }
        // Keep above ground
        if (this.mesh.position.y < groundLevel) {
            this.mesh.position.y = groundLevel;
        }

        // Chase player if in aggro range
        if (dist < this.aggroRange && dist > 3) {
            const direction = new THREE.Vector3()
                .subVectors(playerPos, this.mesh.position)
                .normalize();

            // Move toward player - FAST chase speed
            const chaseSpeed = 0.25;
            this.velocity.x = direction.x * chaseSpeed;
            this.velocity.z = direction.z * chaseSpeed;

            // Flying enemies also adjust Y toward player
            if (this.isFlying) {
                const yDiff = playerPos.y - this.mesh.position.y;
                this.velocity.y = Math.sign(yDiff) * 0.1;
            }

            // Rotate to face player
            this.mesh.rotation.y = Math.atan2(direction.x, direction.z);
        } else if (dist <= 3) {
            // Close to player - stop and attack
            this.velocity.x *= 0.5;
            this.velocity.z *= 0.5;
        } else {
            // Idle wandering when not chasing
            if (Math.random() < 0.02) {
                this.velocity.x = (Math.random() - 0.5) * 0.15;
                this.velocity.z = (Math.random() - 0.5) * 0.15;
            }
            // Slow down
            this.velocity.x *= 0.95;
            this.velocity.z *= 0.95;
        }

        // Apply velocity
        this.mesh.position.x += this.velocity.x;
        this.mesh.position.z += this.velocity.z;
        if (this.isFlying && this.velocity.y) {
            this.mesh.position.y += this.velocity.y;
            this.mesh.position.y = Math.max(groundLevel, Math.min(25, this.mesh.position.y));
        }

        // Keep in bounds
        this.mesh.position.x = Math.max(-95, Math.min(95, this.mesh.position.x));
        this.mesh.position.z = Math.max(-95, Math.min(95, this.mesh.position.z));

        // Update position reference
        this.position.copy(this.mesh.position);
    }
}

// ============================================
// RPG QUEST FUNCTIONS
// ============================================

function startQuest(questId) {
    const quest = QUESTS[questId];
    if (!quest) return false;
    if (game.activeQuests.find(q => q.id === questId)) return false;
    if (game.completedQuests.includes(questId)) return false;

    // Deep copy the quest
    const activeQuest = JSON.parse(JSON.stringify(quest));
    game.activeQuests.push(activeQuest);

    showMessage(`New Quest: ${quest.name}!`, 'critical');
    return true;
}

function updateQuestProgress(type, target = null) {
    game.activeQuests.forEach(quest => {
        quest.objectives.forEach(obj => {
            if (obj.done) return;

            if (obj.type === type) {
                if (type === 'kill' && obj.target === target) {
                    obj.current = (obj.current || 0) + 1;
                    if (obj.current >= obj.count) {
                        obj.done = true;
                        showMessage(`Objective complete: Kill ${obj.target}`, 'reward');
                    }
                } else if (type === 'killBoss') {
                    obj.current = game.player.bossKills;
                    if (obj.current >= obj.count) {
                        obj.done = true;
                        showMessage(`Objective complete: Boss slaying`, 'reward');
                    }
                } else if (type === 'collect' && obj.target === target) {
                    obj.current = (obj.current || 0) + 1;
                    if (obj.current >= obj.count) {
                        obj.done = true;
                        showMessage(`Objective complete: Collect ${obj.target}`, 'reward');
                    }
                } else if (type === 'travel' && obj.target === target) {
                    obj.done = true;
                    showMessage(`Reached ${LOCATIONS[target].name}!`, 'reward');
                } else if (type === 'talk' && obj.target === target) {
                    obj.done = true;
                    showMessage(`Spoke with ${target}`, 'reward');
                }
            }
        });

        // Check if quest is complete
        checkQuestCompletion(quest);
    });
}

function checkQuestCompletion(quest) {
    const allDone = quest.objectives.every(obj => obj.done);
    if (allDone) {
        completeQuest(quest.id);
    }
}

function completeQuest(questId) {
    const questIndex = game.activeQuests.findIndex(q => q.id === questId);
    if (questIndex === -1) return;

    const quest = game.activeQuests[questIndex];

    // Give rewards
    if (quest.rewards.xp) {
        game.player.gainXP(quest.rewards.xp);
        showMessage(`+${quest.rewards.xp} XP!`, 'reward');
    }
    if (quest.rewards.gold) {
        game.player.gold += quest.rewards.gold;
        showMessage(`+${quest.rewards.gold} Gold!`, 'reward');
    }
    if (quest.rewards.item) {
        game.player.addItem(quest.rewards.item);
        const item = ITEMS[quest.rewards.item] || EQUIPMENT[quest.rewards.item];
        if (item) showMessage(`Received ${item.name}!`, 'reward');
    }

    // Remove from active, add to completed
    game.activeQuests.splice(questIndex, 1);
    game.completedQuests.push(questId);

    showMessage(`Quest Complete: ${quest.name}!`, 'critical');

    // Start next quest if there is one
    if (quest.nextQuest) {
        setTimeout(() => startQuest(quest.nextQuest), 1000);
    }

    updateHUD();
}

function getActiveQuestCount() {
    return game.activeQuests.length;
}

// ============================================
// RPG NPC FUNCTIONS
// ============================================

class NPC {
    constructor(npcData, x, z) {
        this.data = npcData;
        this.position = new THREE.Vector3(x, 2, z);
        this.mesh = null;
    }

    createMesh() {
        // Create NPC dragon mesh
        this.mesh = createDragon3D(this.data.tribe, 0.9, false);
        this.mesh.position.copy(this.position);

        // Add name tag above head
        this.mesh.userData.npcId = this.data.id;
        this.mesh.userData.npcName = this.data.name;

        return this.mesh;
    }

    interact() {
        game.currentNPC = this.data;
        showDialogue(this.data, 'greeting');

        // Check if NPC gives quests
        if (this.data.quests) {
            this.data.quests.forEach(questId => {
                if (!game.activeQuests.find(q => q.id === questId) &&
                    !game.completedQuests.includes(questId)) {
                    setTimeout(() => startQuest(questId), 500);
                }
            });
        }

        // Update quest progress for talking
        updateQuestProgress('talk', this.data.name);
    }
}

function showDialogue(npc, type) {
    const dialogue = npc.dialogue[type];
    if (!dialogue) return;

    game.dialogueActive = true;
    game.currentDialogue = { npc, type, text: dialogue };

    // Show dialogue UI
    const overlay = document.getElementById('dialogue-overlay');
    if (overlay) {
        document.getElementById('dialogue-npc-name').textContent = npc.name;
        document.getElementById('dialogue-npc-role').textContent = npc.role;
        document.getElementById('dialogue-text').textContent = dialogue;
        overlay.classList.remove('hidden');
    }
}

function closeDialogue() {
    game.dialogueActive = false;
    game.currentDialogue = null;
    game.currentNPC = null;

    const overlay = document.getElementById('dialogue-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function spawnNPCs(locationId) {
    game.worldNPCs = [];

    Object.values(NPCS).forEach(npcData => {
        if (npcData.location === locationId) {
            const x = (Math.random() - 0.5) * 40;
            const z = (Math.random() - 0.5) * 40;
            const npc = new NPC(npcData, x, z);
            game.scene.add(npc.createMesh());
            game.worldNPCs.push(npc);
        }
    });
}

function checkNPCInteraction() {
    if (!game.player || game.dialogueActive) return;

    const p = game.player.position;
    game.worldNPCs.forEach(npc => {
        if (npc.mesh) {
            const dist = p.distanceTo(npc.mesh.position);
            if (dist < 5) {
                // Show interaction prompt
                const prompt = document.getElementById('interaction-prompt');
                if (prompt) {
                    prompt.classList.remove('hidden');
                    prompt.innerHTML = `<span class="key">E</span> Talk to ${npc.data.name}`;
                }
                return;
            }
        }
    });
}

function interactWithNearbyNPC() {
    if (!game.player || game.dialogueActive) return;

    const p = game.player.position;
    for (const npc of game.worldNPCs) {
        if (npc.mesh) {
            const dist = p.distanceTo(npc.mesh.position);
            if (dist < 5) {
                npc.interact();
                return true;
            }
        }
    }
    return false;
}

// ============================================
// RPG SKILL FUNCTIONS
// ============================================

function showSkillsUI() {
    renderSkillsOverlay();
    toggleOverlay('skills');
}

function renderSkillsOverlay() {
    const content = document.getElementById('skills-content');
    if (!content) return;

    content.innerHTML = '';

    const p = game.player;
    const header = document.createElement('div');
    header.className = 'skills-header';
    header.innerHTML = `<span>Skill Points: ${p.skillPoints}</span><span>Level: ${p.level}</span>`;
    content.appendChild(header);

    Object.entries(SKILLS).forEach(([id, skill]) => {
        const div = document.createElement('div');
        const unlocked = p.hasSkill(id);
        const canUnlock = p.level >= skill.unlockLevel && p.skillPoints >= skill.cost && !unlocked;

        div.className = `skill-item ${unlocked ? 'unlocked' : ''} ${canUnlock ? 'available' : ''}`;
        div.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-desc">${skill.desc}</div>
            <div class="skill-info">
                <span>Cost: ${skill.cost} SP</span>
                <span>Unlock: Lv.${skill.unlockLevel}</span>
            </div>
        `;

        if (canUnlock) {
            div.onclick = () => {
                p.unlockSkill(id);
                renderSkillsOverlay();
                updateHUD();
            };
        }

        content.appendChild(div);
    });
}

// ============================================
// WORLD CLASS
// ============================================

class World {
    constructor(locationId) {
        this.locationId = locationId;
        this.location = LOCATIONS[locationId];
        this.terrain = null;
        this.enemies = [];
        this.collectibles = [];
        this.portals = [];
        this.boss = null;
    }

    generate() {
        this.terrain = createTerrain(this.locationId);
        game.scene.add(this.terrain);

        this.setupLighting();

        game.scene.fog = new THREE.FogExp2(this.location.fogColor, this.location.fogDensity);
        game.scene.background = new THREE.Color(this.location.skyColor);

        this.generateEntities();

        // RPG: Spawn NPCs for this location
        spawnNPCs(this.locationId);

        // RPG: Update quest progress for travel
        updateQuestProgress('travel', this.locationId);
    }

    setupLighting() {
        game.scene.children = game.scene.children.filter(c => !c.isLight);

        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        game.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xFFFFFF, 1);
        sun.position.set(80, 150, 80);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 500;
        sun.shadow.camera.left = -150;
        sun.shadow.camera.right = 150;
        sun.shadow.camera.top = 150;
        sun.shadow.camera.bottom = -150;
        game.scene.add(sun);

        const hemi = new THREE.HemisphereLight(this.location.skyColor, this.location.groundColor, 0.3);
        game.scene.add(hemi);
    }

    generateEntities() {
        const loc = this.location;

        // Spawn 15 enemies initially
        for (let i = 0; i < 15; i++) {
            this.spawnEnemy();
        }

        this.boss = new Enemy(loc.bossName, loc.bossLevel, true);
        this.boss.position.set(0, 8, -40);
        game.scene.add(this.boss.createMesh());

        for (let i = 0; i < 10; i++) {
            const type = Math.random() > 0.5 ? 'gold' : 'heal';
            const collectible = this.createCollectible(type);
            this.collectibles.push(collectible);
            game.scene.add(collectible);
        }

        this.createPortals();
    }

    createCollectible(type) {
        const geo = new THREE.SphereGeometry(0.8, 16, 16);
        const mat = new THREE.MeshStandardMaterial({
            color: type === 'gold' ? 0xFFD700 : 0x00FF00,
            emissive: type === 'gold' ? 0xFFD700 : 0x00FF00,
            emissiveIntensity: 0.4
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            (Math.random() - 0.5) * 80,
            2 + Math.random() * 3,
            (Math.random() - 0.5) * 80
        );
        mesh.userData = { type, value: type === 'gold' ? 15 + Math.floor(Math.random() * 20) : 35 };
        return mesh;
    }

    createPortals() {
        const locs = Object.keys(LOCATIONS);
        const idx = locs.indexOf(this.locationId);

        const prevLoc = locs[(idx - 1 + locs.length) % locs.length];
        const prevPortal = this.createPortal(prevLoc, -70, 4, 0);
        this.portals.push(prevPortal);
        game.scene.add(prevPortal);

        const nextLoc = locs[(idx + 1) % locs.length];
        const nextPortal = this.createPortal(nextLoc, 70, 4, 0);
        this.portals.push(nextPortal);
        game.scene.add(nextPortal);
    }

    createPortal(destination, x, y, z) {
        const geo = new THREE.TorusGeometry(3, 0.5, 16, 32);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x9B59B6,
            emissive: 0x9B59B6,
            emissiveIntensity: 0.6
        });
        const portal = new THREE.Mesh(geo, mat);
        portal.position.set(x, y, z);
        portal.rotation.y = Math.PI / 2;
        portal.userData = { destination };

        const innerGeo = new THREE.CircleGeometry(2.5, 32);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0xDDA0DD,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        inner.rotation.y = Math.PI / 2;
        portal.add(inner);

        return portal;
    }

    spawnEnemy() {
        const loc = this.location;
        const enemyType = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
        const baseLevel = loc.baseLevel || loc.enemyLevel?.[0] || 1;
        const lvl = Math.floor(Math.random() * 3) + baseLevel;
        const enemy = new Enemy(enemyType, lvl, false);

        // Spawn enemies at reasonable heights - ground level or slightly above
        const spawnY = enemy.isFlying ? (5 + Math.random() * 8) : 3;
        enemy.position.set(
            (Math.random() - 0.5) * 100,
            spawnY,
            (Math.random() - 0.5) * 100
        );
        this.enemies.push(enemy);
        game.scene.add(enemy.createMesh());
        return enemy;
    }

    update(delta) {
        // Get player position for AI
        const playerPos = game.player ? game.player.position : new THREE.Vector3(0, 0, 0);

        // Rotate collectibles
        this.collectibles.forEach(c => {
            c.rotation.y += delta * 2;
            c.position.y = (c.userData.baseY || c.position.y) + Math.sin(Date.now() * 0.003) * 0.3;
            c.userData.baseY = c.userData.baseY || c.position.y;
        });

        // Update enemies with AI
        this.enemies.forEach(enemy => {
            if (enemy.mesh && enemy.hp > 0) {
                // Call AI to chase player
                enemy.updateAI(delta, playerPos);

                // Wing animation
                if (enemy.isFlying && enemy.mesh.userData) {
                    enemy.mesh.userData.wingAngle = Math.sin(Date.now() * 0.01) * 0.6;
                    if (enemy.mesh.userData.leftWing) {
                        enemy.mesh.userData.leftWing.rotation.x = Math.PI / 2.5 + enemy.mesh.userData.wingAngle;
                    }
                    if (enemy.mesh.userData.rightWing) {
                        enemy.mesh.userData.rightWing.rotation.x = -Math.PI / 2.5 - enemy.mesh.userData.wingAngle;
                    }
                }
            }
        });

        // Rotate portals
        this.portals.forEach(p => {
            p.rotation.z += delta * 0.5;
        });

        // Boss AI and animation
        if (this.boss && this.boss.mesh && this.boss.hp > 0) {
            this.boss.updateAI(delta, playerPos);
            this.boss.mesh.position.y = Math.max(4, this.boss.mesh.position.y);
        }
    }

    cleanup() {
        if (this.terrain) game.scene.remove(this.terrain);
        this.enemies.forEach(e => { if (e.mesh) game.scene.remove(e.mesh); });
        this.collectibles.forEach(c => game.scene.remove(c));
        this.portals.forEach(p => game.scene.remove(p));
        if (this.boss && this.boss.mesh) game.scene.remove(this.boss.mesh);

        // RPG: Clean up NPCs
        game.worldNPCs.forEach(npc => {
            if (npc.mesh) game.scene.remove(npc.mesh);
        });
        game.worldNPCs = [];
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
    document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden'));
}

function toggleOverlay(overlayId) {
    const overlay = document.getElementById(overlayId + '-overlay');
    if (overlay) overlay.classList.toggle('hidden');
}

// ============================================
// HUD UPDATES
// ============================================

function updateHUD() {
    if (!game.player) return;

    const p = game.player;

    document.getElementById('player-name-display').textContent = p.name;
    document.getElementById('player-tribe-badge').textContent = p.tribe;
    document.getElementById('level-value').textContent = p.level;

    document.getElementById('hp-bar').style.width = `${(p.hp / p.maxHp) * 100}%`;
    document.getElementById('hp-text').textContent = `${p.hp}/${p.maxHp}`;

    document.getElementById('stamina-bar').style.width = `${(p.stamina / p.maxStamina) * 100}%`;
    document.getElementById('stamina-text').textContent = `${Math.floor(p.stamina)}/${p.maxStamina}`;

    document.getElementById('xp-bar').style.width = `${(p.xp / p.xpToLevel) * 100}%`;
    document.getElementById('xp-text').textContent = `${p.xp}/${p.xpToLevel}`;

    document.getElementById('atk-value').textContent = p.attack;
    document.getElementById('def-value').textContent = p.defense;
    document.getElementById('gold-value').textContent = p.gold;

    if (game.world) {
        document.getElementById('location-name').textContent = game.world.location.name;
    }

    const flightStatus = document.getElementById('flight-status');
    if (p.isFlying) flightStatus.classList.remove('hidden');
    else flightStatus.classList.add('hidden');
}

function showMessage(text, type = 'info') {
    const container = document.getElementById('game-messages');
    if (!container) return;

    const msg = document.createElement('div');
    msg.className = `game-message ${type}`;
    msg.textContent = text;
    container.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
}

// ============================================
// REAL-TIME COMBAT (Attack while moving!)
// ============================================

function realTimeAttack() {
    if (game.attackCooldown > 0 || !game.player || !game.world) return false;

    const p = game.player;
    const attackRange = 8;
    const attackAngle = Math.PI / 3; // 60 degree cone
    let hitEnemy = null;
    let hitDist = Infinity;

    // Find closest enemy in attack range and direction
    game.world.enemies.forEach(enemy => {
        if (!enemy.mesh) return;
        const dist = p.position.distanceTo(enemy.mesh.position);
        if (dist > attackRange) return;

        // Check if enemy is in front of player
        const toEnemy = new THREE.Vector3().subVectors(enemy.mesh.position, p.position).normalize();
        const facing = new THREE.Vector3(Math.sin(p.rotation), 0, Math.cos(p.rotation));
        const angle = Math.acos(facing.dot(toEnemy));

        if (angle < attackAngle && dist < hitDist) {
            hitDist = dist;
            hitEnemy = enemy;
        }
    });

    // Also check boss
    if (game.world.boss && game.world.boss.mesh) {
        const dist = p.position.distanceTo(game.world.boss.mesh.position);
        if (dist <= attackRange) {
            const toEnemy = new THREE.Vector3().subVectors(game.world.boss.mesh.position, p.position).normalize();
            const facing = new THREE.Vector3(Math.sin(p.rotation), 0, Math.cos(p.rotation));
            const angle = Math.acos(facing.dot(toEnemy));
            if (angle < attackAngle && dist < hitDist) {
                hitEnemy = game.world.boss;
            }
        }
    }

    if (hitEnemy) {
        // Calculate damage with crits and bonuses
        let baseDmg = p.attack + Math.floor(Math.random() * 6);
        let isCrit = Math.random() < 0.15; // 15% crit chance
        let isMoving = Math.abs(p.velocity.x) > 0.1 || Math.abs(p.velocity.z) > 0.1;

        if (isCrit) baseDmg = Math.floor(baseDmg * 1.8);
        if (p.isFlying) baseDmg = Math.floor(baseDmg * 1.25); // Aerial bonus
        if (isMoving) baseDmg = Math.floor(baseDmg * 1.1); // Movement bonus

        const dealt = hitEnemy.takeDamage(baseDmg);

        // Show damage number
        spawnDamageNumber(hitEnemy.mesh.position, dealt, isCrit);

        // Visual effect
        spawnCombatEffect(hitEnemy.mesh.position, 'slash');

        // Message
        let msg = `Hit ${hitEnemy.name} for ${dealt}!`;
        if (isCrit) msg = `CRITICAL! ${dealt} damage to ${hitEnemy.name}!`;
        showMessage(msg, isCrit ? 'critical' : 'damage');

        // Check if enemy died
        if (hitEnemy.hp <= 0) {
            defeatEnemy(hitEnemy);
        }

        game.attackCooldown = 0.4; // 400ms cooldown
        return true;
    }

    game.attackCooldown = 0.2; // Short cooldown even on miss
    return false;
}

function realTimeBreathAttack() {
    if (game.breathCooldown > 0 || !game.player || !game.world) return false;

    const p = game.player;
    const attackRange = 15;
    const attackAngle = Math.PI / 4; // 45 degree cone
    let hitEnemies = [];

    // Find all enemies in breath cone
    game.world.enemies.forEach(enemy => {
        if (!enemy.mesh) return;
        const dist = p.position.distanceTo(enemy.mesh.position);
        if (dist > attackRange) return;

        const toEnemy = new THREE.Vector3().subVectors(enemy.mesh.position, p.position).normalize();
        const facing = new THREE.Vector3(Math.sin(p.rotation), 0, Math.cos(p.rotation));
        const angle = Math.acos(facing.dot(toEnemy));

        if (angle < attackAngle) {
            hitEnemies.push({ enemy, dist });
        }
    });

    // Check boss too
    if (game.world.boss && game.world.boss.mesh) {
        const dist = p.position.distanceTo(game.world.boss.mesh.position);
        if (dist <= attackRange) {
            const toEnemy = new THREE.Vector3().subVectors(game.world.boss.mesh.position, p.position).normalize();
            const facing = new THREE.Vector3(Math.sin(p.rotation), 0, Math.cos(p.rotation));
            const angle = Math.acos(facing.dot(toEnemy));
            if (angle < attackAngle) {
                hitEnemies.push({ enemy: game.world.boss, dist });
            }
        }
    }

    // Spawn breath effect
    spawnBreathEffect(p);

    if (hitEnemies.length > 0) {
        hitEnemies.forEach(({ enemy, dist }) => {
            // Damage decreases with distance
            const distMod = 1 - (dist / attackRange) * 0.5;
            let dmg = Math.floor((p.attack * 1.4 + Math.random() * 10) * distMod);
            if (p.isFlying) dmg = Math.floor(dmg * 1.25);

            const dealt = enemy.takeDamage(dmg);
            spawnDamageNumber(enemy.mesh.position, dealt, false);

            if (enemy.hp <= 0) {
                defeatEnemy(enemy);
            }
        });

        const breathName = p.breathType === 'ice' ? 'Frost Breath' :
                          p.breathType === 'acid' ? 'Venom Spit' :
                          p.breathType === 'water' ? 'Tidal Blast' : 'Fire Breath';
        showMessage(`${breathName} hits ${hitEnemies.length} enemies!`, 'player');
    }

    game.breathCooldown = 1.5; // 1.5 second cooldown
    return hitEnemies.length > 0;
}

function realTimeSpecialAttack() {
    if (game.specialCooldown > 0 || !game.player || !game.world) return false;

    const p = game.player;
    const attackRange = 12;
    let hitEnemies = [];

    // Special attacks hit all nearby enemies (360 degrees)
    game.world.enemies.forEach(enemy => {
        if (!enemy.mesh) return;
        const dist = p.position.distanceTo(enemy.mesh.position);
        if (dist <= attackRange) {
            hitEnemies.push(enemy);
        }
    });

    if (game.world.boss && game.world.boss.mesh) {
        const dist = p.position.distanceTo(game.world.boss.mesh.position);
        if (dist <= attackRange) {
            hitEnemies.push(game.world.boss);
        }
    }

    // Spawn special effect
    spawnSpecialEffect(p);

    if (hitEnemies.length > 0) {
        hitEnemies.forEach(enemy => {
            let dmg = Math.floor(p.attack * 2.2);
            if (p.isFlying) dmg = Math.floor(dmg * 1.25);

            const dealt = enemy.takeDamage(dmg);
            spawnDamageNumber(enemy.mesh.position, dealt, true);

            if (enemy.hp <= 0) {
                defeatEnemy(enemy);
            }
        });

        showMessage(`${p.special}! Hit ${hitEnemies.length} enemies!`, 'critical');
    }

    game.specialCooldown = 5; // 5 second cooldown
    return hitEnemies.length > 0;
}

function defeatEnemy(enemy) {
    const p = game.player;

    // RPG: Record kill for quests
    p.recordKill(enemy.name, enemy.isBoss);

    // Give rewards
    const leveledUp = p.gainXP(enemy.xpReward);
    p.gold += enemy.goldReward;

    showMessage(`Defeated ${enemy.name}! +${enemy.xpReward} XP, +${enemy.goldReward} Gold`, 'reward');

    if (leveledUp) {
        showMessage(`LEVEL UP! Now level ${p.level}! +1 Skill Point!`, 'critical');
    }

    // Random loot - RPG style
    const lootRoll = Math.random();
    if (lootRoll < 0.4) {
        p.addItem('healingPotion');
        showMessage('Found a Healing Potion!', 'reward');
    } else if (lootRoll < 0.55) {
        p.addItem('dragonScale');
        showMessage('Found a Dragon Scale!', 'reward');
    } else if (lootRoll < 0.65) {
        p.addItem('energyDrink');
        showMessage('Found an Energy Drink!', 'reward');
    }

    // Boss special loot
    if (enemy.isBoss) {
        const bossLoot = ['fireRuby', 'frostSapphire', 'strengthElixir', 'megaPotion'];
        const loot = bossLoot[Math.floor(Math.random() * bossLoot.length)];
        p.addItem(loot);
        const item = ITEMS[loot];
        showMessage(`Boss dropped ${item.name}!`, 'critical');

        // Chance for equipment
        if (Math.random() < 0.3) {
            const equipLoot = ['bronzeScales', 'sharpClaws', 'staminaRing'];
            const equip = equipLoot[Math.floor(Math.random() * equipLoot.length)];
            p.addItem(equip);
            showMessage(`Found ${EQUIPMENT[equip].name}!`, 'critical');
        }
    }

    // Remove enemy
    if (enemy.mesh) game.scene.remove(enemy.mesh);
    game.world.enemies = game.world.enemies.filter(e => e !== enemy);
    if (enemy === game.world.boss) game.world.boss = null;

    updateHUD();
}

function spawnDamageNumber(position, damage, isCrit) {
    game.damageNumbers.push({
        position: position.clone(),
        damage: damage,
        isCrit: isCrit,
        life: 1.5,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 2, 3, (Math.random() - 0.5) * 2)
    });
}

function spawnCombatEffect(position, type) {
    const effectMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.8 });
    const effectGeo = new THREE.RingGeometry(0.5, 2, 8);
    const effect = new THREE.Mesh(effectGeo, effectMat);
    effect.position.copy(position);
    effect.position.y += 2;
    effect.rotation.x = -Math.PI / 2;
    game.scene.add(effect);

    game.combatEffects.push({
        mesh: effect,
        life: 0.3,
        type: type
    });
}

function spawnBreathEffect(player) {
    const p = player;
    const breathColor = p.breathType === 'ice' ? 0x00FFFF :
                       p.breathType === 'acid' ? 0x00FF00 :
                       p.breathType === 'water' ? 0x0066FF : 0xFF4500;

    for (let i = 0; i < 10; i++) {
        const particleMat = new THREE.MeshBasicMaterial({ color: breathColor, transparent: true, opacity: 0.7 });
        const particleGeo = new THREE.SphereGeometry(0.3 + Math.random() * 0.3, 6, 6);
        const particle = new THREE.Mesh(particleGeo, particleMat);

        const offset = (Math.random() - 0.5) * 2;
        particle.position.set(
            p.position.x + Math.sin(p.rotation) * 2,
            p.position.y + 1.5,
            p.position.z + Math.cos(p.rotation) * 2
        );

        game.scene.add(particle);
        game.combatEffects.push({
            mesh: particle,
            life: 0.8,
            velocity: new THREE.Vector3(
                Math.sin(p.rotation + offset * 0.3) * 20,
                (Math.random() - 0.3) * 3,
                Math.cos(p.rotation + offset * 0.3) * 20
            ),
            type: 'breath'
        });
    }
}

function spawnSpecialEffect(player) {
    const p = player;
    const tribeData = TRIBES[p.tribe];

    for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const particleMat = new THREE.MeshBasicMaterial({
            color: tribeData.colors.primary,
            transparent: true,
            opacity: 0.8
        });
        const particleGeo = new THREE.SphereGeometry(0.5, 6, 6);
        const particle = new THREE.Mesh(particleGeo, particleMat);

        particle.position.copy(p.position);
        particle.position.y += 1;

        game.scene.add(particle);
        game.combatEffects.push({
            mesh: particle,
            life: 1.0,
            velocity: new THREE.Vector3(Math.cos(angle) * 15, 2, Math.sin(angle) * 15),
            type: 'special'
        });
    }
}

function updateCombatEffects(delta) {
    // Update damage numbers (floating text)
    game.damageNumbers = game.damageNumbers.filter(dn => {
        dn.life -= delta;
        dn.position.add(dn.velocity.clone().multiplyScalar(delta));
        dn.velocity.y -= 5 * delta; // Gravity
        return dn.life > 0;
    });

    // Update visual effects
    game.combatEffects = game.combatEffects.filter(effect => {
        effect.life -= delta;

        if (effect.velocity) {
            effect.mesh.position.add(effect.velocity.clone().multiplyScalar(delta));
            effect.velocity.multiplyScalar(0.95); // Drag
        }

        if (effect.type === 'slash') {
            effect.mesh.scale.multiplyScalar(1.1);
        }

        effect.mesh.material.opacity = effect.life / 1.0;

        if (effect.life <= 0) {
            game.scene.remove(effect.mesh);
            return false;
        }
        return true;
    });

    // Update cooldowns
    if (game.attackCooldown > 0) game.attackCooldown -= delta;
    if (game.breathCooldown > 0) game.breathCooldown -= delta;
    if (game.specialCooldown > 0) game.specialCooldown -= delta;
}

function renderDamageNumbers() {
    // This uses CSS overlays for damage numbers
    const container = document.getElementById('damage-numbers');
    if (!container) return;

    container.innerHTML = '';

    game.damageNumbers.forEach(dn => {
        // Project 3D position to 2D screen
        const vector = dn.position.clone();
        vector.project(game.camera);

        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

        if (vector.z < 1) { // In front of camera
            const div = document.createElement('div');
            div.className = `damage-number ${dn.isCrit ? 'critical' : ''}`;
            div.textContent = dn.damage;
            div.style.left = `${x}px`;
            div.style.top = `${y}px`;
            div.style.opacity = Math.min(1, dn.life);
            container.appendChild(div);
        }
    });
}

// ============================================
// BATTLE SYSTEM (Turn-based for when close contact)
// ============================================

function startBattle(enemy) {
    game.battle = {
        enemy: enemy,
        turn: 'player',
        combo: 0,
        defending: false,
        canAct: true,
        isAerial: game.player.isFlying || enemy.isFlying,
        // Combat complexity additions
        playerStatusEffects: [],
        enemyStatusEffects: [],
        counterReady: false,
        perfectDodgeWindow: false,
        momentum: 0, // Builds up for powerful finishers
        critChance: 0.15,
        dodgeChance: 0.1
    };

    showScreen('battle');
    updateBattleUI();

    const battleType = game.battle.isAerial ? 'AERIAL BATTLE!' : 'Battle!';
    addBattleLog(`${battleType} A wild ${enemy.name} appears!`, 'system');

    if (enemy.isBoss) {
        document.getElementById('battle-title').textContent = '👑 BOSS BATTLE! 👑';
        addBattleLog('Boss has enhanced abilities!', 'enemy');
    } else if (game.battle.isAerial) {
        document.getElementById('battle-title').textContent = '🦅 Aerial Combat! 🦅';
        addBattleLog('Aerial advantage: +25% damage, +20% dodge!', 'system');
        game.battle.dodgeChance += 0.2;
    } else {
        document.getElementById('battle-title').textContent = 'Battle!';
    }
}

function updateBattleUI() {
    if (!game.battle) return;

    const p = game.player;
    const e = game.battle.enemy;

    document.getElementById('battle-player-name').textContent = `${p.name} (Lv.${p.level})`;
    document.getElementById('player-battle-hp').style.width = `${(p.hp / p.maxHp) * 100}%`;
    document.getElementById('player-battle-hp-text').textContent = `${p.hp}/${p.maxHp}`;

    document.getElementById('battle-enemy-name').textContent = `${e.name} (Lv.${e.level})`;
    document.getElementById('enemy-battle-hp').style.width = `${(e.hp / e.maxHp) * 100}%`;
    document.getElementById('enemy-battle-hp-text').textContent = `${e.hp}/${e.maxHp}`;

    const comboMeter = document.getElementById('combo-meter');
    if (game.battle.combo > 1) {
        comboMeter.classList.remove('hidden');
        document.getElementById('combo-count').textContent = game.battle.combo;
    } else {
        comboMeter.classList.add('hidden');
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

    const aerialBonus = game.battle.isAerial ? 1.25 : 1;
    const comboBonus = 1 + (game.battle.combo * 0.05); // 5% per combo
    const momentumBonus = 1 + (game.battle.momentum * 0.02); // 2% per momentum

    // Check for critical hit
    const isCrit = Math.random() < (game.battle.critChance + game.battle.combo * 0.03);
    const critMult = isCrit ? 1.8 : 1;

    // Apply status effect modifiers
    let statusMod = 1;
    game.battle.playerStatusEffects.forEach(effect => {
        if (effect.type === 'strength') statusMod *= 1.3;
        if (effect.type === 'weakness') statusMod *= 0.7;
    });

    switch (action) {
        case 'attack':
            let dmg = Math.floor((p.attack + Math.floor(Math.random() * 6)) * aerialBonus * comboBonus * critMult * statusMod);
            const dealt = e.takeDamage(dmg);
            game.battle.combo++;
            game.battle.momentum = Math.min(10, game.battle.momentum + 1);

            let attackMsg = `You attack for ${dealt} damage!`;
            if (isCrit) attackMsg = `CRITICAL HIT! ${dealt} damage!`;
            if (game.battle.isAerial) attackMsg += ' (Aerial!)';
            addBattleLog(attackMsg, isCrit ? 'critical' : 'player');

            if (game.battle.combo > 2) addBattleLog(`${game.battle.combo}x Combo! (+${Math.floor(comboBonus * 100 - 100)}% damage)`, 'critical');

            // Chance to apply bleed
            if (isCrit && Math.random() < 0.3) {
                game.battle.enemyStatusEffects.push({ type: 'bleed', duration: 3, damage: 5 });
                addBattleLog('Enemy is bleeding!', 'critical');
            }
            break;

        case 'fire':
            const breathDmg = Math.floor((p.attack * 1.4 + Math.floor(Math.random() * 10)) * aerialBonus * momentumBonus * critMult * statusMod);
            const breathDealt = e.takeDamage(breathDmg);
            game.battle.combo++;
            game.battle.momentum = Math.min(10, game.battle.momentum + 2);

            const breathName = p.breathType === 'ice' ? 'Frost Breath' :
                              p.breathType === 'acid' ? 'Venom Spit' :
                              p.breathType === 'water' ? 'Tidal Blast' : 'Fire Breath';
            addBattleLog(`${breathName} deals ${breathDealt} damage!${isCrit ? ' CRITICAL!' : ''}`, isCrit ? 'critical' : 'player');

            // Status effect based on breath type
            if (Math.random() < 0.35) {
                if (p.breathType === 'ice') {
                    game.battle.enemyStatusEffects.push({ type: 'frozen', duration: 2 });
                    addBattleLog('Enemy is frozen! (-30% speed)', 'player');
                } else if (p.breathType === 'acid') {
                    game.battle.enemyStatusEffects.push({ type: 'poison', duration: 4, damage: 8 });
                    addBattleLog('Enemy is poisoned!', 'player');
                } else if (p.breathType === 'fire') {
                    game.battle.enemyStatusEffects.push({ type: 'burn', duration: 3, damage: 6 });
                    addBattleLog('Enemy is burning!', 'player');
                } else if (p.breathType === 'water') {
                    game.battle.enemyStatusEffects.push({ type: 'soaked', duration: 3 });
                    addBattleLog('Enemy is soaked! (Vulnerable to attacks)', 'player');
                }
            }
            break;

        case 'special':
            if (p.specialCooldown > 0) {
                addBattleLog(`${p.special} on cooldown (${p.specialCooldown} turns)`, 'system');
                game.battle.canAct = true;
                return;
            }
            // Special always crits if momentum is high
            const specialCrit = game.battle.momentum >= 5 || isCrit;
            const specialCritMult = specialCrit ? 2.0 : 1;
            const specialDmg = Math.floor(p.attack * 2.2 * aerialBonus * specialCritMult * statusMod);
            const specialDealt = e.takeDamage(specialDmg);
            p.specialCooldown = 3;
            game.battle.combo++;
            game.battle.momentum = 0; // Reset momentum after special

            addBattleLog(`${p.special}! ${specialDealt} damage!${specialCrit ? ' DEVASTATING!' : ''}`, 'critical');

            // Tribe-specific bonus effects
            if (p.tribe === 'NightWing' && Math.random() < 0.5) {
                game.battle.enemyStatusEffects.push({ type: 'fear', duration: 2 });
                addBattleLog('Enemy is terrified! (May skip turn)', 'critical');
            } else if (p.tribe === 'IceWing') {
                game.battle.enemyStatusEffects.push({ type: 'frozen', duration: 1 });
                addBattleLog('Enemy is flash-frozen!', 'critical');
            } else if (p.tribe === 'RainWing') {
                p.heal(Math.floor(p.maxHp * 0.15));
                addBattleLog('Healing camouflage! +15% HP', 'player');
            }
            break;

        case 'counter':
            // Set up counter-attack stance
            game.battle.counterReady = true;
            game.battle.combo = 0;
            addBattleLog('Counter stance! Will counter-attack if enemy strikes!', 'player');
            break;

        case 'defend':
            game.battle.defending = true;
            game.battle.combo = 0;
            addBattleLog('You brace for attack! (65% damage reduction)', 'player');
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
            const fleeChance = game.battle.isAerial ? 0.85 : 0.65;
            if (Math.random() < fleeChance) {
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

    setTimeout(() => enemyTurn(), 800);
}

function enemyTurn() {
    if (!game.battle) return;

    const p = game.player;
    const e = game.battle.enemy;

    game.battle.turn = 'enemy';

    // Process enemy status effects first
    let canAct = true;
    game.battle.enemyStatusEffects = game.battle.enemyStatusEffects.filter(effect => {
        effect.duration--;

        // Damage over time effects
        if (effect.type === 'bleed' || effect.type === 'poison' || effect.type === 'burn') {
            e.takeDamage(effect.damage);
            addBattleLog(`${e.name} takes ${effect.damage} ${effect.type} damage!`, 'player');
        }

        // Fear may cause skip
        if (effect.type === 'fear' && Math.random() < 0.4) {
            addBattleLog(`${e.name} is too afraid to attack!`, 'player');
            canAct = false;
        }

        // Frozen may cause skip
        if (effect.type === 'frozen' && Math.random() < 0.5) {
            addBattleLog(`${e.name} is frozen solid!`, 'player');
            canAct = false;
        }

        return effect.duration > 0;
    });

    // Check if enemy died from status effects
    if (e.hp <= 0) {
        addBattleLog(`${e.name} succumbed to status effects!`, 'critical');
        setTimeout(() => endBattle(true), 500);
        return;
    }

    if (!canAct) {
        // Skip to player turn
        if (p.specialCooldown > 0) p.specialCooldown--;
        game.battle.turn = 'player';
        game.battle.canAct = true;
        updateBattleUI();
        return;
    }

    // Calculate enemy damage with status modifiers
    let dmg = e.attack + Math.floor(Math.random() * 5);

    // Frozen enemies deal less damage
    if (game.battle.enemyStatusEffects.some(ef => ef.type === 'frozen')) {
        dmg = Math.floor(dmg * 0.7);
    }

    // Soaked enemies take more damage AND deal less
    if (game.battle.enemyStatusEffects.some(ef => ef.type === 'soaked')) {
        dmg = Math.floor(dmg * 0.85);
    }

    if (game.battle.isAerial && e.isFlying) dmg = Math.floor(dmg * 1.1);

    // Check for player dodge
    if (Math.random() < game.battle.dodgeChance) {
        addBattleLog(`You dodged ${e.name}'s attack!`, 'player');
        game.battle.perfectDodgeWindow = true;
    } else if (game.battle.counterReady) {
        // Counter-attack!
        game.battle.counterReady = false;
        const counterDmg = Math.floor(p.attack * 1.5);
        const counterDealt = e.takeDamage(counterDmg);
        const reducedDmg = Math.floor(dmg * 0.5);
        const dealt = p.takeDamage(reducedDmg);

        addBattleLog(`Counter-attack! You deal ${counterDealt} and take only ${dealt}!`, 'critical');

        if (e.hp <= 0) {
            setTimeout(() => endBattle(true), 500);
            return;
        }
    } else if (game.battle.defending) {
        dmg = Math.floor(dmg * 0.35);
        game.battle.defending = false;
        const dealt = p.takeDamage(dmg);
        addBattleLog(`Blocked! ${e.name} attacks for only ${dealt} damage!`, 'player');
    } else {
        // Normal attack
        // Enemy can also crit
        const enemyCrit = Math.random() < 0.1;
        if (enemyCrit) {
            dmg = Math.floor(dmg * 1.5);
            const dealt = p.takeDamage(dmg);
            addBattleLog(`${e.name} lands a CRITICAL HIT for ${dealt} damage!`, 'enemy');
            game.battle.combo = 0; // Crit breaks combo
        } else {
            const dealt = p.takeDamage(dmg);
            addBattleLog(`${e.name} attacks for ${dealt} damage!`, 'enemy');
        }
    }

    // Process player status effects
    game.battle.playerStatusEffects = game.battle.playerStatusEffects.filter(effect => {
        effect.duration--;
        if (effect.type === 'bleed' || effect.type === 'poison') {
            p.takeDamage(effect.damage);
            addBattleLog(`You take ${effect.damage} ${effect.type} damage!`, 'enemy');
        }
        return effect.duration > 0;
    });

    if (p.specialCooldown > 0) p.specialCooldown--;

    updateBattleUI();
    updateHUD();

    if (p.hp <= 0) {
        setTimeout(() => gameOver(), 500);
        return;
    }

    game.battle.turn = 'player';
    game.battle.canAct = true;
    game.battle.perfectDodgeWindow = false;
}

function endBattle(victory) {
    if (victory) {
        const e = game.battle.enemy;
        const leveledUp = game.player.gainXP(e.xpReward);
        game.player.gold += e.goldReward;

        if (e.mesh) game.scene.remove(e.mesh);
        if (game.world) {
            game.world.enemies = game.world.enemies.filter(en => en !== e);
            if (e === game.world.boss) game.world.boss = null;
        }

        document.getElementById('victory-title').textContent = e.isBoss ? '👑 BOSS DEFEATED!' : 'Victory!';
        document.getElementById('victory-message').textContent = `Defeated ${e.name}!`;
        document.getElementById('xp-reward').textContent = `+${e.xpReward} XP`;
        document.getElementById('gold-reward').textContent = `+${e.goldReward} Gold`;

        const lootSection = document.getElementById('loot-section');
        lootSection.innerHTML = '';
        if (Math.random() < 0.45) {
            game.player.addItem('healingPotion');
            lootSection.innerHTML = '<div class="reward">🧪 Healing Potion</div>';
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
        showMessage('Escaped from battle!', 'info');
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
// INVENTORY & MAP
// ============================================

function renderInventory() {
    if (!game.player) return;

    const equipSlots = document.getElementById('equipment-slots');
    equipSlots.innerHTML = '<div class="equipment-slot">Weapon: Claws</div><div class="equipment-slot">Armor: Scales</div>';

    const itemsGrid = document.getElementById('items-grid');
    itemsGrid.innerHTML = '';

    game.player.inventory.forEach(slot => {
        const item = ITEMS[slot.id];
        if (!item) return;

        const div = document.createElement('div');
        div.className = 'inventory-item';
        div.innerHTML = `<div class="item-icon">${item.icon}</div><div class="item-name">${item.name}</div><div class="item-count">x${slot.count}</div>`;
        div.onclick = () => useItem(slot.id);
        itemsGrid.appendChild(div);
    });
}

function useItem(itemId) {
    const item = game.player.useItem(itemId);
    if (!item) return;

    if (item.effect === 'heal') {
        const healed = game.player.heal(item.value);
        showMessage(`Used ${item.name}! +${healed} HP`, 'reward');
        if (game.battle) {
            addBattleLog(`Used ${item.name}! +${healed} HP`, 'player');
            game.battle.combo = 0;
            setTimeout(() => enemyTurn(), 500);
        }
    } else if (item.effect === 'stamina') {
        game.player.stamina = Math.min(game.player.maxStamina, game.player.stamina + item.value);
        showMessage(`Used ${item.name}! +${item.value} Stamina`, 'reward');
    }

    updateHUD();
    renderInventory();
    toggleOverlay('inventory');
}

function renderMap() {
    const canvas = document.getElementById('map-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 400;

    ctx.fillStyle = '#1a3a4a';
    ctx.fillRect(0, 0, 700, 400);

    const locs = Object.entries(LOCATIONS);
    const positions = [
        { x: 120, y: 200 }, { x: 80, y: 320 }, { x: 250, y: 100 },
        { x: 100, y: 100 }, { x: 200, y: 320 }, { x: 400, y: 80 }, { x: 500, y: 280 }
    ];

    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    for (let i = 0; i < positions.length; i++) {
        const next = (i + 1) % positions.length;
        ctx.beginPath();
        ctx.moveTo(positions[i].x, positions[i].y);
        ctx.lineTo(positions[next].x, positions[next].y);
        ctx.stroke();
    }

    locs.forEach(([id, loc], i) => {
        const pos = positions[i];
        const isCurrent = game.world && game.world.locationId === id;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isCurrent ? 28 : 20, 0, Math.PI * 2);
        ctx.fillStyle = '#' + loc.groundColor.toString(16).padStart(6, '0');
        ctx.fill();

        if (isCurrent) {
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(loc.name.replace('The ', '').replace(' Kingdom', ''), pos.x, pos.y + 40);
    });
}

// ============================================
// PLAYER MOVEMENT - COMPLETELY REWRITTEN
// ============================================

function updatePlayer(delta) {
    if (!game.player || !game.player.mesh) return;

    const p = game.player;

    // Store old position for unstuck
    const oldX = p.position.x;
    const oldZ = p.position.z;

    // Simple movement speed
    let speed = 0.35;
    if (p.isFlying) speed = 0.5;
    if (game.keys['ShiftLeft'] || game.keys['ShiftRight']) {
        speed *= 1.5;
    }

    // Get direction from player rotation
    const dirX = Math.sin(p.rotation);
    const dirZ = Math.cos(p.rotation);

    // WASD Movement - simple and direct
    if (game.keys['KeyW'] || game.keys['ArrowUp']) {
        p.position.x += dirX * speed;
        p.position.z += dirZ * speed;
    }
    if (game.keys['KeyS'] || game.keys['ArrowDown']) {
        p.position.x -= dirX * speed * 0.5;
        p.position.z -= dirZ * speed * 0.5;
    }

    // A/D to turn
    if (game.keys['KeyA'] || game.keys['ArrowLeft']) {
        p.rotation += 0.05;
    }
    if (game.keys['KeyD'] || game.keys['ArrowRight']) {
        p.rotation -= 0.05;
    }

    // Flying - SPACE to go up, CTRL to go down
    if (p.isFlying) {
        if (game.keys['Space']) {
            p.position.y += 0.25;
        }
        if (game.keys['ControlLeft'] || game.keys['ControlRight']) {
            p.position.y -= 0.35;
        }

        // Drain stamina while flying
        p.stamina -= 0.08;
        if (p.stamina <= 0) {
            p.stamina = 0;
            p.isFlying = false;
            showMessage('Out of stamina!', 'info');
        }
    } else {
        // On ground - regenerate stamina
        p.stamina = Math.min(p.maxStamina, p.stamina + 0.08);

        // Gravity if not grounded
        if (p.position.y > 3) {
            p.position.y -= 0.2;
        }
    }

    // Ground level - NEVER go below this
    const groundLevel = 3;

    // Keep on ground if not flying
    if (!p.isFlying && p.position.y < groundLevel) {
        p.position.y = groundLevel;
        p.isGrounded = true;
    } else if (p.position.y > groundLevel) {
        p.isGrounded = false;
    }

    // World boundaries - keep player in bounds
    p.position.x = Math.max(-90, Math.min(90, p.position.x));
    p.position.z = Math.max(-90, Math.min(90, p.position.z));
    p.position.y = Math.max(groundLevel, Math.min(60, p.position.y));

    // Check if player is somehow stuck (NaN or invalid position)
    if (isNaN(p.position.x) || isNaN(p.position.y) || isNaN(p.position.z)) {
        p.position.set(0, groundLevel, 0);
        showMessage('Teleported to safety!', 'info');
    }

    // Update mesh
    p.mesh.position.copy(p.position);
    p.mesh.rotation.y = p.rotation;

    // Wing animation
    if (p.mesh.userData) {
        const wingSpeed = p.isFlying ? 0.02 : 0.005;
        const wingAmount = p.isFlying ? 0.6 : 0.1;
        const wingAngle = Math.sin(Date.now() * wingSpeed) * wingAmount;

        if (p.mesh.userData.leftWing) {
            p.mesh.userData.leftWing.rotation.x = Math.PI / 2.5 + wingAngle;
        }
        if (p.mesh.userData.rightWing) {
            p.mesh.userData.rightWing.rotation.x = -Math.PI / 2.5 - wingAngle;
        }
    }

    // Camera follows player - ALWAYS stay above ground
    const camDist = 22;
    const camHeight = 15;
    const camX = p.position.x - Math.sin(game.cameraAngleY) * camDist;
    const camY = Math.max(groundLevel + 10, p.position.y + camHeight); // Camera never below ground+10
    const camZ = p.position.z - Math.cos(game.cameraAngleY) * camDist;

    game.camera.position.set(camX, camY, camZ);
    game.camera.lookAt(p.position.x, p.position.y + 2, p.position.z);

    // Update camera near/far to prevent clipping
    game.camera.near = 0.5;
    game.camera.far = 1000;
    game.camera.updateProjectionMatrix();
}

function checkCollisions() {
    if (!game.player || !game.world) return;

    const p = game.player;

    // Collect items
    game.world.collectibles.forEach((c, idx) => {
        const dist = p.position.distanceTo(c.position);
        if (dist < 3) {
            if (c.userData.type === 'gold') {
                p.gold += c.userData.value;
                showMessage(`+${c.userData.value} Gold!`, 'reward');
            } else {
                const healed = p.heal(c.userData.value);
                showMessage(`+${healed} HP!`, 'reward');
            }
            game.scene.remove(c);
            game.world.collectibles.splice(idx, 1);
            updateHUD();
        }
    });

    // Real-time enemy contact damage (no battle screen!)
    game.world.enemies.forEach(enemy => {
        if (enemy.mesh && enemy.hp > 0) {
            const dist = p.position.distanceTo(enemy.mesh.position);
            // Contact damage when very close
            if (dist < 3 && enemy.attackCooldown <= 0) {
                const dmg = enemy.attack + Math.floor(Math.random() * 3);
                const dealt = p.takeDamage(dmg);
                showMessage(`${enemy.name} hits you for ${dealt}!`, 'damage');
                enemy.attackCooldown = 1.5; // 1.5 second cooldown

                // Knockback player away from enemy
                const knockback = new THREE.Vector3()
                    .subVectors(p.position, enemy.mesh.position)
                    .normalize()
                    .multiplyScalar(3);
                p.velocity.add(knockback);

                updateHUD();

                if (p.hp <= 0) {
                    gameOver();
                }
            }
        }
    });

    // Boss contact damage
    if (game.world.boss && game.world.boss.mesh && game.world.boss.hp > 0) {
        const dist = p.position.distanceTo(game.world.boss.mesh.position);
        if (dist < 4 && game.world.boss.attackCooldown <= 0) {
            const dmg = game.world.boss.attack + Math.floor(Math.random() * 5);
            const dealt = p.takeDamage(dmg);
            showMessage(`${game.world.boss.name} SMASHES you for ${dealt}!`, 'damage');
            game.world.boss.attackCooldown = 2.0;

            // Stronger knockback from boss
            const knockback = new THREE.Vector3()
                .subVectors(p.position, game.world.boss.mesh.position)
                .normalize()
                .multiplyScalar(5);
            p.velocity.add(knockback);

            updateHUD();

            if (p.hp <= 0) {
                gameOver();
            }
        }
    }

    // Portal travel
    game.world.portals.forEach(portal => {
        const dist = p.position.distanceTo(portal.position);
        if (dist < 4) {
            const dest = portal.userData.destination;
            showMessage(`Traveling to ${LOCATIONS[dest].name}...`, 'info');
            setTimeout(() => {
                game.world.cleanup();
                game.world = new World(dest);
                game.world.generate();
                p.position.set(0, 2, 0);
                p.rotation = 0;
                updateHUD();
            }, 500);
        }
    });
}

// ============================================
// GAME LOOP
// ============================================

function gameLoop() {
    game.animationFrame = requestAnimationFrame(gameLoop);

    const delta = game.clock.getDelta();

    if (game.currentScreen === 'game' && game.player && game.world) {
        updatePlayer(delta);
        game.world.update(delta);
        checkCollisions();
        updateCombatEffects(delta);
        renderDamageNumbers();
        updateCooldownUI();
        updateHUD();

        // Enemy respawn system - spawn new enemies every 20 seconds
        game.enemySpawnTimer += delta;
        if (game.enemySpawnTimer >= game.ENEMY_SPAWN_INTERVAL) {
            game.enemySpawnTimer = 0;
            // Spawn 3 new enemies
            for (let i = 0; i < 3; i++) {
                game.world.spawnEnemy();
            }
            showMessage('New enemies have appeared!', 'warning');
        }
    }

    if (game.renderer && game.scene && game.camera) {
        game.renderer.render(game.scene, game.camera);
    }
}

function updateCooldownUI() {
    const attackCD = document.getElementById('attack-cooldown');
    const breathCD = document.getElementById('breath-cooldown');
    const specialCD = document.getElementById('special-cooldown');

    if (attackCD) {
        attackCD.style.width = `${Math.max(0, game.attackCooldown / 0.4) * 100}%`;
    }
    if (breathCD) {
        breathCD.style.width = `${Math.max(0, game.breathCooldown / 1.5) * 100}%`;
    }
    if (specialCD) {
        specialCD.style.width = `${Math.max(0, game.specialCooldown / 5) * 100}%`;
    }
}

// ============================================
// INPUT HANDLING - FIXED
// ============================================

function handleKeyDown(e) {
    game.keys[e.code] = true;

    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }

    switch (game.currentScreen) {
        case 'title':
            if (e.code === 'Enter') {
                showScreen('character');
                updateTribeSelection();
                setTimeout(() => document.getElementById('dragon-name').focus(), 100);
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
            if (e.code === 'Enter') showScreen('game');
            break;

        case 'gameover':
            if (e.code === 'Enter') resetGame();
            break;
    }
}

function handleKeyUp(e) {
    game.keys[e.code] = false;
}

function handleCharacterInput(e) {
    if (e.code === 'ArrowLeft') {
        game.selectedTribe = (game.selectedTribe - 1 + game.tribeList.length) % game.tribeList.length;
        updateTribeSelection();
    } else if (e.code === 'ArrowRight') {
        game.selectedTribe = (game.selectedTribe + 1) % game.tribeList.length;
        updateTribeSelection();
    } else if (e.code === 'Enter') {
        const nameInput = document.getElementById('dragon-name');
        const name = nameInput.value.trim() || 'Dragon';
        const tribe = game.tribeList[game.selectedTribe];

        game.player = new Player(name, tribe);
        game.scene.add(game.player.createMesh());

        game.world = new World('mudKingdom');
        game.world.generate();

        showScreen('game');
        updateHUD();
        showMessage(`Welcome, ${name} the ${tribe}!`, 'info');
        showMessage('WASD move, SPACE fly, J/K/L attack', 'info');
        showMessage('E talk to NPCs, Q quests, P skills', 'info');

        // RPG: Start the first quest
        setTimeout(() => {
            startQuest('theBeginning');
        }, 2000);
    }
}

function handleGameInput(e) {
    // Handle dialogue closing
    if (game.dialogueActive) {
        if (e.code === 'Escape' || e.code === 'Enter' || e.code === 'Space') {
            closeDialogue();
        }
        return;
    }

    if (e.code === 'Escape') {
        document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden'));
        return;
    }

    const overlayOpen = !document.getElementById('inventory-overlay').classList.contains('hidden') ||
                        !document.getElementById('map-overlay').classList.contains('hidden') ||
                        !document.getElementById('help-overlay').classList.contains('hidden') ||
                        (document.getElementById('skills-overlay') && !document.getElementById('skills-overlay').classList.contains('hidden')) ||
                        (document.getElementById('quests-overlay') && !document.getElementById('quests-overlay').classList.contains('hidden'));

    if (overlayOpen) return;

    switch (e.code) {
        case 'Space':
            if (!game.player.isFlying && game.player.stamina > 15) {
                game.player.isFlying = true;
                game.player.isGrounded = false;
                game.player.position.y += 3; // Lift off!
                showMessage('Flying! SPACE=up, CTRL=down', 'info');
            }
            break;

        // Real-time combat controls - attack while moving!
        case 'KeyJ':  // Basic attack (claw swipe)
            realTimeAttack();
            break;
        case 'KeyK':  // Breath attack (fire/ice/acid/water)
            realTimeBreathAttack();
            break;
        case 'KeyL':  // Special tribal ability
            realTimeSpecialAttack();
            break;

        // RPG: Talk to NPC
        case 'KeyE':
            interactWithNearbyNPC();
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

        // RPG: Skills menu
        case 'KeyP':
            showSkillsUI();
            break;

        // RPG: Quests menu
        case 'KeyQ':
            showQuestsUI();
            break;

        case 'KeyR':
            const hpRec = game.player.heal(Math.floor(game.player.maxHp * 0.25));
            game.player.stamina = Math.min(game.player.maxStamina, game.player.stamina + 25);
            showMessage(`Resting... +${hpRec} HP, +25 Stamina`, 'reward');
            updateHUD();
            break;

        // Unstuck - teleport to center
        case 'KeyT':
            game.player.position.set(0, 8, 0);
            game.player.rotation = 0;
            game.player.isFlying = false;
            game.player.isGrounded = true;
            // Also update mesh immediately
            if (game.player.mesh) {
                game.player.mesh.position.set(0, 8, 0);
                game.player.mesh.rotation.y = 0;
            }
            // Reset camera angle
            game.cameraAngleY = 0;
            showMessage('Teleported to safety! (T)', 'info');
            break;
    }
}

function showQuestsUI() {
    renderQuestsOverlay();
    toggleOverlay('quests');
}

function renderQuestsOverlay() {
    const content = document.getElementById('quests-content');
    if (!content) return;

    content.innerHTML = '';

    if (game.activeQuests.length === 0) {
        content.innerHTML = '<div class="no-quests">No active quests. Talk to NPCs to find quests!</div>';
        return;
    }

    game.activeQuests.forEach(quest => {
        const div = document.createElement('div');
        div.className = `quest-item ${quest.type}`;

        let objectivesHtml = '';
        quest.objectives.forEach(obj => {
            const status = obj.done ? '✓' : '○';
            let text = '';
            if (obj.type === 'kill') {
                text = `Kill ${obj.target} (${obj.current || 0}/${obj.count})`;
            } else if (obj.type === 'collect') {
                text = `Collect ${obj.target} (${obj.current || 0}/${obj.count})`;
            } else if (obj.type === 'talk') {
                text = `Talk to ${obj.target}`;
            } else if (obj.type === 'travel') {
                text = `Travel to ${LOCATIONS[obj.target]?.name || obj.target}`;
            } else if (obj.type === 'killBoss') {
                text = `Defeat bosses (${obj.current || 0}/${obj.count})`;
            }
            objectivesHtml += `<div class="objective ${obj.done ? 'done' : ''}">${status} ${text}</div>`;
        });

        div.innerHTML = `
            <div class="quest-header">
                <span class="quest-type">[${quest.type.toUpperCase()}]</span>
                <span class="quest-name">${quest.name}</span>
            </div>
            <div class="quest-desc">${quest.desc}</div>
            <div class="quest-objectives">${objectivesHtml}</div>
            <div class="quest-rewards">
                Rewards: ${quest.rewards.xp} XP, ${quest.rewards.gold} Gold
                ${quest.rewards.item ? ', ' + (ITEMS[quest.rewards.item]?.name || EQUIPMENT[quest.rewards.item]?.name || quest.rewards.item) : ''}
            </div>
        `;

        content.appendChild(div);
    });
}

function handleBattleInput(e) {
    if (!game.battle || !game.battle.canAct) return;

    if (!document.getElementById('inventory-overlay').classList.contains('hidden')) {
        if (e.code === 'Escape' || e.code === 'KeyI') toggleOverlay('inventory');
        return;
    }

    switch (e.code) {
        case 'Space': battleAction('attack'); break;
        case 'KeyF': battleAction('fire'); break;
        case 'KeyE': battleAction('special'); break;
        case 'KeyQ': battleAction('defend'); break;
        case 'KeyI': renderInventory(); toggleOverlay('inventory'); break;
        case 'Escape': battleAction('flee'); break;
    }
}

function updateTribeSelection() {
    const cards = document.querySelectorAll('.tribe-card');
    cards.forEach((card, i) => {
        if (i === game.selectedTribe) {
            card.classList.add('selected');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            card.classList.remove('selected');
        }
    });
}

// Mouse controls for camera
function handleMouseMove(e) {
    if (game.currentScreen !== 'game') return;

    if (game.mouseDown) {
        game.cameraAngleY += e.movementX * CONFIG.ROTATION_SPEED;
        game.cameraAngleX += e.movementY * CONFIG.ROTATION_SPEED;
        game.cameraAngleX = Math.max(0.1, Math.min(1.2, game.cameraAngleX));
    }
}

function handleMouseDown(e) {
    if (game.currentScreen === 'game') {
        game.mouseDown = true;
    }
}

function handleMouseUp(e) {
    game.mouseDown = false;
}

function handleWheel(e) {
    if (game.currentScreen === 'game') {
        game.cameraDist += e.deltaY * 0.02;
        game.cameraDist = Math.max(8, Math.min(35, game.cameraDist));
    }
}

function resetGame() {
    if (game.world) game.world.cleanup();
    if (game.player && game.player.mesh) game.scene.remove(game.player.mesh);

    game.player = null;
    game.world = null;
    game.battle = null;
    game.selectedTribe = 0;
    game.cameraAngleY = 0;
    game.cameraAngleX = 0.3;

    document.getElementById('dragon-name').value = '';
    showScreen('title');
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    initThreeJS();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('wheel', handleWheel);

    document.querySelectorAll('.tribe-card').forEach((card, i) => {
        card.addEventListener('click', () => {
            game.selectedTribe = i;
            updateTribeSelection();
        });
    });

    gameLoop();

    console.log('Wings of Fire 3D loaded! Press ENTER to start.');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
