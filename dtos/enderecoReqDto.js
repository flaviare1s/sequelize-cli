module.exports = {
  enderecoToEntity: (body) => {
      return {
        rua: body.rua,
        numero: body.numero,
        cidade: body.cidade,
        estado: body.estado.toUpperCase(),
        cep: body.cep,
        complemento: body.complemento,
      };
  },
};
