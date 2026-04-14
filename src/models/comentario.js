const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
    maxlength: 200,
  },
  filme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "filme",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comentario = mongoose.model("Comentario", comentarioSchema);
module.exports = { Comentario };
