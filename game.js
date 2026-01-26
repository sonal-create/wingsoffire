// Wings of Fire - 3D Dragon Adventure Game
// Three.js based with realistic dragons and landscapes

// ============================================
// GAME CONFIGURATION
// ============================================

const CONFIG = {
    MOVE_SPEED: 0.15,
    FLY_SPEED: 0.25,
    SPRINT_MULTIPLIER: 1.8,
    ROTATION_SPEED: 0.002,
    GRAVITY: 0.015,
    JUMP_FORCE: 0.35,
    FLY_LIFT: 0.02,
    STAMINA_DRAIN: 0.3,
    STAMINA_REGEN: 0.15,
    GROUND_LEVEL: 0
};

// ============================================
// TRIBE DATA - Based on Wings of Fire books
// ============================================

const TRIBES = {
    MudWing: {
        name: 'MudWing',
        primaryColor: 0x8B4513,
        secondaryColor: 0x654321,
        wingColor: 0x5D3A1A,
        eyeColor: 0xD4A574,
        baseStats: { hp: 140, attack: 14, defense: 18, speed: 0.8 },
        special: 'Mud Shield',
        specialDesc: 'Thick mud armor reduces damage by 60%',
        breathType: 'fire',
        breathColor: 0xFF4500
    },
    SandWing: {
        name: 'SandWing',
        primaryColor: 0xDEB887,
        secondaryColor: 0xD2B48C,
        wingColor: 0xF5DEB3,
        eyeColor: 0x000000,
        baseStats: { hp: 100, attack: 20, defense: 10, speed: 1.0 },
        special: 'Venom Strike',
        specialDesc: 'Barbed tail injects deadly venom',
        breathType: 'fire',
        breathColor: 0xFF6600
    },
    SkyWing: {
        name: 'SkyWing',
        primaryColor: 0xDC143C,
        secondaryColor: 0xB22222,
        wingColor: 0xFF4500,
        eyeColor: 0xFFD700,
        baseStats: { hp: 95, attack: 22, defense: 8, speed: 1.5 },
        special: 'Inferno Dive',
        specialDesc: 'Blazing aerial attack from above',
        breathType: 'fire',
        breathColor: 0xFF0000
    },
    SeaWing: {
        name: 'SeaWing',
        primaryColor: 0x20B2AA,
        secondaryColor: 0x008B8B,
        wingColor: 0x40E0D0,
        eyeColor: 0x00FFFF,
        glowStripes: true,
        baseStats: { hp: 115, attack: 16, defense: 14, speed: 1.1 },
        special: 'Tidal Wave',
        specialDesc: 'Crushing wave of water',
        breathType: 'water',
        breathColor: 0x00BFFF
    },
    RainWing: {
        name: 'RainWing',
        primaryColor: 0x9932CC,
        secondaryColor: 0x8B008B,
        wingColor: 0xDA70D6,
        eyeColor: 0x00FF00,
        colorShift: true,
        baseStats: { hp: 85, attack: 25, defense: 7, speed: 1.0 },
        special: 'Venom Spit',
        specialDesc: 'Corrosive acid melts through anything',
        breathType: 'acid',
        breathColor: 0x32CD32
    },
    IceWing: {
        name: 'IceWing',
        primaryColor: 0xADD8E6,
        secondaryColor: 0x87CEEB,
        wingColor: 0xE0FFFF,
        eyeColor: 0x4169E1,
        baseStats: { hp: 105, attack: 18, defense: 16, speed: 1.2 },
        special: 'Frost Breath',
        specialDesc: 'Freezing breath that slows enemies',
        breathType: 'ice',
        breathColor: 0x00FFFF
    },
    NightWing: {
        name: 'NightWing',
        primaryColor: 0x2F2F4F,
        secondaryColor: 0x191970,
        wingColor: 0x4B0082,
        eyeColor: 0xC0C0C0,
        starScales: true,
        baseStats: { hp: 100, attack: 19, defense: 13, speed: 1.1 },
        special: 'Nightmare',
        specialDesc: 'Psychic attack confuses the enemy',
        breathType: 'fire',
        breathColor: 0x800080
    }
};

// ============================================
// LOCATION DATA
// ============================================

const LOCATIONS = {
    mudKingdom: {
        name: 'The Mud Kingdom',
        skyColor: 0x4A3728,
        groundColor: 0x3D2817,
        fogColor: 0x5A4030,
        fogDensity: 0.015,
        features: 'swamp',
        enemies: ['Swamp Serpent', 'Mud Crawler', 'MudWing Scout'],
        enemyColors: [0x4A5D23, 0x8B4513, 0x654321],
        enemyLevel: [1, 3],
        bossName: 'Marsh King',
        bossLevel: 4,
        ambientLight: 0x6B5344
    },
    sandKingdom: {
        name: 'The Sand Kingdom',
        skyColor: 0xC4A35A,
        groundColor: 0xE6C87A,
        fogColor: 0xD4B896,
        fogDensity: 0.008,
        features: 'desert',
        enemies: ['Sand Viper', 'Scorpion', 'SandWing Patrol'],
        enemyColors: [0xC4A35A, 0x8B0000, 0xDEB887],
        enemyLevel: [2, 4],
        bossName: 'Queen Scorpion',
        bossLevel: 5,
        ambientLight: 0xFFE4B5
    },
    skyKingdom: {
        name: 'The Sky Kingdom',
        skyColor: 0x87CEEB,
        groundColor: 0x808080,
        fogColor: 0xB0C4DE,
        fogDensity: 0.005,
        features: 'mountains',
        enemies: ['Mountain Eagle', 'Rock Golem', 'SkyWing Guard'],
        enemyColors: [0x8B4513, 0x696969, 0xDC143C],
        enemyLevel: [3, 5],
        bossName: 'Thunderwing',
        bossLevel: 6,
        ambientLight: 0xFFFFFF
    },
    seaKingdom: {
        name: 'The Sea Kingdom',
        skyColor: 0x1A5A6A,
        groundColor: 0x2A7A8A,
        fogColor: 0x20B2AA,
        fogDensity: 0.02,
        features: 'underwater',
        enemies: ['Giant Crab', 'Shark', 'SeaWing Warrior'],
        enemyColors: [0xFF6347, 0x4682B4, 0x20B2AA],
        enemyLevel: [2, 4],
        bossName: 'Leviathan',
        bossLevel: 5,
        ambientLight: 0x40E0D0
    },
    rainforest: {
        name: 'The Rainforest',
        skyColor: 0x228B22,
        groundColor: 0x2E8B57,
        fogColor: 0x3CB371,
        fogDensity: 0.025,
        features: 'jungle',
        enemies: ['Jungle Cat', 'Poison Frog', 'RainWing Sentry'],
        enemyColors: [0xFFD700, 0x32CD32, 0x9932CC],
        enemyLevel: [3, 5],
        bossName: 'Jungle Hydra',
        bossLevel: 6,
        ambientLight: 0x90EE90
    },
    iceKingdom: {
        name: 'The Ice Kingdom',
        skyColor: 0xAFEEEE,
        groundColor: 0xE0FFFF,
        fogColor: 0xF0FFFF,
        fogDensity: 0.01,
        features: 'arctic',
        enemies: ['Frost Wolf', 'Ice Bear', 'IceWing Soldier'],
        enemyColors: [0xC0C0C0, 0xFFFFFF, 0xADD8E6],
        enemyLevel: [4, 6],
        bossName: 'Frost Wyrm',
        bossLevel: 7,
        ambientLight: 0xF0F8FF
    },
    nightKingdom: {
        name: 'The Night Kingdom',
        skyColor: 0x0A0A1A,
        groundColor: 0x1A1A2A,
        fogColor: 0x2A2A4A,
        fogDensity: 0.03,
        features: 'volcanic',
        enemies: ['Shadow Bat', 'Lava Serpent', 'NightWing Shadow'],
        enemyColors: [0x2F2F2F, 0xFF4500, 0x4B0082],
        enemyLevel: [5, 7],
        bossName: 'Darkstalker',
        bossLevel: 8,
        ambientLight: 0x4B0082
    }
};

