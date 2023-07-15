const getAllTemps = require('../controllers/crudTemperaments/getTemperaments')
const apiDogs= require('../controllers/dataDogs/apiDogs')

const handlerAllTemps = async(req, res) => {
    try {
        const alltemps = await getAllTemps();
        return alltemps ? res.json(alltemps) : res.status(404).json('Temperament not found')
    } catch (error) {
       return res.status(500).json({error: error.message}) 
    }
}

const handlerSearchTemperaments = async(req,res) => {
    const { temperament } = req.query;
    const everyDog = await apiDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (temperament === 'all') return everyDog
        else if (dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
        }
    });
    res.status(200).json(dogSearchResult);
}

module.exports = {handlerAllTemps, handlerSearchTemperaments}