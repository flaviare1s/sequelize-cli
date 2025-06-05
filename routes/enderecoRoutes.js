const express = require("express");
const router = express.Router();
const enderecoController = require("../controllers/enderecoController");
const {
  roleMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  enderecoController.criarEndereco
);

module.exports = router;
