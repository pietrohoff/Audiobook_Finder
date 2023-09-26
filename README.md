# YouTube Audio Books Search

![YouTube Logo](https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg)

Este projeto é uma aplicação Node.js que permite buscar vídeos relacionados a "audio book" no YouTube e exibi-los em uma página da web. Ele utiliza a API do YouTube Data v3 para realizar buscas e o Express.js para criar um servidor web simples.

## Configuração

Antes de executar este projeto, é necessário configurar a sua chave de API do YouTube Data. Siga estas etapas:

1. Crie uma chave de API do YouTube Data no [Console de Desenvolvedor do Google](https://console.developers.google.com/).

2. Copie a chave de API gerada.

3. Crie um arquivo `config.json` na raiz do projeto com o seguinte formato:

  `
  {
    "youtubeApiKey": "SUA_CHAVE_DE_API_DO_YOUTUBE"
  }
  `
Substitua "SUA_CHAVE_DE_API_DO_YOUTUBE" pela chave de API que você gerou.

## Instalação

Certifique-se de ter o Node.js e o npm instalados no seu sistema. Você pode baixá-los em https://nodejs.org/.


1. Clone este repositório:

  `git clone https://github.com/seu-usuario/seu-repositorio.git
  cd seu-repositorio`  

2. Instale as dependências:

  `npm install`

## USO

Para executar a aplicação, use o seguinte comando:

  `node app.js`

Isso iniciará um servidor local na porta 3000. Você pode acessar os vídeos do YouTube pesquisados em http://localhost:3000/videos no seu navegador.


## Contribuição

Sinta-se à vontade para contribuir para este projeto. Você pode abrir problemas (issues) ou enviar solicitações de recebimento (pull requests) para melhorias, correções de bugs ou novos recursos.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter detalhes.