// ============================================
// ITEMS DATA
// ============================================

const ITEMS = {
    healingPotion: { name: 'Healing Potion', icon: '🧪', effect: 'heal', value: 50 },
    megaPotion: { name: 'Mega Potion', icon: '💊', effect: 'heal', value: 100 },
    energyDrink: { name: 'Energy Drink', icon: '⚡', effect: 'stamina', value: 50 },
    strengthElixir: { name: 'Strength Elixir', icon: '💪', effect: 'attack', value: 10, duration: 3 }
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

    // Input
    keys: {},
    mouse: { x: 0, y: 0, locked: false },

    // Character creation
    selectedTribe: 0,
    tribeList: Object.keys(TRIBES),
    previewScene: null,
    previewCamera: null,
    previewRenderer: null,
    previewDragon: null,

    // Animation
    clock: null,
    animationFrame: null
};

// ============================================
// THREE.JS INITIALIZATION
// ============================================

function initThreeJS() {
    // Main scene
    game.scene = new THREE.Scene();

    // Camera
    game.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    game.camera.position.set(0, 5, 10);

    // Renderer
    game.renderer = new THREE.WebGLRenderer({ antialias: true });
    game.renderer.setSize(window.innerWidth, window.innerHeight);
    game.renderer.shadowMap.enabled = true;
    game.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(game.renderer.domElement);

    // Clock for animations
    game.clock = new THREE.Clock();

    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    if (game.camera && game.renderer) {
        game.camera.aspect = window.innerWidth / window.innerHeight;
        game.camera.updateProjectionMatrix();
        game.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// ============================================
// 3D DRAGON MODEL BUILDER
// ============================================

function createDragon3D(tribe, scale = 1, isEnemy = false) {
    const t = TRIBES[tribe] || TRIBES.MudWing;
    const dragon = new THREE.Group();

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
        color: isEnemy ? 0x8B0000 : t.primaryColor,
        roughness: 0.6,
        metalness: 0.2
    });

    const wingMat = new THREE.MeshStandardMaterial({
        color: isEnemy ? 0x660000 : t.wingColor,
        roughness: 0.7,
        metalness: 0.1,
        side: THREE.DoubleSide
    });

    const eyeMat = new THREE.MeshStandardMaterial({
        color: t.eyeColor,
        emissive: t.eyeColor,
        emissiveIntensity: 0.5
    });

    // Body - elongated ellipsoid
    const bodyGeo = new THREE.SphereGeometry(1, 16, 12);
    bodyGeo.scale(1.5, 0.8, 0.9);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    dragon.add(body);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.3, 0.5, 1.2, 8);
    const neck = new THREE.Mesh(neckGeo, bodyMat);
    neck.position.set(1.2, 0.4, 0);
    neck.rotation.z = -Math.PI / 4;
    neck.castShadow = true;
    dragon.add(neck);

    // Head
    const headGeo = new THREE.SphereGeometry(0.45, 12, 10);
    headGeo.scale(1.4, 1, 1);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.set(2, 0.9, 0);
    head.castShadow = true;
    dragon.add(head);

    // Snout
    const snoutGeo = new THREE.ConeGeometry(0.25, 0.6, 8);
    const snout = new THREE.Mesh(snoutGeo, bodyMat);
    snout.position.set(2.5, 0.85, 0);
    snout.rotation.z = -Math.PI / 2;
    snout.castShadow = true;
    dragon.add(snout);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(2.2, 1.05, 0.25);
    dragon.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(2.2, 1.05, -0.25);
    dragon.add(rightEye);

    // Horns
    const hornGeo = new THREE.ConeGeometry(0.08, 0.4, 6);
    const hornMat = new THREE.MeshStandardMaterial({ color: 0x2F2F2F });

    const leftHorn = new THREE.Mesh(hornGeo, hornMat);
    leftHorn.position.set(1.8, 1.3, 0.2);
    leftHorn.rotation.x = 0.3;
    dragon.add(leftHorn);

    const rightHorn = new THREE.Mesh(hornGeo, hornMat);
    rightHorn.position.set(1.8, 1.3, -0.2);
    rightHorn.rotation.x = -0.3;
    dragon.add(rightHorn);

    // Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(2, 1.5);
    wingShape.lineTo(2.5, 1);
    wingShape.lineTo(2.8, 1.3);
    wingShape.lineTo(3, 0.8);
    wingShape.lineTo(2.5, 0);
    wingShape.lineTo(0, 0);

    const wingGeo = new THREE.ShapeGeometry(wingShape);

    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(0, 0.5, 0.5);
    leftWing.rotation.x = Math.PI / 2;
    leftWing.rotation.y = 0.2;
    leftWing.castShadow = true;
    dragon.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(0, 0.5, -0.5);
    rightWing.rotation.x = -Math.PI / 2;
    rightWing.rotation.y = -0.2;
    rightWing.castShadow = true;
    dragon.add(rightWing);

    // Tail
    const tailSegments = 5;
    let prevPos = { x: -1.5, y: 0, z: 0 };
    for (let i = 0; i < tailSegments; i++) {
        const tailSize = 0.3 - i * 0.05;
        const tailGeo = new THREE.SphereGeometry(tailSize, 8, 6);
        const tailSeg = new THREE.Mesh(tailGeo, bodyMat);
        tailSeg.position.set(prevPos.x - 0.4, prevPos.y - i * 0.05, 0);
        tailSeg.castShadow = true;
        dragon.add(tailSeg);
        prevPos = { x: tailSeg.position.x, y: tailSeg.position.y };
    }

    // Tail spike (for SandWing)
    if (tribe === 'SandWing') {
        const spikeGeo = new THREE.ConeGeometry(0.1, 0.5, 6);
        const spikeMat = new THREE.MeshStandardMaterial({ color: 0x2F2F2F });
        const spike = new THREE.Mesh(spikeGeo, spikeMat);
        spike.position.set(-3.5, -0.2, 0);
        spike.rotation.z = Math.PI / 2;
        dragon.add(spike);
    }

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.15, 0.1, 0.8, 6);
    const legPositions = [
        { x: 0.5, z: 0.5 }, { x: 0.5, z: -0.5 },
        { x: -0.5, z: 0.5 }, { x: -0.5, z: -0.5 }
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeo, bodyMat);
        leg.position.set(pos.x, -0.6, pos.z);
        leg.castShadow = true;
        dragon.add(leg);

        // Claws
        const clawGeo = new THREE.ConeGeometry(0.05, 0.15, 4);
        const claw = new THREE.Mesh(clawGeo, hornMat);
        claw.position.set(pos.x, -1.05, pos.z);
        claw.rotation.x = Math.PI;
        dragon.add(claw);
    });

    // Spines along back
    for (let i = 0; i < 8; i++) {
        const spineGeo = new THREE.ConeGeometry(0.05, 0.3, 4);
        const spine = new THREE.Mesh(spineGeo, bodyMat);
        spine.position.set(1 - i * 0.35, 0.7 - i * 0.02, 0);
        spine.rotation.z = 0.2;
        dragon.add(spine);
    }

    // Glow effect for SeaWing
    if (tribe === 'SeaWing' && t.glowStripes) {
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x00FFFF,
            transparent: true,
            opacity: 0.6
        });
        for (let i = 0; i < 5; i++) {
            const stripeGeo = new THREE.BoxGeometry(0.3, 0.05, 0.8);
            const stripe = new THREE.Mesh(stripeGeo, glowMat);
            stripe.position.set(0.8 - i * 0.4, 0.4, 0);
            dragon.add(stripe);
        }
    }

    // Star scales for NightWing
    if (tribe === 'NightWing' && t.starScales) {
        const starMat = new THREE.MeshBasicMaterial({ color: 0xC0C0C0 });
        for (let i = 0; i < 15; i++) {
            const starGeo = new THREE.SphereGeometry(0.03, 4, 4);
            const star = new THREE.Mesh(starGeo, starMat);
            star.position.set(
                (Math.random() - 0.5) * 3,
                0.6 + Math.random() * 0.3,
                (Math.random() - 0.5) * 0.8
            );
            dragon.add(star);
        }
    }

    dragon.scale.set(scale, scale, scale);

    // Store wing references for animation
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
// TERRAIN GENERATION
// ============================================

