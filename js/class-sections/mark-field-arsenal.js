// Tactician-only: Mark mechanic + Field Arsenal description (kit selection moved to Kit step)
(function() {
  function render(container, cls, char, config, rerender) {
    var markDesc = cls.features && cls.features['Mark'];
    var arsenalDesc = cls.features && cls.features['Field Arsenal'];

    var html = '';

    // Mark section
    html += '<div class="subsection"><div class="subsection-title">Mark</div>';
    if (markDesc) {
      html += '<p class="text-sm" style="line-height:1.5">' + DS.Renderer.esc(markDesc) + '</p>';
    } else {
      html += '<p class="text-sm text-dim">You can mark creatures as a maneuver. You and allies gain bonuses against marked targets.</p>';
    }
    html += '</div>';

    // Field Arsenal info (selection happens in Kit step)
    html += '<div class="subsection"><div class="subsection-title">Field Arsenal</div>';
    if (arsenalDesc) {
      html += '<p class="text-sm" style="line-height:1.5">' + DS.Renderer.esc(arsenalDesc) + '</p>';
    } else {
      html += '<p class="text-sm text-dim">You can use and gain the benefits of two kits, including both their signature abilities. Choose your two kits in the Kit step.</p>';
    }
    html += '</div>';

    container.innerHTML = html;
  }

  DS.ClassSections.register('mark-field-arsenal', render);
})();
