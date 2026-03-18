// DS.Steps.Kit - Step 5: Choose kit (adapts per class)
DS.Steps = DS.Steps || {};
DS.Steps.Kit = (function() {

  var beastKits = DS.Data.BeastKits;

  // Returns 'beast-kit', 'field-arsenal', or 'standard'
  function getKitMode(char) {
    if (char.class.id === 'fury' && char.class.subclass === 'stormwight') return 'beast-kit';
    if (char.class.id === 'tactician') return 'field-arsenal';
    return 'standard';
  }

  function render(container) {
    var char = DS.State.getRef();
    var mode = getKitMode(char);

    if (mode === 'beast-kit') {
      renderBeastKit(container, char);
    } else if (mode === 'field-arsenal') {
      renderFieldArsenal(container, char);
    } else {
      renderStandard(container, char);
    }

    if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
  }

  // --- Standard: pick 1 kit ---
  function renderStandard(container, char) {
    var kits = DS.Data.Kits;
    var selectedId = char.kit.id;
    var progress = selectedId
      ? '<span class="section-progress section-progress-done">(1/1)</span>'
      : '<span class="section-progress">(0/1)</span>';

    container.innerHTML = '<h2 class="step-title">Choose Your Kit ' + progress + '</h2>' +
      '<p class="step-subtitle">Your kit defines your approach to martial combat — your weapons, armor, and fighting style.</p>' +
      '<div class="js-kit-grid"></div>';

    DS.Components.ChoiceGrid.render(container.querySelector('.js-kit-grid'), {
      items: kits.map(function(k) { return { id: k.id, name: k.name, description: k.description }; }),
      selectedId: selectedId,
      onSelect: function(id) {
        DS.State.update('kit.id', id);
        var k = kits.find(function(x) { return x.id === id; });
        if (k && DS.Sidebar) DS.Sidebar.showKit(k);
        render(container);
      },
      renderItem: function(item) {
        var k = kits.find(function(x) { return x.id === item.id; });
        return '<div class="card-title">' + DS.Renderer.esc(k.name) + '</div>' +
          '<div class="card-desc">' + DS.Renderer.esc(k.description) + '</div>';
      }
    });

    if (selectedId) {
      var kit = kits.find(function(k) { return k.id === selectedId; });
      if (kit && DS.Sidebar) DS.Sidebar.showKit(kit);
    } else {
      if (DS.Sidebar) DS.Sidebar.clear();
    }
  }

  // --- Tactician: pick 2 kits (Field Arsenal) ---
  function renderFieldArsenal(container, char) {
    var kits = DS.Data.Kits;
    var selected = char.class.levelChoices.fieldArsenalKits || [];
    var current = selected.length;
    var progress = '<span class="section-progress' + (current >= 2 ? ' section-progress-done' : '') + '">(' + current + '/2)</span>';

    container.innerHTML = '<h2 class="step-title">Choose Your Kits ' + progress + '</h2>' +
      '<p class="step-subtitle">Your Field Arsenal lets you use two kits at once, including both their signature abilities.</p>' +
      '<div class="js-kit-grid"></div>';

    DS.Components.ChoiceGrid.render(container.querySelector('.js-kit-grid'), {
      items: kits.map(function(k) { return { id: k.id, name: k.name, description: k.description }; }),
      selectedIds: selected,
      multi: true,
      onSelect: function(ids) {
        if (ids.length <= 2) {
          DS.State.update('class.levelChoices.fieldArsenalKits', ids);
          if (ids.length > 0) {
            DS.State.update('kit.id', ids[0]);
          }
          showFieldArsenalSidebar(ids, kits);
          render(container);
        }
      },
      renderItem: function(item) {
        var k = kits.find(function(x) { return x.id === item.id; });
        return '<div class="card-title">' + DS.Renderer.esc(k.name) + '</div>' +
          '<div class="card-desc">' + DS.Renderer.esc(k.description) + '</div>';
      }
    });

    showFieldArsenalSidebar(selected, kits);
  }

  // --- Tactician sidebar: show all selected kits stacked ---
  function showFieldArsenalSidebar(selectedIds, allKits) {
    var container = document.getElementById('sidebar-content');
    if (!container) return;
    if (!selectedIds.length) { if (DS.Sidebar) DS.Sidebar.clear(); return; }

    var sidebarWrap = document.getElementById('wizard-sidebar');
    if (sidebarWrap) sidebarWrap.scrollTop = 0;

    var html = '<h4>Field Arsenal</h4>' +
      '<p class="text-dim">Your two selected kits and their combined benefits.</p>';

    selectedIds.forEach(function(id, index) {
      var kit = allKits.find(function(k) { return k.id === id; });
      if (!kit) return;

      if (index > 0) html += '<hr style="margin:1rem 0;border-color:var(--color-border)">';

      html += '<h4 style="margin-top:0.5rem">' + DS.Renderer.esc(kit.name) + '</h4>';
      html += '<p class="text-dim">' + DS.Renderer.esc(kit.description) + '</p>';

      // Equipment
      html += '<div class="sidebar-section"><div class="sidebar-label">Equipment</div>' +
        '<div class="sidebar-value">' + DS.Renderer.esc(kit.armor) + ' \u00b7 ' + DS.Renderer.esc(kit.weapon) + '</div></div>';

      // Bonuses
      var bonuses = [];
      if (kit.staminaPerEchelon) bonuses.push('Stamina +' + kit.staminaPerEchelon + ' per echelon');
      if (kit.speed) bonuses.push('Speed +' + kit.speed);
      if (kit.stability) bonuses.push('Stability +' + kit.stability);
      if (kit.meleeDamage && kit.meleeDamage !== '+0/+0/+0') bonuses.push('Melee Damage: ' + kit.meleeDamage);
      if (kit.rangedDamage && kit.rangedDamage !== '+0/+0/+0') bonuses.push('Ranged Damage: ' + kit.rangedDamage);
      if (kit.meleeDistance) bonuses.push('Melee Distance: +' + kit.meleeDistance);
      if (kit.rangedDistance) bonuses.push('Ranged Distance: +' + kit.rangedDistance);
      if (kit.disengage) bonuses.push('Disengage +' + kit.disengage);
      if (bonuses.length) {
        html += '<div class="sidebar-section"><div class="sidebar-label">Bonuses</div><ul class="sidebar-list">';
        bonuses.forEach(function(b) { html += '<li>' + b + '</li>'; });
        html += '</ul></div>';
      }

      // Signature ability placeholder
      if (kit.signatureAbility) {
        html += '<div class="sidebar-section"><div class="sidebar-label">Signature Ability</div>' +
          '<div class="js-field-arsenal-sig" data-kit-index="' + index + '"></div></div>';
      }
    });

    container.innerHTML = html;

    // Render ability cards into placeholders
    var sigEls = container.querySelectorAll('.js-field-arsenal-sig');
    for (var i = 0; i < sigEls.length; i++) {
      var sigEl = sigEls[i];
      var idx = parseInt(sigEl.getAttribute('data-kit-index'), 10);
      var kit = allKits.find(function(k) { return k.id === selectedIds[idx]; });
      if (kit && kit.signatureAbility) {
        sigEl.appendChild(DS.Renderer.renderAbilityCard(kit.signatureAbility));
      }
    }
  }

  // --- Fury/Stormwight: pick 1 beast kit ---
  function renderBeastKit(container, char) {
    var selected = char.class.levelChoices.beastFormKit || null;
    var progress = selected
      ? '<span class="section-progress section-progress-done">(1/1)</span>'
      : '<span class="section-progress">(0/1)</span>';

    container.innerHTML = '<h2 class="step-title">Choose Your Beast Form Kit ' + progress + '</h2>' +
      '<p class="step-subtitle">As a Stormwight, you channel primordial storms through a beast form. Choose your beast form kit.</p>' +
      '<div class="js-kit-grid"></div>';

    DS.Components.ChoiceGrid.render(container.querySelector('.js-kit-grid'), {
      items: beastKits,
      selectedId: selected,
      onSelect: function(id) {
        DS.State.update('class.levelChoices.beastFormKit', id);
        var bk = beastKits.find(function(x) { return x.id === id; });
        if (bk && DS.Sidebar) showBeastKitSidebar(bk);
        render(container);
      },
      renderItem: function(item) {
        return '<div class="card-title">' + DS.Renderer.esc(item.name) + '</div>' +
          '<div class="card-desc">' + DS.Renderer.esc(item.description) + '</div>';
      }
    });

    if (selected) {
      var bk = beastKits.find(function(x) { return x.id === selected; });
      if (bk && DS.Sidebar) showBeastKitSidebar(bk);
    } else {
      if (DS.Sidebar) DS.Sidebar.clear();
    }
  }

  // --- Beast kit sidebar: full details ---
  function showBeastKitSidebar(kit) {
    var container = document.getElementById('sidebar-content');
    if (!container) return;
    var sidebarWrap = document.getElementById('wizard-sidebar');
    if (sidebarWrap) sidebarWrap.scrollTop = 0;

    var html = '<h4>' + DS.Renderer.esc(kit.name) + '</h4>' +
      '<p class="text-dim">' + DS.Renderer.esc(kit.description) + '</p>';

    // Aspect Benefits
    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Aspect Benefits</div>' +
      '<p class="sidebar-value">' + DS.Renderer.esc(kit.aspectBenefits) + '</p></div>';

    // Animal Form
    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Animal Form</div>' +
      '<p class="sidebar-value">' + DS.Renderer.esc(kit.animalForm) + '</p></div>';

    // Hybrid Form
    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Hybrid Form</div>' +
      '<p class="sidebar-value">' + DS.Renderer.esc(kit.hybridForm) + '</p></div>';

    // Primordial Storm
    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Primordial Storm</div>' +
      '<div class="sidebar-value">' + DS.Renderer.esc(kit.primordialStorm) + '</div></div>';

    // Kit Bonuses
    var bonuses = [];
    if (kit.staminaPerEchelon) bonuses.push('Stamina +' + kit.staminaPerEchelon + ' per echelon');
    if (kit.speed) bonuses.push('Speed +' + kit.speed);
    if (kit.stability) bonuses.push('Stability +' + kit.stability);
    if (kit.meleeDamage) bonuses.push('Melee Damage: ' + kit.meleeDamage);
    if (kit.disengage) bonuses.push('Disengage +' + kit.disengage);
    if (bonuses.length) {
      html += '<div class="sidebar-section"><div class="sidebar-label">Bonuses</div><ul class="sidebar-list">';
      bonuses.forEach(function(b) { html += '<li>' + b + '</li>'; });
      html += '</ul></div>';
    }

    // Signature Ability placeholder
    if (kit.signatureAbility) {
      html += '<div class="sidebar-section"><div class="sidebar-label">Signature Ability</div>' +
        '<div id="sidebar-beast-sig"></div></div>';
    }

    // Growing Ferocity table
    if (kit.growingFerocity && kit.growingFerocity.length) {
      html += '<div class="sidebar-section"><div class="sidebar-label">Growing Ferocity</div>' +
        '<table class="sidebar-table"><thead><tr><th>Ferocity</th><th>Benefit</th></tr></thead><tbody>';
      kit.growingFerocity.forEach(function(row) {
        html += '<tr><td>' + DS.Renderer.esc(String(row.ferocity)) + '</td><td>' + DS.Renderer.esc(row.benefit) + '</td></tr>';
      });
      html += '</tbody></table></div>';
    }

    container.innerHTML = html;

    // Render ability card into placeholder
    if (kit.signatureAbility) {
      var sigEl = document.getElementById('sidebar-beast-sig');
      if (sigEl) sigEl.appendChild(DS.Renderer.renderAbilityCard(kit.signatureAbility));
    }
  }

  function validate() {
    var char = DS.State.getRef();
    var mode = getKitMode(char);
    if (mode === 'beast-kit') return !!char.class.levelChoices.beastFormKit;
    if (mode === 'field-arsenal') return (char.class.levelChoices.fieldArsenalKits || []).length === 2;
    return !!char.kit.id;
  }

  return { render: render, validate: validate };
})();
