const {Router} = require('express');
const routerTemp = Router();
const {handlerAllTemps, handlerSearchTemperaments} = require('../handlers/temperamentHandler')

routerTemp.get('/', handlerAllTemps) //trae todos los temperamentos //OK
routerTemp.get('/dog', handlerSearchTemperaments)

module.exports = routerTemp;