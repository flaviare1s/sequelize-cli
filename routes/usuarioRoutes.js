const express = require('express')
const router = express.Router()
const usuarioController = require("../controllers/usuarioController.js")

router.post('/', usuarioController.criarUsuario)

module.exports = router
