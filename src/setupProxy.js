const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://varrockge-api-gw.herokuapp.com/',
      changeOrigin: true,
    })
  );
};