const usuarioReqDto = require("../dtos/usuarioReqDto");
const usuarioResDto = require("../dtos/usuarioResDto");
const { Usuario } = require("../models");
const bcrypt = require("bcrypt");

exports.criarUsuario = async (req, res) => {
  try {
    const dados = usuarioReqDto.toEntity(req.body);

    const senhaHash = await bcrypt.hash(dados.senha, 12);
    dados.senha = senhaHash;

    const usuario = await Usuario.create(dados);
    res.status(201).json(usuarioResDto.fromEntity(usuario));
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    const resultado = usuarios.map(usuarioResDto.fromEntity)
    res.json(resultado)
  } catch (err) {
    res.status(400).json({erro: err.message})
  }
};

exports.buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    res.json(usuarioResDto.fromEntity(usuario));
  } catch (error) {
    res.status(400).json({ erro: err.message });
  }
};
