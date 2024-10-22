export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('REACT_APP_BACKEND_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS', ['myKeyA', 'myKeyB']),
  },
  // Configuração da sessão para cookies
  session: {
    cookie: {
      secure: env.bool('COOKIE_SECURE', env('NODE_ENV') === 'production'), // Somente seguro em produção
    },
  },
});
