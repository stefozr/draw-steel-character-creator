// Elementalist-only: Persistent magic indicator
(function() {
  function render(container, cls, char, config, rerender) {
    var persistentDesc = cls.features && cls.features['Persistent Magic'];

    var html = '<div class="subsection"><div class="subsection-title">Persistent Magic</div>';

    if (persistentDesc) {
      html += '<p class="text-sm" style="line-height:1.5">' + DS.Renderer.esc(persistentDesc) + '</p>';
    } else {
      html += '<p class="text-sm text-dim">Some of your abilities create persistent areas that remain on the battlefield. ' +
        'While you maintain a persistent effect, your essence generation is reduced. ' +
        'You gain 1 essence each time you damage an enemy with a persistent area ability.</p>';
    }

    html += '<div class="persistent-badge" style="margin-top:0.5rem">' +
      '<span class="keyword-tag" style="background:var(--color-primary);color:#1a1a1a">Persistent</span> ' +
      '<span class="text-sm text-dim">Look for this tag on abilities that create lasting areas.</span>' +
      '</div></div>';

    container.innerHTML = html;
  }

  DS.ClassSections.register('persistent-magic', render);
})();
