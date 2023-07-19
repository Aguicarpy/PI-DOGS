const {Router} = require('express');
const routerTemp = Router();
const {handlerAllTemps, handlerSearchTemperaments, handlerPostDog} = require('../handlers/temperamentHandler')

routerTemp.get('/', handlerAllTemps) //trae todos los temperamentos //OK
routerTemp.get('/dog', handlerSearchTemperaments) //para buscar el perro por temperamento //OK
// routerTemp.post('/:temperament', handlerPostDog)

module.exports = routerTemp;