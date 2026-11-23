/*
 * Ella's & Co. — movimento
 * Poucas animações, todas com o mesmo ritmo: entradas curtas ao rolar, painéis,
 * manifesto que desliza, esteira de peças, cabeçalho que se recolhe e cursor.
 * Quem pede "reduzir movimento" no sistema vê o site sem elas.
 */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { products } = window.ELLAS;

  /* ---------- Abertura "Ella's &Co." (uma vez por visita; um clique pula) ---------- */
  const intro = $('.intro');
  if (intro) {
    if (root.classList.contains('intro-on')) {
      try { sessionStorage.setItem('ellas-intro', '1'); } catch (e) {}
      let t = 0;
      const end = () => { clearTimeout(t); root.classList.remove('intro-on'); intro.remove(); };
      t = setTimeout(end, 2150);
      intro.addEventListener('click', end);
    } else {
      intro.remove();
    }
  }

  /* ---------- Painéis "Escolha por estilo": contagem e atalho para o filtro ---------- */
  $$('[data-count]').forEach(el => {
    const n = products.filter(p => p.category === el.dataset.count).length;
    el.textContent = n === 1 ? '1 peça' : `${n} peças`;
  });
  $$('.panel[data-filter]').forEach(a => a.addEventListener('click', () => {
    const chip = $(`[data-cat="${a.dataset.filter}"]`);
    if (chip && chip.getAttribute('aria-pressed') !== 'true') chip.click();
  }));

  /* ---------- Esteira de peças ---------- */
  const marquee = $('.marquee');
  const track = $('#marquee');
  if (track) {
    const one = products.map(p => `<a class="mq-item" href="#/peca/${p.slug}" tabindex="-1"><img src="${p.photos[0].replace(/\.(webp|png|jpg)$/i, '-sm.$1')}" alt="" width="${Math.round((p.ratio || .42) * 170)}" height="170" fetchpriority="low" decoding="async"><span>${p.name}</span></a>`).join('');
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
    // A esteira fica bem abaixo da dobra: só é montada (e medida) quando está perto de aparecer,
    // e para quando sai da tela, para não gastar bateria à toa.
    let started = false, rt;
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !started) {
        started = true;
        build();
        addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 200); });
      }
      marquee.classList.toggle('off', !en.isIntersecting);
    }, { rootMargin: '800px 0px' }).observe(marquee);
  }

  /* ---------- Menu destaca a seção que está na tela ---------- */
  const spy = ['colecao', 'baggies', 'sobre', 'instagram']
    .map(id => [$(`#${id}`), $(`.nav a[href="#${id}"]`)]).filter(([sec, a]) => sec && a);
  if (spy.length) {
    const band = { rootMargin: '-42% 0px -52% 0px' };
    const so = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting) spy.forEach(([sec, a]) => a.classList.toggle('active', sec === en.target)); });
    }, band);
    spy.forEach(([sec]) => so.observe(sec));
    // acima da Coleção (topo, diferenciais, "Escolha por estilo") nenhum item fica destacado
    const above = new IntersectionObserver(es => {
      if (es.some(en => en.isIntersecting)) spy.forEach(([, a]) => a.classList.remove('active'));
    }, band);
    $$('.hero, .perks, .explore').forEach(el => above.observe(el));
  }

  if (reduce) return;
  root.classList.add('motion');

  /* ---------- Entradas ao rolar: subida longa; títulos e imagens entram por máscara ---------- */
  const groups = [
    ['.sec-head .display-2, .baggies-head .display-2, .about .display-2', 'rv-title'],
    ['.sec-note, .lead, .baggies .btn, .fine, .filters, .result-row, .mf-sub, .marquee, .panels', 'rv'],
    ['.perk', 'rv', 90],
    ['.steps li', 'rv', 110],
    ['.facts li', 'rv', 70],
    ['.feed-item', 'rv', 70],
    ['.baggies-photo, .mark-circle', 'rv-img'],
    ['.footer-in > *', 'rv', 90]
  ];
  groups.forEach(([sel, cls, step]) => {
    $$(sel).forEach((el, i) => {
      el.classList.add(cls);
      if (step) el.style.setProperty('--d', `${(i % 6) * step}ms`);
    });
  });
  // Elementos com máscara (clip-path) começam com área visível zero e o observador não os "vê":
  // por isso observamos o pai, que não é recortado, e revelamos os filhos dele.
  const waiting = new Map();
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      (waiting.get(en.target) || []).forEach(el => el.classList.add('in'));
      waiting.delete(en.target);
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.rv, .rv-title, .rv-img').forEach(el => {
    const target = el.matches('.rv-title, .rv-img') ? el.parentElement : el;
    if (!waiting.has(target)) { waiting.set(target, []); io.observe(target); }
    waiting.get(target).push(el);
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

  /* ---------- Cabeçalho recolhe ao descer; manifesto desliza com a rolagem ---------- */
  const header = $('.header');
  const nav = $('#nav');
  const mf = $('#manifesto');
  const lines = $$('.mf-line');
  const bagBox = $('.baggies-photo');
  const bagImg = bagBox && $('img', bagBox);
  let lastY = scrollY, mfOn = false, bagOn = false, ticking = false;
  if (mf) new IntersectionObserver(([en]) => { mfOn = en.isIntersecting; onScroll(); }).observe(mf);
  if (bagBox) new IntersectionObserver(([en]) => { bagOn = en.isIntersecting; onScroll(); }, { rootMargin: '100px 0px' }).observe(bagBox);

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      header.classList.toggle('tucked', y > lastY && y > 320 && !nav.classList.contains('open'));
      lastY = y;
      if (mfOn) { // só mede a seção enquanto ela está na tela
        const r = mf.getBoundingClientRect();
        const p = (innerHeight - r.top) / (innerHeight + r.height); // 0 → 1 enquanto atravessa a tela
        lines.forEach(l => { l.style.transform = `translate3d(${(+l.dataset.dir * (p - 0.5) * 22).toFixed(2)}vw, 0, 0)`; });
      }
      const max = root.scrollHeight - innerHeight;
      barFill.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max).toFixed(4) : 0})`;
      if (bagOn) { // parallax suave: a foto do Baggies anda mais devagar que a página
        const r = bagBox.getBoundingClientRect();
        const q = (innerHeight - r.top) / (innerHeight + r.height);
        bagImg.style.transform = `translate3d(0, ${((0.5 - q) * 46).toFixed(1)}px, 0) scale(1.14)`;
      }
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Cursor com rótulo (só mouse de precisão) ---------- */
  const cursor = $('#cursor');
  if (cursor && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const label = $('.cursor-label', cursor);
    root.classList.add('has-cursor');
    let x = 0, y = 0, cx = 0, cy = 0, shown = false, raf = 0;
    const LABELS = [
      ['.runway-stage', 'Arraste'],
      ['.card a, .mq-item', 'Ver peça'],
      ['.panel', 'Explorar'],
      ['.feed-item a', 'Abrir'],
      ['.baggies-photo', 'Baggies']
    ];
    // o laço só roda enquanto o cursor ainda está alcançando o mouse
    const follow = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      raf = (Math.abs(x - cx) > 0.2 || Math.abs(y - cy) > 0.2) ? requestAnimationFrame(follow) : 0;
    };
    addEventListener('pointermove', e => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; cx = x; cy = y; cursor.classList.add('on'); }
      if (!raf) raf = requestAnimationFrame(follow);
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
  }

  /* ---------- Passarela reage ao mouse: cada modelo se desloca de leve, conforme a profundidade ---------- */
  const heroEl = $('.hero');
  const stageEl = $('#runway-stage');
  if (heroEl && stageEl && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let tx = 0, praf = 0;
    heroEl.addEventListener('pointermove', e => {
      tx = (e.clientX / innerWidth - 0.5) * 2; // -1 (esquerda) a 1 (direita); sem ler o layout
      if (!praf) praf = requestAnimationFrame(() => { stageEl.style.setProperty('--mx', tx.toFixed(3)); praf = 0; });
    }, { passive: true });
    heroEl.addEventListener('pointerleave', () => stageEl.style.setProperty('--mx', 0));
  }
})();
