// DS.ClassSections - Section registry for class step rendering
DS.ClassSections = (function() {
  var renderers = {};

  function register(name, renderer) {
    renderers[name] = renderer;
  }

  // Format a progress counter like "(1/2)"
  function progressLabel(current, total) {
    if (total <= 0) return '';
    var done = current >= total;
    return '<span class="section-progress' + (done ? ' section-progress-done' : '') + '">(' + current + '/' + total + ')</span>';
  }

  function renderAll(container, cls, char, rerender) {
    var sections = cls.uiSections || [];
    container.innerHTML = '';
    sections.forEach(function(def) {
      if (def.condition && !def.condition(char)) return;
      var renderer = renderers[def.section];
      if (!renderer) {
        console.warn('ClassSections: no renderer for "' + def.section + '"');
        return;
      }
      var wrapper = document.createElement('div');
      wrapper.className = 'class-section class-section-' + def.section;
      container.appendChild(wrapper);
      renderer(wrapper, cls, char, def.config || {}, rerender);
    });
  }

  function validateAll(cls, char) {
    var sections = cls.uiSections || [];
    for (var i = 0; i < sections.length; i++) {
      var def = sections[i];
      if (def.condition && !def.condition(char)) continue;
      var renderer = renderers[def.section];
      if (renderer && renderer.validate) {
        if (!renderer.validate(cls, char, def.config || {})) return false;
      }
    }
    return true;
  }

  return {
    register: register,
    renderAll: renderAll,
    validateAll: validateAll,
    progressLabel: progressLabel
  };
})();
