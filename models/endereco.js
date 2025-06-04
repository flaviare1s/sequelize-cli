'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Endereco.hasOne(models.Aluno, { foreignKey: 'enderecoId', as: 'alunos' });
      Endereco.hasOne(models.Professor, { foreignKey: 'enderecoId', as: 'professores' });
    }
  }
  Endereco.init({
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    cep: DataTypes.STRING,
    complemento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Endereco',
  });
  return Endereco;
};