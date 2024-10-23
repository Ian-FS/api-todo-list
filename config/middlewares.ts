import forceSSL from '../src/middlewares/force-ssl';

export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',

  // Registro do middleware customizado
  {
    name: 'force-ssl',
    resolve: () => forceSSL, // Função que retorna o middleware
    config: {},
  },
];
