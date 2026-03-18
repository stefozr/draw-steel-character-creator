# Draw Steel - Character Creator

## Project Overview

A browser-based character creator for the **Draw Steel** tabletop RPG by MCDM Productions. The app guides users through a multi-step wizard to build heroes from level 1 through 10, with full import/export and local persistence.

## Tech Stack

- **Vanilla JavaScript** (ES5-compatible, no build tools, no frameworks)
- **Plain HTML/CSS** — single `index.html` entry point
- **localStorage** for persistence (key: `drawsteel_characters`)
- All JS lives under a single `DS` namespace (`DS.App`, `DS.State`, `DS.Wizard`, etc.)
- No package manager, no bundler — just `<script>` tags loaded in order

## Architecture

### Namespace & Module Pattern

Every module is an IIFE on the `DS` namespace:

```
DS.App        — Entry point, screen router, boot
DS.State      — Observable character state (get/set/subscribe)
DS.Wizard     — Step controller (navigation, validation, cascade resets)
DS.Calculator — Derived stat computation (stamina, speed, skills, etc.)
DS.Storage    — localStorage CRUD + JSON import/export
DS.Renderer   — DOM helpers (html builder, selection grids, ability cards, modals)
DS.Sidebar    — Right-panel detail viewer
DS.Rules      — Rules cheat sheet renderer
DS.LevelUp    — Level-up flow (separate from wizard)
```

### Data Layer (`data/`)

Static game data exported onto `DS.Data`:

| File | Namespace | Contains |
|------|-----------|----------|
| `ancestries.js` | `DS.Data.Ancestries` | 12 ancestries with traits, costs, signature abilities |
| `cultures.js` | `DS.Data.Cultures` | Environment/organization/upbringing options |
| `careers.js` | `DS.Data.Careers` | Careers with skills, languages, perks, inciting incidents |
| `kits.js` | `DS.Data.Kits` | Equipment kits with stat bonuses |
| `perks.js` | `DS.Data.Perks` | Career perks |
| `complications.js` | `DS.Data.Complications` | Optional backstory complications |
| `skills.js` | `DS.Data.Skills` | Skill groups and lists |
| `languages.js` | `DS.Data.Languages` | Available languages |
| `classes/*.js` | `DS.Data.Classes[id]` | 9 classes (fury, conduit, shadow, censor, elementalist, null, tactician, talent, troubadour) with subclasses, abilities, advancement tables |

### Step Modules (`js/steps/`)

Each wizard step is a module with `render(container)` and optionally `validate()`:

```
step-ancestry.js    — Pick ancestry + purchase traits with ancestry points
step-culture.js     — Choose environment, organization, upbringing, skills, language
step-career.js      — Select career, skills, language, perk, inciting incident
step-class.js       — Pick class & subclass, assign characteristics, choose abilities
step-kit.js         — Choose equipment kit
step-complication.js — Optional complication selection
step-details.js     — Hero name, pronouns, appearance, personality, backstory, portrait
step-summary.js     — Final character sheet view with export/edit capabilities
step-level-up.js    — Level advancement (characteristic bumps, new abilities)
```

### Reusable Components (`js/components/`)

```
ability-card.js  — Renders ability cards with power rolls, tiers, keywords
trait-picker.js  — Ancestry trait purchasing with point budget
choice-grid.js   — Generic selection grid component
sidebar.js       — Description sidebar panel
```

### Character State Shape

```js
{
  id, name, level, finished,
  ancestry: { id, purchasedTraits, specialChoices },
  culture: { environment, organization, upbringing, skills, language },
  career: { id, skills, languages, perk, incitingIncident },
  class: {
    id, subclass, characteristicArray,
    characteristics: { might, agility, reason, intuition, presence },
    skills, signatureAbilities,
    heroicAbilities: { 3:[], 5:[], 7:[], 9:[], 11:[] },
    features, levelChoices: {}
  },
  kit: { id },
  complication: { id },
  details: { heroName, pronouns, appearance, personality, backstory, portrait },
  computed: { stamina, winded, recoveryValue, recoveries, speed, stability, size, skills, languages, abilities, features, ... }
}
```

### Screens

1. **Home** — Character list, new/import/rules buttons
2. **Wizard** — 8-step character creation flow with sidebar
3. **Rules** — Searchable rules cheat sheet
4. **Level Up** — Level advancement flow (separate screen)

### Key Patterns

- **State is observable**: `DS.State.subscribe(fn)` for reactive updates; `DS.State.update('path.to.field', value)` for dot-path mutations
- **Auto-save**: Debounced 500ms save to localStorage on every state change
- **Cascade resets**: Changing ancestry/class resets downstream choices via `DS.Wizard.cascadeReset()`
- **Computed stats**: `DS.Calculator.compute(char)` derives stamina, winded, recovery, speed, skills, languages from all sources
- **XSS-safe**: `DS.Renderer.esc()` used for all user-facing text insertion
- **Echelon system**: Levels 1-3 = echelon 1, 4-6 = 2, 7-9 = 3, 10 = 4 (affects kit stamina scaling)

## Game Reference

- **Draw Steel** is a heroic fantasy TTRPG
- 5 characteristics: Might, Agility, Reason, Intuition, Presence
- 9 classes, each with a unique Heroic Resource
- Abilities have power rolls with 3 tiers: <=11 (T1), 12-16 (T2), 17+ (T3)
- Characters have ancestry points to spend on purchasable traits
- Levels 1-10 with advancement tables per class

## Docs

The `docs/` folder contains markdown references for game rules:
- `ancestries.md`, `culture.md`, `career.md`, `kit.md`, `complication.md`, `class.md`
- `classes/*.md` — Per-class detailed rules (one per class + `overview.md`)

## CSS

- `css/main.css` — Layout, theme variables, screen styles
- `css/components.css` — Component-specific styles (cards, grids, abilities, modals)

## How to Run

Open `index.html` in a browser. No build step required.
