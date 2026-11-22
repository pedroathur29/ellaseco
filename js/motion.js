/*
 * Ella's & Co. — movimento
 * Abertura, cursor com rótulo, revelações ao rolar, manifesto que desliza,
 * esteira de peças e cabeçalho que se recolhe. Tudo desligado quando o
 * sistema pede "reduzir movimento".
 */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { products } = window.ELLAS;

  /* ---------- Abertura (só na primeira visita da sessão) ---------- */
  const intro = $('.intro');
  if (root.classList.contains('intro-on')) {
    try { sessionStorage.setItem('ellas-intro', '1'); } catch (e) {}
    setTimeout(() => { intro && intro.remove(); root.classList.remove('intro-on'); root.classList.add('intro-done'); }, 2500);
  } else if (intro) {
    intro.remove();
  }

  /* ---------- Contagem dos painéis "Escolha por estilo" ---------- */
  $$('[data-count]').forEach(el => {
    const n = products.filter(p => p.category === el.dataset.count).length;
    el.textContent = n === 1 ? '1 peça' : `${n} peças`;
  });
  $$('.panel[data-filter]').forEach(a => a.addEventListener('click', () => {
    const chip = $(`[data-cat="${a.dataset.filter}"]`);
    if (chip && chip.getAttribute('aria-pressed') !== 'true') chip.click();
  }));

  /* ---------- Esteira de peças (manifesto) ---------- */
  const track = $('#marquee');
  if (track) {
    const one = products.map(p => `<a class="mq-item" href="#/peca/${p.slug}" tabindex="-1"><img src="${p.photos[0].replace(/\.(webp|png|jpg)$/i, '-sm.$1')}" alt=""><span>${p.name}</span></a>`).join('');
    // A faixa anda metade do próprio comprimento e recomeça. Para nunca aparecer
    // espaço vazio, cada metade precisa ser MAIOR que a largura da tela:
    // medimos um conjunto e repetimos quantas vezes for preciso.
    let built = 0;
    const build = () => {
      const w = innerWidth;
      if (built && Math.abs(w - built) < 40) return;
      built = w;
      track.style.animationName = 'none';
      track.innerHTML = one;
      const setW = track.scrollWidth || 1;
      const half = one.repeat(Math.max(1, Math.ceil((w + 60) / setW)));
      track.innerHTML = half + half;
      const halfW = track.scrollWidth / 2;
      track.style.animationDuration = Math.max(20, halfW / 55).toFixed(1) + 's'; // ~55 px por segundo
      track.style.animationName = ''; // volta ao nome definido no CSS e reinicia
    };
    build();
    // as fotos pequenas mudam a largura ao carregar: refaz uma vez quando terminarem
    addEventListener('load', () => { built = 0; build(); });
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 200); });
  }

  /* ---------- Menu destaca a seção que está na tela ---------- */
  const spy = ['colecao', 'baggies', 'sobre', 'instagram']
    .map(id => [$(`#${id}`), $(`.nav a[href="#${id}"]`)]).filter(([sec, a]) => sec && a);
  if (spy.length) {
    const so = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting) spy.forEach(([sec, a]) => a.classList.toggle('active', sec === en.target)); });
    }, { rootMargin: '-42% 0px -52% 0px' });
    spy.forEach(([sec]) => so.observe(sec));
    // acima da Coleção (topo, diferenciais, "Escolha por estilo") nenhum item fica destacado
    const above = new IntersectionObserver(es => {
      if (es.some(en => en.isIntersecting)) spy.forEach(([, a]) => a.classList.remove('active'));
    }, { rootMargin: '-42% 0px -52% 0px' });
    $$('.hero, .perks, .explore').forEach(el => above.observe(el));
  }

  if (reduce) return;
  root.classList.add('motion');

  /* ---------- Fotos fixas entram com fade quando terminam de carregar ---------- */
  $$('.panel img, .baggies-photo img, .feed-item img').forEach(img => {
    if (img.complete) return;
    img.classList.add('pending');
    const ok = () => { img.classList.remove('pending'); img.classList.add('ld'); };
    img.addEventListener('load', ok, { once: true });
    img.addEventListener('error', () => img.classList.remove('pending'), { once: true });
  });

  /* ---------- Ícones dos diferenciais se desenham ao aparecer ---------- */
  $$('.perk svg :is(path, circle, rect)').forEach(el => el.setAttribute('pathLength', '1'));

  /* ---------- Barra de progresso da página ---------- */
  const bar = document.createElement('div');
  bar.className = 'progress';
  bar.setAttribute('aria-hidden', 'true');
  bar.innerHTML = '<span></span>';
  document.body.appendChild(bar);
  const barFill = bar.firstChild;

  /* ---------- Revelações ao rolar ---------- */
  const groups = [
    ['.sec-head .display-2, .baggies-head .display-2, .about .display-2', 'rv-title'],
    ['.sec-note, .lead, .baggies .btn, .fine, .filters, .result-row', 'rv'],
    ['.perk', 'rv', 90],
    ['.panel', 'rv', 90],
    ['.steps li', 'rv', 110],
    ['.facts li', 'rv', 70],
    ['.feed-item', 'rv', 70],
    ['.baggies-photo, .mark-circle', 'rv-img'],
    ['.footer-in > *', 'rv', 90],
    ['.mf-sub, .marquee', 'rv']
  ];
  groups.forEach(([sel, cls, step]) => {
    $$(sel).forEach((el, i) => {
      el.classList.add(cls);
      if (step) el.style.setProperty('--d', `${(i % 6) * step}ms`);
    });
  });
  // Elementos com clip-path inicial têm área visível zero para o observador;
  // por isso observamos o pai (sem recorte) e revelamos os filhos dele.
  const waiting = new Map();
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      (waiting.get(en.target) || []).forEach(el => el.classList.add('in'));
      waiting.delete(en.target);
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  $$('.rv, .rv-title, .rv-img').forEach(el => {
    const target = el.matches('.rv-title, .rv-img') ? el.parentElement : el;
    if (!waiting.has(target)) { waiting.set(target, []); io.observe(target); }
    waiting.get(target).push(el);
  });

  /* ---------- Cabeçalho recolhe ao descer, volta ao subir ---------- */
  const header = $('.header');
  let lastY = scrollY;

  /* ---------- Manifesto: linhas deslizam com a rolagem ---------- */
  const mf = $('#manifesto');
  const lines = $$('.mf-line');
  const bagBox = $('.baggies-photo');
  const bagImg = bagBox && $('img', bagBox);

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      const down = y > lastY;
      header.classList.toggle('tucked', down && y > 320 && !$('.nav.open'));
      lastY = y;

      if (mf) {
        const r = mf.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) {
          const p = (innerHeight - r.top) / (innerHeight + r.height); // 0 → 1 enquanto atravessa a tela
          lines.forEach(l => {
            const dir = +l.dataset.dir;
            l.style.transform = `translate3d(${(dir * (p - 0.5) * 22).toFixed(2)}vw, 0, 0)`;
          });
        }
      }
      const max = root.scrollHeight - innerHeight;
      barFill.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max).toFixed(4) : 0})`;

      if (bagBox) {
        const r = bagBox.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) {
          const q = (innerHeight - r.top) / (innerHeight + r.height);
          bagImg.style.transform = `translate3d(0, ${((0.5 - q) * 46).toFixed(1)}px, 0) scale(1.14)`;
        }
      }
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Cursor com rótulo (só mouse de precisão) ---------- */
  const cursor = $('#cursor');
  if (cursor && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const label = $('.cursor-label', cursor);
    root.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, shown = false;
    const LABELS = [
      ['.runway-stage', 'Arraste'],
      ['.card a, .mq-item', 'Ver peça'],
      ['.panel', 'Explorar'],
      ['.feed-item a', 'Abrir'],
      ['.baggies-photo', 'Baggies']
    ];
    addEventListener('pointermove', e => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; cx = x; cy = y; cursor.classList.add('on'); }
      const t = e.target;
      const hit = LABELS.find(([sel]) => t.closest && t.closest(sel));
      const pin = t.closest && t.closest('.pin');
      if (hit && !pin) { label.textContent = hit[1]; cursor.classList.add('label'); cursor.classList.remove('link'); }
      else {
        cursor.classList.remove('label');
        cursor.classList.toggle('link', !!(t.closest && t.closest('a, button, select, input, .chip')));
      }
      cursor.classList.toggle('on-dark', !!(t.closest && t.closest('.hero, .header, .topbar, .baggies, .footer, .pd-top')));
    }, { passive: true });
    document.addEventListener('pointerleave', () => { cursor.classList.remove('on'); shown = false; });
    addEventListener('pointerdown', () => cursor.classList.add('press'));
    addEventListener('pointerup', () => cursor.classList.remove('press'));
    (function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      requestAnimationFrame(loop);
    })();
  }
})();
