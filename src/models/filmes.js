const mongoose = require("mongoose");

const filmeSchema = new mongoose.Schema(
  {
    tmdbID: { type: Number, required: true },
    titulo: { type: String, required: true },
    imagem: { type: String, required: true },
    descricao: { type: String, required: true },
    ano: { type: String, required: true },
    nota: { type: Number, required: true, min: 0, max: 10 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

// Impede que o mesmo usuário avalie o mesmo filme duas vezes
filmeSchema.index({ tmdbID: 1, user: 1 }, { unique: true });

const Filme = mongoose.model("Filme", filmeSchema);
module.exports = { Filme };
