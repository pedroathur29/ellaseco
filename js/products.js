/*
 * Ella's & Co. — catálogo
 * -----------------------------------------------------------------
 * Para adicionar uma peça, copie um bloco abaixo e ajuste os campos.
 *
 *  slug          → usado na URL (#/peca/slug). Sem acentos nem espaços.
 *  category      → categoria da peça (os filtros são montados a partir daqui).
 *  price         → número (ex.: 189.9). Use null para "Consultar valor".
 *  sizes         → apenas tamanhos CONFIRMADOS (P, M, G, GG). [] = "consultar".
 *  availability  → 'disponivel' | 'ultimas' | 'consultar'
 *  photos        → foto da peça SEM FUNDO (WebP/PNG com transparência).
 *                  Para 'img/pecas/x.webp' existe também 'x-sm.webp' (miniatura).
 *  ratio         → largura ÷ altura do recorte (ex.: 0.42).
 *  cut           → true se a foto original corta os pés (a base some na sombra do piso).
 *  pin           → posição do ponto numerado na foto da passarela [x, y] (0 a 1).
 *  source        → publicação de origem no Instagram.
 *
 * PROTÓTIPO: fotos, descrições e tamanhos vêm das publicações do
 * Instagram @ellas.eco. Os PREÇOS são ilustrativos. Os nomes marcados
 * com "nome a confirmar" foram descritos a partir da foto, porque a
 * publicação não traz o nome da peça.
 */
window.ELLAS = {
  whatsapp: '5519991241449',
  instagram: 'https://www.instagram.com/ellas.eco/',
  instagramHandle: '@ellas.eco',
  sizes: ['P', 'M', 'G', 'GG'],

  products: [
    {
      slug: 'conjunto-preto',
      name: 'Conjunto Preto', // nome a confirmar
      category: 'Conjuntos',
      price: 289.9,
      sizes: [],
      availability: 'disponivel',
      description:
        'Blusa assimétrica com aplicação dourada na cintura e calça de caimento solto. Um conjunto elegante e confortável, do dia à noite.',
      details: ['Blusa assimétrica', 'Aplicação dourada na cintura', 'Calça de caimento solto'],
      photos: ['img/pecas/conjunto-preto.webp'],
      ratio: 0.415,
      cut: true, // foto original corta os pés
      pin: [0.48, 0.25],
      source: 'https://www.instagram.com/ellas.eco/p/Db8_ywjGssA/'
    },
    {
      slug: 'vestido-bicolor',
      name: 'Vestido Bicolor',
      category: 'Vestidos',
      price: 229.9,
      sizes: ['P', 'M', 'G'],
      availability: 'disponivel',
      description:
        'Produzido em viscolinho, garantindo conforto e elegância ao seu visual. O contraste de cores e a faixa na cintura fazem a assinatura da peça.',
      details: ['Viscolinho', 'Frente única', 'Faixa na cintura'],
      photos: ['img/pecas/vestido-bicolor.webp'],
      ratio: 0.424,
      pin: [0.52, 0.48],
      source: 'https://www.instagram.com/ellas.eco/reel/DewscZSBsnx/'
    },
    {
      slug: 'conjunto-marsala',
      name: 'Conjunto Marsala', // nome a confirmar
      category: 'Conjuntos',
      price: 259.9,
      sizes: [],
      availability: 'disponivel',
      description:
        'Lançamento: blusa com babado e calça pantalona na cor marsala. Leve, sofisticado e fácil de combinar.',
      details: ['Blusa com babado', 'Calça pantalona', 'Cor marsala'],
      photos: ['img/pecas/conjunto-marsala.webp'],
      ratio: 0.299,
      pin: [0.5, 0.25],
      source: 'https://www.instagram.com/ellas.eco/reel/DWWQ6_8jvma/'
    },
    {
      slug: 'vestido-angelica',
      name: 'Vestido Angélica',
      category: 'Vestidos',
      price: 259.9,
      sizes: ['M', 'G', 'GG'],
      availability: 'disponivel',
      description:
        'Tecido leve com bordado delicado e elegante. Um vestido para ocasiões especiais e para quem gosta de se sentir bem-vestida todos os dias.',
      details: ['Tecido leve', 'Bordado delicado', 'Alças finas'],
      photos: ['img/pecas/vestido-angelica.webp'],
      ratio: 0.451,
      cut: true, // foto original corta os pés
      pin: [0.5, 0.55],
      source: 'https://www.instagram.com/ellas.eco/reel/DecVTFNhkNk/'
    },
    {
      slug: 'vestido-jeans',
      name: 'Vestido Jeans', // nome a confirmar
      category: 'Vestidos',
      price: 229.9,
      sizes: [],
      availability: 'disponivel',
      description:
        'Com aquele toque de jeans confortável que toda mulher moderna precisa. Alças finas, decote franzido e fenda frontal.',
      details: ['Jeans confortável', 'Decote franzido', 'Fenda frontal'],
      photos: ['img/pecas/vestido-jeans.webp'],
      ratio: 0.396,
      cut: true, // foto original corta os pés
      pin: [0.5, 0.45],
      source: 'https://www.instagram.com/ellas.eco/reel/DU8q9FRjmx2/'
    },
    {
      slug: 'vestido-longo-manteiga',
      name: 'Vestido Longo Manteiga', // nome a confirmar
      category: 'Vestidos',
      price: 279.9,
      sizes: [],
      availability: 'disponivel',
      description:
        'Aquele longo maravilhoso para as festas de fim de ano, com amarração na cintura. Disponível nos tons pastéis amarelo manteiga e azul.',
      details: ['Comprimento longo', 'Amarração na cintura', 'Amarelo manteiga ou azul'],
      photos: ['img/pecas/vestido-longo-manteiga.webp'],
      ratio: 0.424,
      cut: true, // foto original corta os pés
      pin: [0.5, 0.52],
      source: 'https://www.instagram.com/ellas.eco/reel/DSaUbn_jvOR/'
    }
  ],

  /* Vitrine do Instagram (fotos de publicações do perfil) */
  feed: [
    { src: 'img/insta/conjunto-bata-alfaiataria.webp', alt: 'Conjunto bata de alfaiataria rosé' },
    { src: 'img/insta/vestido-midi-couro.webp', alt: 'Vestido midi em couro P.U. marsala' },
    { src: 'img/insta/macacao-linho.webp', alt: 'Macacão frente única em linho' },
    { src: 'img/insta/conjunto-mood-conforto.webp', alt: 'Conjunto listrado Mood Conforto' },
    { src: 'img/insta/vestido-leve-bolsos.webp', alt: 'Vestido leve e solto com bolsos' },
    { src: 'img/insta/conjunto-bege.webp', alt: 'Conjunto bege com chapéu' }
  ]
};
