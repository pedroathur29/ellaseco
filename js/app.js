(() => {
  'use strict';
  const { products, whatsapp, sizes: ALL_SIZES } = window.ELLAS;
  const { svg: figure } = window.ELLAS_FIG;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = v => (v == null ? 'Consultar valor' : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const waLink = msg => `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
  const msgPeca = (p, size) =>
    `Olá! Vi a peça ${p.name} no site da Ella's & Co. e gostaria de saber mais sobre ela.` + (size ? ` Tamanho: ${size}.` : '');
  const msgBaggie = (p, size) =>
    `Olá! Gostaria de experimentar a peça ${p.name}${size ? ` (tamanho ${size})` : ''} pelo Baggies. Quais são as condições?`;
  const AVAIL = { disponivel: 'Disponível', ultimas: 'Últimas peças', consultar: 'Consultar disponibilidade' };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n).padStart(2, '0');
  const href = p => `#/peca/${p.slug}`;
  const small = src => src.replace(/\.(webp|png|jpg)$/i, '-sm.$1');
  // Foto real da peça (ou ilustração provisória, se ainda não houver foto)
  // opts.sizes → o navegador escolhe entre a miniatura e a foto grande conforme a tela
  // opts.priority → 'high' ou 'low': quais fotos o navegador baixa primeiro
  function media(p, size, lazy, opts = {}) {
    if (!p.photos.length) return figure(p.look, products.indexOf(p), `Ilustração provisória: ${p.name}`);
    const full = p.photos[0], sm = small(full);
    const src = size === 'sm' ? sm : full;
    const srcset = opts.sizes && p.ratio
      ? ` srcset="${esc(sm)} ${Math.round(p.ratio * 900)}w, ${esc(full)} ${Math.round(p.ratio * 1600)}w" sizes="${opts.sizes}"` : '';
    return `<img class="ph" src="${esc(src)}"${srcset} alt="${esc(p.name)}" style="object-position:${esc(p.pos || 'center')}"${lazy ? ' loading="lazy"' : ''}${opts.priority ? ` fetchpriority="${opts.priority}"` : ''} decoding="async" draggable="false">`;
  }

  /* ---------- Links genéricos de WhatsApp ---------- */
  $$('[data-wa]').forEach(a => {
    a.href = waLink(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });
  $('#year').textContent = new Date().getFullYear();

  /* =================================================
   * PASSARELA — anel 3D com física de mola
   * ================================================= */
  const stage = $('#runway-stage');
  const N = products.length;
  const STEP = (Math.PI * 2) / N;
  const models = products.map((p, i) => {
    const el = document.createElement('div');
    el.className = 'model' + (p.photos.length ? ' has-photo' : '') + (p.cut ? ' cut' : '');
    if (p.ratio) el.style.setProperty('--ratio', p.ratio);
    el.style.setProperty('--i', i); // ordem de entrada das modelos
    el.setAttribute('role', 'option');
    el.innerHTML =
      media(p, 'lg', false, { sizes: `(max-width: 640px) ${(p.ratio * 50).toFixed(1)}vh, 300px`, priority: (i <= 1 || i === N - 1) ? 'high' : 'low' }) +
      `<a class="pin" href="${href(p)}" style="left:${p.pin[0] * 100}%;top:${p.pin[1] * 100}%" tabindex="${i === 0 ? 0 : -1}">
        <span class="pin-dot">${i + 1}</span><span class="pin-tag"><b>${esc(p.name)}</b>${money(p.price)}</span></a>`;
    stage.appendChild(el);
    return el;
  });

  const dots = $('#rw-dots');
  dots.innerHTML = products.map((p, i) => `<button type="button" data-i="${i}" aria-label="${i + 1}: ${esc(p.name)}"></button>`).join('');
  dots.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) { goTo(+b.dataset.i); userActed(); } });

  const list = $('#runway-list');
  list.innerHTML = products
    .map((p, i) => `<li><button type="button" data-i="${i}"><span class="n">${pad(i + 1)}</span><span><span class="t">${esc(p.name)}</span><span class="p">${money(p.price)}</span></span></button></li>`)
    .join('');

  let pos = 0, vel = 0, target = 0, dragging = false, raf = 0, active = -1;
  const K = 120, C = 2 * Math.sqrt(K); // amortecimento crítico: sem "quique"
  const mod = (n, m) => ((n % m) + m) % m;

  function radius() {
    const w = innerWidth;
    const photos = products.some(p => p.photos.length);
    if (w < 640) return w * (photos ? 0.4 : 0.34);
    return Math.min(w * (photos ? 0.3 : 0.24), photos ? 440 : 360);
  }

  let R = 0;
  function render() {
    models.forEach((el, i) => {
      let d = i - pos;
      d = mod(d + N / 2, N) - N / 2;
      const phi = d * STEP;
      const depth = (Math.cos(phi) + 1) / 2; // 1 = frente, 0 = fundo
      const x = Math.sin(phi) * R * (1 + 0.42 * (1 - depth)); // fundo se abre: todas ficam visíveis
      const scale = 0.52 + 0.48 * depth;
      const y = -(1 - depth) * 34;
      el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      el.style.opacity = (Math.pow(Math.min(1, Math.max(0, (depth - 0.1) / 0.65)), 1.2) * (0.8 + 0.2 * depth)).toFixed(3);
      el.style.zIndex = Math.round(depth * 100);
      el.style.setProperty('--dp', depth.toFixed(3)); // profundidade: quanto a modelo acompanha o mouse
    });
    const a = mod(Math.round(pos), N);
    if (a !== active) setActive(a);
  }

  let capReady = false;
  function setActive(a) {
    active = a;
    const p = products[a];
    models.forEach((el, i) => {
      el.classList.toggle('is-active', i === a);
      el.setAttribute('aria-selected', i === a);
      const pin = el.querySelector('.pin');
      if (pin) pin.tabIndex = i === a ? 0 : -1;
    });
    $$('button', list).forEach(b => b.setAttribute('aria-current', +b.dataset.i === a));
    $('#rc-num').textContent = `${pad(a + 1)} / ${pad(N)}`;
    $('#rc-name').textContent = p.name;
    $('#rc-price').textContent = money(p.price);
    $('#rc-link').href = href(p);
    if (capReady && !reduceMotion) { // a legenda troca com um fade curto (não na primeira vez)
      $$('.runway-caption > *').forEach((el, k) => el.animate(
        [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
        { duration: 500, delay: k * 50, easing: 'cubic-bezier(.22, .8, .24, 1)', fill: 'backwards' }));
    }
    capReady = true;
    $$('button', dots).forEach((b, i) => b.setAttribute('aria-current', i === a));
  }

  let last = 0;
  function tick(t) {
    const dt = Math.min(0.032, (t - (last || t)) / 1000 || 0.016);
    last = t;
    if (!dragging) {
      const acc = K * (target - pos) - C * vel;
      vel += acc * dt;
      pos += vel * dt;
      if (Math.abs(target - pos) < 0.0006 && Math.abs(vel) < 0.002) {
        pos = target; vel = 0; render(); raf = 0; last = 0;
        return;
      }
    }
    render();
    raf = requestAnimationFrame(tick);
  }
  const animate = () => { if (!raf) raf = requestAnimationFrame(tick); };

  function goTo(i) {
    const cur = mod(Math.round(target), N);
    let delta = mod(i - cur, N);
    if (delta > N / 2) delta -= N;
    target = Math.round(target) + delta;
    if (reduceMotion) { pos = target; vel = 0; render(); } else animate();
  }
  const step = dir => { target = Math.round(target) + dir; reduceMotion ? (pos = target, render()) : animate(); };

  $('#rw-prev').addEventListener('click', () => { step(-1); userActed(); });
  $('#rw-next').addEventListener('click', () => { step(1); userActed(); });
  list.addEventListener('click', e => {
    const b = e.target.closest('button[data-i]');
    if (b) { goTo(+b.dataset.i); userActed(); }
  });
  stage.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { step(1); userActed(); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { step(-1); userActed(); e.preventDefault(); }
    if (e.key === 'Enter' && e.target === stage) location.hash = href(products[active]);
  });

  /* Arrastar (mouse e toque) */
  let startX = 0, startY = 0, startPos = 0, moved = false, lastX = 0, lastT = 0, dragVel = 0, pointerId = null;
  stage.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    pointerId = e.pointerId;
    startX = lastX = e.clientX; startY = e.clientY; startPos = pos; lastT = performance.now();
    moved = false; dragVel = 0;
  });
  stage.addEventListener('pointermove', e => {
    if (e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    if (!moved) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(e.clientY - startY) > Math.abs(dx)) { pointerId = null; return; } // rolagem vertical
      moved = true; dragging = true; vel = 0;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('dragging');
      userActed();
    }
    const pxPerStep = Math.max(120, radius() * 0.85);
    pos = startPos - dx / pxPerStep;
    const now = performance.now();
    const dtm = Math.max(1, now - lastT);
    dragVel = 0.8 * dragVel + 0.2 * (-(e.clientX - lastX) / pxPerStep / (dtm / 1000));
    lastX = e.clientX; lastT = now;
    render();
  });
  const endDrag = e => {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
    if (!moved) return;
    dragging = false;
    stage.classList.remove('dragging');
    vel = dragVel;
    target = Math.round(pos + dragVel * 0.18);
    animate();
  };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('click', e => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; return; }
    const m = e.target.closest('.model');
    if (m && !e.target.closest('.pin')) {
      const i = models.indexOf(m);
      if (i === active) location.hash = href(products[i]);
      else { goTo(i); userActed(); }
    }
  }, true);
  // Toque horizontal no trackpad
  stage.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
      e.preventDefault();
      clearTimeout(stage._w);
      stage._w = setTimeout(() => { step(e.deltaX > 0 ? 1 : -1); userActed(); }, 40);
    }
  }, { passive: false });

  /* Rotação automática discreta (pausa ao interagir / fora da tela) */
  let autoTimer = 0, pausedUntil = 0, heroVisible = true;
  function userActed() { pausedUntil = Date.now() + 12000; }
  if (!reduceMotion) {
    autoTimer = setInterval(() => {
      if (!heroVisible || dragging || Date.now() < pausedUntil || document.hidden || !$('#product').hidden) return;
      if (stage.matches(':hover')) return;
      step(1);
    }, 4500);
    new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }, { threshold: 0.3 }).observe(stage);
  }
  addEventListener('resize', () => { R = radius(); render(); });
  R = radius();
  render();

  /* =================================================
   * CATÁLOGO — busca e filtros
   * ================================================= */
  const state = { q: '', cat: 'Todas', size: null, price: 'all' };
  const cats = ['Todas', ...new Set(products.map(p => p.category))];
  const catBox = $('#f-cat');
  const sizeBox = $('#f-size');
  catBox.innerHTML = cats.map(c => `<button type="button" class="chip" data-cat="${esc(c)}" aria-pressed="${c === state.cat}">${esc(c)}</button>`).join('');
  sizeBox.innerHTML = ALL_SIZES.map(s => `<button type="button" class="chip" data-size="${s}" aria-pressed="false" aria-label="Tamanho ${s}">${s}</button>`).join('');

  function card(p, i) {
    return `<li class="card" style="animation-delay:${Math.min(i, 8) * 60}ms">
      <a href="${href(p)}">
        <div class="card-media">
          ${p.photos.length ? '' : '<span class="tag tag-photo">Foto em breve</span>'}${media(p, 'sm', true)}
          ${p.availability === 'ultimas' ? '<span class="tag tag-avail is-ultimas">Últimas peças</span>' : ''}
        </div>
        <div class="card-info">
          <div>
            <span class="card-cat">${esc(p.category)}</span>
            <h3 class="card-name">${esc(p.name)}</h3>
            ${p.sizes.length ? `<span class="card-sizes">${p.sizes.join(' · ')}</span>` : ''}
          </div>
          <span class="card-price">${money(p.price)}</span>
        </div>
        <span class="card-cta">Ver peça <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></span>
      </a>
    </li>`;
  }

  function applyFilters() {
    const q = norm(state.q.trim());
    const [min, max] = state.price === 'all' ? [0, Infinity] : state.price.split('-').map(Number);
    const out = products.filter(p =>
      (!q || norm(`${p.name} ${p.category} ${p.description}`).includes(q)) &&
      (state.cat === 'Todas' || p.category === state.cat) &&
      (!state.size || p.sizes.includes(state.size)) &&
      (state.price === 'all' || (p.price != null && p.price >= min && p.price < max))
    );
    $('#grid').innerHTML = out.map(card).join('');
    $('#empty').hidden = out.length > 0;
    $('#result-count').textContent = out.length === 1 ? '1 peça' : `${out.length} peças`;
    $('#clear-inline').hidden = !(state.q || state.cat !== 'Todas' || state.size || state.price !== 'all');
  }

  $('#f-q').addEventListener('input', e => { state.q = e.target.value; applyFilters(); });
  catBox.addEventListener('click', e => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    state.cat = b.dataset.cat;
    $$('[data-cat]', catBox).forEach(x => x.setAttribute('aria-pressed', x === b));
    applyFilters();
  });
  sizeBox.addEventListener('click', e => {
    const b = e.target.closest('[data-size]');
    if (!b) return;
    state.size = state.size === b.dataset.size ? null : b.dataset.size;
    $$('[data-size]', sizeBox).forEach(x => x.setAttribute('aria-pressed', x.dataset.size === state.size));
    applyFilters();
  });
  $('#f-price').addEventListener('change', e => { state.price = e.target.value; applyFilters(); });
  const clearFilters = () => {
    Object.assign(state, { q: '', cat: 'Todas', size: null, price: 'all' });
    $('#f-q').value = ''; $('#f-price').value = 'all';
    $$('[data-cat]', catBox).forEach(x => x.setAttribute('aria-pressed', x.dataset.cat === 'Todas'));
    $$('[data-size]', sizeBox).forEach(x => x.setAttribute('aria-pressed', 'false'));
    applyFilters();
  };
  $('#clear-filters').addEventListener('click', clearFilters);
  $('#clear-inline').addEventListener('click', clearFilters);
  applyFilters();

  /* Vitrine do Instagram (fotos de publicações do perfil) */
  $('#highlights').innerHTML = (window.ELLAS.feed || []).map(f =>
    `<li class="feed-item"><a href="${window.ELLAS.instagram}" target="_blank" rel="noopener" aria-label="${esc(f.alt)}: ver no Instagram @ellas.eco">
      <img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy" fetchpriority="low" decoding="async">
      <span class="feed-hover" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg></span></a></li>`).join('');

  /* =================================================
   * PÁGINA DA PEÇA — rota #/peca/slug
   * ================================================= */
  const overlay = $('#product');
  const panel = $('#product-panel');
  let lastFocus = null, chosenSize = null;

  function renderProduct(p) {
    const i = products.indexOf(p);
    const prev = products[(i - 1 + N) % N], next = products[(i + 1) % N];
    chosenSize = p.sizes.length === 1 ? p.sizes[0] : null;
    const others = products.filter(x => x !== p).slice(0, 3);
    const photo = media(p, 'lg', false);
    const slots = p.photos.length > 1
      ? p.photos.slice(1, 4).map(src => `<img class="ph" src="${esc(small(src))}" alt="${esc(p.name)}, detalhe" loading="lazy">`).join('')
      : p.photos.length ? '' : ['Foto de frente', 'Foto de detalhe', 'Foto vestida'].map(t => `<div class="pd-slot">${t}<br>em breve</div>`).join('');

    panel.innerHTML = `
      <div class="pd-top">
        <button class="pd-back" type="button" data-close aria-label="Voltar para a coleção"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><span>Voltar para a coleção</span></button>
        <div class="pd-nav">
          <a class="round" href="${href(prev)}" aria-label="Peça anterior: ${esc(prev.name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></a>
          <span>${pad(i + 1)} / ${pad(N)}</span>
          <a class="round" href="${href(next)}" aria-label="Próxima peça: ${esc(next.name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></a>
        </div>
      </div>
      <div class="pd-media">
        <div class="pd-sticky">
          <div class="pd-main${p.photos.length ? ' has-photo' : ''}">${p.photos.length ? '' : '<span class="tag tag-photo">Ilustração · foto em breve</span>'}${photo}</div>
          ${slots ? `<div class="pd-thumbs">${slots}</div>` : ''}
        </div>
      </div>
      <div class="pd-info">
        <span class="pd-crumb">Coleção · ${esc(p.category)}</span>
        <h2 class="pd-name" id="pd-name">${esc(p.name)}</h2>
        <div class="pd-price">${money(p.price)}</div>
        <div class="pd-avail is-${p.availability}">${AVAIL[p.availability] || AVAIL.consultar}</div>
        <p class="pd-desc">${esc(p.description)}</p>
        ${p.sizes.length ? `
        <div class="pd-block">
          <span class="f-label" id="pd-size-l">Tamanhos disponíveis</span>
          <div class="chips chips-sm" role="group" aria-labelledby="pd-size-l">
            ${p.sizes.map(s => `<button type="button" class="chip" data-psize="${s}" aria-pressed="${s === chosenSize}">${s}</button>`).join('')}
          </div>
          <p class="pd-hint">Escolha um tamanho para já enviar na mensagem. Dúvidas de medida? Pergunte no WhatsApp.</p>
        </div>` : `
        <div class="pd-block"><span class="f-label">Tamanhos</span><p class="pd-hint">Consulte os tamanhos disponíveis pelo WhatsApp.</p></div>`}
        ${p.details && p.details.length ? `<div class="pd-block"><span class="f-label">Detalhes</span><ul class="pd-details">${p.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul></div>` : ''}
        <div class="pd-cta">
          <a class="btn btn-ink btn-block" id="pd-wa" target="_blank" rel="noopener">Tenho interesse — falar no WhatsApp</a>
        </div>
        <div class="pd-actions">
          <a class="btn btn-line btn-block" id="pd-bag" target="_blank" rel="noopener">Quero experimentar pelo Baggies</a>
          <p class="pd-ship"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 9h16v13H3zM19 13h5l4 4v5h-9" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>Enviamos para todo o Brasil · atendimento em Nova Odessa e região.</p>
          <p class="pd-how">Ao tocar no botão, abrimos o WhatsApp já com a peça na mensagem. Nossa equipe confirma disponibilidade, valores e envio.</p>
        </div>
      </div>
      <section class="pd-more" aria-label="Outras peças">
        <h3>Combine com</h3>
        <ul>${others.map(card).join('')}</ul>
      </section>`;
    updateWa(p);
    panel.querySelectorAll('[data-psize]').forEach(b => b.addEventListener('click', () => {
      chosenSize = chosenSize === b.dataset.psize ? null : b.dataset.psize;
      panel.querySelectorAll('[data-psize]').forEach(x => x.setAttribute('aria-pressed', x.dataset.psize === chosenSize));
      updateWa(p);
    }));
    panel.scrollTop = 0;
  }

  function updateWa(p) {
    $('#pd-wa', panel).href = waLink(msgPeca(p, chosenSize));
    $('#pd-bag', panel).href = waLink(msgBaggie(p, chosenSize));
  }

  let closeTimer = 0;
  function openProduct(p) {
    clearTimeout(closeTimer); closeTimer = 0; overlay.classList.remove('closing');
    if (overlay.hidden) lastFocus = document.activeElement;
    renderProduct(p);
    overlay.hidden = false;
    document.body.classList.add('locked');
    document.title = `${p.name} — Ella's & Co.`;
    $('.pd-back', panel).focus({ preventScroll: true });
  }
  function closeProduct() {
    if (overlay.hidden || closeTimer) return;
    const done = () => {
      closeTimer = 0;
      overlay.hidden = true;
      overlay.classList.remove('closing');
      document.body.classList.remove('locked');
      document.title = "Ella's & Co. — Boutique virtual feminina | Nova Odessa – SP";
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    };
    if (reduceMotion) return done();
    overlay.classList.add('closing'); // o painel desliza para fora antes de sumir
    closeTimer = setTimeout(done, 430);
  }
  function leaveProduct() {
    history.pushState('', document.title, location.pathname + location.search);
    closeProduct();
  }

  function route() {
    const m = location.hash.match(/^#\/peca\/([\w-]+)$/);
    const p = m && products.find(x => x.slug === m[1]);
    if (p) openProduct(p);
    else closeProduct();
  }
  addEventListener('hashchange', route);

  /* Menu no celular */
  const menuBtn = $('#menu-btn'), nav = $('#nav');
  const setMenu = open => { nav.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  overlay.addEventListener('click', e => { if (e.target.closest('[data-close]')) leaveProduct(); });
  document.addEventListener('keydown', e => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') leaveProduct();
    if (e.key === 'Tab') { // mantém o foco dentro do painel
      const f = $$('a[href], button:not([disabled]), input, select', panel);
      if (!f.length) return;
      const first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { lastEl.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { first.focus(); e.preventDefault(); }
    }
  });
  route();
})();
