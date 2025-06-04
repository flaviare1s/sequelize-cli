const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController.js')

router.post("/enderecos", enderecoController.criarEndereco);

module.exports = router;
