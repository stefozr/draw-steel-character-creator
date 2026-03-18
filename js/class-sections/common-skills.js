// Common class skills section — interactive chip-dropdown skill picker
(function() {
  function render(container, cls, char, config, rerender) {
    var freeSkills = cls.freeSkills || [];
    var groups = cls.classSkillGroups || [];
    var count = cls.classSkillCount || 0;
    if (!freeSkills.length && !count) return;

    var selected = (char.class.skills || []).slice();
    while (selected.length < count) selected.push('');
    var current = selected.filter(function(s) { return s; }).length;
    var progress = count ? DS.ClassSections.progressLabel(current, count) : '';

    // Build available skills from class skill groups, excluding free skills
    var availableSkills = [];
    groups.forEach(function(groupName) {
      var groupSkills = DS.Data.Skills[groupName];
      if (groupSkills) {
        groupSkills.forEach(function(skill) {
          if (freeSkills.indexOf(skill) < 0 && availableSkills.indexOf(skill) < 0) {
            availableSkills.push(skill);
          }
        });
      }
    });
    availableSkills.sort();

    var html = '<div class="subsection"><div class="subsection-title">Class Skills ' + progress + '</div>';
    html += '<div class="choice-pills">';

    // Free skills as filled, non-interactive chips
    freeSkills.forEach(function(s) {
      html += '<span class="choice-pill selected">' + DS.Renderer.esc(s) + '</span>';
    });

    // Choosable skill slots
    for (var i = 0; i < count; i++) {
      if (selected[i]) {
        // Filled chip with clear button
        html += '<span class="choice-pill selected js-skill-filled" data-index="' + i + '">'
          + DS.Renderer.esc(selected[i])
          + ' <span class="skill-chip-clear">&times;</span></span>';
      } else {
        // Empty chip as native select
        html += '<select class="choice-pill choice-pill-empty js-skill-select" data-index="' + i + '">';
        html += '<option value="">+ Choose skill</option>';
        availableSkills.forEach(function(s) {
          var usedElsewhere = false;
          for (var j = 0; j < selected.length; j++) {
            if (selected[j] === s) { usedElsewhere = true; break; }
          }
          if (!usedElsewhere) {
            html += '<option value="' + DS.Renderer.esc(s) + '">' + DS.Renderer.esc(s) + '</option>';
          }
        });
        html += '</select>';
      }
    }

    html += '</div></div>';
    container.innerHTML = html;

    // Wire select change events
    var selects = container.querySelectorAll('.js-skill-select');
    for (var s = 0; s < selects.length; s++) {
      (function(sel) {
        sel.addEventListener('change', function() {
          var idx = parseInt(sel.dataset.index);
          var skills = (DS.State.getRef().class.skills || []).slice();
          while (skills.length < count) skills.push('');
          skills[idx] = sel.value || '';
          var cleaned = skills.filter(function(v) { return v; });
          DS.State.update('class.skills', cleaned);
          rerender();
        });
      })(selects[s]);
    }

    // Wire clear button clicks
    var clears = container.querySelectorAll('.skill-chip-clear');
    for (var c = 0; c < clears.length; c++) {
      (function(clearBtn) {
        clearBtn.addEventListener('click', function() {
          var pill = clearBtn.parentElement;
          var idx = parseInt(pill.dataset.index);
          var skills = (DS.State.getRef().class.skills || []).slice();
          while (skills.length < count) skills.push('');
          skills[idx] = '';
          var cleaned = skills.filter(function(v) { return v; });
          DS.State.update('class.skills', cleaned);
          rerender();
        });
      })(clears[c]);
    }
  }

  render.validate = function(cls, char) {
    var count = cls.classSkillCount || 0;
    if (!count) return true;
    return (char.class.skills || []).length >= count;
  };

  DS.ClassSections.register('common-skills', render);
})();
