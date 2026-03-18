// Talent-only: Strain/negative clarity display
(function() {
  function render(container, cls, char, config, rerender) {
    var reasonScore = char.class.characteristics.reason || 0;
    var negCap = 1 + Math.max(0, reasonScore);

    var html = '<div class="subsection"><div class="subsection-title">Strain &amp; Negative Clarity</div>' +
      '<div class="strain-indicator">' +
      '<div class="strain-stat">' +
        '<span class="strain-label">Negative Clarity Cap</span>' +
        '<span class="strain-value">-' + negCap + '</span>' +
      '</div>' +
      '<div class="strain-stat">' +
        '<span class="strain-label">Formula</span>' +
        '<span class="strain-value">1 + Reason (' + reasonScore + ')</span>' +
      '</div>' +
      '</div>' +
      '<p class="text-sm text-dim" style="margin-top:0.5rem">You can spend clarity you don\'t have, going negative up to -' + negCap + '. ' +
      'While below 0, you are <strong>strained</strong> and take 1 damage per negative clarity at the end of each turn. ' +
      'Some abilities gain bonus effects while strained.</p>' +
      '</div>';

    container.innerHTML = html;
  }

  DS.ClassSections.register('strain-display', render);
})();
