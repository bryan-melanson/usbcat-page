// Lucky USB Cat — interactive demo
// Simulates plug-in waving and eye-glow effects on the hero cat

(function () {
  const arm      = document.getElementById('wave-arm');
  const eyeLeft  = document.getElementById('eye-left');
  const eyeRight = document.getElementById('eye-right');

  let waveTimer   = null;
  let glowTimer   = null;
  let isPlugged   = false;

  function startWave() {
    arm.classList.add('waving');
  }

  function stopWave() {
    arm.classList.remove('waving');
  }

  function startGlow() {
    eyeLeft.classList.add('glow');
    eyeRight.classList.add('glow');
  }

  function stopGlow() {
    eyeLeft.classList.remove('glow');
    eyeRight.classList.remove('glow');
  }

  // Simulate a plug-in cycle: wave for a bit, then idle, then glow (data transfer)
  function runCycle() {
    // Phase 1: plug in → wave starts
    startWave();
    isPlugged = true;

    // Phase 2: after 3 s, data transfer begins → eyes glow
    glowTimer = setTimeout(startGlow, 3000);

    // Phase 3: transfer ends → eyes stop
    setTimeout(stopGlow, 6000);

    // Phase 4: unplug → wave stops
    setTimeout(function () {
      stopWave();
      isPlugged = false;

      // Wait 2 s then repeat
      setTimeout(runCycle, 2000);
    }, 7500);
  }

  // Kick off the animation loop
  runCycle();
})();
