const {
  getFilmes,
  salvarFilme,
  listarFilmes,
  removerFilme,
} = require("../services/serviceFilme");

// GET /filmes?nome=&ano= — busca filme no TMDB
async function getFilmesController(req, res) {
  const { nome, ano } = req.query;
  try {
    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }
    const filme = await getFilmes(nome, ano);
    return res.status(200).json(filme);
  } catch (error) {
    const status = error.message.includes("Nenhum filme encontrado")
      ? 404
      : 500;
    return res.status(status).json({ erro: error.message });
  }
}

// POST /filmes — salva filme avaliado no MongoDB
async function salvarFilmeController(req, res) {
  try {
    const { tmdbID, titulo, imagem, descricao, ano, nota } = req.body;
    console.log(
      "dados recebidos: ",
      tmdbID,
      titulo,
      imagem,
      descricao,
      ano,
      nota,
    );

    const userId = req.userId;
    const filme = await salvarFilme({
      tmdbID,
      titulo,
      imagem,
      descricao,
      ano,
      nota,
      userId,
    });
    return res.status(201).json({ message: "Filme salvo com sucesso", filme });
  } catch (error) {
    const status = error.message.includes("já foi avaliado") ? 409 : 400;
    return res.status(status).json({ erro: error.message });
  }
}

// GET /filmes/lista — lista filmes avaliados do usuário
async function listarFilmesController(req, res) {
  try {
    const filmes = await listarFilmes(req.userId);
    return res.status(200).json(filmes);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

// DELETE /filmes/:tmdbID — remove filme avaliado
async function removerFilmeController(req, res) {
  try {
    const { tmdbID } = req.params;
    await removerFilme(Number(tmdbID), req.userId);
    return res.status(200).json({ message: "Filme removido com sucesso" });
  } catch (error) {
    const status = error.message.includes("não encontrado") ? 404 : 500;
    return res.status(status).json({ erro: error.message });
  }
}

module.exports = {
  getFilmesController,
  salvarFilmeController,
  listarFilmesController,
  removerFilmeController,
};
