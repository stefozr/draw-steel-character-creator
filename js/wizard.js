// DS.Wizard - Step controller (navigation, validation, cascades)
DS.Wizard = (function() {
  var STEPS = ['ancestry', 'culture', 'career', 'class', 'kit', 'complication', 'details', 'summary'];
  var currentStepIndex = 0;
  var stepModules = {};
  var completedSteps = new Set();

  function init() {
    stepModules = {
      ancestry: DS.Steps.Ancestry,
      culture: DS.Steps.Culture,
      career: DS.Steps.Career,
      'class': DS.Steps.Class,
      kit: DS.Steps.Kit,
      complication: DS.Steps.Complication,
      details: DS.Steps.Details,
      summary: DS.Steps.Summary
    };

    // Preload step background images
    ['Ancestry','Culture','Career','Class','Kit','Complication','Details','Summary'].forEach(function(name) {
      var img = new Image();
      img.src = 'resources/images/' + name + '.png';
    });
    ['Censor','Conduit','Elementalist','Fury','Null','Shadow','Tactician','Talent','Troubadour'].forEach(function(name) {
      var img = new Image();
      img.src = 'resources/images/classes/' + name + '.png';
    });

    // Wire up nav buttons
    document.getElementById('btn-prev').addEventListener('click', function() { prevStep(); });
    document.getElementById('btn-next').addEventListener('click', function() { onNextClick(); });
    document.getElementById('btn-home').addEventListener('click', function() {
      DS.Storage.autosave();
      DS.App.showHome();
    });

    // Wire up progress step clicks
    var progressBtns = document.querySelectorAll('.progress-step');
    progressBtns.forEach(function(btn, i) {
      btn.addEventListener('click', function() {
        if (canGoToStep(i)) goToStep(i);
      });
    });
  }

  function start() {
    currentStepIndex = 0;
    completedSteps.clear();
    renderCurrentStep();
    updateNav();
  }

  function resume(char) {
    // Figure out which step to resume at based on filled data
    currentStepIndex = 0;
    completedSteps.clear();
    if (char.ancestry.id) { completedSteps.add('ancestry'); currentStepIndex = 1; }
    if (char.culture.environment) { completedSteps.add('culture'); currentStepIndex = 2; }
    if (char.career.id) { completedSteps.add('career'); currentStepIndex = 3; }
    if (char.class.id) { completedSteps.add('class'); currentStepIndex = 4; }
    if (char.kit.id) { completedSteps.add('kit'); currentStepIndex = 5; }
    completedSteps.add('complication'); // complication is optional
    if (char.details && char.details.heroName) { completedSteps.add('details'); }
    if (currentStepIndex >= 5) currentStepIndex = 7; // go to summary if mostly complete
    renderCurrentStep();
    updateNav();
  }

  function renderCurrentStep() {
    // Hide all step containers
    document.querySelectorAll('.step-container').forEach(function(el) {
      el.classList.remove('active');
    });

    var stepName = STEPS[currentStepIndex];
    var container = document.getElementById('step-' + stepName);
    container.classList.add('active');

    // Clear sidebar before rendering new step
    if (DS.Sidebar) DS.Sidebar.clear();

    // Hide sidebar on details and summary steps
    var wizardScreen = document.getElementById('wizard-screen');
    if (wizardScreen) {
      wizardScreen.classList.toggle('no-sidebar', stepName === 'details' || stepName === 'summary');
    }

    // Remove top padding on complication step for sticky header
    var wizardContent = document.querySelector('.wizard-content');
    if (wizardContent) {
      wizardContent.classList.toggle('no-pad-top', stepName === 'complication');
    }

    // Render step content
    var mod = stepModules[stepName];
    if (mod && mod.render) {
      mod.render(container);
    }

    refreshNextButton();
  }

  function onNextClick() {
    if (currentStepIndex === STEPS.length - 1) {
      // On summary, "Finish" marks done and shows character sheet
      DS.State.update('finished', true);
      DS.Storage.autosave();
      DS.App.showCharacterSheet();
      return;
    }
    nextStep();
  }

  function nextStep() {
    var stepName = STEPS[currentStepIndex];
    var mod = stepModules[stepName];

    // Validate current step (no blocking modals)
    if (mod && mod.validate && !mod.validate()) return;

    completedSteps.add(stepName);
    DS.Storage.autosave();

    if (currentStepIndex < STEPS.length - 1) {
      currentStepIndex++;
      renderCurrentStep();
      updateNav();
      window.scrollTo(0, 0);
    }
  }

  function prevStep() {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderCurrentStep();
      updateNav();
      window.scrollTo(0, 0);
    }
  }

  function goToStep(index) {
    currentStepIndex = index;
    renderCurrentStep();
    updateNav();
    window.scrollTo(0, 0);
  }

  function canGoToStep(index) {
    // Can always go back. Can go forward only if all prior steps completed.
    if (index <= currentStepIndex) return true;
    for (var i = 0; i < index; i++) {
      if (!completedSteps.has(STEPS[i]) && STEPS[i] !== 'complication') return false;
    }
    return true;
  }

  function updateNav() {
    var stepName = STEPS[currentStepIndex];
    var progressBtns = document.querySelectorAll('.progress-step');

    progressBtns.forEach(function(btn, i) {
      btn.classList.remove('active', 'completed');
      btn.disabled = !canGoToStep(i);
      if (i === currentStepIndex) btn.classList.add('active');
      else if (completedSteps.has(STEPS[i])) btn.classList.add('completed');
    });

    // Prev/Next buttons
    document.getElementById('btn-prev').style.visibility = currentStepIndex === 0 ? 'hidden' : 'visible';
    var nextBtn = document.getElementById('btn-next');
    nextBtn.textContent = currentStepIndex === STEPS.length - 1 ? 'Finish' : 'Next';

    refreshNextButton();
  }

  function refreshNextButton() {
    var stepName = STEPS[currentStepIndex];
    var mod = stepModules[stepName];
    var nextBtn = document.getElementById('btn-next');
    if (!nextBtn) return;
    var valid = !mod || !mod.validate || mod.validate();
    nextBtn.disabled = !valid;
  }

  function markCompleted(stepName) {
    completedSteps.add(stepName);
    updateNav();
  }

  function cascadeReset(fromStep) {
    var idx = STEPS.indexOf(fromStep);
    for (var i = idx + 1; i < STEPS.length; i++) {
      completedSteps.delete(STEPS[i]);
    }
    // Reset downstream data based on what changed
    var char = DS.State.getRef();
    if (fromStep === 'ancestry') {
      char.ancestry.purchasedTraits = [];
      char.ancestry.specialChoices = {};
    }
    if (fromStep === 'class' || fromStep === 'ancestry') {
      // Kit may need re-validation
    }
    updateNav();
  }

  return {
    init: init,
    start: start,
    resume: resume,
    goToStep: goToStep,
    markCompleted: markCompleted,
    cascadeReset: cascadeReset,
    refreshNextButton: refreshNextButton,
    STEPS: STEPS
  };
})();
