const {
  comentaFilme,
  listaComentarios,
  deletaComentario,
} = require("../services/serviceCommentario");

async function criarComentarioController(req, res) {
  try {
    const { filmeId, comentario } = req.body;
    const userId = req.userId;

    const comentarioCriado = await comentaFilme(filmeId, comentario, userId);
    res
      .status(201)
      .json({
        message: "Comentário criado com sucesso!",
        comentario: comentarioCriado,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listaComentariosController(req, res) {
  try {
    const filmeId = req.params.filmeId;

    const listaDeComentarios = await listaComentarios(filmeId);

    return res.status(200).json( listaDeComentarios );
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function deletaComentarioController(req, res) {
  try {
    const filmeId = req.params.filmeId;
    const userId = req.userId;

    const deletado = await deletaComentario(filmeId, userId);

    return res
      .status(200)
      .json({
        message: "Comentário deletado com sucesso!",
        comentario: deletado,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {criarComentarioController, listaComentariosController, deletaComentarioController}
