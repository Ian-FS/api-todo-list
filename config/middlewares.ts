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
  // Middleware customizado para redirecionamento de HTTP para HTTPS
  async (ctx, next) => {
    if (
      ctx.headers['x-forwarded-proto'] !== 'https' &&
      process.env.NODE_ENV === 'production'
    ) {
      ctx.redirect(`https://${ctx.host}${ctx.url}`);
    } else {
      await next();
    }
  },
];
