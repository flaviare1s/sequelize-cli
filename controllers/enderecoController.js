const enderecoReqDto = require("../dtos/enderecoReqDto.js");
const enderecoResDto = require("../dtos/enderecoResDto.js");
const { Endereco } = require("../models");

exports.criarEndereco = async (req, res) => {
  try {
    const dados = enderecoReqDto.enderecoToEntity(req.body);
    const endereco = await Endereco.create(dados);
    res.status(201).json(enderecoResDto.EnderecoFromEntity(endereco));
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
