// Common signature ability selection section
(function() {
  function render(container, cls, char, config, rerender) {
    var count = config.count || 1;
    if (!cls.signatureAbilities || !cls.signatureAbilities.length) return;

    var selected = char.class.signatureAbilities || [];
    var current = selected.length;
    var progress = DS.ClassSections.progressLabel(current, count);
    var label = count === 1 ? 'Signature Ability' : 'Signature Abilities';
    var desc = count === 1
      ? 'Choose your signature ability (usable at will).'
      : 'Choose ' + count + ' signature abilities (usable at will).';

    container.innerHTML = '<div class="subsection"><div class="subsection-title">' + label + ' ' + progress + '</div>' +
      '<p class="text-sm text-dim mb-1">' + desc + '</p>' +
      '<div class="js-sig-grid ability-grid"></div></div>';

    var sigEl = container.querySelector('.js-sig-grid');

    cls.signatureAbilities.forEach(function(ability) {
      var isSel = selected.indexOf(ability.name) >= 0;
      var card = DS.Renderer.renderAbilityCard(ability, {
        selected: isSel,
        onClick: function() {
          if (count === 1) {
            DS.State.update('class.signatureAbilities', [ability.name]);
          } else {
            var current = (char.class.signatureAbilities || []).slice();
            var idx = current.indexOf(ability.name);
            if (idx >= 0) {
              current.splice(idx, 1);
            } else if (current.length < count) {
              current.push(ability.name);
            }
            DS.State.update('class.signatureAbilities', current);
          }
          rerender();
        }
      });
      sigEl.appendChild(card);
    });
  }

  render.validate = function(cls, char, config) {
    var count = config.count || 1;
    return (char.class.signatureAbilities || []).length >= count;
  };

  DS.ClassSections.register('signature-abilities', render);
})();
