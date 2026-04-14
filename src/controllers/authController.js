const { registerUser, loginUser } = require("../services/authService");

const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    await registerUser(nome, email, senha);
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: user._id,
      nome: user.nome,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
