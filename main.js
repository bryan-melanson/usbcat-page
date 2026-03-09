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

// Colour variant selectors
(function () {
  var cat        = document.getElementById('cat');
  var stripeBtn  = document.querySelector('stripe-buy-button');

  var selected = { body: 'white', led: 'yellow' };

  var bodyColors = {
    white:  { body: '#f5f5f0' },
    gold:   { body: '#f9a825' }
  };

  var ledColors = {
    white:  { color: '#ffffff', lt: 'rgba(255,255,255,.7)' },
    red:    { color: '#d63031', lt: '#ff8a80' },
    yellow: { color: '#f9a825', lt: '#fff176' }
  };

  function applyBody(value) {
    cat.style.setProperty('--cat-body', bodyColors[value].body);
  }

  function applyLed(value) {
    cat.style.setProperty('--led-color',    ledColors[value].color);
    cat.style.setProperty('--led-color-lt', ledColors[value].lt);
  }

  function updateStripeReference() {
    if (stripeBtn) {
      stripeBtn.setAttribute('client-reference-id', 'body-' + selected.body + '_led-' + selected.led);
    }
  }

  // Set initial reference
  updateStripeReference();

  document.querySelectorAll('.variant-select').forEach(function (sel) {
    sel.addEventListener('change', function () {
      var type  = sel.dataset.type;
      var value = sel.value;

      selected[type] = value;

      if (type === 'body') applyBody(value);
      if (type === 'led')  applyLed(value);

      updateStripeReference();
    });
  });
})();

// Location-based pricing
(function () {
  fetch('https://ipapi.co/json/')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.country_code === 'CA') {
        var priceEl = document.getElementById('price-display');
        if (priceEl) {
          priceEl.innerHTML = '$34<sup>.99</sup> <span class="price-currency">CAD</span>';
        }
      }
    })
    .catch(function () {
      // Silently fall back to default price on any network error
    });
})();
