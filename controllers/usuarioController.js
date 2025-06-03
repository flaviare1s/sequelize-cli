const usuarioReqDto = require("../dtos/usuarioReqDto");
const usuarioResDto = require("../dtos/usuarioResDto");
const { Usuario } = require("../models");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("../utils/emailService");
const crypto = require("crypto");

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

exports.listarUsuarios = async (_req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    const resultado = usuarios.map(usuarioResDto.fromEntity);
    res.json(resultado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
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

exports.solicitarVerificacaoEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }

    if (usuario.emailVerificado) {
      return res.status(400).json({ erro: "Email já verificado!" });
    }

    const codigoVerificacao = crypto.randomInt(100000, 999999).toString();
    const codigoExpiracao = new Date(Date.now() + 20 * 60 * 1000);

    await usuario.update({
      codigoVerificacao,
      codigoExpiracao,
    });

    const emailEnviado = await sendVerificationEmail(email, codigoVerificacao);
    if (!emailEnviado) {
      res.status(400).json({ erro: "Erro ao enviar verificação!" });
    }

    res.json({ message: "Código de verificação enviado!" });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};
