export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  proxy: true,
  port: env.int('PORT', 1337),
  url: env('REACT_APP_BACKEND_URL', 'http://localhost:1337'), // Use a URL de produção corretamente
  app: {
    keys: env.array('APP_KEYS', ['myKeyA', 'myKeyB']),
  },
});
