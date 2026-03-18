// Common subclass selection section
(function() {
  function render(container, cls, char, config, rerender) {
    if (!cls.subclasses || !cls.subclasses.length) return;
    var label = cls.subclassLabel || 'Subclass';
    var current = char.class.subclass ? 1 : 0;
    var progress = DS.ClassSections.progressLabel(current, 1);
    container.innerHTML = '<div class="subsection"><div class="subsection-title">' +
      DS.Renderer.esc(label) + ' ' + progress + '</div>' +
      '<p class="text-sm text-dim mb-1">Choose your ' + DS.Renderer.esc(label.toLowerCase()) + '.</p>' +
      '<div class="js-subclass-grid"></div></div>';

    DS.Components.ChoiceGrid.render(container.querySelector('.js-subclass-grid'), {
      items: cls.subclasses,
      selectedId: char.class.subclass,
      onSelect: function(id) {
        DS.State.update('class.subclass', id);
        rerender();
      },
      renderItem: function(item) {
        return '<div class="card-title">' + DS.Renderer.esc(item.name) + '</div>' +
          '<div class="card-desc">' + DS.Renderer.esc(item.description) + '</div>';
      }
    });
  }

  render.validate = function(cls, char) {
    if (cls.subclasses && cls.subclasses.length) {
      return !!char.class.subclass;
    }
    return true;
  };

  DS.ClassSections.register('subclass', render);
})();
