# Meu Projeto — Landing Page Base

Landing page simples, responsiva e fácil de personalizar. Serve como ponto de
partida para qualquer projeto: header, hero com CTA, seção sobre, formulário
de contato com validação e um exemplo de consumo de API (ViaCEP).

## Estrutura de arquivos

```
base/
├── index.html   → estrutura da página (HTML)
├── style.css    → visual, cores e responsividade (CSS)
├── script.js    → interações e lógica (JavaScript)
└── README.md    → este arquivo
```

Os três arquivos são separados de propósito, para ficar fácil de entender e
editar cada parte isoladamente.

## Seções da página

| Seção     | O que tem |
|-----------|-----------|
| Header    | Nome do projeto + menu (Sobre / Contato) |
| Hero      | Título, slogan e botão "Inscreva-se" |
| Sobre     | Texto curto de apresentação |
| Contato   | Formulário (nome, email, mensagem) + consulta de CEP |
| Footer    | Direitos autorais + redes sociais |

## Funcionalidades em JavaScript

- **Botão "Inscreva-se"** — ao clicar, exibe uma mensagem de confirmação na
  tela. Para redirecionar o usuário para outra página no lugar disso, troque
  o conteúdo da função pelo trecho comentado em `script.js`:
  ```js
  window.location.href = "outra-pagina.html";
  ```
- **Formulário de contato** — só é enviado se nome, email e mensagem
  estiverem preenchidos, e se o email tiver um formato válido. Campos vazios
  ou inválidos ficam com a borda vermelha até serem corrigidos.
- **Consulta de CEP** — usa a API pública [ViaCEP](https://viacep.com.br/)
  para buscar o endereço a partir de um CEP digitado pelo usuário.

## Paleta de cores e fontes

| Cor         | Uso                          |
|-------------|-------------------------------|
| `#202a44` Índigo | Header, footer, hero, textos fortes |
| `#f5f3fb` Névoa  | Fundo claro das seções |
| `#b4d65b` Lima   | Botões e destaques |

Fontes: **Sora** (títulos) e **Inter** (textos), ambas via Google Fonts.

## Como usar

1. Baixe os três arquivos e mantenha-os na mesma pasta.
2. Abra o `index.html` no navegador — não precisa de servidor nem instalação.
3. Personalize:
   - Nome do projeto e slogan em `index.html`
   - Cores em `:root` no topo do `style.css`
   - Textos de mensagens e comportamento do CTA em `script.js`

## Personalização rápida

- Trocar o nome "Meu Projeto" → editar `<title>`, `.logo` e `.hero__titulo`
  no `index.html`.
- Trocar a paleta → editar as variáveis dentro de `:root` no `style.css`.
- Adicionar mais campos ao formulário → seguir o padrão de `.form__group`
  já usado para nome, email e mensagem.
