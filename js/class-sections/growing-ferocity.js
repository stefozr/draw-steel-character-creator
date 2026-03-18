// Fury-only: Growing Ferocity threshold table
(function() {
  function render(container, cls, char, config, rerender) {
    var desc = cls.features && cls.features['Growing Ferocity'];
    if (!desc) return;

    var thresholds = [
      { val: 2, label: '2+ Ferocity', effect: 'You gain a +1 bonus to damage.' },
      { val: 4, label: '4+ Ferocity', effect: 'You gain a +1 bonus to speed.' },
      { val: 6, label: '6+ Ferocity', effect: 'You can use your Primordial Strike feature (once per turn, free).' },
      { val: 8, label: '8+ Ferocity', effect: 'You gain a +1 bonus to damage (total +2).' },
      { val: 10, label: '10+ Ferocity', effect: 'You gain a +1 bonus to speed (total +2).' },
      { val: 12, label: '12+ Ferocity', effect: 'You gain a +1 bonus to damage (total +3).' }
    ];

    var html = '<div class="subsection"><div class="subsection-title">Growing Ferocity</div>' +
      '<p class="text-sm text-dim mb-1">' + DS.Renderer.esc(desc) + '</p>' +
      '<div class="threshold-table">';

    thresholds.forEach(function(t) {
      html += '<div class="threshold-row">' +
        '<span class="threshold-badge">' + t.val + '</span>' +
        '<span class="threshold-effect">' + DS.Renderer.esc(t.effect) + '</span>' +
        '</div>';
    });

    html += '</div></div>';
    container.innerHTML = html;
  }

  DS.ClassSections.register('growing-ferocity', render);
})();
