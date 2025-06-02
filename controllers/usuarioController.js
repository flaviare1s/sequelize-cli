const usuarioReqDto = require("../dtos/usuarioReqDto");
const usuarioResDto = require("../dtos/usuarioResDto");
const { Usuario } = require("../models");
const bcrypt = require("bcrypt");

exports.criarUsuario = async (req, res) => {
  try {
    // console.log(req.body);
    
    const dados = usuarioReqDto.toEntity(req.body);
    console.log(dados);
    
    const senhaHash = await bcrypt.hash(dados.senha, 12);
    dados.senha = senhaHash;

    const usuario = await Usuario.create(dados);
    res.status(201).json(usuarioResDto.fromEntity(usuario));
  } catch (err) {
    res.status(400).json({ erro: err.mensage });
  }
};
