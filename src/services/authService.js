const { User } = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const registerUser = async (nome, email, senha) => {
  if (!nome || !email || !senha) {
    throw new Error("Nome, email e senha são obrigatórios");
  }
  const userExiste = await User.findOne({ email });
  if (userExiste) {
    throw new Error("Email já cadastrado");
  }
  const hashedPassword = await bcrypt.hash(senha, 10);
  const user = new User({ nome, email, senha: hashedPassword });
  await user.save();
  return user;
};

const loginUser = async ({ email, senha }) => {
  if (!email || !senha) {
    throw new Error("Email e senha são obrigatórios");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuário não encontrado!");
  }
  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) {
    throw new Error("Senha inválida");
  }
  const token = jwt.sign({ userId: user._id, nome: user.nome }, TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return { token, user };
};

module.exports = { loginUser, registerUser };
