/*
 * Ilustrações provisórias (croquis sem rosto) usadas enquanto
 * as fotografias reais das peças não chegam.
 * viewBox 0 0 200 530 — o "pin" de cada produto usa frações desse quadro.
 */
window.ELLAS_FIG = (() => {
  let uid = 0;
  const SKIN = ['#E8D2BC', '#C69977', '#F0DECB', '#8C5F47', '#DBB898', '#A87555'];
  const HAIR = ['#2E231D', '#1B1613', '#6A4931', '#141010', '#A88459', '#3A2A20'];

  const D = {
    torso: 'M76,90 Q100,84 124,90 L126,130 Q122,170 124,205 L126,236 L74,236 L76,205 Q78,170 74,130Z',
    arm: 'M76,94 Q63,102 60,150 Q57,205 58,256 Q59,268 65,267 Q68,262 67,250 Q68,205 72,160 Q76,128 82,110Z',
    leg: 'M78,262 Q80,340 84,400 L87,500 L97,500 L99,400 Q101,330 100,282Z',
    shoe: 'M84,498 L98,498 L100,512 Q91,515 81,512Z',
    shirt: 'M76,90 L87,87 L100,110 L113,87 L124,90 L138,98 Q146,108 145,150 Q144,205 145,256 L133,258 Q131,205 130,160 L128,132 Q129,185 133,244 Q100,251 67,244 Q71,185 72,132 L70,160 Q69,205 67,258 L55,256 Q56,205 55,150 Q54,108 62,98Z',
    tee: 'M76,90 L87,88 Q100,101 113,88 L124,90 L142,100 L150,140 L134,146 L129,124 Q128,180 131,236 Q100,242 69,236 Q72,180 71,124 L66,146 L50,140 L58,100Z',
    knit: 'M76,90 L87,88 Q100,97 113,88 L124,90 L138,98 Q146,108 145,150 Q144,205 145,256 L133,258 Q131,205 130,160 L128,132 Q128,185 130,238 Q100,244 70,238 Q72,185 72,132 L70,160 Q69,205 67,258 L55,256 Q56,205 55,150 Q54,108 62,98Z',
    dress: 'M83,92 L86,92 L89,120 Q100,124 111,120 L114,92 L117,92 L125,130 Q121,170 124,205 Q139,310 147,422 Q100,432 53,422 Q61,310 76,205 Q79,170 75,130Z',
    wide: 'M70,230 L130,230 Q135,270 138,320 L148,507 L104,507 L100,298 L96,507 L52,507 L62,320 Q65,270 70,230Z',
    jeans: 'M70,230 L130,230 L129,320 L122,503 L102,503 L100,298 L98,503 L78,503 L71,320Z',
    skirt: 'M70,228 L130,228 Q141,320 147,415 Q100,424 53,415 Q59,320 70,228Z'
  };

  const LINE = 'stroke="rgba(0,0,0,.16)" stroke-width=".8" fill="none" stroke-linecap="round"';

  function details(type, color) {
    switch (type) {
      case 'shirt':
        return `<path d="M87,87 L94,106 L100,98 L106,106 L113,87" fill="${color}" ${LINE.replace('fill="none"', '')}/>
          <path d="M100,110 L100,246" ${LINE}/>
          ${[128, 152, 176, 200, 224].map(y => `<circle cx="100" cy="${y}" r="1.4" fill="rgba(0,0,0,.22)"/>`).join('')}
          <path d="M55,246 L67,248 M133,248 L145,246" ${LINE}/>
          <path d="M72,132 Q74,120 80,112 M128,132 Q126,120 120,112" ${LINE}/>`;
      case 'tee':
        return `<path d="M87,88 Q100,101 113,88" ${LINE}/><path d="M71,124 L66,146 M129,124 L134,146" ${LINE}/>
          <path d="M88,150 Q92,200 90,234 M112,150 Q108,200 110,234" stroke="rgba(0,0,0,.06)" stroke-width="1" fill="none"/>`;
      case 'knit':
        return `<path d="M87,88 Q100,97 113,88" stroke="rgba(255,255,255,.25)" stroke-width="3" fill="none"/>
          ${[80, 86, 92, 98, 104, 110, 116, 122].map(x => `<path d="M${x},112 L${x + (x - 100) * 0.08},236" stroke="rgba(0,0,0,.07)" stroke-width="1.2"/>`).join('')}
          <path d="M70,228 Q100,234 130,228" ${LINE}/><path d="M55,244 L67,246 M133,246 L145,244" ${LINE}/>`;
      case 'dress':
        return `<path d="M89,120 Q100,124 111,120" ${LINE}/>
          <path d="M93,215 Q90,320 82,422 M107,215 Q110,320 118,422 M100,230 L100,428" stroke="rgba(0,0,0,.09)" stroke-width="1.1" fill="none"/>`;
      case 'wide':
        return `<path d="M70,240 L130,240" ${LINE}/><path d="M82,262 L76,505 M118,262 L124,505" stroke="rgba(0,0,0,.1)" stroke-width="1" fill="none"/>`;
      case 'jeans':
        return `<path d="M70,240 L130,240 M100,240 L100,298" ${LINE}/><path d="M76,250 Q84,262 92,252 M124,250 Q116,262 108,252" ${LINE}/>`;
      case 'skirt':
        return `<path d="M70,236 L130,236" ${LINE}/><path d="M86,250 Q82,330 74,418 M114,250 Q118,330 126,418" stroke="rgba(0,0,0,.09)" stroke-width="1" fill="none"/>`;
      default:
        return '';
    }
  }

  function garment(g, id) {
    if (!g) return '';
    const d = D[g.type];
    const fill = g.stripe ? `url(#${id}st)` : g.color;
    return `<path d="${d}" fill="${fill}"/><path d="${d}" fill="url(#${id}sh)"/>${details(g.type, g.color)}`;
  }

  function mirror(content) {
    return `${content}<g transform="translate(200 0) scale(-1 1)">${content}</g>`;
  }

  function svg(look, idx = 0, label = '') {
    const id = 'fg' + ++uid;
    const skin = look.skin || SKIN[idx % SKIN.length];
    const hair = look.hair || HAIR[idx % HAIR.length];
    const stripe = look.top && look.top.stripe;
    return `<svg class="fig" viewBox="0 0 200 530" role="img" aria-label="${label}" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="${id}sh" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#fff" stop-opacity=".16"/>
          <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
          <stop offset="1" stop-color="#000" stop-opacity=".18"/>
        </linearGradient>
        ${stripe ? `<pattern id="${id}st" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="${look.top.color}"/><rect width="2.2" height="7" fill="${stripe}"/></pattern>` : ''}
      </defs>
      <ellipse cx="100" cy="514" rx="46" ry="6" fill="#000" opacity=".1"/>
      ${mirror(`<path d="${D.leg}" fill="${skin}"/><path d="${D.shoe}" fill="${look.shoe || '#2A2420'}"/>`)}
      ${mirror(`<path d="${D.arm}" fill="${skin}"/>`)}
      <path d="${D.torso}" fill="${skin}"/>
      <rect x="93" y="62" width="14" height="28" rx="6" fill="${skin}"/>
      <ellipse cx="100" cy="46" rx="17" ry="21" fill="${skin}"/>
      <path d="M83,48 Q81,24 100,23 Q119,24 117,48 Q113,33 100,33 Q87,33 83,48Z" fill="${hair}"/>
      <circle cx="100" cy="20" r="8.5" fill="${hair}"/>
      ${garment(look.bottom, id)}
      ${garment(look.dress, id)}
      ${garment(look.top, id)}
    </svg>`;
  }

  return { svg };
})();
