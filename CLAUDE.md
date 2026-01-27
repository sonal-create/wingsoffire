# CLAUDE.md - AI Assistant Guide for Wings of Fire 3D

## Project Overview

**Wings of Fire - 3D Dragon Adventure** is a browser-based 3D RPG game built with vanilla JavaScript and Three.js. Players create dragons from various tribes (based on the "Wings of Fire" book series) and explore a vast world with real-time and turn-based combat, quests, NPCs, and an equipment system.

## Quick Reference

```
Technology:     Vanilla JavaScript + Three.js r128
Entry Point:    index.html (open in browser)
No Build:       No package.json, no bundler - static files only
Files:          3 main files (game.js, index.html, styles.css)
Total LOC:      ~6,600 lines
```

## File Structure

```
/home/user/wingsoffire/
├── game.js      # Main game logic (4,663 lines, 163KB)
├── index.html   # UI markup and screens (521 lines, 29KB)
└── styles.css   # Styling and animations (1,441 lines, 27KB)
```

## Architecture Overview

### game.js Organization

The game.js file is organized into clearly marked sections:

| Line Range | Section | Purpose |
|------------|---------|---------|
| 1-22 | `CONFIG` | Game constants (speeds, physics, camera) |
| 28-332 | `TRIBES` | 10 dragon tribes with colors, stats, abilities |
| 334-551 | `LOCATIONS` | 9 kingdom locations with terrain, enemies, NPCs |
| 553-612 | `ITEMS/EQUIPMENT/SKILLS` | RPG item and progression data |
| 614-687 | `QUESTS` | Main story and side quest definitions |
| 689-760 | `NPCS` | NPC definitions with dialogue |
| 762-808 | `game` | Global state object |
| 814-1231 | Three.js Init | Scene, camera, renderer, dragon mesh creation |
| 1233-2163 | World Building | Terrain, palaces, environment features |
| 2165-2389 | `class Player` | Player character management |
| 2391-2658 | `class Enemy` | Enemy AI and behavior |
| 2660-2826 | `class NPC` | NPC system |
| 2828-3082 | `class World` | World/location management |
| 3084-3147 | Screen Management | UI screen transitions |
| 3148-3554 | Combat System | Real-time attacks, effects, damage |
| 3556-3952 | Battle System | Turn-based combat |
| 3954-4048 | Inventory/Map | Item and map rendering |
| 4050-4334 | Game Loop | Player updates, collisions, main loop |
| 4336-4635 | Input Handling | Keyboard, mouse events |
| 4637-4663 | `init()` | Application entry point |

### Key Classes

```javascript
class Player      // Line 2165 - Character stats, equipment, inventory, movement
class Enemy       // Line 2391 - Enemy spawning, AI, combat behavior
class NPC         // Line 2660 - Quest givers, dialogue system
class World       // Line 2828 - Location management, enemy/NPC spawning
```

### Global State Object

```javascript
const game = {
    currentScreen: 'title',    // Screen state: title|character|game|battle
    player: null,              // Player instance
    world: null,               // World instance
    battle: null,              // Current battle state
    scene: null,               // Three.js scene
    camera: null,              // Three.js camera
    renderer: null,            // Three.js renderer
    keys: {},                  // Keyboard state
    activeQuests: [],          // Current quests
    completedQuests: [],       // Finished quests
    worldNPCs: [],             // Spawned NPCs
    combatEffects: [],         // Visual effects
    damageNumbers: [],         // Floating damage text
    // ... more state
};
```

## Data Configuration Objects

### TRIBES (10 dragon tribes)
- **Pyrrhia**: MudWing, SandWing, SkyWing, SeaWing, RainWing, IceWing, NightWing
- **Pantala**: LeafWing, SilkWing, HiveWing

Each tribe has: `colors`, `features`, `baseStats`, `special`, `breathType`, `breathColor`, `description`

### LOCATIONS (9 kingdoms)
- mud_kingdom, sand_kingdom, sky_kingdom, sea_kingdom, rainforest, ice_kingdom, night_kingdom, poison_jungle, hive

Each location has: `name`, `terrain`, `enemies`, `npcs`, `palace`, `ambientLight`, `fogColor`

### Key Constants
- `CONFIG`: Movement speeds, gravity, camera settings
- `ITEMS`: Consumable items (potions, drinks)
- `EQUIPMENT`: Armor, weapons, accessories with stat bonuses
- `SKILLS`: Unlockable abilities
- `QUESTS`: Story progression with objectives
- `NPCS`: Characters with dialogue trees

## Game Systems

### Combat (Dual Mode)

**Real-time Combat** (during exploration):
- `realTimeAttack()` - Claw attacks (J key or LMB)
- `realTimeBreathAttack()` - Cone AoE breath (K key or RMB)
- `realTimeSpecialAttack()` - 360° AoE (L key or E)

**Turn-based Battle** (triggered encounters):
- `startBattle(enemy)` - Initiates battle
- `battleAction(action)` - Player turn (attack/fire/special/defend/item/flee)
- `enemyTurn()` - Enemy AI response
- `endBattle(victory)` - Resolution and rewards

### Quest System
- `startQuest(questId)` - Activate quest
- `updateQuestProgress(type, target)` - Track objectives (kill, collect, travel)
- `checkQuestCompletion(quest)` - Verify completion
- `completeQuest(questId)` - Award rewards

### NPC Interaction
- `spawnNPCs(locationId)` - Create location NPCs
- `showDialogue(npc, type)` - Display conversation
- `interactWithNearbyNPC()` - Proximity interaction (F key)

