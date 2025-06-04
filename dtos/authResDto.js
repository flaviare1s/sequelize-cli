module.exports = {
  loginFromEntity: (usuario, token) => {
    return {
      usuario: {
        usuario: usuario.id,
        email: usuario.email,
        role: usuario.role,
        emailVerification: usuario.emailVerification,
      },
      token,
    };
  },
};
