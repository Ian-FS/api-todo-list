import { Middleware } from 'koa'; // Importa o tipo Middleware do Koa

const forceSSL: Middleware = async (ctx, next) => {
  if (
    ctx.headers['x-forwarded-proto'] !== 'https' &&
    process.env.NODE_ENV === 'production'
  ) {
    // Redireciona para HTTPS
    ctx.redirect(`https://${ctx.host}${ctx.url}`);
  } else {
    await next();
  }
};

export default forceSSL;
