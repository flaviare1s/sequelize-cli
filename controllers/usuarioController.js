const { Usuario } = require("../models");

exports.criarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.mensage });
  }
};
