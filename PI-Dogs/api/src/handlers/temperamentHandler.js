const getAllTemps = require('../controllers/crudTemperaments/getTemperaments')


const handlerAllTemps = async(req, res) => {
    try {
        const alltemps = await getAllTemps();
        return alltemps ? res.json(alltemps) : res.status(404).json('Temperament not found')
    } catch (error) {
       return res.status(500).json({error: error.message}) 
    }
}

module.exports = {handlerAllTemps}