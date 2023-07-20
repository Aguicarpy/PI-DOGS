const {Router} = require('express');
const getDogsId = require('../controllers/crudDogs/getDogId')
const {handlerAllDogs, handlerIdDog, handlerCreateDog} = require('../handlers/dogsHandler')
const routerDog = Router();

routerDog.get('/', handlerAllDogs) //recibe todos los jaguas //OK
routerDog.get('/:id', handlerIdDog) //recibe los jaguas por id //OK
routerDog.post('/', handlerCreateDog) //crea todos los jaguas //OK


module.exports = routerDog;