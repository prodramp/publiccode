const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/v1',
    proxy({
      target: 'http://localhost:8008',
      changeOrigin: true,
    })
  );
};