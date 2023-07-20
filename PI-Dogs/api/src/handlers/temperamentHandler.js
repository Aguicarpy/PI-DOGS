const getAllTemps = require('../controllers/crudTemperaments/getTemperaments')
const getAllDogs = require('../controllers/crudDogs/getAllDogs')
const {Temperament} = require('../db')
const axios = require('axios')
const {API_KEY} = process.env

const handlerAllTemps = async(req, res) => {
    try {
        const alltemps = await getAllTemps()
        return alltemps ? res.status(200).json(alltemps) : res.status(404).send('Temperamento no existente')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}

const handlerSearchTemperaments = async(req,res) => {
    try {
        const { temperament } = req.query;
        const everyDog = await getAllDogs(); //llama a todos los perros
        const dogSearchResult = everyDog.filter((dog) => {
            if (temperament === 'all') return everyDog //recibe todos los temperamentos si la relacion es que hay todos los perros
            else if (dog.temperament) { //temperamento especifico de un perro
                return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
            }
        });
        return dogSearchResult ? res.status(200).json(dogSearchResult) : res.status(404).send('Temperamentos no encontrados')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}


module.exports = {handlerAllTemps, handlerSearchTemperaments,}