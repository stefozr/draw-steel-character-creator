// DS.Player - Player identity management
DS.Player = (function() {
  var STORAGE_KEY = 'drawsteel_player_name';

  function getName() {
    return localStorage.getItem(STORAGE_KEY) || '';
  }

  function setName(name) {
    localStorage.setItem(STORAGE_KEY, name.trim());
  }

  function isOwner(char) {
    return char.playerName === getName();
  }

  function ensureName(callback) {
    var existing = getName();
    if (existing) {
      callback(existing);
      return;
    }

    // Build a modal with text input
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML =
      '<h3>Welcome to Draw Steel!</h3>' +
      '<p style="color:var(--color-text);margin-bottom:0.5rem;">Enter your player name so friends can see whose characters are whose.</p>' +
      '<input type="text" id="player-name-input" class="input" placeholder="Your name" style="width:100%;margin-bottom:1rem;padding:0.5rem;font-size:1rem;border:1px solid var(--color-border);border-radius:var(--radius);background:var(--color-surface);color:var(--color-text);" autofocus>' +
      '<div class="modal-actions"></div>';

    var actions = modal.querySelector('.modal-actions');
    var confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-primary';
    confirmBtn.textContent = 'Continue';
    confirmBtn.addEventListener('click', function() {
      var input = document.getElementById('player-name-input');
      var val = (input.value || '').trim();
      if (!val) {
        input.style.borderColor = 'var(--color-danger)';
        input.focus();
        return;
      }
      setName(val);
      overlay.remove();
      callback(val);
    });
    actions.appendChild(confirmBtn);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Allow Enter key to submit
    var input = modal.querySelector('#player-name-input');
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') confirmBtn.click();
    });
    setTimeout(function() { input.focus(); }, 50);
  }

  return {
    getName: getName,
    setName: setName,
    isOwner: isOwner,
    ensureName: ensureName
  };
})();
