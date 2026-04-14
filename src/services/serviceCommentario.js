const { Comentario } = require("../models/comentario");
const { Filme } = require("../models/filmes");



async function comentaFilme(filmeId, comentario, userId) {
  if (!comentario) {
    throw new Error("Comentário é obrigatório");
  }

  if (comentario.length > 200) {
    throw new Error("Comentario muito longo!");
  }

  const filme = await Filme.findOne({ _id: filmeId, user: userId });
  if (!filme) {
    throw new Error("Filme não encontrado na sua lista");
  }

  const jaComentou = await Comentario.findOne({ filme: filmeId, user: userId });
  if (jaComentou) {
    throw new Error("Você já comentou esse filme!");
  }

  const comentarioCriado = await Comentario.create({
    filme: filmeId,
    texto: comentario,
    user: userId,
  });

  return comentarioCriado.populate("user", "nome");
}

async function listaComentarios(filmeId) {
  const comentarios = await Comentario.find({ filme: filmeId })
    .populate("user", "nome")
    .sort({ createdAt: -1 });

  return comentarios;
}

async function deletaComentario(filmeId, userId) {
  const comentario = await Comentario.findOneAndDelete({
    filme: filmeId,
    user: userId,
  });

  if (!comentario) {
    throw new Error("Comentário não encontrado!");
  }

  return comentario;
}

module.exports = { comentaFilme, listaComentarios, deletaComentario };
