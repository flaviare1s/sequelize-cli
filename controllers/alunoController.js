const { Endereco, Aluno, Usuario } = require("../models");

const alunoController = {
  async criarAluno(req, res) {
    try {
      const { nome, dataNascimento, usuarioId, endereco} = req.body;
      const novoEndereco = await Endereco.create(endereco);

      const aluno = await Aluno.create({
        nome,
        dataNascimento,
        usuarioId,
        enderecoId: novoEndereco.id,
      });

      const alunoCompleto = await Aluno.findByPk(aluno.id, {
        include: [
          { model: Endereco, as: "endereco" },
          { model: Usuario, as: "usuario" },
        ],
      });

      return res.status(201).json(alunoCompleto);
    } catch (error) {}
  },

  async listarAlunos(req, res) {},
};

module.exports = alunoController;
