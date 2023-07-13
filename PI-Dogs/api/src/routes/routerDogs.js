const {Router} = require('express');
const getDogsId = require('../controllers/crudDogs/getDogId')
const {handlerAllDogs, handlerIdDog, handlerCreateDog} = require('../handlers/dogsHandler')
const routerDog = Router();

routerDog.get('/', handlerAllDogs) //recibe todos los jaguas //OK
routerDog.get('/:id', handlerIdDog) //recibe los jaguas por id //OK
routerDog.post('/', handlerCreateDog)

// routerDog.get('/dogs/:id') por params
// routerDog.get('./dogs/name') por query
// routerDog.post('./dogs') por body

module.exports = routerDog;