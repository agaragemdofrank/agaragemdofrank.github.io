# Mariella Personalizados

Vitrine estática, sem backend, checkout, cookies de rastreamento ou dependências JavaScript externas. Inclui home, catálogo com filtros, oito categorias, 17 modelos com URLs próprias, miniaturas, lightbox, contatos centralizados e página 404. O build gera HTML completo: o conteúdo é indexável e o catálogo continua navegável sem JavaScript.

## Rodando localmente

Requer Node.js 22 ou superior. Não é necessário executar `npm install`: o projeto usa apenas módulos nativos do Node.

```sh
npm run dev
```

Abra http://127.0.0.1:4173. Após editar os arquivos, execute `npm run build` em outro terminal e atualize a página. O servidor não faz rebuild automático.

```sh
npm run build
npm test
npm run preview
```

`dist/` contém a versão pronta para hospedagem. Os caminhos partem da raiz do domínio: use o domínio personalizado ou um repositório `SEU-USUARIO.github.io`. Uma URL temporária com subdiretório `/nome-do-repositorio/` exige adaptar os caminhos antes do uso.

## Estrutura do projeto

```text
src/config/site.js         Nome, domínio e contatos oficiais
src/data/products.json    Dados dos produtos e imagens
src/data/categories.js    Categorias e fotos representativas
src/lib/contact.js        Links e mensagens de contato
src/styles.css            Identidade visual e responsividade
src/app.js                Menu, filtros, diálogos e galerias
scripts/build.mjs         Componentes e geração das páginas
scripts/serve.mjs         Servidor de prévia local
scripts/optimize-images.py Conversão de imagens para WebP
public/images/            Cópias otimizadas, logo e preview social
tests/                    Contatos, metadados e arquivos locais
.github/workflows/        Publicação automática no GitHub Pages
inventario-fotos.json      Relação entre fotos originais e modelos
dist/                     Resultado gerado; não editar diretamente
```

## Adicionando produtos

1. Coloque as imagens otimizadas em `public/images/produtos/CATEGORIA/SUBCATEGORIA/`.
2. Copie um registro de `src/data/products.json` e preencha `id`, `slug`, `nome`, `categoria`, `subcategoria`, `descricao`, `imagens`, `destaque`, `tags` e `ativo`.
3. Execute `npm run build`. Cards, página individual, galeria e sitemap são gerados automaticamente.

Use `slug` único, apenas letras minúsculas sem acentos, números e hífens. `destaque: true` inclui o modelo na seleção da home (primeiros seis). `ativo: false` o retira do catálogo e do sitemap. Imagens têm `src`, `srcset`, `full`, `alt`, `width` e `height`. Copie as dimensões reais; `srcset` deve informar a largura real de cada arquivo. Cada alt descreve o produto e a variação.

Categorias existentes: `caixa-cenario`, `maternidade`, `infantil`, `adulto`, `datas-comemorativas`, `lembrancinhas`, `buque-borboletas`, `caixa-envelope`. Um produto aparece em uma categoria se o identificador estiver em `categoria`, `subcategoria` ou `tags`.

Para criar uma categoria nova, adicione `{ id, nome, produto }` em `src/data/categories.js`; `produto` é o slug da foto representativa. Subcategorias e tags são livres: por exemplo `setembro-amarelo`, `outubro-rosa`, `pascoa`, `natal`, `dia-das-maes`, `cha-revelacao`, `nascimento` e `aniversario`. Não foram criados produtos fictícios para temas sem foto.

## Adicionando imagens

Os 30 arquivos de produtos foram organizados em 17 grupos por aparência; a imagem restante é o logo. Variações de tema/cor foram reunidas quando apropriado. O arquivo original `.7z` permaneceu intacto. Consulte `inventario-fotos.json` para relacionar as cópias com os nomes originais.

Foi mantida a imagem infantil em montagem fornecida, que apresenta uma marca d'água diferente. A observação consta no inventário para revisão da proprietária antes da publicação. Os agrupamentos descrevem semelhança visual; não afirmam que os itens sejam vendidos em conjunto.

O projeto já inclui WebP em três tamanhos, sem ampliar os originais. Para novas fotos, instale Pillow em seu Python e execute:

```sh
python -m pip install Pillow
python scripts/optimize-images.py "pasta-das-fotos" "public/images/produtos/caixa-cenario/infantil" --prefixo "caixa-cenario-novo-tema"
```

O script preserva os originais, aplica orientação EXIF, remove metadados ao salvar e não sobrescreve arquivos existentes. Ele imprime os arquivos e dimensões para preencher o catálogo. Evite publicar as fotos originais grandes junto com as cópias otimizadas.

Para trocar a imagem social da home, substitua `public/images/hero/mariella-personalizados-social.jpg` por uma foto real autorizada em formato horizontal. Cada produto usa sua própria foto principal no compartilhamento. Não foram usadas imagens de IA ou banco de imagens.

## Alterando WhatsApp

Edite somente `src/config/site.js`. Em `whatsapp`, informe o número oficial com DDI e DDD; ou preencha `whatsappLink` com um link oficial `https://wa.me/NUMERO` ou `https://api.whatsapp.com/send?phone=NUMERO`. Links de catálogo `https://wa.me/c/NUMERO` também são aceitos. Se ambos estiverem preenchidos, o link tem prioridade. Execute o build depois.

