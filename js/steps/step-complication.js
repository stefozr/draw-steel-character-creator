// DS.Steps.Complication - Step 6: Optional complication
DS.Steps = DS.Steps || {};
DS.Steps.Complication = (function() {

  function render(container) {
    var char = DS.State.getRef();
    var complications = DS.Data.Complications;
    var selectedId = char.complication.id;

    var html = '<div class="complication-header-sticky">' +
      '<h2 class="step-title">Choose a Complication</h2>' +
      '<p class="step-subtitle">Complications are optional. They add depth to your backstory with both a benefit and a drawback.</p>' +
      '<div class="mb-2">' +
        '<button class="btn btn-secondary' + (!selectedId ? ' btn-active' : '') + '" id="btn-no-complication">No Complication</button>' +
        '<button class="btn btn-secondary" id="btn-random-complication" style="margin-left:0.5rem">Random (d100)</button>' +
      '</div>' +
      '<div id="complication-search" class="form-group" style="margin-bottom:0">' +
        '<input type="text" id="complication-filter" placeholder="Search complications...">' +
      '</div>' +
      '</div>' +
      '<div id="complication-list"></div>';

    container.innerHTML = html;

    document.getElementById('btn-no-complication').addEventListener('click', function() {
      DS.State.update('complication.id', null);
      render(container);
    });

    document.getElementById('btn-random-complication').addEventListener('click', function() {
      var roll = Math.floor(Math.random() * 100) + 1;
      var comp = complications.find(function(c) { return c.id === roll; });
      if (comp) {
        DS.State.update('complication.id', comp.id);
        render(container);
        var selected = document.querySelector('#complication-list .trait-item.selected');
        if (selected) selected.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    var filterInput = document.getElementById('complication-filter');
    filterInput.addEventListener('input', function() {
      renderList(complications, filterInput.value, selectedId, container);
    });

    renderList(complications, '', selectedId, container);

    if (selectedId) {
      var comp = complications.find(function(c) { return c.id === selectedId; });
      if (comp && DS.Sidebar) DS.Sidebar.showComplication(comp);
    } else {
      if (DS.Sidebar) DS.Sidebar.clear();
    }
  }

  function renderList(complications, filter, selectedId, parentContainer) {
    var el = document.getElementById('complication-list');
    var filtered = complications;
    if (filter) {
      var f = filter.toLowerCase();
      filtered = complications.filter(function(c) { return c.name.toLowerCase().indexOf(f) >= 0; });
    }

    var html = '';
    filtered.forEach(function(c) {
      var sel = c.id === selectedId;
      html += '<div class="trait-item' + (sel ? ' selected' : '') + '" data-cid="' + c.id + '" style="cursor:pointer">' +
        '<div class="trait-cost">' + c.id + '</div>' +
        '<div class="trait-info"><div class="trait-name">' + DS.Renderer.esc(c.name) + '</div></div>' +
      '</div>';
    });
    el.innerHTML = html;

    el.querySelectorAll('.trait-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var cid = parseInt(item.dataset.cid);
        DS.State.update('complication.id', cid);
        var comp = complications.find(function(c) { return c.id === cid; });
        if (comp && DS.Sidebar) DS.Sidebar.showComplication(comp);
        render(parentContainer);
      });
    });
  }

  function validate() {
    return true; // Complications are optional
  }

  return { render: render, validate: validate };
})();
