// DS.Steps.Details - Step 7: Name, pronouns, portrait, appearance, personality, backstory
DS.Steps = DS.Steps || {};
DS.Steps.Details = (function() {

  function render(container) {
    var char = DS.State.getRef();
    var d = char.details;

    var html = '<h2 class="step-title">Character Details</h2>' +
      '<p class="step-subtitle">Give your hero a name and personality. These details bring your character to life.</p>' +

      '<div class="form-group">' +
        '<label>Hero Name</label>' +
        '<input type="text" id="detail-name" value="' + DS.Renderer.esc(d.heroName || '') + '" placeholder="What is your hero called?">' +
      '</div>' +

      // Portrait
      '<div class="form-group">' +
        '<label>Character Portrait</label>' +
        '<div class="portrait-picker" id="portrait-picker">' +
          '<div class="portrait-preview" id="portrait-preview">' +
            (d.portrait
              ? '<img src="' + DS.Renderer.esc(d.portrait) + '" alt="Portrait">'
              : '<div class="portrait-placeholder">No portrait</div>') +
          '</div>' +
          '<div class="portrait-actions">' +
            '<button class="btn btn-secondary btn-sm" id="btn-upload-portrait">Upload Image</button>' +
            (d.portrait ? '<button class="btn btn-danger btn-sm" id="btn-remove-portrait">Remove</button>' : '') +
          '</div>' +
          '<input type="file" id="portrait-file" accept="image/*" hidden>' +
        '</div>' +
      '</div>' +

      '<div class="form-group">' +
        '<label>Appearance</label>' +
        '<textarea id="detail-appearance" placeholder="What does your hero look like? Scars, tattoos, clothing, height, build...">' + DS.Renderer.esc(d.appearance || '') + '</textarea>' +
      '</div>' +

      '<div class="form-group">' +
        '<label>Personality</label>' +
        '<textarea id="detail-personality" placeholder="What is your hero like? Traits, quirks, habits, values...">' + DS.Renderer.esc(d.personality || '') + '</textarea>' +
      '</div>' +

      '<div class="form-group">' +
        '<label>Backstory</label>' +
        '<textarea id="detail-backstory" rows="5" placeholder="What brought your hero to this point? Their history, motivations, and connections...">' + DS.Renderer.esc(d.backstory || '') + '</textarea>' +
      '</div>';

    container.innerHTML = html;

    // Auto-save on input
    var fields = ['name', 'appearance', 'personality', 'backstory'];
    fields.forEach(function(field) {
      var input = document.getElementById('detail-' + field);
      if (input) {
        input.addEventListener('input', function() {
          DS.State.update('details.' + (field === 'name' ? 'heroName' : field), input.value);
          if (field === 'name' && DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
        });
      }
    });

    // Portrait upload
    var fileInput = document.getElementById('portrait-file');
    document.getElementById('btn-upload-portrait').addEventListener('click', function() {
      fileInput.click();
    });
    fileInput.addEventListener('change', function() {
      var file = fileInput.files[0];
      if (!file) return;
      // Limit to 500KB to keep localStorage manageable
      if (file.size > 512000) {
        DS.Renderer.showModal({ title: 'Image Too Large', message: 'Please choose an image under 500 KB.' });
        fileInput.value = '';
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        // Resize to a reasonable portrait size
        resizeImage(e.target.result, 256, 256, function(dataUrl) {
          DS.State.update('details.portrait', dataUrl);
          render(container);
        });
      };
      reader.readAsDataURL(file);
    });

    // Portrait remove
    var removeBtn = document.getElementById('btn-remove-portrait');
    if (removeBtn) {
      removeBtn.addEventListener('click', function() {
        DS.State.update('details.portrait', '');
        render(container);
      });
    }
  }

  function resizeImage(dataUrl, maxW, maxH, callback) {
    var img = new Image();
    img.onload = function() {
      var w = img.width;
      var h = img.height;
      // Scale to fit within maxW x maxH, keeping aspect ratio
      if (w > maxW || h > maxH) {
        var ratio = Math.min(maxW / w, maxH / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }
      var canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = dataUrl;
  }

  function validate() {
    var char = DS.State.getRef();
    if (!char.details.heroName || !char.details.heroName.trim()) {
      return false;
    }
    return true;
  }

  return { render: render, validate: validate };
})();
