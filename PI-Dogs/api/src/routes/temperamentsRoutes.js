const {Router} = require('express');
const routerTemp = Router();
const {handlerAllTemps, handlerSearchTemperaments, handlerPostDog} = require('../handlers/temperamentHandler')

routerTemp.get('/', handlerAllTemps) //trae todos los temperamentos //OK
routerTemp.get('/dog', handlerSearchTemperaments) //busqueda del perro por temperamento //OK

module.exports = routerTemp;