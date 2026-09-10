# Validação da primeira versão

Executada em 10/09/2026, localmente, com Node.js e Microsoft Edge/Chromium em modo headless.

## Resultados

- Build de produção concluído: 28 documentos HTML, incluindo 17 páginas de produto, oito categorias, home, catálogo e 404.
- Sete testes automatizados passaram: ausência de contato, mensagens com acentos/caracteres reservados, parsing de links WhatsApp, Instagram seguro, metadados/referências locais e dados sociais dos produtos.
- Home, catálogo e produto testados em 320, 375, 390, 430, 768, 1024, 1366 e 1920 pixels: 24 combinações sem overflow horizontal.
- Todas as 27 páginas do sitemap foram visitadas. Todas as imagens de cada página foram carregadas e decodificadas, sem imagens quebradas.
- Nenhum erro JavaScript ou erro de console durante o percurso automatizado.
- Menu mobile: abertura e navegação para o catálogo verificadas.
- Filtros: Maternidade (3), Buquê de borboletas (1) e Todos (17) verificados, com atualização de contagem.
- Produto: troca de miniatura, abertura da foto ampliada, próxima foto por seta, Escape e restauração de foco verificados.
- Foco por Tab mantido dentro do modal durante dez avanços consecutivos.
- Botão de WhatsApp sem contato configurado abre o aviso previsto.
- Página 404 contém o caminho de retorno para a home.
- Revisão visual de home e produto em desktop e celular com imagens carregadas.
- Home em 1366 pixels com fonte raiz ampliada a 200% permaneceu sem overflow horizontal.

## Performance e acessibilidade implementadas

HTML pré-gerado, ausência de framework no navegador, fontes do sistema sem chamadas externas, fotos WebP responsivas, dimensões declaradas, lazy loading e prioridade para imagem principal. Há HTML semântico, link de pular conteúdo, nomes acessíveis para controles, indicadores de foco, `aria-pressed` nos filtros/miniaturas, contador de resultados anunciado, modais nativos e respeito a movimento reduzido.

## Limites desta validação

- Lighthouse não foi executado; não é alegada uma pontuação 90+. Meça no domínio público após o deploy, preferencialmente em celular e desktop.
- Não houve auditoria formal de acessibilidade com leitor de tela nem testes em aparelhos físicos ou Safari/iOS.
- WhatsApp e Instagram oficiais foram configurados. Links e mensagens de produto foram verificados sem envio de mensagens ou login nos serviços externos.
- O endereço público, o DNS, o certificado HTTPS e o cache social só poderão ser verificados após publicação e configuração nas contas do usuário.
- Uma foto infantil fornecida contém marca d'água diferente; consulte `inventario-fotos.json` e confirme sua utilização antes de publicar.

Para repetir os testes do projeto: `npm run build` e `npm test`. Os testes em navegador foram executados no ambiente de desenvolvimento, sem adicionar dependências ao site entregue.


## Atualização: contatos e música

- Link de catálogo WhatsApp convertido em conversa com `554184079838` e mensagem contextual.
- Instagram oficial aplicado sem o parâmetro de rastreamento.
- Todos os botões de contato da home agora são links oficiais, sem avisos de contato pendente.
- Áudio MP3 de exemplo decodificado e reproduzido no Edge após clique; pausa, estado do botão e ajuste de volume verificados.
- Confirmado volume inicial de 12%, ausência de autoplay e nenhuma requisição MP3 antes do clique.
- Controle de música e WhatsApp flutuante verificados nas oito larguras: sem sobreposição nem overflow horizontal.
- Reprodução externa nas contas WhatsApp/Instagram não foi exercitada; nenhuma mensagem foi enviada.
