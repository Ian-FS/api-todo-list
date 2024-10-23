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

  // Adicionando o middleware de redirecionamento HTTPS corretamente
  {
    name: 'forceSSL',
    config: {},
    resolve: async (ctx, next) => {
      if (
        ctx.headers['x-forwarded-proto'] !== 'https' &&
        process.env.NODE_ENV === 'production'
      ) {
        ctx.redirect(`https://${ctx.host}${ctx.url}`);
      } else {
        await next();
      }
    },
  },
];
