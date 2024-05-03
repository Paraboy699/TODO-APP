// api/index.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: "https://todo-app-oons.onrender.com",
    changeOrigin: true,
  });

  proxy(req, res);
};
