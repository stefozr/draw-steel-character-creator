// Class features section - displays core features, subclass features, and choice-based features
(function() {
  function render(container, cls, char, config, rerender) {
    var cf = cls.classFeatures;
    if (!cf) return;

    var html = '';
    var subclass = char.class.subclass;

    // Core features (always shown)
    if (cf.core && cf.core.length) {
      html += '<div class="subsection"><div class="subsection-title">Class Features</div>';
      cf.core.forEach(function(f) {
        html += renderFeatureCard(f);
      });
      html += '</div>';
    }

    // Subclass features (shown when subclass selected)
    if (subclass && cf.subclassFeatures && cf.subclassFeatures[subclass]) {
      var subName = '';
      if (cls.subclasses) {
        var sub = cls.subclasses.find(function(s) { return s.id === subclass; });
        if (sub) subName = sub.name;
      }
      var feats = cf.subclassFeatures[subclass];
      html += '<div class="subsection"><div class="subsection-title">' +
        DS.Renderer.esc(subName || cls.subclassLabel || 'Subclass') + ' Features</div>';
      feats.forEach(function(f) {
        html += renderFeatureCard(f);
      });
      html += '</div>';
    }

    // Choice-based features
    if (cf.choices && cf.choices.length) {
      cf.choices.forEach(function(choice) {
        var selectedId = (char.class.levelChoices || {})[choice.key] || null;
        var current = selectedId ? 1 : 0;
        var progress = DS.ClassSections.progressLabel(current, 1);
        html += '<div class="subsection"><div class="subsection-title">' +
          DS.Renderer.esc(choice.name) + ' ' + progress + '</div>';
        if (choice.description) {
          html += '<p class="text-sm text-dim mb-1">' + DS.Renderer.esc(choice.description) + '</p>';
        }
        html += '<div class="js-choice-' + choice.key + '"></div>';

        // Show selected choice detail
        if (selectedId) {
          var opt = choice.options.find(function(o) { return o.id === selectedId; });
          if (opt) {
            html += renderFeatureCard(opt);
          }
        }
        html += '</div>';
      });
    }

    if (!html) return;
    container.innerHTML = html;

    // Attach choice grid event handlers
    if (cf.choices) {
      cf.choices.forEach(function(choice) {
        var el = container.querySelector('.js-choice-' + choice.key);
        if (!el) return;
        var selectedId = (char.class.levelChoices || {})[choice.key] || null;
        DS.Components.ChoiceGrid.render(el, {
          items: choice.options,
          selectedId: selectedId,
          onSelect: function(id) {
            DS.State.update('class.levelChoices.' + choice.key, id);
            rerender();
          },
          renderItem: function(item) {
            return '<div class="card-title">' + DS.Renderer.esc(item.name) + '</div>' +
              '<div class="card-desc">' + DS.Renderer.esc(item.description) + '</div>';
          }
        });
      });
    }
  }

  function renderFeatureCard(f) {
    var tag = f.tag ? '<span class="feature-tag">' + DS.Renderer.esc(f.tag) + '</span>' : '';
    return '<div class="feature-card">' +
      '<div class="feature-card-header">' +
        '<span class="feature-card-name">' + DS.Renderer.esc(f.name) + '</span>' + tag +
      '</div>' +
      '<p class="feature-card-desc">' + DS.Renderer.esc(f.description) + '</p>' +
      '</div>';
  }

  render.validate = function(cls, char) {
    var cf = cls.classFeatures;
    if (!cf || !cf.choices) return true;
    for (var i = 0; i < cf.choices.length; i++) {
      var choice = cf.choices[i];
      if (!(char.class.levelChoices || {})[choice.key]) return false;
    }
    return true;
  };

  DS.ClassSections.register('class-features', render);
})();
