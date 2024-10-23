import { Middleware, Context, Next } from 'koa';

const forceSSL = (): Middleware => {
  return async (ctx: Context, next: Next) => {
    if (
      ctx.headers['x-forwarded-proto'] !== 'https' &&
      process.env.NODE_ENV === 'production'
    ) {
      ctx.redirect(`https://${ctx.host}${ctx.url}`);
    } else {
      await next();
    }
  };
};

export default forceSSL;
