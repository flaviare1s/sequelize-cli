const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController.js");

router.post("/", usuarioController.criarUsuario);
router.post(
  "/solicitar-verificacao",
  usuarioController.solicitarVerificacaoEmail
);
router.post("/verificar-email", usuarioController.verificarEmail);
router.get("/", usuarioController.listarUsuarios);
router.get("/:id", usuarioController.buscarUsuarioPorId);

module.exports = router;
