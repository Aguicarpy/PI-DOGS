const { Router } = require('express');
const routes = Router();
//Se importan las rutas segun el model
const routerDog = require('./routerDogs')
const routerTemp = require('./temperamentsRoutes')


routes.use('/dogs', routerDog)
routes.use('/temperaments', routerTemp)

module.exports = routes;
