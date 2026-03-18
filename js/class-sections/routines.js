// Troubadour-only: Performance routines display
(function() {
  function render(container, cls, char, config, rerender) {
    var subclass = char.class.subclass;
    if (!subclass) {
      container.innerHTML = '<div class="subsection"><div class="subsection-title">Routines</div>' +
        '<p class="text-sm text-dim">Choose a class act above to see available routines.</p></div>';
      return;
    }

    var sub = cls.subclasses.find(function(s) { return s.id === subclass; });
    var routineInfo = '';
    if (sub) {
      routineInfo = sub.description;
    }

    var html = '<div class="subsection"><div class="subsection-title">Routines &amp; Performances</div>' +
      '<p class="text-sm" style="line-height:1.5">' + DS.Renderer.esc(routineInfo) + '</p>';

    // General routine info
    html += '<div class="routine-card">' +
      '<p class="text-sm text-dim">Routines are ongoing effects you maintain. You can have one active routine at a time. ' +
      'Starting a new routine ends the previous one. Routines don\'t cost drama to maintain.</p>' +
      '</div>';

    html += '</div>';
    container.innerHTML = html;
  }

  DS.ClassSections.register('routines', render);
})();
