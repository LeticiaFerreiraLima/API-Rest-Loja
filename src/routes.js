const express = require('express');
const routes = express();
const { listProducts, addSale } = require('./controllers/sales')

routes.get('/products', listProducts);
routes.post('/products', addSale);

module.exports = routes;