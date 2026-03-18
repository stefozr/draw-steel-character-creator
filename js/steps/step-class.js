// DS.Steps.Class - Step 4: Choose class, subclass, characteristics, abilities
DS.Steps = DS.Steps || {};
DS.Steps.Class = (function() {

  function render(container) {
    var char = DS.State.getRef();
    var classes = DS.Data.Classes;
    var classIds = Object.keys(classes);

    var html = '<h2 class="step-title">Choose Your Class</h2>' +
      '<p class="step-subtitle">Your class determines your combat abilities, characteristics, and how you interact with the rules.</p>' +
      '<div id="class-grid"></div>' +
      '<div id="class-detail"></div>';

    container.innerHTML = html;

    DS.Components.ChoiceGrid.render(document.getElementById('class-grid'), {
      items: classIds.map(function(id) {
        var c = classes[id];
        return { id: id, name: c.name, description: c.description };
      }),
      selectedId: char.class.id,
      onSelect: function(id) {
        if (id !== char.class.id) {
          DS.State.update('class.id', id);
          DS.State.update('class.subclass', null);
          DS.State.update('class.characteristicArray', null);
          DS.State.update('class.characteristics', { might: 0, agility: 0, reason: 0, intuition: 0, presence: 0 });
          DS.State.update('class.signatureAbilities', []);
          DS.State.update('class.heroicAbilities', { 3: [], 5: [], 7: [], 9: [], 11: [] });
          DS.State.update('class.skills', []);
          DS.State.update('class.levelChoices', {});
          DS.Wizard.cascadeReset('class');
        }
        var c = classes[id];
        if (c && DS.Sidebar) showClassSidebar(c, DS.State.getRef(), container);
        render(container);
      },
      renderItem: function(item) {
        var c = classes[item.id];
        var color = 'var(--color-' + item.id + ', var(--color-primary))';
        return '<div class="card-title" style="color:' + color + '">' + DS.Renderer.esc(c.name) + '</div>' +
          '<div class="card-desc">' + DS.Renderer.esc(c.description) + '</div>' +
          '<div class="text-sm text-dim mt-1">' + DS.Renderer.esc(c.role) + ' &middot; ' + DS.Renderer.esc(c.heroicResource) + '</div>';
      }
    });

    if (char.class.id && classes[char.class.id]) {
      var cls = classes[char.class.id];
      var detailEl = document.getElementById('class-detail');
      var classColor = 'var(--color-' + cls.id + ', var(--color-primary))';
      var header = document.createElement('div');
      header.className = 'detail-panel';
      header.innerHTML = '<h3 style="color:' + classColor + '">' + DS.Renderer.esc(cls.name) + '</h3>';
      detailEl.appendChild(header);

      var sectionsContainer = document.createElement('div');
      header.appendChild(sectionsContainer);

      DS.ClassSections.renderAll(sectionsContainer, cls, char, function() {
        render(container);
      });

      if (DS.Sidebar) showClassSidebar(cls, char, container);
    } else {
      if (DS.Sidebar) DS.Sidebar.clear();
    }

    if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
  }

  function showClassSidebar(cls, char, container) {
    DS.Sidebar.showClass(cls);
  }

  function validate() {
    var char = DS.State.getRef();
    if (!char.class.id) return false;
    var cls = DS.Data.Classes[char.class.id];
    if (!cls) return false;
    if (!char.class.characteristicArray) return false;
    return DS.ClassSections.validateAll(cls, char);
  }

  return { render: render, validate: validate };
})();
