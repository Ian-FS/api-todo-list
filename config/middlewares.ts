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
  {
    name: 'force-ssl',
    resolve: '../src/middlewares/force-ssl',
  },
];
