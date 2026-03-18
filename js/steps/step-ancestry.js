// DS.Steps.Ancestry - Step 1: Choose ancestry and purchased traits
DS.Steps = DS.Steps || {};
DS.Steps.Ancestry = (function() {

  function formatSize(size) {
    if (!size) return 'M';
    return size.replace(/^1/, '');
  }

  function render(container) {
    var char = DS.State.getRef();
    var ancestries = DS.Data.Ancestries;
    var selectedId = char.ancestry.id;

    var html = '<h2 class="step-title">Choose Your Ancestry</h2>' +
      '<p class="step-subtitle">Your ancestry determines your physical traits and innate abilities.</p>' +
      '<div id="ancestry-grid"></div>';

    container.innerHTML = html;

    // Render selection grid
    var gridEl = document.getElementById('ancestry-grid');
    DS.Components.ChoiceGrid.render(gridEl, {
      items: ancestries.map(function(a) {
        return { id: a.id, name: a.name, description: a.description };
      }),
      selectedId: selectedId,
      onSelect: function(id) {
        if (id !== char.ancestry.id) {
          DS.State.update('ancestry.id', id);
          DS.State.update('ancestry.purchasedTraits', []);
          DS.State.update('ancestry.specialChoices', {});
          DS.Wizard.cascadeReset('ancestry');
        }
        var a = ancestries.find(function(x) { return x.id === id; });
        if (a && DS.Sidebar) showAncestrySidebar(a, DS.State.getRef());
        if (window.innerWidth <= 900) DS.Sidebar.openDrawer();
        render(container);
      },
      renderItem: function(item) {
        var a = ancestries.find(function(x) { return x.id === item.id; });
        return '<div class="card-title">' + DS.Renderer.esc(item.name) + '</div>' +
          '<div class="card-desc">' + DS.Renderer.esc(item.description) + '</div>' +
          '<span class="card-badge">' + formatSize(a.size) + '</span>';
      }
    });

    // Populate sidebar with info + trait picker
    if (selectedId) {
      var ancestry = ancestries.find(function(a) { return a.id === selectedId; });
      if (ancestry) {
        showAncestrySidebar(ancestry, char);
      }
    } else {
      if (DS.Sidebar) DS.Sidebar.clear();
    }
  }

  function showAncestrySidebar(ancestry, char) {
    var container = document.getElementById('sidebar-content');
    if (!container) return;

    var html = '<h4>' + DS.Renderer.esc(ancestry.name) + '</h4>' +
      '<p class="text-dim">' + DS.Renderer.esc(ancestry.description) + '</p>';

    // Stats
    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Size</div><div class="sidebar-value">' + formatSize(ancestry.size) + '</div>' +
    '</div>' +
    '<div class="sidebar-section">' +
      '<div class="sidebar-label">Speed</div><div class="sidebar-value">' + (ancestry.speed || 5) + '</div>' +
    '</div>';

    // Signature trait
    if (ancestry.signatureTrait) {
      html += '<div class="sidebar-section">' +
        '<div class="sidebar-label">Signature Trait: ' + DS.Renderer.esc(ancestry.signatureTrait.name) + '</div>' +
        '<div class="sidebar-value">' + DS.Renderer.esc(ancestry.signatureTrait.description) + '</div>' +
      '</div>';
    }

    // Trait picker placeholder
    html += '<div id="sidebar-trait-picker"></div>';

    container.innerHTML = html;
    var sidebarWrap = document.getElementById('wizard-sidebar');
    if (sidebarWrap) sidebarWrap.classList.add('sidebar-active');

    // Render trait picker into sidebar
    if (ancestry.purchasedTraits && ancestry.purchasedTraits.length) {
      var pickerEl = document.getElementById('sidebar-trait-picker');
      DS.Components.TraitPicker.render(pickerEl, {
        traits: ancestry.purchasedTraits,
        maxPoints: ancestry.ancestryPoints,
        selected: char.ancestry.purchasedTraits || [],
        onChange: function(newSelected) {
          DS.State.update('ancestry.purchasedTraits', newSelected);
          showAncestrySidebar(ancestry, DS.State.getRef());
          if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
        }
      });
    }
  }

  function validate() {
    var char = DS.State.getRef();
    if (!char.ancestry.id) return false;

    // Must spend all ancestry points
    var ancestry = DS.Data.Ancestries.find(function(a) { return a.id === char.ancestry.id; });
    if (ancestry && ancestry.purchasedTraits && ancestry.purchasedTraits.length) {
      var spent = (char.ancestry.purchasedTraits || []).reduce(function(sum, t) { return sum + (t.cost || 0); }, 0);
      if (spent < ancestry.ancestryPoints) return false;
    }

    return true;
  }

  return { render: render, validate: validate };
})();
