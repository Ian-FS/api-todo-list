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

  // Middleware customizado para forçar HTTPS
  {
    name: 'force-ssl',
    config: {
      resolve: forceSSL,
    },
  },
];
