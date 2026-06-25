
/* ============================
   HERO CANVAS ANIMATION — COLOR DOT VERSION
   ============================ */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const DOT_SPACING      = 20;
  const INFLUENCE_RADIUS = 200;
  const MAX_DISPLACEMENT = 55;

  const orbs = [
    { x: 1400, y: 120,  vx: -1.0, vy: 0,    r: 8, color: '#5757f8', rgb: [87,  87,  248] },
    { x: 200,  y: 200,  vx:  1.1, vy: 0,    r: 8, color: '#3535d4', rgb: [53,  53,  212] },
    { x: 900,  y: 60,   vx:  0,   vy: 0.85, r: 8, color: '#a080fc', rgb: [160, 128, 252] },
    { x: 1100, y: 300,  vx: -1.2, vy: 0,    r: 8, color: '#5799f8', rgb: [87,  153, 248] },
    { x: 350,  y: 350,  vx:  1.3, vy: 0,    r: 8, color: '#7b7bfa', rgb: [123, 123, 250] },
  ];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function update() {
    orbs.forEach(o => {
      o.x += o.vx;
      o.y += o.vy;
      if (o.x < -40)                       o.x = canvas.width + 40;
      if (o.x > canvas.width + 40)          o.x = -40;
      if (o.y < -40)                       { o.y = -40;                        o.vy =  Math.abs(o.vy); }
      if (o.y > canvas.height * 0.5 + 52)  { o.y = canvas.height * 0.5 + 52;  o.vy = -Math.abs(o.vy); }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cols = Math.ceil(canvas.width  / DOT_SPACING) + 2;
    const rows = Math.ceil(canvas.height / DOT_SPACING) + 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx = c * DOT_SPACING;
        const by = r * DOT_SPACING;
        // find dominant orb only — no accumulation to keep overlap clean
        let bestFactor = 0;
        let bestRgb = null;
        let dx = 0, dy = 0;

        orbs.forEach(o => {
          const ex = bx - o.x;
          const ey = by - o.y;
          const dist = Math.sqrt(ex * ex + ey * ey);
          if (dist < INFLUENCE_RADIUS && dist > 0) {
            const factor = 1 - dist / INFLUENCE_RADIUS;
            if (factor > bestFactor) {
              bestFactor = factor;
              bestRgb = o.rgb;
              // displacement from dominant orb only
              dx = (ex / dist) * factor * MAX_DISPLACEMENT;
              dy = (ey / dist) * factor * MAX_DISPLACEMENT;
            }
          }
        });

        let cr, cg, cb, alpha, radius;
        if (bestFactor > 0) {
          cr = Math.round(bestRgb[0] * bestFactor + 160 * (1 - bestFactor));
          cg = Math.round(bestRgb[1] * bestFactor + 160 * (1 - bestFactor));
          cb = Math.round(bestRgb[2] * bestFactor + 160 * (1 - bestFactor));
          alpha  = 0.15 + bestFactor * 0.55;
          radius = 1.2 + bestFactor * 0.5;
        } else {
          cr = 160; cg = 160; cb = 160;
          alpha  = 0.18;
          radius = 1.2;
        }

        ctx.beginPath();
        ctx.arc(bx + dx, by + dy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();
      }
    }

    // bottom white block
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, canvas.height * 0.5 + 52, canvas.width, canvas.height);

    // draw orbs
    orbs.forEach(o => {
      const glow = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 2);
      glow.addColorStop(0,   o.color + '40');
      glow.addColorStop(1,   o.color + '00');
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 2, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = o.color;
      ctx.fill();
    });
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  loop();
})();

