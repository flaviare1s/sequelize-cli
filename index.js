const dotenv = require("dotenv");
const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const enderecoRoutes = require("./routes/enderecoRoutes.js");
const alunoRoutes = require("./routes/alunoRoutes.js");
const PORT = 3000;

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send(`API rodando com Sequelize`);
});

app.use("/usuarios", usuarioRoutes);
app.use("/enderecos", enderecoRoutes);
app.use("/alunos", alunoRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta em http://localhost:${PORT}`);

  try {
    console.log("Conexão estabelecida!");
  } catch (err) {
    console.log("Erro ao se conectar com o banco!", err);
  }
});