function createTerrain(locationId) {
    const loc = LOCATIONS[locationId];
    const terrain = new THREE.Group();

    // Ground plane
    const groundGeo = new THREE.PlaneGeometry(200, 200, 50, 50);

    // Add height variation
    const vertices = groundGeo.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        vertices[i + 2] = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2 + Math.random() * 0.5;
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
        color: loc.groundColor,
        roughness: 0.9,
        metalness: 0.1
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    terrain.add(ground);

    // Location-specific features
    switch (loc.features) {
        case 'swamp':
            addSwampFeatures(terrain, loc);
            break;
        case 'desert':
            addDesertFeatures(terrain, loc);
            break;
        case 'mountains':
            addMountainFeatures(terrain, loc);
            break;
        case 'underwater':
            addUnderwaterFeatures(terrain, loc);
            break;
        case 'jungle':
            addJungleFeatures(terrain, loc);
            break;
        case 'arctic':
            addArcticFeatures(terrain, loc);
            break;
        case 'volcanic':
            addVolcanicFeatures(terrain, loc);
            break;
    }

    return terrain;
}

function addSwampFeatures(terrain, loc) {
    // Murky water pools
    const waterMat = new THREE.MeshStandardMaterial({
        color: 0x4A5D23,
        transparent: true,
        opacity: 0.7,
        roughness: 0.3
    });

    for (let i = 0; i < 10; i++) {
        const poolGeo = new THREE.CircleGeometry(3 + Math.random() * 5, 16);
        const pool = new THREE.Mesh(poolGeo, waterMat);
        pool.rotation.x = -Math.PI / 2;
        pool.position.set(
            (Math.random() - 0.5) * 80,
            0.1,
            (Math.random() - 0.5) * 80
        );
        terrain.add(pool);
    }

    // Dead trees
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x3D2817 });
    for (let i = 0; i < 20; i++) {
        const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 4 + Math.random() * 3, 6);
        const trunk = new THREE.Mesh(trunkGeo, treeMat);
        trunk.position.set(
            (Math.random() - 0.5) * 80,
            2,
            (Math.random() - 0.5) * 80
        );
        trunk.rotation.z = (Math.random() - 0.5) * 0.3;
        trunk.castShadow = true;
        terrain.add(trunk);
    }
}

function addDesertFeatures(terrain, loc) {
    // Sand dunes
    const duneMat = new THREE.MeshStandardMaterial({ color: 0xE6C87A });
    for (let i = 0; i < 15; i++) {
        const duneGeo = new THREE.SphereGeometry(5 + Math.random() * 10, 16, 8);
        duneGeo.scale(1, 0.3, 1);
        const dune = new THREE.Mesh(duneGeo, duneMat);
        dune.position.set(
            (Math.random() - 0.5) * 100,
            1,
            (Math.random() - 0.5) * 100
        );
        dune.castShadow = true;
        dune.receiveShadow = true;
        terrain.add(dune);
    }

    // Cacti
    const cactusMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    for (let i = 0; i < 10; i++) {
        const cactusGeo = new THREE.CylinderGeometry(0.3, 0.4, 2 + Math.random() * 2, 8);
        const cactus = new THREE.Mesh(cactusGeo, cactusMat);
        cactus.position.set(
            (Math.random() - 0.5) * 80,
            1.5,
            (Math.random() - 0.5) * 80
        );
        cactus.castShadow = true;
        terrain.add(cactus);
    }
}

