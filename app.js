const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
const port = 3000;


app.use(express.static(__dirname + '/public'));


const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const apiKey = config.youtubeApiKey;

// Crie um cliente para acessar a API do YouTube
const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
});

// Parâmetros da pesquisa
const searchParams = {
  part: 'snippet', // Inclui informações de snippet
  q: 'audio book', // Termo de pesquisa
  maxResults: 20, // Número máximo de resultados
  relevanceLanguage: 'pt', // Restringe os resultados a vídeos em português
};

// Função para buscar vídeos no YouTube
async function searchYouTubeVideos() {
  try {
    const response = await youtube.search.list(searchParams);

    if (response.data.items && response.data.items.length > 0) {
      const videos = response.data.items;
      return videos;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar vídeos no YouTube:', error.message);
    return [];
  }
}
app.get('/', async (req, res) => {

  let pageTitle = ''; // Defina a variável pageTitle aqui
  let videos = [];    // Defina a variável videos aqui

  try {
    videos = await searchYouTubeVideos();

    if (videos.length > 0) {
      pageTitle = videos[0].snippet.title; // Atualize o pageTitle com o título do primeiro vídeo
    }
  } catch (error) {
    console.error('Erro ao buscar vídeos no YouTube:', error.message);
  }

  res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resultados da pesquisa no YouTube</title>
        <link rel="stylesheet" type="text/css" href="/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
      </head>
      
      <body>
      <div class="gallery-container">
        <iframe class="video-frame" width="560" height="315" src="https://www.youtube.com/embed/${videos[0].id.videoId}" frameborder="0" allowfullscreen></iframe>
        <div class="prev-button" onclick="changeVideo(-1)"><i class="fa-solid fa-chevron-left"></i></div>
        <div class="next-button" onclick="changeVideo(1)"><i class="fa-solid fa-chevron-right"></i></div>
        <h1 id="video-title">${pageTitle || 'Nenhum vídeo encontrado'}</h1>
      </div>
      <script src="https://kit.fontawesome.com/6c596cd6a2.js" crossorigin="anonymous"></script>
      <script>
        let currentVideoIndex = 0;
        const videosData = ${JSON.stringify(videos)}; // Adicione esta linha

        function changeVideo(offset) {
          currentVideoIndex += offset;

          if (currentVideoIndex < 0) {
            currentVideoIndex = 0;
          } else if (currentVideoIndex >= videosData.length) { // Altere para videosData
            currentVideoIndex = videosData.length - 1; // Altere para videosData
          }

          const iframe = document.querySelector('.video-frame');
          iframe.src = 'https://www.youtube.com/embed/' + videosData[currentVideoIndex].id.videoId; // Altere para videosData
          const videoTitle = document.getElementById('video-title');
          videoTitle.textContent = videosData[currentVideoIndex].snippet.title; // Altere para videosData
        }
      </script>
    </body>
      </html>
    `);
});

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});
