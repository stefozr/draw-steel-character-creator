/**
 * Draw Steel Character Creator → FoundryVTT Import Macro
 *
 * Usage:
 *   1. Export your character from the Draw Steel Character Creator using "Export for FoundryVTT"
 *   2. In FoundryVTT, create a new Script macro and paste this entire file
 *   3. Run the macro — it will prompt you to select the exported JSON file
 *   4. The macro creates a new Hero actor with stats, compendium items, and portrait
 *
 * Requires: FoundryVTT v13+ with the Draw Steel system (v0.10.2+)
 */

(async function () {
  "use strict";

  // --- File picker dialog ---
  const file = await new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.addEventListener("change", () => resolve(input.files[0] || null));
    input.click();
  });
  if (!file) return;

  let data;
  try {
    const text = await file.text();
    data = JSON.parse(text);
  } catch (e) {
    ui.notifications.error("Failed to parse JSON file: " + e.message);
    return;
  }

  if (data.format !== "drawsteel-foundry-v1") {
    ui.notifications.error(
      'Invalid file format. Expected "drawsteel-foundry-v1", got "' +
        (data.format || "unknown") +
        '".'
    );
    return;
  }

  ui.notifications.info("Importing " + data.name + "...");

  // --- Map characteristic names to Foundry system keys ---
  const charMap = {
    might: "might",
    agility: "agility",
    reason: "reason",
    intuition: "intuition",
    presence: "presence",
  };

  // --- Build actor base data ---
  const characteristics = {};
  for (const [key, sysKey] of Object.entries(charMap)) {
    characteristics[sysKey] = { value: (data.characteristics && data.characteristics[key]) || 0 };
  }

  const actorData = {
    name: data.name || "Imported Hero",
    type: "character",
    system: {
      characteristics: characteristics,
      stamina: {
        value: data.stamina?.max || 0,
        max: data.stamina?.max || 0,
        wpiMultiplier: 0.5
      },
      hero: {
        recoveries: {
          max: data.stamina?.recoveries || 0,
          value: data.stamina?.recoveries || 0,
        },
        victories: 0,
      },
      movement: {
        burrow: 0,
        climb: 0,
        fly: 0,
        swim: 0,
        walk: data.speed || 5,
        teleport: 0,
      },
      combat: {
        stability: data.stability || 0,
        size: data.size?.value || 1,
      },
      level: { value: data.level || 1 },
      biography: {
        value:
          [
            data.biography?.appearance ? "<p><strong>Appearance:</strong> " + data.biography.appearance + "</p>" : "",
            data.biography?.personality ? "<p><strong>Personality:</strong> " + data.biography.personality + "</p>" : "",
            data.biography?.backstory ? "<p><strong>Backstory:</strong> " + data.biography.backstory + "</p>" : "",
            data.biography?.pronouns ? "<p><strong>Pronouns:</strong> " + data.biography.pronouns + "</p>" : "",
          ]
            .filter(Boolean)
            .join("") || "",
      },
    },
  };

  // --- Create the actor ---
  const actor = await Actor.create(actorData);
  if (!actor) {
    ui.notifications.error("Failed to create actor.");
    return;
  }

  // --- Set portrait if present ---
  if (data.portrait && data.portrait.startsWith("data:image")) {
    try {
      // Upload portrait as a file to Foundry's data directory
      const response = await fetch(data.portrait);
      const blob = await response.blob();
      const ext = data.portrait.match(/data:image\/(\w+)/)?.[1] || "png";
      const fileName = (data.name || "hero").replace(/[^a-zA-Z0-9_-]/g, "_") + "_portrait." + ext;

      const uploadFile = new File([blob], fileName, { type: blob.type });
      const uploadResult = await FilePicker.upload("data", ".", uploadFile, {});
      if (uploadResult?.path) {
        await actor.update({ img: uploadResult.path });
      }
    } catch (e) {
      console.warn("Draw Steel Import: Could not set portrait:", e);
    }
  }

  // --- Helper: search all packs for an item by name and type ---
  async function findCompendiumItem(name, type) {
    if (!name) return null;
    const nameLower = name.toLowerCase().trim();
    for (const pack of game.packs) {
      if (pack.documentName !== "Item") continue;
      const index = await pack.getIndex();
      const entry = index.find(
        (e) => e.name.toLowerCase().trim() === nameLower && (!type || e.type === type)
      );
      if (entry) {
        return await pack.getDocument(entry._id);
      }
    }
    return null;
  }

  // --- Helper: search all packs for items by name (batch) ---
  async function findCompendiumItems(names, type) {
    const found = [];
    const notFound = [];
    for (const name of names) {
      const item = await findCompendiumItem(name, type);
      if (item) {
        found.push(item);
      } else {
        notFound.push(name);
      }
    }
    return { found, notFound };
  }

  // --- Add compendium items ---
  const itemsToAdd = [];
  const warnings = [];

  // Ancestry
  if (data.ancestry?.name) {
    const item = await findCompendiumItem(data.ancestry.name, "ancestry");
    if (item) itemsToAdd.push(item.toObject());
    else warnings.push("Ancestry: " + data.ancestry.name);
  }

  // Class
  if (data.class?.name) {
    const item = await findCompendiumItem(data.class.name, "class");
    if (item) itemsToAdd.push(item.toObject());
    else warnings.push("Class: " + data.class.name);
  }

  // Subclass
  if (data.class?.subclass) {
    const item = await findCompendiumItem(data.class.subclass, "subclass");
    if (item) itemsToAdd.push(item.toObject());
    else warnings.push("Subclass: " + data.class.subclass);
  }

  // Career
  if (data.career?.name) {
    const item = await findCompendiumItem(data.career.name, "career");
    if (item) itemsToAdd.push(item.toObject());
    else warnings.push("Career: " + data.career.name);
  }

  // Culture — try to find as a single item; culture may not exist as a compendium item
  if (data.culture?.environment || data.culture?.organization || data.culture?.upbringing) {
    const cultureName = [data.culture.environment, data.culture.organization, data.culture.upbringing]
      .filter(Boolean)
      .join(" / ");
    const item = await findCompendiumItem(cultureName, "culture");
    if (item) {
      itemsToAdd.push(item.toObject());
    }
    // Culture items may not exist in compendiums — no warning since it's expected
  }

  // Kit
  if (data.kit?.name) {
    const item = await findCompendiumItem(data.kit.name, "kit");
    if (item) itemsToAdd.push(item.toObject());
    else warnings.push("Kit: " + data.kit.name);
  }

  // Complication
  if (data.complication?.name) {
    const item = await findCompendiumItem(data.complication.name, null);
    if (item) itemsToAdd.push(item.toObject());
    else warnings.push("Complication: " + data.complication.name);
  }

  // Abilities
  if (data.abilities && data.abilities.length) {
    const result = await findCompendiumItems(data.abilities, "ability");
    result.found.forEach((item) => itemsToAdd.push(item.toObject()));
    result.notFound.forEach((name) => warnings.push("Ability: " + name));
  }

  // Perks
  if (data.perks && data.perks.length) {
    const result = await findCompendiumItems(data.perks, "perk");
    result.found.forEach((item) => itemsToAdd.push(item.toObject()));
    result.notFound.forEach((name) => warnings.push("Perk: " + name));
  }

  // --- Create embedded items on the actor ---
  if (itemsToAdd.length > 0) {
    try {
      await actor.createEmbeddedDocuments("Item", itemsToAdd);
    } catch (e) {
      console.error("Draw Steel Import: Error adding items:", e);
      warnings.push("Error adding some items — see console for details");
    }
  }

  // --- Build summary message ---
  let msg = "<h3>Draw Steel Import Complete</h3>";
  msg += "<p><strong>" + data.name + "</strong> — Level " + data.level + " " + (data.class?.name || "") + "</p>";
  msg += "<p>Added " + itemsToAdd.length + " compendium item(s) to the actor.</p>";

  if (warnings.length > 0) {
    msg += "<h4>Not found in compendiums (add manually):</h4><ul>";
    warnings.forEach((w) => (msg += "<li>" + w + "</li>"));
    msg += "</ul>";
  }

  msg += "<p><em>Skills and languages are not directly importable as items — " +
    "verify them on the character sheet.</em></p>";
  msg +=
    "<p><strong>Skills:</strong> " + (data.skills?.join(", ") || "none") + "</p>";
  msg +=
    "<p><strong>Languages:</strong> " + (data.languages?.join(", ") || "none") + "</p>";

  ChatMessage.create({ content: msg, whisper: [game.user.id] });

  ui.notifications.info("Import complete! Check the chat log for details.");
})();
