# Ella's & Co. — boutique virtual (protótipo)

Vitrine digital da Ella's & Co., boutique virtual feminina de Nova Odessa – SP.
O site apresenta as peças, explica o serviço Baggies e leva a cliente ao WhatsApp. Não há carrinho nem pagamento.

Site estático, sem build: HTML, CSS e JavaScript puros.

## Como abrir no computador

Dê dois cliques em `index.html`.

## Como trocar ou adicionar peças

Edite `js/products.js`. Cada peça tem nome, categoria, preço, tamanhos confirmados, descrição e foto sem fundo em `img/pecas/`.
As instruções de cada campo estão no topo do arquivo.

## Ao trocar fotos ou arquivos

- **Cada foto de peça precisa de duas versões** em `img/pecas/`: `nome.webp` (sem fundo, 1600 px de altura) e `nome-sm.webp` (900 px de altura). Para gerar a pequena a partir da grande:

  ```
  ffmpeg -i nome.webp -vf "scale=-2:900:flags=lanczos" -c:v libwebp -quality 86 nome-sm.webp
  ```

  Depois, em `js/products.js`, preencha `photos` e `ratio` (largura ÷ altura da foto grande). O topo do site baixa as 3 primeiras fotos antes de tudo, lendo esse mesmo arquivo; não há nada a ajustar à mão.
- **Depois de mudar `css/`, `js/` ou `index.html`**, troque o número depois de `?v=` nas linhas do `index.html` (por exemplo `?v=20261122j` para `?v=20261123a`). Assim os visitantes baixam a versão nova em vez de usar a antiga guardada no navegador.
- **Fontes** ficam em `fonts/` (Cormorant Garamond e Manrope, licença OFL) e são carregadas do próprio site.

## Estrutura

```
index.html        página
css/styles.css    estilos (paleta café & creme)
fonts/            fontes do site (WOFF2)
js/products.js    catálogo das peças
js/app.js         passarela, filtros, página da peça, WhatsApp
js/figures.js     ilustração reserva para peças ainda sem foto
img/pecas/        fotos das peças sem fundo (WebP): grande e -sm (900 px)
img/insta/        fotos da vitrine do Instagram
img/marca/        imagem da Collection Bag (Baggies)
```

> Protótipo: preços ilustrativos. Fotos das publicações do Instagram @ellas.eco.
