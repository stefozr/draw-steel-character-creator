// DS.Renderer - DOM rendering helpers
DS.Renderer = (function() {

  function html(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(key) {
        if (key === 'className') el.className = attrs[key];
        else if (key === 'innerHTML') el.innerHTML = attrs[key];
        else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
        else if (key === 'dataset') Object.assign(el.dataset, attrs[key]);
        else el.setAttribute(key, attrs[key]);
      });
    }
    if (typeof children === 'string') el.textContent = children;
    else if (Array.isArray(children)) children.forEach(function(c) { if (c) el.appendChild(c); });
    return el;
  }

  function renderSelectionGrid(items, options) {
    var selectedId = options.selectedId;
    var onSelect = options.onSelect;
    var renderCard = options.renderCard;

    var grid = document.createElement('div');
    grid.className = 'selection-grid';

    items.forEach(function(item) {
      var card = document.createElement('div');
      card.className = 'card' + (item.id === selectedId ? ' selected' : '');
      card.innerHTML = renderCard ? renderCard(item) : defaultCard(item);
      card.addEventListener('click', function() { onSelect(item.id); });
      grid.appendChild(card);
    });

    return grid;
  }

  function defaultCard(item) {
    return '<div class="card-title">' + esc(item.name) + '</div>' +
           (item.description ? '<div class="card-desc">' + esc(item.description) + '</div>' : '');
  }

  function renderAbilityCard(ability, options) {
    options = options || {};
    var el = document.createElement('div');
    el.className = 'ability-card' + (options.selected ? ' selected' : '') + (options.selectable ? ' cursor-pointer' : '');
    if (options.onClick) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', options.onClick);
    }

    var headerHTML = '<div class="ability-header">' +
      '<span class="ability-name">' + esc(ability.name) + '</span>' +
      (ability.cost ? '<span class="ability-cost">' + ability.cost + ' ' + (ability.resource || '') + '</span>' : '') +
      '</div>';

    var keywordsHTML = '';
    if (ability.keywords && ability.keywords.length) {
      keywordsHTML = '<div class="ability-keywords">' +
        ability.keywords.map(function(k) { return '<span class="keyword-tag">' + esc(k) + '</span>'; }).join('') +
        '</div>';
    }

    var metaHTML = '';
    var metaParts = [];
    if (ability.type) metaParts.push(ability.type);
    if (ability.distance) metaParts.push(ability.distance);
    if (ability.target) metaParts.push(ability.target);
    if (metaParts.length) {
      metaHTML = '<div class="ability-meta">' + metaParts.map(esc).join(' &middot; ') + '</div>';
    }

    var flavorText = ability.flavor || ability.flavorText || '';
    var flavorHTML = flavorText ? '<div class="ability-flavor">' + esc(flavorText) + '</div>' : '';

    var rollHTML = '';
    if (ability.powerRoll) {
      rollHTML = '<div class="power-roll">' +
        '<div class="power-roll-label">Power Roll + ' + esc(ability.powerRoll.characteristic || '') + ':</div>' +
        (ability.powerRoll.t1 ? '<div class="tier"><span class="tier-range t1">&le;11</span> ' + esc(ability.powerRoll.t1) + '</div>' : '') +
        (ability.powerRoll.t2 ? '<div class="tier"><span class="tier-range t2">12-16</span> ' + esc(ability.powerRoll.t2) + '</div>' : '') +
        (ability.powerRoll.t3 ? '<div class="tier"><span class="tier-range t3">17+</span> ' + esc(ability.powerRoll.t3) + '</div>' : '') +
        '</div>';
    }

    var effectHTML = ability.effect ? '<div class="ability-effect"><strong>Effect:</strong> ' + esc(ability.effect) + '</div>' : '';

    el.innerHTML = headerHTML + keywordsHTML + metaHTML + flavorHTML + rollHTML + effectHTML;
    return el;
  }

  function renderStatBlock(characteristics) {
    var order = ['might', 'agility', 'reason', 'intuition', 'presence'];
    var labels = { might: 'Might', agility: 'Agility', reason: 'Reason', intuition: 'Intuition', presence: 'Presence' };
    return '<div class="stat-block">' +
      order.map(function(key) {
        var val = characteristics[key] || 0;
        return '<div class="stat-item">' +
          '<div class="stat-value">' + (val >= 0 ? '+' : '') + val + '</div>' +
          '<div class="stat-label">' + labels[key] + '</div>' +
          '</div>';
      }).join('') +
      '</div>';
  }

  function esc(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Convert plain text with \n\n paragraphs and • bullets into structured HTML
  function formatText(str) {
    if (!str) return '';
    var paragraphs = str.split('\n\n');
    return paragraphs.map(function(para) {
      var lines = para.split('\n');
      var result = '';
      var inList = false;
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var trimmed = line.replace(/^\s+/, '');
        if (trimmed.charAt(0) === '•') {
          if (!inList) { result += '<ul>'; inList = true; }
          result += '<li>' + esc(trimmed.slice(1).replace(/^\s+/, '')) + '</li>';
        } else {
          if (inList) { result += '</ul>'; inList = false; }
          if (line !== '') {
            result += (result && !inList ? '<br>' : '') + esc(line);
          }
        }
      }
      if (inList) result += '</ul>';
      return '<p>' + result + '</p>';
    }).join('');
  }

  function clearAndRender(container, content) {
    if (typeof content === 'string') {
      container.innerHTML = content;
    } else {
      container.innerHTML = '';
      container.appendChild(content);
    }
  }

  // Themed modal system
  function showModal(options) {
    var title = options.title || '';
    var message = options.message || '';
    var confirmLabel = options.confirmLabel || 'OK';
    var cancelLabel = options.cancelLabel || null;
    var onConfirm = options.onConfirm || function() {};
    var onCancel = options.onCancel || function() {};
    var danger = options.danger || false;

    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML =
      (title ? '<h3>' + esc(title) + '</h3>' : '') +
      '<p style="color:var(--color-text);margin-bottom:0.5rem;">' + esc(message) + '</p>' +
      '<div class="modal-actions"></div>';

    var actions = modal.querySelector('.modal-actions');

    if (cancelLabel) {
      var cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn btn-secondary';
      cancelBtn.textContent = cancelLabel;
      cancelBtn.addEventListener('click', function() {
        overlay.remove();
        onCancel();
      });
      actions.appendChild(cancelBtn);
    }

    var confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn ' + (danger ? 'btn-danger' : 'btn-primary');
    confirmBtn.textContent = confirmLabel;
    confirmBtn.addEventListener('click', function() {
      overlay.remove();
      onConfirm();
    });
    actions.appendChild(confirmBtn);

    // Close on overlay click (outside modal)
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.remove();
        onCancel();
      }
    });

    // Close on Escape
    function onKey(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        onCancel();
        document.removeEventListener('keydown', onKey);
      }
    }
    document.addEventListener('keydown', onKey);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    confirmBtn.focus();
  }

  return {
    html: html,
    renderSelectionGrid: renderSelectionGrid,
    renderAbilityCard: renderAbilityCard,
    renderStatBlock: renderStatBlock,
    esc: esc,
    formatText: formatText,
    clearAndRender: clearAndRender,
    showModal: showModal
  };
})();
