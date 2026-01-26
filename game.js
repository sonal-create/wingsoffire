// Wings of Fire - 3D Dragon Adventure Game
// Three.js based with realistic book-accurate dragons and kingdom palaces

// ============================================
// GAME CONFIGURATION
// ============================================

const CONFIG = {
    MOVE_SPEED: 8,
    FLY_SPEED: 12,
    SPRINT_MULTIPLIER: 1.8,
    ROTATION_SPEED: 0.003,
    GRAVITY: 0.5,
    JUMP_FORCE: 12,
    FLY_LIFT: 0.4,
    STAMINA_DRAIN: 0.3,
    STAMINA_REGEN: 0.15,
    GROUND_LEVEL: 0,
    CAMERA_DISTANCE: 15,
    CAMERA_HEIGHT: 8
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
    }
};

// ============================================
// LOCATION DATA WITH PALACES
// ============================================

const LOCATIONS = {
    mudKingdom: {
        name: 'The Mud Kingdom',
        skyColor: 0x4A3728,
        groundColor: 0x3D2817,
        fogColor: 0x5A4030,
        fogDensity: 0.012,
        features: 'swamp',
        enemies: ['Swamp Serpent', 'Mud Crawler', 'MudWing Scout'],
        enemyLevel: [1, 3],
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
        skyColor: 0x1A5A6A,
        groundColor: 0x2A7A8A,
        fogColor: 0x20B2AA,
        fogDensity: 0.015,
        features: 'underwater',
        enemies: ['Giant Crab', 'Shark', 'SeaWing Warrior'],
        enemyLevel: [2, 4],
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
        skyColor: 0x228B22,
        groundColor: 0x2E8B57,
        fogColor: 0x3CB371,
        fogDensity: 0.018,
        features: 'jungle',
        enemies: ['Jungle Cat', 'Poison Frog', 'RainWing Guard'],
        enemyLevel: [3, 5],
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
        skyColor: 0x0A0A1A,
        groundColor: 0x1A1A2A,
        fogColor: 0x2A2A4A,
        fogDensity: 0.025,
        features: 'volcanic',
        enemies: ['Shadow Bat', 'Lava Serpent', 'NightWing Assassin'],
        enemyLevel: [5, 7],
        bossName: 'Darkstalker',
        bossLevel: 8,
        palace: {
            name: 'The NightWing Fortress',
            style: 'obsidian',
            color: 0x2F2F4F,
            size: 70
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
    animationFrame: null
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
        this.attack = t.baseStats.attack;
        this.defense = t.baseStats.defense;
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

        this.mesh = null;
        this.position = new THREE.Vector3(0, 2, 0);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.rotation = 0;
        this.isFlying = false;
        this.isGrounded = true;
        this.isSprinting = false;
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
        this.maxHp += 12;
        this.hp = this.maxHp;
        this.attack += 3;
        this.defense += 2;
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
            this.maxHp = 60 + level * 12;
            this.attack = 6 + level * 2;
            this.defense = 3 + level;
            this.xpReward = 60 + level * 12;
            this.goldReward = 30 + level * 6;
        } else {
            this.maxHp = 20 + level * 8;
            this.attack = 3 + level * 2;
            this.defense = 1 + level;
            this.xpReward = 10 + level * 5;
            this.goldReward = 3 + level * 2;
        }

        this.hp = this.maxHp;
        this.isFlying = Math.random() > 0.5;

        this.mesh = null;
        this.position = new THREE.Vector3(
            (Math.random() - 0.5) * 60,
            isBoss ? 8 : 3,
            (Math.random() - 0.5) * 60
        );
    }

    createMesh() {
        const scale = this.isBoss ? 1.8 : 0.7;
        this.mesh = createDragon3D('MudWing', scale, true);
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
        this.terrain = createTerrain(this.locationId);
        game.scene.add(this.terrain);

        this.setupLighting();

        game.scene.fog = new THREE.FogExp2(this.location.fogColor, this.location.fogDensity);
        game.scene.background = new THREE.Color(this.location.skyColor);

        this.generateEntities();
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

        for (let i = 0; i < 5; i++) {
            const enemyName = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
            const level = loc.enemyLevel[0] + Math.floor(Math.random() * (loc.enemyLevel[1] - loc.enemyLevel[0] + 1));
            const enemy = new Enemy(enemyName, level, false);
            game.scene.add(enemy.createMesh());
            this.enemies.push(enemy);
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

    update(delta) {
        this.collectibles.forEach(c => {
            c.rotation.y += delta * 2;
            c.position.y = (c.userData.baseY || c.position.y) + Math.sin(Date.now() * 0.003) * 0.3;
            c.userData.baseY = c.userData.baseY || c.position.y;
        });

        this.enemies.forEach(enemy => {
            if (enemy.mesh) {
                enemy.mesh.position.x += Math.sin(Date.now() * 0.001 + enemy.position.x) * 0.03;
                enemy.mesh.position.z += Math.cos(Date.now() * 0.001 + enemy.position.z) * 0.03;

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

        this.portals.forEach(p => {
            p.rotation.z += delta * 0.5;
        });

        if (this.boss && this.boss.mesh) {
            this.boss.mesh.position.y = 8 + Math.sin(Date.now() * 0.002) * 1;
        }
    }

    cleanup() {
        if (this.terrain) game.scene.remove(this.terrain);
        this.enemies.forEach(e => { if (e.mesh) game.scene.remove(e.mesh); });
        this.collectibles.forEach(c => game.scene.remove(c));
        this.portals.forEach(p => game.scene.remove(p));
        if (this.boss && this.boss.mesh) game.scene.remove(this.boss.mesh);
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
// BATTLE SYSTEM
// ============================================

function startBattle(enemy) {
    game.battle = {
        enemy: enemy,
        turn: 'player',
        combo: 0,
        defending: false,
        canAct: true,
        isAerial: game.player.isFlying || enemy.isFlying
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

    const aerialBonus = game.battle.isAerial ? 1.25 : 1;

    switch (action) {
        case 'attack':
            let dmg = Math.floor((p.attack + Math.floor(Math.random() * 6)) * aerialBonus);
            const dealt = e.takeDamage(dmg);
            game.battle.combo++;
            addBattleLog(`You attack for ${dealt} damage!${game.battle.isAerial ? ' (Aerial!)' : ''}`, 'player');
            if (game.battle.combo > 2) addBattleLog(`${game.battle.combo}x Combo!`, 'critical');
            break;

        case 'fire':
            const breathDmg = Math.floor((p.attack * 1.4 + Math.floor(Math.random() * 10)) * aerialBonus);
            const breathDealt = e.takeDamage(breathDmg);
            game.battle.combo++;
            const breathName = p.breathType === 'ice' ? 'Frost Breath' :
                              p.breathType === 'acid' ? 'Venom Spit' :
                              p.breathType === 'water' ? 'Tidal Blast' : 'Fire Breath';
            addBattleLog(`${breathName} deals ${breathDealt} damage!`, 'player');
            break;

        case 'special':
            if (p.specialCooldown > 0) {
                addBattleLog(`${p.special} on cooldown (${p.specialCooldown} turns)`, 'system');
                game.battle.canAct = true;
                return;
            }
            const specialDmg = Math.floor(p.attack * 2.2 * aerialBonus);
            const specialDealt = e.takeDamage(specialDmg);
            p.specialCooldown = 3;
            game.battle.combo++;
            addBattleLog(`${p.special}! ${specialDealt} damage!`, 'critical');
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

    let dmg = e.attack + Math.floor(Math.random() * 5);

    if (game.battle.isAerial && e.isFlying) dmg = Math.floor(dmg * 1.1);

    if (game.battle.defending) {
        dmg = Math.floor(dmg * 0.35);
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
// PLAYER MOVEMENT - FIXED
// ============================================

function updatePlayer(delta) {
    if (!game.player || !game.player.mesh) return;

    const p = game.player;

    // Movement speed
    let speed = CONFIG.MOVE_SPEED;
    if (p.isFlying) speed = CONFIG.FLY_SPEED;
    if (p.isSprinting) speed *= CONFIG.SPRINT_MULTIPLIER;

    // Calculate movement direction based on player rotation
    const moveX = Math.sin(p.rotation);
    const moveZ = Math.cos(p.rotation);

    // Handle input
    if (game.keys['KeyW'] || game.keys['ArrowUp']) {
        p.velocity.x += moveX * speed * delta;
        p.velocity.z += moveZ * speed * delta;
    }
    if (game.keys['KeyS'] || game.keys['ArrowDown']) {
        p.velocity.x -= moveX * speed * delta;
        p.velocity.z -= moveZ * speed * delta;
    }
    if (game.keys['KeyA'] || game.keys['ArrowLeft']) {
        p.rotation += 2.5 * delta;
    }
    if (game.keys['KeyD'] || game.keys['ArrowRight']) {
        p.rotation -= 2.5 * delta;
    }

    // Flying controls
    if (p.isFlying) {
        if (game.keys['Space']) {
            p.velocity.y += CONFIG.FLY_LIFT;
        }
        if (game.keys['ShiftLeft'] || game.keys['ShiftRight']) {
            p.velocity.y -= CONFIG.FLY_LIFT;
        }

        p.stamina -= CONFIG.STAMINA_DRAIN * delta * 60;
        if (p.stamina <= 0) {
            p.stamina = 0;
            p.isFlying = false;
            showMessage('Out of stamina!', 'info');
        }

        p.velocity.y *= 0.95;
    } else {
        // Gravity
        if (!p.isGrounded) {
            p.velocity.y -= CONFIG.GRAVITY * delta * 60;
        }
        // Stamina regen
        p.stamina = Math.min(p.maxStamina, p.stamina + CONFIG.STAMINA_REGEN * delta * 60);
    }

    // Apply friction
    p.velocity.x *= 0.92;
    p.velocity.z *= 0.92;

    // Apply velocity
    p.position.x += p.velocity.x;
    p.position.y += p.velocity.y;
    p.position.z += p.velocity.z;

    // Ground collision
    if (p.position.y <= CONFIG.GROUND_LEVEL + 2) {
        p.position.y = CONFIG.GROUND_LEVEL + 2;
        p.velocity.y = 0;
        p.isGrounded = true;
        if (p.isFlying) {
            p.isFlying = false;
        }
    } else {
        p.isGrounded = false;
    }

    // Boundaries
    p.position.x = Math.max(-120, Math.min(120, p.position.x));
    p.position.z = Math.max(-120, Math.min(120, p.position.z));

    // Update mesh
    p.mesh.position.copy(p.position);
    p.mesh.rotation.y = p.rotation;

    // Wing animation
    if (p.mesh.userData) {
        const wingSpeed = p.isFlying ? 0.02 : 0.005;
        const wingAmount = p.isFlying ? 0.7 : 0.15;
        p.mesh.userData.wingAngle = Math.sin(Date.now() * wingSpeed) * wingAmount;

        if (p.mesh.userData.leftWing) {
            p.mesh.userData.leftWing.rotation.x = Math.PI / 2.5 + p.mesh.userData.wingAngle;
        }
        if (p.mesh.userData.rightWing) {
            p.mesh.userData.rightWing.rotation.x = -Math.PI / 2.5 - p.mesh.userData.wingAngle;
        }
    }

    // Update camera - orbit around player
    const camX = p.position.x - Math.sin(game.cameraAngleY) * game.cameraDist * Math.cos(game.cameraAngleX);
    const camY = p.position.y + Math.sin(game.cameraAngleX) * game.cameraDist + CONFIG.CAMERA_HEIGHT;
    const camZ = p.position.z - Math.cos(game.cameraAngleY) * game.cameraDist * Math.cos(game.cameraAngleX);

    game.camera.position.set(camX, camY, camZ);
    game.camera.lookAt(p.position.x, p.position.y + 2, p.position.z);
}

function checkCollisions() {
    if (!game.player || !game.world) return;

    const p = game.player;

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

    game.world.enemies.forEach(enemy => {
        if (enemy.mesh) {
            const dist = p.position.distanceTo(enemy.mesh.position);
            if (dist < 4) {
                startBattle(enemy);
            }
        }
    });

    if (game.world.boss && game.world.boss.mesh) {
        const dist = p.position.distanceTo(game.world.boss.mesh.position);
        if (dist < 5) {
            startBattle(game.world.boss);
        }
    }

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
        updateHUD();
    }

    if (game.renderer && game.scene && game.camera) {
        game.renderer.render(game.scene, game.camera);
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
        showMessage('W/S move, A/D turn, SPACE to fly', 'info');
    }
}

function handleGameInput(e) {
    if (e.code === 'Escape') {
        document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden'));
        return;
    }

    const overlayOpen = !document.getElementById('inventory-overlay').classList.contains('hidden') ||
                        !document.getElementById('map-overlay').classList.contains('hidden') ||
                        !document.getElementById('help-overlay').classList.contains('hidden');

    if (overlayOpen) return;

    switch (e.code) {
        case 'Space':
            if (game.player.isGrounded && game.player.stamina > 20) {
                game.player.velocity.y = CONFIG.JUMP_FORCE * 0.1;
                game.player.isFlying = true;
                game.player.isGrounded = false;
                showMessage('Taking flight!', 'info');
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
            const hpRec = game.player.heal(Math.floor(game.player.maxHp * 0.25));
            game.player.stamina = Math.min(game.player.maxStamina, game.player.stamina + 25);
            showMessage(`Resting... +${hpRec} HP, +25 Stamina`, 'reward');
            updateHUD();
            break;
    }
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