function addMountainFeatures(terrain, loc) {
    // Mountains
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x696969 });
    for (let i = 0; i < 8; i++) {
        const height = 15 + Math.random() * 20;
        const mountainGeo = new THREE.ConeGeometry(10 + Math.random() * 10, height, 8);
        const mountain = new THREE.Mesh(mountainGeo, rockMat);
        mountain.position.set(
            (Math.random() - 0.5) * 150,
            height / 2,
            (Math.random() - 0.5) * 150
        );
        mountain.castShadow = true;
        mountain.receiveShadow = true;
        terrain.add(mountain);

        // Snow cap
        const snowMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
        const snowGeo = new THREE.ConeGeometry(5, 5, 8);
        const snow = new THREE.Mesh(snowGeo, snowMat);
        snow.position.set(mountain.position.x, height - 2, mountain.position.z);
        terrain.add(snow);
    }
}

function addUnderwaterFeatures(terrain, loc) {
    // Coral
    const coralColors = [0xFF6B6B, 0xFFE66D, 0x4ECDC4, 0x95E1D3];
    for (let i = 0; i < 30; i++) {
        const coralMat = new THREE.MeshStandardMaterial({
            color: coralColors[Math.floor(Math.random() * coralColors.length)]
        });
        const coralGeo = new THREE.SphereGeometry(0.5 + Math.random(), 8, 8);
        const coral = new THREE.Mesh(coralGeo, coralMat);
        coral.position.set(
            (Math.random() - 0.5) * 60,
            Math.random() * 2,
            (Math.random() - 0.5) * 60
        );
        terrain.add(coral);
    }

    // Seaweed
    const seaweedMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    for (let i = 0; i < 40; i++) {
        const seaweedGeo = new THREE.CylinderGeometry(0.1, 0.1, 3 + Math.random() * 3, 4);
        const seaweed = new THREE.Mesh(seaweedGeo, seaweedMat);
        seaweed.position.set(
            (Math.random() - 0.5) * 80,
            2,
            (Math.random() - 0.5) * 80
        );
        seaweed.rotation.x = (Math.random() - 0.5) * 0.5;
        terrain.add(seaweed);
    }
}

function addJungleFeatures(terrain, loc) {
    // Trees
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });

    for (let i = 0; i < 30; i++) {
        const trunkGeo = new THREE.CylinderGeometry(0.5, 0.7, 8 + Math.random() * 5, 8);
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        const x = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        trunk.position.set(x, 5, z);
        trunk.castShadow = true;
        terrain.add(trunk);

        const leavesGeo = new THREE.SphereGeometry(4 + Math.random() * 2, 8, 8);
        const leaves = new THREE.Mesh(leavesGeo, leavesMat);
        leaves.position.set(x, 10 + Math.random() * 3, z);
        leaves.castShadow = true;
        terrain.add(leaves);
    }

    // Vines
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x32CD32 });
    for (let i = 0; i < 20; i++) {
        const vineGeo = new THREE.CylinderGeometry(0.05, 0.05, 10, 4);
        const vine = new THREE.Mesh(vineGeo, vineMat);
        vine.position.set(
            (Math.random() - 0.5) * 80,
            5,
            (Math.random() - 0.5) * 80
        );
        terrain.add(vine);
    }
}

function addArcticFeatures(terrain, loc) {
    // Ice spires
    const iceMat = new THREE.MeshStandardMaterial({
        color: 0xE0FFFF,
        transparent: true,
        opacity: 0.8,
        roughness: 0.1
    });

    for (let i = 0; i < 20; i++) {
        const height = 3 + Math.random() * 8;
        const iceGeo = new THREE.ConeGeometry(1 + Math.random(), height, 6);
        const ice = new THREE.Mesh(iceGeo, iceMat);
        ice.position.set(
            (Math.random() - 0.5) * 80,
            height / 2,
            (Math.random() - 0.5) * 80
        );
        ice.castShadow = true;
        terrain.add(ice);
    }

    // Snow mounds
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    for (let i = 0; i < 15; i++) {
        const snowGeo = new THREE.SphereGeometry(2 + Math.random() * 4, 8, 6);
        snowGeo.scale(1, 0.4, 1);
        const snowMound = new THREE.Mesh(snowGeo, snowMat);
        snowMound.position.set(
            (Math.random() - 0.5) * 100,
            0.5,
            (Math.random() - 0.5) * 100
        );
        terrain.add(snowMound);
    }
}

