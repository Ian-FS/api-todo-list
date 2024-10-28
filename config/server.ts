export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('REACT_APP_BACKEND_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS', ['myKeyA', 'myKeyB']),
    proxy: true, // Confirmado que o proxy está ativado
  },
  session: {
    cookie: {
      secure: env('NODE_ENV') === 'production', // Força o cookie a ser enviado apenas em HTTPS
      httpOnly: true, // Recomendado para maior segurança
      sameSite: 'lax', // Controle de compartilhamento entre sites
    },
  },
});
