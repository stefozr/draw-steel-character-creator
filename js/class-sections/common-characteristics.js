// Common characteristic array selection section
(function() {
  function render(container, cls, char, config, rerender) {
    if (!cls.characteristicArrays) return;
    var current = char.class.characteristicArray ? 1 : 0;
    var progress = DS.ClassSections.progressLabel(current, 1);
    var html = '<div class="subsection"><div class="subsection-title">Characteristic Scores ' + progress + '</div>' +
      '<p class="text-sm text-dim mb-1">Choose your starting characteristic array.</p>' +
      '<div class="js-chars-grid"></div></div>';

    container.innerHTML = html;

    var charsEl = container.querySelector('.js-chars-grid');
    var charsHTML = '<div class="selection-grid">';
    cls.characteristicArrays.forEach(function(arr) {
      var selected = char.class.characteristicArray === arr.id;
      charsHTML += '<div class="card' + (selected ? ' selected' : '') + '" data-arr="' + arr.id + '">' +
        '<div class="card-title">' + DS.Renderer.esc(arr.label) + '</div>' +
        DS.Renderer.renderStatBlock(arr) +
        '</div>';
    });
    charsHTML += '</div>';
    charsEl.innerHTML = charsHTML;

    charsEl.querySelectorAll('.card').forEach(function(card) {
      card.addEventListener('click', function() {
        var arrId = card.dataset.arr;
        var arr = cls.characteristicArrays.find(function(a) { return a.id === arrId; });
        DS.State.update('class.characteristicArray', arrId);
        DS.State.update('class.characteristics', {
          might: arr.might, agility: arr.agility, reason: arr.reason,
          intuition: arr.intuition, presence: arr.presence
        });
        rerender();
      });
    });
  }

  render.validate = function(cls, char) {
    return !!char.class.characteristicArray;
  };

  DS.ClassSections.register('characteristics', render);
})();
