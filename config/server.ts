export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('REACT_APP_BACKEND_URL', 'http://localhost:1337'), // Use a URL de produção corretamente
  app: {
    keys: env.array('APP_KEYS', ['myKeyA', 'myKeyB']),
  },
  session: {
    cookie: {
      secure: env.bool('COOKIE_SECURE', env('NODE_ENV') === 'production'), // Assegure que o cookie é seguro apenas em produção
    },
  },
  // Adicione essa seção para forçar HTTPS em produção
  middleware: {
    settings: {
      forceSSL: {
        enabled: env('NODE_ENV') === 'production',
      },
    },
  },
});
