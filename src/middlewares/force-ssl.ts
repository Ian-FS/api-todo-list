const { Middleware } = require('koa');

const forceSSL = async (ctx, next) => {
  if (
    ctx.headers['x-forwarded-proto'] !== 'https' &&
    process.env.NODE_ENV === 'production'
  ) {
    ctx.redirect(`https://${ctx.host}${ctx.url}`);
  } else {
    await next();
  }
};

module.exports = forceSSL;
