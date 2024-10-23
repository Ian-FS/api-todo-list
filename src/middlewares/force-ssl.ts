module.exports = () => {
  return async (ctx, next) => {
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
