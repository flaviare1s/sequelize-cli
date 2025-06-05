const express = require('express');
const alunoController = require('../controllers/alunoController.js');
const { roleMiddleware, authMiddleware } = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware("admin"), alunoController.criarAluno);

module.exports = router;