function addVolcanicFeatures(terrain, loc) {
    // Lava pools
    const lavaMat = new THREE.MeshStandardMaterial({
        color: 0xFF4500,
        emissive: 0xFF2200,
        emissiveIntensity: 0.8
    });

    for (let i = 0; i < 8; i++) {
        const lavaGeo = new THREE.CircleGeometry(2 + Math.random() * 4, 16);
        const lava = new THREE.Mesh(lavaGeo, lavaMat);
        lava.rotation.x = -Math.PI / 2;
        lava.position.set(
            (Math.random() - 0.5) * 60,
            0.2,
            (Math.random() - 0.5) * 60
        );
        terrain.add(lava);
    }

    // Volcanic rocks
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x2F2F2F });
    for (let i = 0; i < 25; i++) {
        const rockGeo = new THREE.DodecahedronGeometry(1 + Math.random() * 2);
        const rock = new THREE.Mesh(rockGeo, rockMat);
        rock.position.set(
            (Math.random() - 0.5) * 80,
            1,
            (Math.random() - 0.5) * 80
        );
        rock.rotation.set(Math.random(), Math.random(), Math.random());
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
        this.gold = 0;

        const t = TRIBES[tribe];
        this.maxHp = t.baseStats.hp;
        this.hp = this.maxHp;
        this.baseAttack = t.baseStats.attack;
        this.baseDefense = t.baseStats.defense;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;
        this.speedMod = t.baseStats.speed;

        this.maxStamina = 100;
        this.stamina = this.maxStamina;

        this.special = t.special;
        this.specialCooldown = 0;
        this.breathType = t.breathType;

        this.inventory = [
            { id: 'healingPotion', count: 3 },
            { id: 'energyDrink', count: 2 }
        ];

        // 3D properties
        this.mesh = null;
        this.position = new THREE.Vector3(0, 2, 0);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.rotation = new THREE.Euler(0, 0, 0);
        this.isFlying = false;
        this.isGrounded = true;
        this.isSprinting = false;
    }

    createMesh() {
        this.mesh = createDragon3D(this.tribe, 0.8);
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
        this.maxHp += 12;
        this.hp = this.maxHp;
        this.baseAttack += 3;
        this.baseDefense += 2;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;
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
    constructor(name, level, isBoss = false, color = 0x8B0000) {
        this.name = name;
        this.level = level;
        this.isBoss = isBoss;
        this.color = color;

        // WEAKER BOSSES - reduced stats
        if (isBoss) {
            this.maxHp = 80 + level * 15; // Reduced from 200 + level * 30
            this.attack = 8 + level * 2;  // Reduced from 15 + level * 3
            this.defense = 5 + level * 1; // Reduced from 10 + level * 2
            this.xpReward = 80 + level * 15;
            this.goldReward = 40 + level * 8;
        } else {
            this.maxHp = 25 + level * 10;
            this.attack = 4 + level * 2;
            this.defense = 2 + level;
            this.xpReward = 12 + level * 6;
            this.goldReward = 5 + level * 3;
        }

        this.hp = this.maxHp;
        this.isFlying = Math.random() > 0.5; // Some enemies fly

        // 3D properties
        this.mesh = null;
        this.position = new THREE.Vector3(
            (Math.random() - 0.5) * 40,
            isBoss ? 5 : 2,
            (Math.random() - 0.5) * 40
        );
    }

    createMesh() {
        const scale = this.isBoss ? 1.5 : 0.6;
        this.mesh = createDragon3D('MudWing', scale, true);

        // Color the enemy
        this.mesh.traverse(child => {
            if (child.isMesh && child.material) {
                if (child.material.color) {
                    child.material = child.material.clone();
                    child.material.color.setHex(this.color);
                }
            }
        });

        this.mesh.position.copy(this.position);
        return this.mesh;
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
        this.terrain = null;
        this.enemies = [];
        this.collectibles = [];
        this.portals = [];
        this.boss = null;
    }

    generate() {
        // Create terrain
        this.terrain = createTerrain(this.locationId);
        game.scene.add(this.terrain);

        // Setup lighting
        this.setupLighting();

        // Setup fog
        game.scene.fog = new THREE.FogExp2(this.location.fogColor, this.location.fogDensity);
        game.scene.background = new THREE.Color(this.location.skyColor);

        // Generate entities
        this.generateEntities();
    }

    setupLighting() {
        // Clear existing lights
        game.scene.children = game.scene.children.filter(c => !c.isLight);

        // Ambient light
        const ambient = new THREE.AmbientLight(this.location.ambientLight, 0.5);
        game.scene.add(ambient);

        // Directional light (sun)
        const sun = new THREE.DirectionalLight(0xFFFFFF, 1);
        sun.position.set(50, 100, 50);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 500;
        sun.shadow.camera.left = -100;
        sun.shadow.camera.right = 100;
        sun.shadow.camera.top = 100;
        sun.shadow.camera.bottom = -100;
        game.scene.add(sun);

        // Hemisphere light for sky/ground color
        const hemi = new THREE.HemisphereLight(this.location.skyColor, this.location.groundColor, 0.3);
        game.scene.add(hemi);
    }

    generateEntities() {
        const loc = this.location;

        // Enemies
        for (let i = 0; i < 4; i++) {
            const enemyName = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
            const level = loc.enemyLevel[0] + Math.floor(Math.random() * (loc.enemyLevel[1] - loc.enemyLevel[0] + 1));
            const color = loc.enemyColors[Math.floor(Math.random() * loc.enemyColors.length)];

            const enemy = new Enemy(enemyName, level, false, color);
            const mesh = enemy.createMesh();
            game.scene.add(mesh);
            this.enemies.push(enemy);
        }

        // Boss
        const bossColor = loc.enemyColors[loc.enemyColors.length - 1];
        this.boss = new Enemy(loc.bossName, loc.bossLevel, true, bossColor);
        this.boss.position.set(40, 5, 0);
        const bossMesh = this.boss.createMesh();
        game.scene.add(bossMesh);

        // Collectibles
        for (let i = 0; i < 8; i++) {
            const type = Math.random() > 0.5 ? 'gold' : 'heal';
            const collectible = this.createCollectible(type);
            this.collectibles.push(collectible);
            game.scene.add(collectible);
        }

        // Portals
        this.createPortals();
    }

    createCollectible(type) {
        const geo = new THREE.SphereGeometry(0.5, 16, 16);
        let mat;

        if (type === 'gold') {
            mat = new THREE.MeshStandardMaterial({
                color: 0xFFD700,
                emissive: 0xFFD700,
                emissiveIntensity: 0.3,
                metalness: 0.8
            });
        } else {
            mat = new THREE.MeshStandardMaterial({
                color: 0x00FF00,
                emissive: 0x00FF00,
                emissiveIntensity: 0.5
            });
        }

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            (Math.random() - 0.5) * 60,
            1.5 + Math.random() * 3,
            (Math.random() - 0.5) * 60
        );
        mesh.userData = { type, value: type === 'gold' ? 10 + Math.floor(Math.random() * 20) : 30 };

        return mesh;
    }

    createPortals() {
        const locs = Object.keys(LOCATIONS);
        const idx = locs.indexOf(this.locationId);

        // Previous location portal
        const prevLoc = locs[(idx - 1 + locs.length) % locs.length];
        const prevPortal = this.createPortal(prevLoc, -50, 2, 0);
        this.portals.push(prevPortal);
        game.scene.add(prevPortal);

        // Next location portal
        const nextLoc = locs[(idx + 1) % locs.length];
        const nextPortal = this.createPortal(nextLoc, 50, 2, 0);
        this.portals.push(nextPortal);
        game.scene.add(nextPortal);
    }

    createPortal(destination, x, y, z) {
        const geo = new THREE.TorusGeometry(2, 0.3, 16, 32);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x9B59B6,
            emissive: 0x9B59B6,
            emissiveIntensity: 0.5
        });

        const portal = new THREE.Mesh(geo, mat);
        portal.position.set(x, y, z);
        portal.rotation.y = Math.PI / 2;
        portal.userData = { destination };

        // Inner glow
        const innerGeo = new THREE.CircleGeometry(1.7, 32);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0xDDA0DD,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        inner.rotation.y = Math.PI / 2;
        portal.add(inner);

        return portal;
    }

    update(delta) {
        // Animate collectibles
        this.collectibles.forEach(c => {
            c.rotation.y += delta * 2;
            c.position.y = c.userData.baseY || c.position.y;
            c.position.y += Math.sin(Date.now() * 0.003) * 0.1;
            c.userData.baseY = c.userData.baseY || c.position.y;
        });

        // Animate enemies
        this.enemies.forEach(enemy => {
            if (enemy.mesh) {
                // Simple patrol movement
                enemy.mesh.position.x += Math.sin(Date.now() * 0.001 + enemy.position.x) * 0.02;
                enemy.mesh.position.z += Math.cos(Date.now() * 0.001 + enemy.position.z) * 0.02;

                // Flying animation
                if (enemy.isFlying && enemy.mesh.userData) {
                    enemy.mesh.userData.wingAngle = Math.sin(Date.now() * 0.01) * 0.5;
                    if (enemy.mesh.userData.leftWing) {
                        enemy.mesh.userData.leftWing.rotation.z = enemy.mesh.userData.wingAngle;
                    }
                    if (enemy.mesh.userData.rightWing) {
                        enemy.mesh.userData.rightWing.rotation.z = -enemy.mesh.userData.wingAngle;
                    }
                }
            }
        });

        // Animate portals
        this.portals.forEach(p => {
            p.rotation.x += delta;
        });

        // Animate boss
        if (this.boss && this.boss.mesh) {
            this.boss.mesh.position.y = 5 + Math.sin(Date.now() * 0.002) * 0.5;
        }
    }

    cleanup() {
        if (this.terrain) {
            game.scene.remove(this.terrain);
        }
        this.enemies.forEach(e => {
            if (e.mesh) game.scene.remove(e.mesh);
        });
        this.collectibles.forEach(c => game.scene.remove(c));
        this.portals.forEach(p => game.scene.remove(p));
        if (this.boss && this.boss.mesh) {
            game.scene.remove(this.boss.mesh);
        }
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

    // Unlock pointer when not in game
    if (screenName !== 'game' && screenName !== 'battle') {
        if (document.pointerLockElement) {
            document.exitPointerLock();
        }
    }
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
    if (p.isFlying) {
        flightStatus.classList.remove('hidden');
    } else {
        flightStatus.classList.add('hidden');
    }
}

