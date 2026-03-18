// Conduit-only: Dual domain picker
(function() {
  function render(container, cls, char, config, rerender) {
    if (!cls.subclasses || !cls.subclasses.length) return;

    var domains = char.class.levelChoices.domains || [];
    var progress = DS.ClassSections.progressLabel(domains.length, 2);

    var html = '<div class="subsection"><div class="subsection-title">Divine Domains ' + progress + '</div>' +
      '<p class="text-sm text-dim mb-1">Choose two domains from your deity. Each grants a piety trigger, prayer effect, and domain feature.</p>' +
      '<div class="js-dual-domain"></div></div>';

    if (domains.length === 2) {
      html += '<div class="domain-pair">';
      domains.forEach(function(domainId) {
        var domain = cls.subclasses.find(function(s) { return s.id === domainId; });
        if (domain) {
          html += '<div class="domain-card"><div class="card-title">' + DS.Renderer.esc(domain.name) + '</div>' +
            '<div class="card-desc">' + DS.Renderer.esc(domain.description) + '</div></div>';
        }
      });
      html += '</div>';

      html += '<div class="prayer-reference"><div class="subsection-title" style="font-size:0.85rem">Prayer Mechanic</div>' +
        '<p class="text-sm text-dim">When you gain piety at the start of your turn, you can pray (no action): ' +
        '<strong>1</strong> = +1 piety but take psychic damage, ' +
        '<strong>2</strong> = +1 piety, ' +
        '<strong>3</strong> = +2 piety + activate a domain effect.</p></div>';
    }

    container.innerHTML = html;

    DS.Components.ChoiceGrid.render(container.querySelector('.js-dual-domain'), {
      items: cls.subclasses,
      selectedIds: domains,
      multi: true,
      onSelect: function(ids) {
        if (ids.length <= 2) {
          DS.State.update('class.levelChoices.domains', ids);
          if (ids.length > 0) {
            DS.State.update('class.subclass', ids[0]);
          }
          rerender();
        }
      },
      renderItem: function(item) {
        return '<div class="card-title">' + DS.Renderer.esc(item.name) + '</div>' +
          '<div class="card-desc">' + DS.Renderer.esc(item.description) + '</div>';
      }
    });
  }

  render.validate = function(cls, char) {
    var domains = char.class.levelChoices.domains || [];
    return domains.length === 2;
  };

  DS.ClassSections.register('dual-domain', render);
})();
