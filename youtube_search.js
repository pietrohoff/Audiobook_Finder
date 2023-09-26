const { google } = require('googleapis');
const fs = require('fs');
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
  // videoCategoryId: '24', // ID da categoria "ficção científica"
  // type: 'video', // Defina o tipo como 'video'
};

// Função para buscar vídeos no YouTube
async function searchYouTubeVideos() {
  try {
    const response = await youtube.search.list(searchParams);

    if (response.data.items && response.data.items.length > 0) {
      const videos = response.data.items;

      videos.forEach((video, index) => {
        console.log(`${index + 1}. Título: ${video.snippet.title}`);
        console.log(`   Link: https://www.youtube.com/watch?v=${video.id.videoId}`);
      });
    } else {
      console.log('Nenhum vídeo encontrado na categoria "ficção científica".');
    }
  } catch (error) {
    console.error('Erro ao buscar vídeos no YouTube:', error.message);
  }
}

// Chama a função para buscar vídeos
searchYouTubeVideos();