// ============================================
// GAME MESSAGES
// ============================================

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
// BATTLE SYSTEM WITH AERIAL COMBAT
// ============================================

function startBattle(enemy) {
    game.battle = {
        enemy: enemy,
        turn: 'player',
        combo: 0,
        defending: false,
        canAct: true,
        isAerial: game.player.isFlying || enemy.isFlying // AERIAL COMBAT
    };

    showScreen('battle');
    updateBattleUI();

    const battleType = game.battle.isAerial ? 'AERIAL BATTLE!' : 'Battle!';
    addBattleLog(`${battleType} A wild ${enemy.name} appears!`, 'system');

    if (enemy.isBoss) {
        document.getElementById('battle-title').textContent = '👑 BOSS BATTLE! 👑';
    } else if (game.battle.isAerial) {
        document.getElementById('battle-title').textContent = '🦅 Aerial Combat! 🦅';
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

    // Aerial combat bonus
    const aerialBonus = game.battle.isAerial ? 1.2 : 1;

    switch (action) {
        case 'attack':
            let dmg = Math.floor((p.attack + Math.floor(Math.random() * 5)) * aerialBonus);
            const dealt = e.takeDamage(dmg);
            game.battle.combo++;
            addBattleLog(`You attack for ${dealt} damage!${game.battle.isAerial ? ' (Aerial bonus!)' : ''}`, 'player');
            if (game.battle.combo > 2) {
                addBattleLog(`${game.battle.combo}x Combo!`, 'critical');
            }
            break;

        case 'fire':
            const breathDmg = Math.floor((p.attack * 1.3 + Math.floor(Math.random() * 8)) * aerialBonus);
            const breathDealt = e.takeDamage(breathDmg);
            game.battle.combo++;
            const breathName = p.breathType === 'ice' ? 'Frost Breath' :
                              p.breathType === 'acid' ? 'Venom Spit' : 'Fire Breath';
            addBattleLog(`${breathName} deals ${breathDealt} damage!`, 'player');
            break;

        case 'special':
            if (p.specialCooldown > 0) {
                addBattleLog(`${p.special} on cooldown (${p.specialCooldown} turns)`, 'system');
                game.battle.canAct = true;
                return;
            }
            const specialDmg = Math.floor(p.attack * 2 * aerialBonus);
            const specialDealt = e.takeDamage(specialDmg);
            p.specialCooldown = 3;
            game.battle.combo++;
            addBattleLog(`${p.special}! ${specialDealt} damage!`, 'critical');
            break;

        case 'defend':
            game.battle.defending = true;
            game.battle.combo = 0;
            addBattleLog('You brace for attack! (60% damage reduction)', 'player');
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
            // Easier to flee when flying
            const fleeChance = game.battle.isAerial ? 0.8 : 0.6;
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

    // Enemy turn
    setTimeout(() => enemyTurn(), 800);
}

function enemyTurn() {
    if (!game.battle) return;

    const p = game.player;
    const e = game.battle.enemy;

    game.battle.turn = 'enemy';

    let dmg = e.attack + Math.floor(Math.random() * 5);

    // Aerial combat - enemy also gets bonus if flying
    if (game.battle.isAerial && e.isFlying) {
        dmg = Math.floor(dmg * 1.15);
    }

    if (game.battle.defending) {
        dmg = Math.floor(dmg * 0.4); // 60% reduction
        game.battle.defending = false;
    }

    const dealt = p.takeDamage(dmg);
    addBattleLog(`${e.name} attacks for ${dealt} damage!`, 'enemy');

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

        // Remove enemy from world
        if (e.mesh) {
            game.scene.remove(e.mesh);
        }
        if (game.world) {
            game.world.enemies = game.world.enemies.filter(en => en !== e);
            if (e === game.world.boss) {
                game.world.boss = null;
            }
        }

        document.getElementById('victory-title').textContent = e.isBoss ? '👑 BOSS DEFEATED!' : 'Victory!';
        document.getElementById('victory-message').textContent = `Defeated ${e.name}!`;
        document.getElementById('xp-reward').textContent = `+${e.xpReward} XP`;
        document.getElementById('gold-reward').textContent = `+${e.goldReward} Gold`;

        // Random loot
        const lootSection = document.getElementById('loot-section');
        lootSection.innerHTML = '';
        if (Math.random() < 0.4) {
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
// INVENTORY
// ============================================

function renderInventory() {
    if (!game.player) return;

    const equipSlots = document.getElementById('equipment-slots');
    equipSlots.innerHTML = `
        <div class="equipment-slot">Weapon: None</div>
        <div class="equipment-slot">Armor: None</div>
    `;

    const itemsGrid = document.getElementById('items-grid');
    itemsGrid.innerHTML = '';

    game.player.inventory.forEach(slot => {
        const item = ITEMS[slot.id];
        if (!item) return;

        const div = document.createElement('div');
        div.className = 'inventory-item';
        div.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-name">${item.name}</div>
            <div class="item-count">x${slot.count}</div>
        `;
        div.onclick = () => useItem(slot.id);
        itemsGrid.appendChild(div);
    });
}

function useItem(itemId) {
    const item = game.player.useItem(itemId);
    if (!item) return;

    switch (item.effect) {
        case 'heal':
            const healed = game.player.heal(item.value);
            showMessage(`Used ${item.name}! +${healed} HP`, 'reward');
            if (game.battle) {
                addBattleLog(`Used ${item.name}! +${healed} HP`, 'player');
                game.battle.combo = 0;
                setTimeout(() => enemyTurn(), 500);
            }
            break;
        case 'stamina':
            game.player.stamina = Math.min(game.player.maxStamina, game.player.stamina + item.value);
            showMessage(`Used ${item.name}! +${item.value} Stamina`, 'reward');
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
    canvas.width = 700;
    canvas.height = 400;

    // Ocean background
    ctx.fillStyle = '#1a3a4a';
    ctx.fillRect(0, 0, 700, 400);

    const locs = Object.entries(LOCATIONS);
    const positions = [
        { x: 120, y: 200 }, // mud
        { x: 80, y: 320 },  // sand
        { x: 250, y: 100 }, // sky
        { x: 100, y: 100 }, // sea
        { x: 200, y: 320 }, // rain
        { x: 400, y: 80 },  // ice
        { x: 500, y: 280 }  // night
    ];

    // Draw connections
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    for (let i = 0; i < positions.length; i++) {
        const next = (i + 1) % positions.length;
        ctx.beginPath();
        ctx.moveTo(positions[i].x, positions[i].y);
        ctx.lineTo(positions[next].x, positions[next].y);
        ctx.stroke();
    }

    // Draw locations
    locs.forEach(([id, loc], i) => {
        const pos = positions[i];
        const isCurrent = game.world && game.world.locationId === id;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isCurrent ? 30 : 22, 0, Math.PI * 2);
        ctx.fillStyle = '#' + loc.groundColor.toString(16).padStart(6, '0');
        ctx.fill();

        if (isCurrent) {
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(loc.name.replace('The ', ''), pos.x, pos.y + 45);
    });
}

// ============================================
// PLAYER MOVEMENT & PHYSICS
// ============================================

function updatePlayer(delta) {
    if (!game.player || !game.player.mesh) return;

    const p = game.player;
    const speed = p.isSprinting ? CONFIG.MOVE_SPEED * CONFIG.SPRINT_MULTIPLIER : CONFIG.MOVE_SPEED;
    const flySpeed = CONFIG.FLY_SPEED;

    // Get camera direction
    const direction = new THREE.Vector3();
    game.camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(direction, new THREE.Vector3(0, 1, 0));

    // Movement input
    const moveDir = new THREE.Vector3();

    if (game.keys['KeyW'] || game.keys['ArrowUp']) moveDir.add(direction);
    if (game.keys['KeyS'] || game.keys['ArrowDown']) moveDir.sub(direction);
    if (game.keys['KeyA'] || game.keys['ArrowLeft']) moveDir.sub(right);
    if (game.keys['KeyD'] || game.keys['ArrowRight']) moveDir.add(right);

    if (moveDir.length() > 0) {
        moveDir.normalize();
        if (p.isFlying) {
            p.velocity.x = moveDir.x * flySpeed;
            p.velocity.z = moveDir.z * flySpeed;
        } else {
            p.velocity.x = moveDir.x * speed * p.speedMod;
            p.velocity.z = moveDir.z * speed * p.speedMod;
        }
    } else {
        p.velocity.x *= 0.9;
        p.velocity.z *= 0.9;
    }

    // Flying
    if (p.isFlying) {
        if (game.keys['Space']) {
            p.velocity.y += CONFIG.FLY_LIFT;
        }
        if (game.keys['ControlLeft'] || game.keys['ControlRight']) {
            p.velocity.y -= CONFIG.FLY_LIFT;
        }

        p.stamina -= CONFIG.STAMINA_DRAIN * delta * 60;
        if (p.stamina <= 0) {
            p.stamina = 0;
            p.isFlying = false;
            showMessage('Out of stamina! Landing...', 'info');
        }

        p.velocity.y *= 0.95;
    } else {
        // Gravity
        if (!p.isGrounded) {
            p.velocity.y -= CONFIG.GRAVITY;
        }

        // Stamina regen
        p.stamina = Math.min(p.maxStamina, p.stamina + CONFIG.STAMINA_REGEN * delta * 60);
    }

    // Apply velocity
    p.position.add(p.velocity);

    // Ground collision
    if (p.position.y <= CONFIG.GROUND_LEVEL + 1) {
        p.position.y = CONFIG.GROUND_LEVEL + 1;
        p.velocity.y = 0;
        p.isGrounded = true;
        if (p.isFlying) {
            p.isFlying = false;
            showMessage('Landed', 'info');
        }
    } else {
        p.isGrounded = false;
    }

    // Boundaries
    p.position.x = Math.max(-90, Math.min(90, p.position.x));
    p.position.z = Math.max(-90, Math.min(90, p.position.z));

    // Update mesh
    p.mesh.position.copy(p.position);

    // Rotate dragon to face movement direction
    if (moveDir.length() > 0.1) {
        const targetRotation = Math.atan2(moveDir.x, moveDir.z);
        p.mesh.rotation.y = targetRotation;
    }

    // Wing animation
    if (p.mesh.userData) {
        if (p.isFlying) {
            p.mesh.userData.wingAngle = Math.sin(Date.now() * 0.015) * 0.8;
        } else {
            p.mesh.userData.wingAngle = Math.sin(Date.now() * 0.005) * 0.1;
        }

        if (p.mesh.userData.leftWing) {
            p.mesh.userData.leftWing.rotation.z = p.mesh.userData.wingAngle;
        }
        if (p.mesh.userData.rightWing) {
            p.mesh.userData.rightWing.rotation.z = -p.mesh.userData.wingAngle;
        }
    }

    // Camera follow (third person)
    const cameraOffset = new THREE.Vector3(0, 5, 10);
    cameraOffset.applyQuaternion(p.mesh.quaternion);
    const targetCameraPos = p.position.clone().add(cameraOffset);
    game.camera.position.lerp(targetCameraPos, 0.05);
    game.camera.lookAt(p.position.x, p.position.y + 2, p.position.z);
}

function checkCollisions() {
    if (!game.player || !game.world) return;

    const p = game.player;

    // Check collectibles
    game.world.collectibles.forEach((c, idx) => {
        const dist = p.position.distanceTo(c.position);
        if (dist < 2) {
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

    // Check enemies
    game.world.enemies.forEach(enemy => {
        if (enemy.mesh) {
            const dist = p.position.distanceTo(enemy.mesh.position);
            if (dist < 3) {
                startBattle(enemy);
            }
        }
    });

    // Check boss
    if (game.world.boss && game.world.boss.mesh) {
        const dist = p.position.distanceTo(game.world.boss.mesh.position);
        if (dist < 4) {
            startBattle(game.world.boss);
        }
    }

    // Check portals
    game.world.portals.forEach(portal => {
        const dist = p.position.distanceTo(portal.position);
        if (dist < 3) {
            const dest = portal.userData.destination;
            showMessage(`Traveling to ${LOCATIONS[dest].name}...`, 'info');
            setTimeout(() => {
                game.world.cleanup();
                game.world = new World(dest);
                game.world.generate();
                p.position.set(0, 2, 0);
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
        updateHUD();
    }

    // Render
    if (game.renderer && game.scene && game.camera) {
        game.renderer.render(game.scene, game.camera);
    }
}

// ============================================
// INPUT HANDLING
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
                document.getElementById('dragon-name').focus();
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
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        game.selectedTribe = (game.selectedTribe - 1 + game.tribeList.length) % game.tribeList.length;
        updateTribeSelection();
    } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        game.selectedTribe = (game.selectedTribe + 1) % game.tribeList.length;
        updateTribeSelection();
    } else if (e.code === 'Enter') {
        const nameInput = document.getElementById('dragon-name');
        const name = nameInput.value.trim() || 'Dragon';
        const tribe = game.tribeList[game.selectedTribe];

        // Create player
        game.player = new Player(name, tribe);
        const playerMesh = game.player.createMesh();
        game.scene.add(playerMesh);

        // Create world
        game.world = new World('mudKingdom');
        game.world.generate();

        showScreen('game');
        updateHUD();
        showMessage(`Welcome, ${name} the ${tribe}!`, 'info');
        showMessage('WASD to move, SPACE to fly, MOUSE to look', 'info');
    }
}

function handleGameInput(e) {
    // Close overlays with ESC
    if (e.code === 'Escape') {
        document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden'));
        return;
    }

    // Check if overlay is open
    const overlayOpen = !document.getElementById('inventory-overlay').classList.contains('hidden') ||
                        !document.getElementById('map-overlay').classList.contains('hidden') ||
                        !document.getElementById('help-overlay').classList.contains('hidden');

    if (overlayOpen) return;

    switch (e.code) {
        case 'Space':
            if (game.player.isGrounded && game.player.stamina > 20) {
                game.player.velocity.y = CONFIG.JUMP_FORCE;
                game.player.isFlying = true;
                game.player.isGrounded = false;
                showMessage('Taking flight!', 'info');
            }
            break;
        case 'ShiftLeft':
        case 'ShiftRight':
            game.player.isSprinting = true;
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
            const hpRec = game.player.heal(Math.floor(game.player.maxHp * 0.2));
            game.player.stamina = Math.min(game.player.maxStamina, game.player.stamina + 20);
            showMessage(`Resting... +${hpRec} HP, +20 Stamina`, 'reward');
            updateHUD();
            break;
    }
}

function handleBattleInput(e) {
    if (!game.battle || !game.battle.canAct) return;

    // Check inventory overlay
    if (!document.getElementById('inventory-overlay').classList.contains('hidden')) {
        if (e.code === 'Escape' || e.code === 'KeyI') {
            toggleOverlay('inventory');
        }
        return;
    }

    switch (e.code) {
        case 'Space':
            battleAction('attack');
            break;
        case 'KeyF':
            battleAction('fire');
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
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            card.classList.remove('selected');
        }
    });
}

// Mouse controls
function handleMouseMove(e) {
    if (game.currentScreen !== 'game' || !document.pointerLockElement) return;

    game.camera.rotation.y -= e.movementX * CONFIG.ROTATION_SPEED;
    game.camera.rotation.x -= e.movementY * CONFIG.ROTATION_SPEED;
    game.camera.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, game.camera.rotation.x));
}

function handleClick(e) {
    if (game.currentScreen === 'game') {
        game.renderer.domElement.requestPointerLock();
    }
}

function resetGame() {
    if (game.world) {
        game.world.cleanup();
    }
    if (game.player && game.player.mesh) {
        game.scene.remove(game.player.mesh);
    }

    game.player = null;
    game.world = null;
    game.battle = null;
    game.selectedTribe = 0;

    document.getElementById('dragon-name').value = '';

    showScreen('title');
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Initialize Three.js
    initThreeJS();

    // Event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    // Tribe card click handlers
    document.querySelectorAll('.tribe-card').forEach((card, i) => {
        card.addEventListener('click', () => {
            game.selectedTribe = i;
            updateTribeSelection();
        });
    });

    // Sprint release
    document.addEventListener('keyup', (e) => {
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
            if (game.player) game.player.isSprinting = false;
        }
    });

    // Start game loop
    gameLoop();

    console.log('Wings of Fire 3D initialized! Press ENTER to start.');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
