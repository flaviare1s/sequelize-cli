'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Aluno.belongsTo(models.Endereco, { foreignKey: 'enderecoId', as: 'endereco' });
      Aluno.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
    }
  }
  Aluno.init({
    nome: DataTypes.STRING,
    dataNascimento: DataTypes.DATE,
    usuarioId: DataTypes.INTEGER,
    enderecoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Aluno',
  });
  return Aluno;
};