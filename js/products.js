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
 *  photos        → fotos da peça com o fundo original (a primeira é a capa).
 *                  Para 'img/pecas/fotos/x.webp' existe também 'x-sm.webp'.
 *  photoRatio    → largura ÷ altura da primeira foto.
 *  cutout        → foto SEM FUNDO. Para a peça aparecer na passarela, inclua o
 *                  slug dela em runwaySlugs (no fim do arquivo).
 *  cutoutHeight  → altura em pixels do recorte (se não houver, vale 1600).
 *  ratio         → largura ÷ altura do recorte.
 *  cut           → true se a foto original corta os pés (a base some na sombra do piso).
 *  pin           → posição do ponto numerado na foto da passarela [x, y] (0 a 1).
 *
 * PROTÓTIPO: nomes e descrições novos foram escritos a partir das fotos e
 * precisam ser confirmados pela loja. Valores e tamanhos pelo WhatsApp.
 */
window.ELLAS = {
  whatsapp: '5519991241449',
  instagram: 'https://www.instagram.com/ellas.eco/',
  instagramHandle: '@ellas.eco',
  sizes: ['P', 'M', 'G', 'GG'],

  products: [
    {
      slug: 'vestido-jeans-midi',
      name: 'Vestido Jeans Midi',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Jeans escuro, sem mangas, com zíper nas costas e fenda atrás.',
      photos: ['img/pecas/fotos/vestido-jeans-midi-1.webp', 'img/pecas/fotos/vestido-jeans-midi-2.webp'],
      photoRatio: 0.8,
      cutout: 'img/pecas/recortes/vestido-jeans-midi.webp',
      cutoutHeight: 1147,
      ratio: 0.392,
      pin: [0.42, 0.46]
    },
    {
      slug: 'conjunto-pantalona',
      name: 'Conjunto Pantalona',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Blusa de manga curta e calça pantalona. Fotos em rosa, marinho e azul claro.',
      photos: ['img/pecas/fotos/conjunto-pantalona-1.webp', 'img/pecas/fotos/conjunto-pantalona-2.webp', 'img/pecas/fotos/conjunto-pantalona-3.webp'],
      photoRatio: 0.75
    },
    {
      slug: 'blusa-um-ombro',
      name: 'Blusa Um Ombro Só',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Decote em um ombro, drapeado e aplicação dourada. Fotos em branco e preto.',
      photos: ['img/pecas/fotos/blusa-um-ombro-1.webp', 'img/pecas/fotos/blusa-um-ombro-2.webp'],
      photoRatio: 0.666,
      cutout: 'img/pecas/recortes/blusa-um-ombro.webp',
      cutoutHeight: 1150,
      ratio: 0.45,
      cut: true,
      pin: [0.45, 0.46]
    },
    {
      slug: 'conjunto-preto',
      name: 'Conjunto Preto',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Blusa assimétrica com aplicação dourada na cintura e calça de caimento solto. Um conjunto elegante e confortável, do dia à noite.',
      details: ['Blusa assimétrica', 'Aplicação dourada na cintura', 'Calça de caimento solto'],
      photos: [],
      cutout: 'img/pecas/conjunto-preto.webp',
      ratio: 0.415,
      cut: true,
      pin: [0.48, 0.25],
      source: 'https://www.instagram.com/ellas.eco/p/Db8_ywjGssA/'
    },
    {
      slug: 'vestido-preto-rendado',
      name: 'Vestido Preto Rendado',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Alças finas, trama rendada e barra evasê.',
      photos: ['img/pecas/fotos/vestido-preto-rendado-1.webp'],
      photoRatio: 0.751
    },
    {
      slug: 'conjunto-rosa-e-marrom',
      name: 'Conjunto Rosa e Marrom',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Blusa transpassada e short, com contraste em marrom.',
      photos: ['img/pecas/fotos/conjunto-rosa-e-marrom-1.webp'],
      photoRatio: 0.671,
      cutout: 'img/pecas/recortes/conjunto-rosa-e-marrom.webp',
      cutoutHeight: 1132,
      ratio: 0.443,
      pin: [0.4, 0.42]
    },
    {
      slug: 'camiseta-flor',
      name: 'Camiseta Flor',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camiseta branca com estampa de flor em preto.',
      photos: ['img/pecas/fotos/camiseta-flor-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'vestido-bicolor',
      name: 'Vestido Bicolor',
      category: 'Vestidos',
      price: null,
      sizes: ['P', 'M', 'G'],
      availability: 'consultar',
      description: 'Produzido em viscolinho, garantindo conforto e elegância ao seu visual. O contraste de cores e a faixa na cintura fazem a assinatura da peça.',
      details: ['Viscolinho', 'Frente única', 'Faixa na cintura'],
      photos: ['img/pecas/fotos/vestido-bicolor-1.webp'],
      photoRatio: 0.562,
      cutout: 'img/pecas/vestido-bicolor.webp',
      ratio: 0.424,
      pin: [0.52, 0.48],
      source: 'https://www.instagram.com/ellas.eco/reel/DewscZSBsnx/'
    },
    {
      slug: 'vestido-jeans-babados',
      name: 'Vestido Longo Jeans',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Longo em camadas, manga curta ampla, decote V e costas abertas com amarração.',
      photos: ['img/pecas/fotos/vestido-jeans-babados-1.webp', 'img/pecas/fotos/vestido-jeans-babados-2.webp'],
      photoRatio: 0.667
    },
    {
      slug: 'conjunto-colete-caramelo',
      name: 'Conjunto Colete Caramelo',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Colete com botões e calça de alfaiataria no tom caramelo.',
      photos: ['img/pecas/fotos/conjunto-colete-caramelo-1.webp'],
      photoRatio: 0.667,
      cutout: 'img/pecas/recortes/conjunto-colete-caramelo.webp',
      cutoutHeight: 931,
      ratio: 0.294,
      pin: [0.5, 0.38]
    },
    {
      slug: 'regata-com-renda',
      name: 'Regata com Renda',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Regata com renda no decote e na barra. Fotos em preto e branco.',
      photos: ['img/pecas/fotos/regata-com-renda-1.webp', 'img/pecas/fotos/regata-com-renda-2.webp', 'img/pecas/fotos/regata-com-renda-3.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'vestido-rosa-midi',
      name: 'Vestido Rosa Midi',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Alças largas, nervuras no busto e saia midi com bolsos.',
      photos: ['img/pecas/fotos/vestido-rosa-midi-1.webp'],
      photoRatio: 0.713,
      cutout: 'img/pecas/recortes/vestido-rosa-midi.webp',
      cutoutHeight: 1091,
      ratio: 0.316,
      pin: [0.56, 0.46]
    },
    {
      slug: 'conjunto-marsala',
      name: 'Conjunto Marsala',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Lançamento: blusa com babado e calça pantalona na cor marsala. Leve, sofisticado e fácil de combinar.',
      details: ['Blusa com babado', 'Calça pantalona', 'Cor marsala'],
      photos: [],
      cutout: 'img/pecas/conjunto-marsala.webp',
      ratio: 0.299,
      pin: [0.5, 0.25],
      source: 'https://www.instagram.com/ellas.eco/reel/DWWQ6_8jvma/'
    },
    {
      slug: 'conjunto-listrado-short',
      name: 'Conjunto Listrado com Short',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camisa de manga curta e short de cintura alta, em listras azuis e brancas.',
      photos: ['img/pecas/fotos/conjunto-listrado-short-1.webp'],
      photoRatio: 0.75
    },
    {
      slug: 'camiseta-laco-de-brilho',
      name: 'Camiseta Laço de Brilho',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camiseta com laço em pedraria. Fotos em preto e branco.',
      photos: ['img/pecas/fotos/camiseta-laco-de-brilho-1.webp', 'img/pecas/fotos/camiseta-laco-de-brilho-2.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'vestido-marinho-curto',
      name: 'Vestido Marinho Curto',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Curto, decote V, manga ampla e amarração nas costas.',
      photos: ['img/pecas/fotos/vestido-marinho-curto-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'macacao-amarelo',
      name: 'Macacão Amarelo Manteiga',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Macacão sem mangas com calça reta.',
      photos: ['img/pecas/fotos/macacao-amarelo-1.webp'],
      photoRatio: 0.667,
      cutout: 'img/pecas/recortes/macacao-amarelo.webp',
      cutoutHeight: 887,
      ratio: 0.275,
      pin: [0.42, 0.4]
    },
    {
      slug: 'blusa-gola-alta',
      name: 'Blusa Gola Alta',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Blusa branca de manga curta e gola alta.',
      photos: ['img/pecas/fotos/blusa-gola-alta-1.webp', 'img/pecas/fotos/blusa-gola-alta-2.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'vestido-angelica',
      name: 'Vestido Angélica',
      category: 'Vestidos',
      price: null,
      sizes: ['M', 'G', 'GG'],
      availability: 'consultar',
      description: 'Tecido leve com bordado delicado e elegante. Um vestido para ocasiões especiais e para quem gosta de se sentir bem-vestida todos os dias.',
      details: ['Tecido leve', 'Bordado delicado', 'Alças finas'],
      photos: [],
      cutout: 'img/pecas/vestido-angelica.webp',
      ratio: 0.451,
      cut: true,
      pin: [0.5, 0.55],
      source: 'https://www.instagram.com/ellas.eco/reel/DecVTFNhkNk/'
    },
    {
      slug: 'vestido-nude-bordado',
      name: 'Vestido Nude Bordado',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Alças finas, barra bordada e recorte lateral.',
      photos: ['img/pecas/fotos/vestido-nude-bordado-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'conjunto-listrado-azul',
      name: 'Conjunto Listrado com Pantalona',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Blusa de gola alta sem mangas e calça pantalona com amarração.',
      photos: ['img/pecas/fotos/conjunto-listrado-azul-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'calca-jeans-e-camisa',
      name: 'Look Camisa e Calça Jeans',
      category: 'Calças e shorts',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camisa com bolsos e calça jeans escura com amarração na cintura.',
      photos: ['img/pecas/fotos/calca-jeans-e-camisa-1.webp'],
      photoRatio: 0.8
    },
    {
      slug: 'vestido-marrom-midi',
      name: 'Vestido Marrom Midi',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Midi com decote V, manga curta e fenda lateral.',
      photos: ['img/pecas/fotos/vestido-marrom-midi-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'conjunto-listrado-preto',
      name: 'Conjunto Listrado Preto',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camisa e short pretos com listras finas.',
      photos: ['img/pecas/fotos/conjunto-listrado-preto-1.webp'],
      photoRatio: 0.75
    },
    {
      slug: 'vestido-jeans',
      name: 'Vestido Jeans',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Com aquele toque de jeans confortável que toda mulher moderna precisa. Alças finas, decote franzido e fenda frontal.',
      details: ['Jeans confortável', 'Decote franzido', 'Fenda frontal'],
      photos: [],
      cutout: 'img/pecas/vestido-jeans.webp',
      ratio: 0.396,
      cut: true,
      pin: [0.5, 0.45],
      source: 'https://www.instagram.com/ellas.eco/reel/DU8q9FRjmx2/'
    },
    {
      slug: 'blusa-detalhe-argola',
      name: 'Blusa com Argola',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Blusa marsala com argola dourada no ombro.',
      photos: ['img/pecas/fotos/blusa-detalhe-argola-1.webp'],
      photoRatio: 0.77
    },
    {
      slug: 'vestido-jeans-alcas',
      name: 'Vestido Longo Jeans de Alças',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Jeans escuro, alças largas, saia rodada e zíper nas costas.',
      photos: ['img/pecas/fotos/vestido-jeans-alcas-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'macacao-azul-claro',
      name: 'Macacão Azul Claro',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Decote V, cintura marcada e calça reta.',
      photos: ['img/pecas/fotos/macacao-azul-claro-1.webp'],
      photoRatio: 0.438
    },
    {
      slug: 'camiseta-bordado-floral',
      name: 'Camiseta Bordado Floral',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camiseta off-white com flores bordadas no ombro e na lateral.',
      photos: ['img/pecas/fotos/camiseta-bordado-floral-1.webp', 'img/pecas/fotos/camiseta-bordado-floral-2.webp', 'img/pecas/fotos/camiseta-bordado-floral-3.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'vestido-canelado',
      name: 'Vestido Longo Canelado',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Longo de alças finas. Fotos em caramelo e mostarda.',
      photos: ['img/pecas/fotos/vestido-canelado-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'vestido-longo-manteiga',
      name: 'Vestido Longo Manteiga',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Aquele longo maravilhoso para as festas de fim de ano, com amarração na cintura. Disponível nos tons pastéis amarelo manteiga e azul.',
      details: ['Comprimento longo', 'Amarração na cintura', 'Amarelo manteiga ou azul'],
      photos: [],
      cutout: 'img/pecas/vestido-longo-manteiga.webp',
      ratio: 0.424,
      cut: true,
      pin: [0.5, 0.52],
      source: 'https://www.instagram.com/ellas.eco/reel/DSaUbn_jvOR/'
    },
    {
      slug: 'conjunto-preto-short',
      name: 'Conjunto Preto com Short',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Regata com pesponto claro e short preto.',
      photos: ['img/pecas/fotos/conjunto-preto-short-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'legging-friso-e-fenda',
      name: 'Legging Friso e Fenda',
      category: 'Calças e shorts',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Legging com friso e fenda na barra.',
      photos: ['img/pecas/fotos/legging-friso-e-fenda-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'vestido-curto-preto',
      name: 'Vestido Curto Preto',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Alças, detalhe dourado no decote e outras cores na arara.',
      photos: ['img/pecas/fotos/vestido-curto-preto-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'conjunto-preto-rendado',
      name: 'Conjunto Preto Rendado',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camisa com botões dourados e calça ampla em renda.',
      photos: ['img/pecas/fotos/conjunto-preto-rendado-1.webp'],
      photoRatio: 0.562
    },
    {
      slug: 'blusa-manga-curta-gola',
      name: 'Blusa Gola e Manga Curta',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Gola levemente alta e manga curtinha. Fotos em amarelo e vermelho.',
      photos: ['img/pecas/fotos/blusa-manga-curta-gola-1.webp', 'img/pecas/fotos/blusa-manga-curta-gola-2.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'vestido-curto-rosa',
      name: 'Vestido Curto Rosa',
      category: 'Vestidos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Alças finas e amarração no busto.',
      photos: ['img/pecas/fotos/vestido-curto-rosa-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'macaquinho-verde-claro',
      name: 'Macaquinho Verde Claro',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Curto, sem mangas, com argola e recorte na cintura.',
      photos: ['img/pecas/fotos/macaquinho-verde-claro-1.webp'],
      photoRatio: 0.713
    },
    {
      slug: 'bermuda-jeans',
      name: 'Bermuda Jeans',
      category: 'Calças e shorts',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Bermuda jeans de cintura alta, usada com camisa branca.',
      photos: ['img/pecas/fotos/bermuda-jeans-1.webp'],
      photoRatio: 0.81
    },
    {
      slug: 'conjunto-branco-e-preto',
      name: 'Look Branco e Preto',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Blusa branca alongada com fenda sobre short preto.',
      photos: ['img/pecas/fotos/conjunto-branco-e-preto-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'blusa-renda-preta',
      name: 'Blusa Preta Rendada',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Gola alta, fechos frontais e renda.',
      photos: ['img/pecas/fotos/blusa-renda-preta-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'conjunto-marrom-sobreposicao',
      name: 'Conjunto Marrom',
      category: 'Conjuntos',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Blusa alongada com nó no busto e calça ampla.',
      photos: ['img/pecas/fotos/conjunto-marrom-sobreposicao-1.webp'],
      photoRatio: 0.721
    },
    {
      slug: 'short-off-white',
      name: 'Short Off-White',
      category: 'Calças e shorts',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Short claro de alfaiataria, usado com regata marsala.',
      photos: ['img/pecas/fotos/short-off-white-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'camiseta-lacinhos',
      name: 'Camiseta Lacinhos',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camiseta preta com lacinhos e gola ondulada.',
      photos: ['img/pecas/fotos/camiseta-lacinhos-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'camiseta-florzinhas',
      name: 'Camiseta Florzinhas',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camiseta coral com pequenas flores.',
      photos: ['img/pecas/fotos/camiseta-florzinhas-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'camiseta-ramo',
      name: 'Camiseta Ramo',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camiseta branca com desenho de ramo no peito.',
      photos: ['img/pecas/fotos/camiseta-ramo-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'camiseta-decote-v',
      name: 'Camiseta Decote V',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camiseta clara lisa com decote V.',
      photos: ['img/pecas/fotos/camiseta-decote-v-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'regata-terracota',
      name: 'Regata Terracota',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Regata de alças largas, usada com saia-short clara.',
      photos: ['img/pecas/fotos/regata-terracota-1.webp'],
      photoRatio: 0.67
    },
    {
      slug: 'blusa-frente-unica',
      name: 'Blusa Frente Única',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Frente única amarelo claro com franzido no busto.',
      photos: ['img/pecas/fotos/blusa-frente-unica-1.webp'],
      photoRatio: 0.669
    },
    {
      slug: 'regata-renda-preta',
      name: 'Regata Preta com Renda',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Regata com renda no decote, usada com short listrado.',
      photos: ['img/pecas/fotos/regata-renda-preta-1.webp'],
      photoRatio: 0.558
    },
    {
      slug: 'camisa-jeans',
      name: 'Camisa Jeans',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camisa jeans de modelagem ampla.',
      photos: ['img/pecas/fotos/camisa-jeans-1.webp'],
      photoRatio: 0.75
    },
    {
      slug: 'camisa-clara',
      name: 'Camisa Clara',
      category: 'Blusas',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Camisa clara com bolsos, usada com calça jeans.',
      photos: ['img/pecas/fotos/camisa-clara-1.webp'],
      photoRatio: 0.563
    },
    {
      slug: 'short-verde',
      name: 'Short Verde Claro',
      category: 'Calças e shorts',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Short verde claro, usado com regata vermelha.',
      photos: ['img/pecas/fotos/short-verde-1.webp'],
      photoRatio: 0.666
    },
    {
      slug: 'short-terracota',
      name: 'Short Terracota',
      category: 'Calças e shorts',
      price: null,
      sizes: [],
      availability: 'consultar',
      description: 'Short terracota, usado com regata branca.',
      photos: ['img/pecas/fotos/short-terracota-1.webp'],
      photoRatio: 0.75
    }
  ],

  /* Peças da passarela do topo, na ordem em que aparecem (todas precisam de cutout) */
  runwaySlugs: ['vestido-jeans-midi', 'conjunto-rosa-e-marrom', 'blusa-um-ombro', 'vestido-rosa-midi', 'conjunto-colete-caramelo', 'macacao-amarelo'],

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

/* Monta a lista da passarela (usada pelo index.html, app.js e motion.js) */
(function (E) {
  E.runway = E.runwaySlugs
    .map(function (slug) { return E.products.filter(function (p) { return p.slug === slug && p.cutout; })[0]; })
    .filter(Boolean)
    .map(function (p) {
      var height = p.cutoutHeight || 1600;
      return {
        product: p, full: p.cutout, small: p.cutout.replace(/\.(webp|png|jpg)$/i, '-sm.$1'), ratio: p.ratio,
        widthSmall: Math.round(p.ratio * Math.min(900, height)),
        widthFull: Math.round(p.ratio * height),
        cut: !!p.cut,
        pin: p.pin
      };
    });
})(window.ELLAS);
