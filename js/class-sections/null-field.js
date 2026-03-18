// Null-only: Null Field display
(function() {
  function render(container, cls, char, config, rerender) {
    var nullFieldDesc = cls.features && cls.features['Null Field'];
    if (!nullFieldDesc) {
      nullFieldDesc = 'You project a Null Field in a 2-burst aura. Enemies in the field can\'t use triggered actions, take extra damage from your abilities, and their supernatural abilities are suppressed.';
    }

    var html = '<div class="subsection"><div class="subsection-title">Null Field</div>' +
      '<p class="text-sm" style="line-height:1.5">' + DS.Renderer.esc(nullFieldDesc) + '</p>' +
      '</div>';

    container.innerHTML = html;
  }

  DS.ClassSections.register('null-field', render);
})();
