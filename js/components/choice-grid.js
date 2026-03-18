// DS.Components.ChoiceGrid - Generic pick-one or pick-many grid
DS.Components = DS.Components || {};

DS.Components.ChoiceGrid = (function() {

  // options: { items, selectedId (or selectedIds for multi), onSelect, renderItem, multi }
  function render(container, options) {
    var items = options.items || [];
    var selectedId = options.selectedId;
    var selectedIds = options.selectedIds || (selectedId ? [selectedId] : []);
    var onSelect = options.onSelect || function() {};
    var renderItem = options.renderItem;
    var multi = options.multi || false;

    var grid = document.createElement('div');
    grid.className = 'selection-grid';

    items.forEach(function(item) {
      var isSelected = selectedIds.indexOf(item.id) >= 0;
      var card = document.createElement('div');
      card.className = 'card' + (isSelected ? ' selected' : '');

      if (renderItem) {
        card.innerHTML = renderItem(item);
      } else {
        card.innerHTML = '<div class="card-title">' + DS.Renderer.esc(item.name) + '</div>' +
          (item.description ? '<div class="card-desc">' + DS.Renderer.esc(item.description) + '</div>' : '');
      }

      card.addEventListener('click', function() {
        if (multi) {
          var newIds;
          if (isSelected) {
            newIds = selectedIds.filter(function(id) { return id !== item.id; });
          } else {
            newIds = selectedIds.concat([item.id]);
          }
          onSelect(newIds);
        } else {
          onSelect(item.id);
        }
      });

      grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
  }

  // Render a set of pill choices
  function renderPills(container, options) {
    var items = options.items || [];
    var selected = options.selected;
    var onSelect = options.onSelect || function() {};

    var html = '<div class="choice-pills">';
    items.forEach(function(item) {
      var id = typeof item === 'string' ? item : item.id;
      var label = typeof item === 'string' ? item : item.name;
      var isSelected = id === selected;
      html += '<button class="choice-pill' + (isSelected ? ' selected' : '') + '" data-id="' + DS.Renderer.esc(id) + '">' +
        DS.Renderer.esc(label) + '</button>';
    });
    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.choice-pill').forEach(function(btn) {
      btn.addEventListener('click', function() {
        onSelect(btn.dataset.id);
      });
    });
  }

  return { render: render, renderPills: renderPills };
})();
