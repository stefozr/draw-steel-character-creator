// Common heroic ability selection section
(function() {
  function render(container, cls, char, config, rerender) {
    var has3 = cls.heroicAbilities[3] && cls.heroicAbilities[3].length;
    var has5 = cls.heroicAbilities[5] && cls.heroicAbilities[5].length;
    if (!has3 && !has5) return;

    var total = (has3 ? 1 : 0) + (has5 ? 1 : 0);
    var current = 0;
    if (has3 && (char.class.heroicAbilities[3] || []).length) current++;
    if (has5 && (char.class.heroicAbilities[5] || []).length) current++;
    var progress = DS.ClassSections.progressLabel(current, total);

    var html = '';
    if (has3) {
      html += '<div class="subsection"><div class="subsection-title">3-Cost Heroic Ability ' +
        (total === 1 ? progress : DS.ClassSections.progressLabel((char.class.heroicAbilities[3] || []).length ? 1 : 0, 1)) +
        '</div>' +
        '<p class="text-sm text-dim mb-1">Choose one 3-cost heroic ability.</p>' +
        '<div class="js-heroic3 ability-grid"></div></div>';
    }

    if (has5) {
      html += '<div class="subsection"><div class="subsection-title">5-Cost Heroic Ability ' +
        (total === 1 ? progress : DS.ClassSections.progressLabel((char.class.heroicAbilities[5] || []).length ? 1 : 0, 1)) +
        '</div>' +
        '<p class="text-sm text-dim mb-1">Choose one 5-cost heroic ability.</p>' +
        '<div class="js-heroic5 ability-grid"></div></div>';
    }

    container.innerHTML = html;

    renderTier(container, 3, cls, char, rerender);
    renderTier(container, 5, cls, char, rerender);
  }

  function renderTier(container, cost, cls, char, rerender) {
    var el = container.querySelector('.js-heroic' + cost);
    if (!el || !cls.heroicAbilities[cost]) return;

    cls.heroicAbilities[cost].forEach(function(ability) {
      var isSel = (char.class.heroicAbilities[cost] || []).indexOf(ability.name) >= 0;
      var card = DS.Renderer.renderAbilityCard(ability, {
        selected: isSel,
        onClick: function() {
          DS.State.update('class.heroicAbilities.' + cost, [ability.name]);
          rerender();
        }
      });
      el.appendChild(card);
    });
  }

  render.validate = function(cls, char) {
    if (cls.heroicAbilities[3] && cls.heroicAbilities[3].length) {
      if (!(char.class.heroicAbilities[3] || []).length) return false;
    }
    if (cls.heroicAbilities[5] && cls.heroicAbilities[5].length) {
      if (!(char.class.heroicAbilities[5] || []).length) return false;
    }
    return true;
  };

  DS.ClassSections.register('heroic-abilities', render);
})();
