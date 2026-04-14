const { Filme } = require("../models/filmes");
const {comentario} = require("../models/comentario");

// Busca filme na API do TMDB
async function getFilmes(nome, ano) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(nome)}&year=${ano}&language=pt-BR`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  const dados = await response.json();
  if (!dados.results || dados.results.length === 0) {
    throw new Error("Nenhum filme encontrado");
  }
  return dados.results[0];
}

// Salva filme avaliado no MongoDB
async function salvarFilme({
  tmdbID,
  titulo,
  imagem,
  descricao,
  ano,
  nota,
  userId,
}) {
  if (!tmdbID || !titulo || !imagem || !descricao || !nota || !ano || !userId) {
    throw new Error("Dados do filme incompletos");
  }
  if (nota === undefined) {
    throw new Error("Notas são obrigatórias");
  }

  const filmeExistente = await Filme.findOne({ tmdbID, user: userId });
  if (filmeExistente) {
    throw new Error("Este filme já foi avaliado");
  }

  const novoFilme = await Filme.create({
    tmdbID,
    titulo,
    imagem,
    descricao,
    ano,
    nota,
    user: userId,
  });
  return novoFilme;
}

// Lista todos os filmes avaliados pelo usuário
async function listarFilmes(userId) {
  const filmes = await Filme.find({ user: userId }).sort({ createdAt: -1 });
  return filmes;
}

// Remove um filme avaliado pelo usuário
async function removerFilme(tmdbID, userId) {
  const resultado = await Filme.findOneAndDelete({ tmdbID, user: userId });
  if (!resultado) {
    throw new Error("Filme não encontrado");
  }
  return resultado;
}

module.exports = { getFilmes, salvarFilme, listarFilmes, removerFilme };