Todos os botões usam `src/lib/contact.js`. A mensagem geral vem da configuração; a mensagem do produto inclui automaticamente o nome com URL encoding. O contato oficial fornecido foi configurado: `554184079838`. O link de catálogo `https://wa.me/c/554184079838` é convertido em conversa direta para permitir mensagens personalizadas. Enquanto o contato estiver vazio, os botões abrem um aviso honesto de indisponibilidade e o botão flutuante fica oculto. Assim que configurado, todos passam a abrir o WhatsApp em nova aba.

## Alterando Instagram

O perfil oficial `https://www.instagram.com/mariella.personalizados/` está configurado; o parâmetro de rastreamento do link fornecido foi removido. Para trocar, preencha `instagramLink` com a URL HTTPS oficial ou `instagram` com o @usuário. Faça o build. Header, rodapé, seção social e contato recebem o mesmo link. Sem um perfil fornecido, os botões mostram um aviso; não apontam para uma conta presumida. Não há API de feed.

Outros campos opcionais: e-mail, cidade, estado, endereço, horário e área de atendimento. São exibidos apenas quando preenchidos. O texto institucional pode ser atualizado em `sobre` sem editar componentes.

## Publicando no GitHub Pages

1. Crie um repositório público no GitHub (GitHub Free) e envie o conteúdo desta pasta, incluindo `.github/`. Use a branch `main` ou ajuste o workflow.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.
3. Execute o workflow **Publicar Mariella no GitHub Pages** em **Actions** ou envie um commit para `main`. Ele gera o site, roda os testes e publica `dist/`.
4. Em **Settings → Pages → Custom domain**, salve `mariellapersonalizados.com.br` e configure o DNS conforme abaixo.
5. Depois da validação do domínio e emissão do certificado, habilite **Enforce HTTPS**.

O build inclui `CNAME` com o domínio e `.nojekyll`. O domínio também deve ser configurado nas opções do GitHub Pages. O ZIP entregue inclui a versão compilada para inspeção; o workflow sempre compila novamente a partir do código-fonte. Não depende de serviços pagos.

Não houve publicação em uma conta GitHub nem alteração no Registro.br nesta entrega: nenhum repositório ou acesso foi fornecido. Os arquivos estão preparados para essas etapas.

## Configurando domínio

Domínio canônico: **https://mariellapersonalizados.com.br**. URLs canônicas, sitemap, robots e metadados usam `domain` na configuração. Preços, avaliações, estoque, cidade e políticas não foram inventados. O schema Product não inclui ofertas ou avaliações: não representa uma promessa de resultados enriquecidos de preço no Google.

## Configurando Registro.br

No painel do Registro.br, selecione o domínio e edite a zona DNS do provedor responsável. Se o DNS estiver em outro serviço, altere lá. Cadastre o domínio no GitHub Pages **antes** de apontar os registros.

| Tipo | Nome/host | Destino |
| --- | --- | --- |
| A | raiz (`@`, vazio ou domínio completo, conforme o painel) | 185.199.108.153 |
| A | raiz | 185.199.109.153 |
| A | raiz | 185.199.110.153 |
| A | raiz | 185.199.111.153 |
| CNAME | www | SEU-USUARIO.github.io |

Troque `SEU-USUARIO` pelo usuário ou organização que hospeda o repositório. No CNAME, não inclua `https://` nem o nome do repositório. Revise registros conflitantes da raiz e de `www`; preserve registros de e-mail como MX e TXT. A configuração de ambos permite ao GitHub redirecionar `www` para o domínio canônico. A propagação e emissão do certificado podem levar tempo; confira a validação no painel Pages antes de exigir HTTPS.

Valores conferidos na documentação oficial em 10/09/2026: [domínio personalizado no GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) e [HTTPS no GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https). O primeiro link também apresenta IPv6 opcional e verificação do domínio. Consulte-o novamente se o provedor alterar a configuração.

## Validação e próximos passos

Veja `VALIDACAO.md` para os testes executados e limitações. Os contatos oficiais já estão preenchidos. Antes da publicação comercial, confira os agrupamentos de produtos. Depois de publicar, verifique o domínio, o HTTPS e a prévia de compartilhamento no endereço público; plataformas sociais podem manter cache de imagens antigas.


## Música ambiente

Inclui `public/audio/aconchego-exemplo.mp3`, uma composição sintética de exemplo com 48 segundos, acordes suaves e timbre de teclado, criada para a prévia. Não é uma faixa do Suno. O MP3 tem aproximadamente 751 KB e só é carregado após o visitante clicar em **Ativar música**.

O controle fica no canto inferior esquerdo, com pausa e ajuste de volume. Começa desligado, com volume padrão de 12%. Pausa ao sair da aba. A navegação entre páginas interrompe a faixa; o visitante pode ativá-la novamente. Não há autoplay nem preferência de reprodução salva.

Para colocar a faixa que você gerar no Suno:

1. Salve o MP3 em `public/audio/`, por exemplo `mariella-ambiente.mp3`.
2. Em `src/config/site.js`, altere `music.src` para `/audio/mariella-ambiente.mp3`.
3. Ajuste `music.volume` entre `0` e `1`, se desejar; `0.12` corresponde a 12%.
4. Execute `npm run build` e publique novamente.

Use `music.enabled: false` para remover o controle e o áudio de todas as páginas. O volume percebido depende da masterização do MP3 e do volume do aparelho. A faixa de exemplo também foi gravada com amplitude baixa.
