import { Middleware } from 'koa';

const forceSSL: Middleware = async (ctx, next) => {
  if (
    ctx.headers['x-forwarded-proto'] !== 'https' &&
    process.env.NODE_ENV === 'production'
  ) {
    ctx.redirect(`https://${ctx.host}${ctx.url}`);
  } else {
    await next();
  }
};

export default forceSSL;
s