## UI/Screen Management

### Screen States
```javascript
showScreen('title')      // Main menu
showScreen('character')  // Dragon creation
showScreen('game')       // Main gameplay
showScreen('battle')     // Turn-based combat
```

### Overlays (toggleable during gameplay)
```javascript
toggleOverlay('inventory-overlay')  // I key
toggleOverlay('map-overlay')        // M key
toggleOverlay('quests-overlay')     // U key
toggleOverlay('skills-overlay')     // P key
toggleOverlay('help-overlay')       // H key
```

## Code Conventions

### Naming Conventions
- **Constants**: UPPER_SNAKE_CASE (`CONFIG`, `TRIBES`, `LOCATIONS`)
- **Classes**: PascalCase (`Player`, `Enemy`, `NPC`, `World`)
- **Functions**: camelCase (`updateHUD`, `startBattle`, `realTimeAttack`)
- **Variables**: camelCase (`currentScreen`, `attackCooldown`)
- **DOM IDs**: kebab-case (`game-container`, `battle-screen`)
- **CSS Classes**: kebab-case (`.stat-bar`, `.tribe-card`)

### Code Organization
- Section headers use `// ============================================`
- Related functions are grouped together
- Data objects are defined at the top of the file
- Classes are defined before functions that use them
- Event handlers are at the bottom, before `init()`

### Three.js Patterns
- All 3D objects added to `game.scene`
- Dragon meshes created procedurally via `createDragon3D(tribe, scale, isEnemy)`
- Terrain uses `THREE.PlaneGeometry` with custom materials
- Colors stored as hex numbers (e.g., `0x8B4513`)

## Development Workflow

### Running the Game
1. Open `index.html` directly in a browser
2. No build step required
3. No server needed (uses CDN for Three.js)

### Making Changes

**For gameplay mechanics**: Edit `game.js`
- Modify `CONFIG` for physics/movement tweaks
- Edit `TRIBES` for dragon balance
- Update `LOCATIONS` for world changes
- Modify class methods for behavior changes

**For UI layout**: Edit `index.html`
- Screen structures use `<div class="screen">`
- Overlays use `<div class="overlay">`
- Game HUD elements are in `#game-screen`

**For styling**: Edit `styles.css`
- CSS variables defined in `:root` for colors
- Tribe colors: `--mudwing`, `--sandwing`, etc.
- UI colors: `--hp-color`, `--stamina-color`, `--xp-color`

### Testing
- No automated tests - manual browser testing
- Open browser console for error checking
- Use browser DevTools for debugging

## Common Modification Patterns

### Adding a New Enemy Type
1. Add enemy name to a location's `enemies` array in `LOCATIONS`
2. Enemy will automatically spawn with level-based scaling

### Adding a New Quest
1. Add quest object to `QUESTS` with unique ID
2. Define `type`, `objectives`, `rewards`
3. Link to NPC if needed via `questGiver` property

### Adding a New Item
1. Add to `ITEMS` object with `name`, `effect`, `value`
2. Item can be used via `useItem(itemId)` function

### Adding a New Location
1. Add location object to `LOCATIONS`
2. Define `terrain`, `enemies`, `npcs`, `palace`, lighting
3. Add corresponding terrain generation in `addEnvironmentFeatures()`

### Modifying Dragon Stats
- Edit `baseStats` in the tribe's `TRIBES` entry
- Stats: `hp`, `attack`, `defense`, `speed`

## Important Technical Details

### Game Loop
```javascript
function gameLoop() {
    requestAnimationFrame(gameLoop);
    // Delta time calculation
    // Player updates
    // Combat effects
    // Collision detection
    // Three.js rendering
}
```

### Collision Detection
- Uses distance-based checks in `checkCollisions()`
- Player vs terrain bounds
- Player vs enemies (triggers combat)
- Player vs collectibles (gold, items)

### Enemy Respawn
- Timer-based respawn every 20 seconds (`game.ENEMY_SPAWN_INTERVAL`)
- Controlled in `World.update()` method

### Camera System
- Third-person follow camera
- Mouse controls rotation (`game.cameraAngleX`, `game.cameraAngleY`)
- Scroll wheel controls distance (`game.cameraDist`)

## Debugging Tips

1. **Check `game` object in console**: Access full game state
2. **Player position**: `game.player.position`
3. **Current location**: `game.player.currentLocation`
4. **Active quests**: `game.activeQuests`
5. **Enemy list**: `game.world.enemies`

## Git Workflow

- Branch naming: `claude/` prefix for AI-generated branches
- Commits should be atomic and descriptive
- Push with `-u origin <branch-name>`

## Recent Development History

Based on recent commits:
1. Removed portal system, created vast world, fixed movement bugs
2. Added Pantala continent with LeafWing, SilkWing, HiveWing tribes
3. Implemented enemy respawn system
4. Fixed various screen/display bugs
5. Added quest-related enemies (Cave Guard, Scavenger)

## Key Files Quick Edit Guide

| To change... | Edit file | Look for... |
|--------------|-----------|-------------|
| Movement speed | game.js | `CONFIG.MOVE_SPEED` |
| Dragon colors | game.js | `TRIBES.[TribeName].colors` |
| Combat damage | game.js | `realTimeAttack()`, `battleAction()` |
| Quest rewards | game.js | `QUESTS.[questId].rewards` |
| UI layout | index.html | Screen divs with IDs |
| Color scheme | styles.css | `:root` CSS variables |
| Animations | styles.css | `@keyframes` rules |
