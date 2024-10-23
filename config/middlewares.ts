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
  // Referência ao middleware de redirecionamento HTTPS
  {
    name: 'global::force-ssl', // Nome para referenciar o middleware customizado
    config: {}, // Aqui pode ser configurado, se necessário
  },
];
