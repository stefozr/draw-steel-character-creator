// Censor-only: Order selector + Censure info
(function() {
  function render(container, cls, char, config, rerender) {
    if (!cls.subclasses || !cls.subclasses.length) return;

    var current = char.class.subclass ? 1 : 0;
    var progress = DS.ClassSections.progressLabel(current, 1);

    var html = '<div class="subsection"><div class="subsection-title">' +
      DS.Renderer.esc(cls.subclassLabel || 'Censor Order') + ' ' + progress + '</div>' +
      '<p class="text-sm text-dim mb-1">Choose your censor order.</p>' +
      '<div class="js-censor-order"></div></div>';

    container.innerHTML = html;

    DS.Components.ChoiceGrid.render(container.querySelector('.js-censor-order'), {
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

    // Censure section
    if (char.class.subclass) {
      var judgmentDesc = cls.features && cls.features['Censure'];
      var judgmentHTML = '<div class="subsection"><div class="subsection-title">Censure</div>';
      if (judgmentDesc) {
        judgmentHTML += '<p class="text-sm" style="line-height:1.5">' + DS.Renderer.esc(judgmentDesc) + '</p>';
      } else {
        judgmentHTML += '<p class="text-sm text-dim">Your censure ability lets you mark enemies and spend wrath on triggered effects.</p>';
      }
      judgmentHTML += '</div>';

      var wrapper = document.createElement('div');
      wrapper.innerHTML = judgmentHTML;
      container.appendChild(wrapper.firstChild);
    }
  }

  render.validate = function(cls, char) {
    return !!char.class.subclass;
  };

  DS.ClassSections.register('order-domain', render);
})();
