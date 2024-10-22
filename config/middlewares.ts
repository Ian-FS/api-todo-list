export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  {
    name: 'strapi::session',
    config: {
      rolling: true,
      renew: true,
      secure: false,
    },
  },
  'strapi::favicon',
  'strapi::public',
];
