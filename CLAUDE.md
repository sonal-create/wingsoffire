# CLAUDE.md - Wings of Fire 3D Adventure Game

This document provides guidance for AI assistants working with this codebase.

## Project Overview

**Wings of Fire 3D** is a browser-based 3D RPG game built on the "Wings of Fire" book series. It features real-time exploration, dual combat systems (real-time and turn-based), and an RPG progression system with quests, skills, and equipment.

**Tech Stack:**
- Vanilla JavaScript (ES6+)
- Three.js r128 (3D rendering via CDN)
- HTML5 + CSS3
- No build system or npm dependencies

## Project Structure

```
/wingsoffire/
├── index.html    # UI structure, screen layouts, HUD elements
├── styles.css    # Complete styling, CSS variables, animations
└── game.js       # All game logic (~4,600 lines)
```

This is a **single-file architecture** - all game logic resides in `game.js`.

## Running the Game

Simply open `index.html` in a modern web browser with WebGL support. No build step required.

## Code Organization in game.js

The file is organized into clearly marked sections:

### Configuration & Data (Lines 1-812)
```javascript
const CONFIG = { ... }     // Physics, camera, movement settings
const TRIBES = { ... }     // 10 dragon tribes (7 Pyrrhia + 3 Pantala)
const LOCATIONS = { ... }  // 12 explorable kingdoms
const ITEMS = { ... }      // 9 consumable/material items
const EQUIPMENT = { ... }  // 9 armor/weapon pieces
const SKILLS = { ... }     // 13 RPG skills
const QUESTS = { ... }     // 8 main and side quests
const NPCS = { ... }       // 5 NPCs with dialogue
const game = { ... }       // Global state object
```

### Core Classes
- **Player** - Character stats, inventory, tribe abilities
- **Enemy** - Level scaling, AI, boss variants
- **World** - Location management, spawning systems
- **NPC** - Dialogue and shop interactions

### Major Function Categories

**Rendering & 3D:**
- `initThreeJS()` - Scene setup
- `createDragon3D()` - Procedural dragon generation (394 lines)
- `createPalace()` - Building creation
- `createTerrain()` - Per-location terrain
- `addEnvironmentFeatures()` - Environmental details

**Combat Systems:**
- `realTimeAttack()` - Melee combat (J/K/L keys)
- `realTimeBreathAttack()` - Area breath weapon
- `realTimeSpecialAttack()` - Tribe specials
- `startBattle()` / `battleAction()` / `endBattle()` - Turn-based combat

**RPG Systems:**
- `startQuest()` / `updateQuestProgress()` / `completeQuest()`
- `showSkillsUI()` - Skill tree
- `renderInventory()` - Inventory management

**UI & State:**
- `showScreen()` - Screen transitions
- `toggleOverlay()` - Modal overlays
- `updateHUD()` - HUD refresh
- `gameLoop()` - Main loop (delta-based)

## Coding Conventions

### Naming
- **camelCase**: variables, functions, methods (`realTimeAttack`, `updateQuestProgress`)
- **PascalCase**: classes (`Player`, `Enemy`, `World`, `NPC`)
- **UPPER_SNAKE_CASE**: constants (`CONFIG`, `TRIBES`, `LOCATIONS`)

### Section Headers
Major sections are delimited with ASCII banners:
```javascript
// ============================================
// SECTION NAME
// ============================================
```

### State Management
- Single global `game` object holds all runtime state
- Data-driven design with configuration objects
- Mutations to `game` object trigger UI updates via `updateHUD()`

### CSS Conventions
- CSS variables defined in `:root` for tribe colors and UI theming
- Screen-based layouts with `.screen.active` pattern
- Comments delimit sections: `/* ==================== TITLE SCREEN ==================== */`

## Game Systems Overview

### Dragon Tribes (10 total)
**Pyrrhia (7):** MudWing, SandWing, SkyWing, SeaWing, RainWing, IceWing, NightWing
**Pantala (3):** LeafWing, SilkWing, HiveWing

Each tribe has unique:
- Color schemes (body, wings, underbelly, etc.)
- Physical features (bulky, ruff, sailFin, etc.)
- Base stats (hp, attack, defense, speed)
- Special ability
- Breath type and color

### Combat Modes
1. **Real-time** - Direct keyboard control during exploration (J/K/L, mouse)
2. **Turn-based** - Triggered on enemy contact, automatic resolution

### Locations (12 kingdoms)
Each location in `LOCATIONS` has:
- Terrain type and colors
- Environmental features
- Enemy types and bosses
- Palace structure

### Controls
```
Movement: WASD
Camera: Mouse
Jump/Fly: SPACE
Sprint: SHIFT
Attack: J or LMB
Breath: K or RMB
Special: L or E
Defend: Q
Interact: F
Inventory: I
Map: M
Help: H
Teleport: T (debug)
```

## Common Development Tasks

### Adding a New Tribe
1. Add entry to `TRIBES` object with colors, features, baseStats, special, breathType
2. Add CSS variable in `:root` for tribe color
3. Add tribe card in character creation section of `index.html`

### Adding a New Location
1. Add entry to `LOCATIONS` with id, terrain, enemies, boss, features
2. Update map UI in `index.html` if needed
3. Add terrain generation logic in `createTerrain()` if unique

### Adding a New Quest
1. Add entry to `QUESTS` with id, name, description, objectives, rewards
2. Link to NPC dialogue for quest giving
3. Add objective tracking in relevant game functions

### Adding a New Enemy Type
1. Add to location's `enemies` array in `LOCATIONS`
2. Enemy class auto-detects tribe from name for appearance

### Adding a New Skill
1. Add entry to `SKILLS` with id, name, description, cost, effects
2. Update `showSkillsUI()` if new category needed

### Adding a New Item/Equipment
1. Add to `ITEMS` or `EQUIPMENT` object
2. Update `renderInventory()` if new type
3. Add usage logic in appropriate function

## Important Considerations

### Performance
- Delta-time based game loop (not frame-based)
- Enemy respawn system manages entity count
- Three.js scene management with proper disposal

### Lore Accuracy
- All tribes, kingdoms, and abilities are based on the Wings of Fire book series
- Character names and locations should match book canon
- New content should maintain book-accurate feel

### Browser Compatibility
- Requires WebGL support
- Uses Three.js r128 from CDN
- No polyfills - targets modern browsers

## File Sizes
- `game.js`: ~160 KB (4,663 lines)
- `index.html`: ~29 KB
- `styles.css`: ~27 KB

## Key Global Objects

```javascript
// Runtime state
game = {
    state: 'title' | 'character' | 'game' | 'battle',
    player: Player | null,
    world: World | null,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    // ... many more properties
}

// Configuration (read-only)
CONFIG, TRIBES, LOCATIONS, ITEMS, EQUIPMENT, SKILLS, QUESTS, NPCS
```

## Debugging

- Press `T` to teleport between locations (debug feature)
- Check browser console for errors
- `game` object is globally accessible for inspection
- Three.js scene can be inspected via `game.scene`

## Recent Development Focus

Based on git history:
- Vast world creation (removed portals, seamless world)
- Pantala continent addition (3 new tribes)
- Enemy respawn system
- Movement and combat bug fixes (NaN damage, stuck screens)
- Terrain generation improvements
