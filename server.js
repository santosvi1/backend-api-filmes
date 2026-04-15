require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const routers = require("./src/rotas/filmeRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(routers);

app.get('/', (req, res) =>{
    res.send('API de filmes rodando')
})

app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
