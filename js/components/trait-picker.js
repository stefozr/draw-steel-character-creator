// DS.Components.TraitPicker - Point-buy trait selector
DS.Components = DS.Components || {};

DS.Components.TraitPicker = (function() {

  function render(container, options) {
    var traits = options.traits || [];
    var maxPoints = options.maxPoints || 3;
    var selectedTraits = options.selected || []; // array of {id, cost}
    var onChange = options.onChange || function() {};

    var spent = selectedTraits.reduce(function(sum, t) { return sum + (t.cost || 0); }, 0);
    var remaining = maxPoints - spent;

    var html = '<div class="trait-picker">' +
      '<div class="trait-picker-header">' +
        '<h3>Ancestral Traits</h3>' +
        '<span class="points-display">' + remaining + ' / ' + maxPoints + ' points</span>' +
      '</div>';

    traits.forEach(function(trait) {
      var isSelected = selectedTraits.some(function(s) { return s.id === trait.id; });
      var canAfford = remaining >= trait.cost;
      var disabled = !isSelected && !canAfford;

      html += '<div class="trait-item' + (isSelected ? ' selected' : '') + (disabled ? ' disabled' : '') + '" data-id="' + trait.id + '" data-cost="' + trait.cost + '">' +
        '<div class="trait-cost">' + trait.cost + '</div>' +
        '<div class="trait-info">' +
          '<div class="trait-name">' + DS.Renderer.esc(trait.name) + '</div>' +
          '<div class="trait-desc">' + DS.Renderer.esc(trait.description) + '</div>' +
        '</div>' +
      '</div>';
    });

    html += '</div>';
    container.innerHTML = html;

    // Wire click handlers
    container.querySelectorAll('.trait-item').forEach(function(el) {
      el.addEventListener('click', function() {
        if (el.classList.contains('disabled') && !el.classList.contains('selected')) return;
        var id = el.dataset.id;
        var cost = parseInt(el.dataset.cost);
        var newSelected;

        if (el.classList.contains('selected')) {
          newSelected = selectedTraits.filter(function(s) { return s.id !== id; });
        } else {
          newSelected = selectedTraits.concat([{ id: id, cost: cost }]);
        }
        onChange(newSelected);
      });
    });
  }

  return { render: render };
})();
