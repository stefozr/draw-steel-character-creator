// DS.Sidebar - Right-side description panel for wizard steps
DS.Components = DS.Components || {};

DS.Sidebar = (function() {
  var el = null;

  function getEl() {
    if (!el) el = document.getElementById('sidebar-content');
    return el;
  }

  function setSidebarActive(active) {
    var sidebar = document.getElementById('wizard-sidebar');
    if (sidebar) {
      if (active) sidebar.classList.add('sidebar-active');
      else sidebar.classList.remove('sidebar-active');
    }
  }

  function show(options) {
    var container = getEl();
    if (!container) return;

    var html = '';

    if (options.title) {
      html += '<h4>' + DS.Renderer.esc(options.title) + '</h4>';
    }

    if (options.subtitle) {
      html += '<p class="text-dim">' + DS.Renderer.esc(options.subtitle) + '</p>';
    }

    if (options.description) {
      html += '<div class="sidebar-section"><p>' + DS.Renderer.esc(options.description) + '</p></div>';
    }

    if (options.sections) {
      options.sections.forEach(function(sec) {
        html += '<div class="sidebar-section">';
        if (sec.label) {
          html += '<div class="sidebar-label">' + DS.Renderer.esc(sec.label) + '</div>';
        }
        if (sec.value) {
          html += '<div class="sidebar-value">' + DS.Renderer.esc(sec.value) + '</div>';
        }
        if (sec.html) {
          html += sec.html;
        }
        if (sec.list) {
          html += '<ul style="list-style:none;padding:0;margin:0;">';
          sec.list.forEach(function(item) {
            html += '<li class="sidebar-value" style="padding:0.15rem 0;">&bull; ' + DS.Renderer.esc(item) + '</li>';
          });
          html += '</ul>';
        }
        html += '</div>';
      });
    }

    container.innerHTML = html || '<p class="sidebar-empty">Select an item to see its description.</p>';
    setSidebarActive(true);
  }

  function clear() {
    var container = getEl();
    if (container) {
      container.innerHTML = '<p class="sidebar-empty">Select an item to see its description.</p>';
    }
    setSidebarActive(false);
    closeDrawer();
  }

  function formatSize(size) {
    if (!size) return 'M';
    return size.replace(/^1/, '');
  }

  // Convenience: show ancestry info
  function showAncestry(ancestry) {
    var sections = [
      { label: 'Size', value: formatSize(ancestry.size) },
      { label: 'Speed', value: String(ancestry.speed || 5) },
      { label: 'Ancestry Points', value: String(ancestry.ancestryPoints) }
    ];
    if (ancestry.signatureTrait) {
      sections.push({
        label: 'Signature Trait: ' + ancestry.signatureTrait.name,
        value: ancestry.signatureTrait.description
      });
    }
    show({
      title: ancestry.name,
      subtitle: ancestry.description,
      sections: sections
    });
  }

  // Convenience: show career info
  function showCareer(career) {
    var sections = [];
    var grants = [];
    if (career.renown) grants.push('Renown +' + career.renown);
    if (career.wealth) grants.push('Wealth +' + career.wealth);
    if (career.projectPoints) grants.push(career.projectPoints + ' Project Points');
    if (grants.length) {
      sections.push({ label: 'Grants', value: grants.join(', ') });
    }
    sections.push({ label: 'Perk', value: career.perk + ' (' + career.perkType + ')' });
    if (career.quickBuildSkills) {
      sections.push({ label: 'Skills', list: career.quickBuildSkills });
    }
    show({
      title: career.name,
      description: career.description,
      sections: sections
    });
  }

  // Convenience: show class info
  function showClass(cls) {
    var container = getEl();
    if (!container) return;

    var sidebarWrap = document.getElementById('wizard-sidebar');
    if (sidebarWrap) sidebarWrap.scrollTop = 0;

    var html = '<h4>' + DS.Renderer.esc(cls.name) + '</h4>' +
      '<p class="text-dim">' + DS.Renderer.esc(cls.description) + '</p>';

    // Stats
    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Role</div>' +
      '<div class="sidebar-value">' + DS.Renderer.esc(cls.role) + '</div>' +
      '</div>';

    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Primary Characteristics</div>' +
      '<div class="sidebar-value">' + DS.Renderer.esc((cls.primaryCharacteristics || []).map(function(c) { return c.charAt(0).toUpperCase() + c.slice(1); }).join(', ')) + '</div>' +
      '</div>';

    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Stamina</div>' +
      '<div class="sidebar-value">Base ' + cls.staminaBase + ' + ' + cls.staminaPerLevel + ' per level</div>' +
      '</div>';

    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Recoveries</div>' +
      '<div class="sidebar-value">' + cls.recoveries + '</div>' +
      '</div>';

    // Heroic Resource card
    if (cls.heroicResource) {
      html += '<div class="heroic-resource-card">' +
        '<div class="heroic-resource-card-title">' + DS.Renderer.esc(cls.heroicResource) + '</div>';
      if (cls.heroicResourceDescription) {
        html += '<p class="heroic-resource-card-body">' + DS.Renderer.esc(cls.heroicResourceDescription) + '</p>';
      }
      html += '</div>';
    }

    container.innerHTML = html;
    setSidebarActive(true);
  }

  // Convenience: show kit info
  function showKit(kit) {
    var container = getEl();
    if (!container) return;

    var sidebarWrap = document.getElementById('wizard-sidebar');
    if (sidebarWrap) sidebarWrap.scrollTop = 0;

    var html = '<h4>' + DS.Renderer.esc(kit.name) + '</h4>' +
      '<p class="text-dim">' + DS.Renderer.esc(kit.description) + '</p>';

    // Armor & Weapon
    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Equipment</div>' +
      '<div class="sidebar-value">' + DS.Renderer.esc(kit.armor) + ' · ' + DS.Renderer.esc(kit.weapon) + '</div>' +
    '</div>';

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
      html += '<div class="sidebar-section">' +
        '<div class="sidebar-label">Bonuses</div>' +
        '<ul class="sidebar-list">';
      bonuses.forEach(function(b) {
        html += '<li>' + b + '</li>';
      });
      html += '</ul></div>';
    }

    // Signature ability placeholder - append card after innerHTML set
    if (kit.signatureAbility) {
      html += '<div class="sidebar-section">' +
        '<div class="sidebar-label">Signature Ability</div>' +
        '<div id="sidebar-kit-sig"></div>' +
      '</div>';
    }

    container.innerHTML = html;
    setSidebarActive(true);

    // Render ability card into the placeholder
    if (kit.signatureAbility) {
      var sigEl = document.getElementById('sidebar-kit-sig');
      if (sigEl) {
        sigEl.appendChild(DS.Renderer.renderAbilityCard(kit.signatureAbility));
      }
    }
  }

  // Convenience: show complication info
  function showComplication(comp) {
    var container = getEl();
    if (!container) return;

    var html = '<h4>' + DS.Renderer.esc(comp.name) + '</h4>' +
      '<div class="complication-benefit">' +
        '<div class="complication-label complication-label-benefit">Benefit</div>' +
        '<div>' + DS.Renderer.formatText(comp.benefit) + '</div>' +
      '</div>' +
      '<div class="complication-drawback">' +
        '<div class="complication-label complication-label-drawback">Drawback</div>' +
        '<div>' + DS.Renderer.formatText(comp.drawback) + '</div>' +
      '</div>';

    container.innerHTML = html;
    setSidebarActive(true);
  }

  var drawerOpen = false;

  function openDrawer() {
    var sidebar = document.getElementById('wizard-sidebar');
    var backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.add('drawer-open');
    if (backdrop) backdrop.classList.add('active');
    var btn = document.getElementById('btn-sidebar-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    drawerOpen = true;
  }

  function closeDrawer() {
    var sidebar = document.getElementById('wizard-sidebar');
    var backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('drawer-open');
    if (backdrop) backdrop.classList.remove('active');
    var btn = document.getElementById('btn-sidebar-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    drawerOpen = false;
  }

  function toggleDrawer() {
    if (drawerOpen) closeDrawer(); else openDrawer();
  }

  return {
    show: show,
    clear: clear,
    showAncestry: showAncestry,
    showCareer: showCareer,
    showClass: showClass,
    showKit: showKit,
    showComplication: showComplication,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    toggleDrawer: toggleDrawer
  };
})();
