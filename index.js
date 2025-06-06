const dotenv = require("dotenv");
const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const enderecoRoutes = require("./routes/enderecoRoutes.js");
const alunoRoutes = require("./routes/alunoRoutes.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const PORT = 4000;

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (_req, res) => {
  res.send(`API rodando com Sequelize`);
});

app.use("/usuarios", usuarioRoutes);
app.use("/enderecos", enderecoRoutes);
app.use("/alunos", alunoRoutes);
app.use("/auth", authRoutes);

app.post('/gemini', async (req, res) => {
    const { prompt } = req.body;
    if(!prompt) {
        return res.status(400).json({ erro: 'Prompt é obrigatório!' })
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent(
            `
            Você é um alienigena, seu nome é GTZin, sempre se apresente antes de responder, no seu planeta tudo é azul, e você vai dar suporte aos meus alunos, com rimas, cada explicação deve rimar e trazer o contexto da sua realidade para essa dúvida sugerida.
            Essa API genrencia uma escola, então suas respostas devem estar relacionadas a esse contexto.
            Nunca inverta respostas. Se não souber, diga: "Não tenho essa informação no momento!"
            ${prompt}
            `
        );

        const resposta= result.response.text();
        return res.json({ result: resposta })
    } catch (error) {
        return res.status(400).json({ erro: "Erro ao gerar resposta da AI" })
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
