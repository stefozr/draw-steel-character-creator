// Null-only: Discipline Mastery threshold table
(function() {
  function render(container, cls, char, config, rerender) {
    var subclass = char.class.subclass;

    var baseThresholds = [
      { val: 2, label: '2+ Discipline', effect: 'Your Null Field area increases by 1.' },
      { val: 4, label: '4+ Discipline', effect: 'Your Inertial Shield damage reduction increases by 1.' },
      { val: 6, label: '6+ Discipline', effect: 'Your Null Field area increases by 1 (total +2).' },
      { val: 8, label: '8+ Discipline', effect: 'Your Inertial Shield damage reduction increases by 1 (total +2).' }
    ];

    var traditionBonuses = {
      chronokinetic: 'Chronokinetic: movement-based surges and enhanced forced movement.',
      cryokinetic: 'Cryokinetic: extra Knockback target, cold damage option, grab-based surges.',
      metakinetic: 'Metakinetic: enhanced Knockback distance, damage and force-movement surges.'
    };

    var html = '<div class="subsection"><div class="subsection-title">Discipline Mastery</div>' +
      '<p class="text-sm text-dim mb-1">Your discipline thresholds grant cumulative benefits.</p>';

    if (subclass && traditionBonuses[subclass]) {
      html += '<p class="text-sm" style="color:var(--color-primary)">' + DS.Renderer.esc(traditionBonuses[subclass]) + '</p>';
    }

    html += '<div class="threshold-table">';
    baseThresholds.forEach(function(t) {
      html += '<div class="threshold-row">' +
        '<span class="threshold-badge">' + t.val + '</span>' +
        '<span class="threshold-effect">' + DS.Renderer.esc(t.effect) + '</span>' +
        '</div>';
    });

    html += '</div></div>';
    container.innerHTML = html;
  }

  DS.ClassSections.register('discipline-mastery', render);
})();
