const { Router } = require('express');
const routes = Router();
//Se importan las rutas segun el model
const routerDog = require('./routerDogs')
const routerTemp = require('./temperamentsRoutes')


routes.use('/dogs', routerDog)
routes.use('/temperament', routerTemp)

module.exports = routes;
