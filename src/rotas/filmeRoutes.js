const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/authController");
const {
  getFilmesController,
  salvarFilmeController,
  listarFilmesController,
  removerFilmeController,
} = require("../controllers/filmeController");
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  criarComentarioController,
  listaComentariosController,
  deletaComentarioController,
} = require("../controllers/comentarioController");

// Auth
router.post("/login", login);
router.post("/register", register);

// Filmes (todas protegidas por JWT)
router.get("/filmes", authMiddleware, getFilmesController); // busca TMDB
router.post("/filmes", authMiddleware, salvarFilmeController); // salva avaliação
router.get("/filmes/lista", authMiddleware, listarFilmesController); // lista avaliados
router.delete("/filmes/:tmdbID", authMiddleware, removerFilmeController); // remove

// Rotas de comentários
router.post("/comentarios", authMiddleware, criarComentarioController);
router.get("/comentarios/:filmeId", authMiddleware, listaComentariosController);

router.delete(
  "/comentarios/:filmeId",
  authMiddleware,
  deletaComentarioController,
);

module.exports = router;
