const {Router} = require('express');
const routerTemp = Router();
const {handlerAllTemps} = require('../handlers/temperamentHandler')

routerTemp.get('/', handlerAllTemps) //trae todos los temperamentos //OK

module.exports = routerTemp;