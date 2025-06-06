const dotenv = require("dotenv");
const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const enderecoRoutes = require("./routes/enderecoRoutes.js");
const alunoRoutes = require("./routes/alunoRoutes.js");
const { GoogleGenerativeAi } = require("@google/generative-ai");

const PORT = 4000;

dotenv.config();

const app = express();
app.use(express.json());

const genIA = new GoogleGenerativeAi(process.env.GEMINI_API_KEY);

app.get("/", (_req, res) => {
  res.send(`API rodando com Sequelize`);
});

app.use("/usuarios", usuarioRoutes);
app.use("/enderecos", enderecoRoutes);
app.use("/alunos", alunoRoutes);
app.use("/auth", authRoutes);

app.use("/gemini", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ erro: "Prompt é obrigatório!" });
  }

  try {
    const model = genIA.getGenerativeModel({model: 'gemini-2.0-flash'})
    const result = await model.generateContent(
      `
      Você é um alienígena, no seu planeta tudo é azul, você vai dar suporte aos meus alunos, com rimas, cada explicação deve rimar e trazer o contexto da sua realidade para essa dúvida sugerida. Essa API gerencia uma escola, então, suas respostas devem estar relacionadas a esse contexto. Nunca inverta respostas. Se não souber a resposta diga: "Não tenho essa informação no momento!"
      ${prompt}
      `
    )

    const resposta = result.response.text();
    return res.json({ result: resposta })
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao gerar conteúdo!' })
  }
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta em http://localhost:${PORT}`);

  try {
    console.log("Conexão estabelecida!");
  } catch (err) {
    console.log("Erro ao se conectar com o banco!", err);
  }
});
