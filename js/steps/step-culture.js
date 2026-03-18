// DS.Steps.Culture - Step 2: Choose culture (environment, organization, upbringing)
DS.Steps = DS.Steps || {};
DS.Steps.Culture = (function() {

  // Descriptions from docs/culture.md
  var DESC = {
    environment: {
      _category: 'Your culture\'s environment describes where the people of that culture spend most of their time.',
      nomadic: 'A nomadic culture travels from place to place to survive. Members might follow animal migrations or the weather, travel to sell their wares or services, or simply enjoy a restless lifestyle full of new experiences and peoples.',
      rural: 'A rural culture is located in a town, village, or smaller settled enclave. People dwelling in such places often cultivate the land, trade goods or services with travelers passing through, harvest fish from the sea, or mine metals and gems from the earth.',
      secluded: 'A secluded culture is based in one relatively close-quarters structure and interacts with other cultures only rarely. Such places are often monasteries, castles, or prisons. Folk typically learn to get along and spend much time in study or introspection.',
      urban: 'An urban culture is always centered in a city. The people of urban cultures often learn to effectively misdirect others in order to navigate the crowds and political machinations that can come with city life.',
      wilderness: 'A wilderness culture doesn\'t try to tame the terrain in which its people live. Instead, the folk of such a culture thrive amid nature, taking their sustenance and shelter from the land.'
    },
    organization: {
      _category: 'Your culture\'s organization determines the functioning and leadership of your community.',
      bureaucratic: 'Bureaucratic cultures are steeped in official leadership and formally recorded laws. Members are often ranked in power according to those laws. Those who thrive in such cultures know how to use rules to their advantage, bending or reinterpreting policy to advance their interests.',
      communal: 'A communal culture is a place where all members are considered equal. The community works together to make important decisions. Individuals share the burdens of governing, physical labor, childcare, and other duties.'
    },
    upbringing: {
      _category: 'Your upbringing is a more specific and personal part of your hero\'s story, describing how you were raised within your culture.',
      academic: 'Your hero was raised by people who collect, study, and share books and other records. People in an academic culture learn how to wield the power that is knowledge.',
      creative: 'Your hero was raised among folk who create art or other works valuable enough to trade, from fine art such as dance and music to practical wares such as wagons, weapons, and tools.',
      labor: 'Your hero came of age in a culture where people labored for a living \u2014 cultivating crops, harvesting resources, hunting, trapping, logging, mining, or manual labor tied to settlement and trade.',
      lawless: 'Your hero grew up among folk who performed activities that others considered unlawful. A band of pirates, a guild of assassins, or an organization of spies. People brought up in a lawless culture are good at breaking the rules without getting caught.',
      martial: 'Your hero was raised by warriors \u2014 soldiers of an established army, a band of mercenaries, a guild of monster-slaying adventurers, or any other folk whose lives revolve around combat.',
      noble: 'Your hero grew up among leaders who rule over others and play the games of politics to maintain power. Heroes with this background understand why whispered words in the right ear can be more powerful than any army.'
    }
  };

  function clearAspectSkill(aspect, newId, items) {
    var skills = JSON.parse(JSON.stringify(DS.State.getRef().culture.skills || {}));
    var oldSkill = skills[aspect];
    if (!oldSkill) return;
    var item = items.find(function(i) { return i.id === newId; });
    if (item) {
      var available = getSkillsForAspect(item);
      if (available.indexOf(oldSkill) === -1) {
        skills[aspect] = null;
        DS.State.update('culture.skills', skills);
      }
    }
  }

  function render(container) {
    var char = DS.State.getRef();
    var cultures = DS.Data.Cultures;

    var html = '<h2 class="step-title">Define Your Culture</h2>' +
      '<p class="step-subtitle">A hero\'s culture describes the beliefs, customs, values, and way of life held by the community in which they were raised. A culture has four aspects: language, environment, organization, and upbringing.</p>';

    // Environment
    html += '<div class="subsection"><div class="subsection-title">Environment</div>' +
      '<p class="text-sm text-dim mb-1">' + DESC.environment._category + '</p>' +
      '<div id="culture-env"></div></div>';

    // Organization
    html += '<div class="subsection"><div class="subsection-title">Organization</div>' +
      '<p class="text-sm text-dim mb-1">' + DESC.organization._category + '</p>' +
      '<div id="culture-org"></div></div>';

    // Upbringing
    html += '<div class="subsection"><div class="subsection-title">Upbringing</div>' +
      '<p class="text-sm text-dim mb-1">' + DESC.upbringing._category + '</p>' +
      '<div id="culture-upbringing"></div></div>';

    // Language
    html += '<div class="subsection"><div class="subsection-title">Culture Language</div>' +
      '<p class="text-sm text-dim mb-1">Choose one language your culture speaks (in addition to Caelian).</p>' +
      '<div id="culture-language"></div></div>';

    container.innerHTML = html;

    // Render environment pills
    DS.Components.ChoiceGrid.renderPills(document.getElementById('culture-env'), {
      items: cultures.environments,
      selected: char.culture.environment,
      onSelect: function(id) {
        DS.State.update('culture.environment', id);
        clearAspectSkill('environment', id, cultures.environments);
        render(container);
        if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
      }
    });

    // Render organization pills
    DS.Components.ChoiceGrid.renderPills(document.getElementById('culture-org'), {
      items: cultures.organizations,
      selected: char.culture.organization,
      onSelect: function(id) {
        DS.State.update('culture.organization', id);
        clearAspectSkill('organization', id, cultures.organizations);
        render(container);
        if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
      }
    });

    // Render upbringing pills
    DS.Components.ChoiceGrid.renderPills(document.getElementById('culture-upbringing'), {
      items: cultures.upbringings,
      selected: char.culture.upbringing,
      onSelect: function(id) {
        DS.State.update('culture.upbringing', id);
        clearAspectSkill('upbringing', id, cultures.upbringings);
        render(container);
        if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
      }
    });

    // Render language selection
    DS.Components.ChoiceGrid.renderPills(document.getElementById('culture-language'), {
      items: DS.Data.Languages.filter(function(l) { return l !== 'Caelian'; }),
      selected: char.culture.language,
      onSelect: function(id) {
        DS.State.update('culture.language', id);
        render(container);
        if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
      }
    });

    // Populate sidebar
    showCultureSidebar(char);
  }

  function showCultureSidebar(char) {
    var sidebarEl = document.getElementById('sidebar-content');
    if (!sidebarEl) return;

    var cultures = DS.Data.Cultures;
    var html = '<h4>Culture Details</h4>';

    // Environment section
    html += renderAspectSidebar('Environment', 'environment', char.culture.environment, cultures.environments, char);

    // Organization section
    html += renderAspectSidebar('Organization', 'organization', char.culture.organization, cultures.organizations, char);

    // Upbringing section
    html += renderAspectSidebar('Upbringing', 'upbringing', char.culture.upbringing, cultures.upbringings, char);

    sidebarEl.innerHTML = html;

    // Wire dropdown changes
    sidebarEl.querySelectorAll('.culture-skill-select').forEach(function(sel) {
      sel.addEventListener('change', function() {
        var aspect = sel.dataset.aspect;
        var skills = JSON.parse(JSON.stringify(DS.State.getRef().culture.skills || {}));
        skills[aspect] = sel.value || null;
        DS.State.update('culture.skills', skills);
        if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
        // Re-render sidebar to reflect change
        showCultureSidebar(DS.State.getRef());
      });
    });
  }

  function renderAspectSidebar(label, aspect, selectedId, items, char) {
    var html = '<div class="sidebar-section">';
    html += '<div class="sidebar-label">' + label + '</div>';

    if (!selectedId) {
      html += '<p class="text-dim text-sm" style="font-style:italic">Not selected</p>';
      html += '</div>';
      return html;
    }

    var item = items.find(function(i) { return i.id === selectedId; });
    if (!item) { html += '</div>'; return html; }

    // Item name + description
    html += '<div class="sidebar-value" style="font-weight:600;margin-bottom:0.25rem">' + DS.Renderer.esc(item.name) + '</div>';
    var desc = DESC[aspect] && DESC[aspect][selectedId];
    if (desc) {
      html += '<p class="text-sm text-dim" style="margin:0 0 0.5rem 0">' + DS.Renderer.esc(desc) + '</p>';
    }

    // Skill dropdown
    var skills = getSkillsForAspect(item);
    var currentSkill = (char.culture.skills || {})[aspect] || '';
    html += '<div class="sidebar-label" style="margin-top:0.25rem">Skill</div>';
    html += '<select class="culture-skill-select" data-aspect="' + aspect + '">';
    html += '<option value=""' + (!currentSkill ? ' selected' : '') + '>Choose a skill\u2026</option>';
    skills.forEach(function(s) {
      html += '<option value="' + DS.Renderer.esc(s) + '"' + (s === currentSkill ? ' selected' : '') + '>' + DS.Renderer.esc(s) + '</option>';
    });
    html += '</select>';

    html += '</div>';
    return html;
  }

  function getSkillsForAspect(aspect) {
    var skills = [];
    if (aspect.specificSkills) {
      aspect.specificSkills.forEach(function(s) {
        if (skills.indexOf(s) === -1) skills.push(s);
      });
    }
    (aspect.skillGroups || []).forEach(function(g) {
      if (DS.Data.Skills[g]) {
        DS.Data.Skills[g].forEach(function(s) {
          if (skills.indexOf(s) === -1) skills.push(s);
        });
      }
    });
    return skills.sort();
  }

  function validate() {
    var char = DS.State.getRef();
    if (!char.culture.environment) return false;
    if (!char.culture.organization) return false;
    if (!char.culture.upbringing) return false;
    var skills = char.culture.skills || {};
    if (!skills.environment) return false;
    if (!skills.organization) return false;
    if (!skills.upbringing) return false;
    if (!char.culture.language) return false;
    return true;
  }

  return { render: render, validate: validate };
})();
