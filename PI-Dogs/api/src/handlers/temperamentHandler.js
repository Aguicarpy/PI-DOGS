const getAllTemps = require('../controllers/crudTemperaments/getTemperaments')
const getAllDogs = require('../controllers/crudDogs/getAllDogs')
const {Temperament} = require('../db')
const axios = require('axios')
const {API_KEY} = process.env

const handlerAllTemps = async(req, res) => {
    // try {
    //     const alltemps = await getAllTemps();
    //     return alltemps ? res.json(alltemps) : res.status(404).json('Temperament not found')
    // } catch (error) {
    //    return res.status(500).json({error: error.message}) 
    // }
    const allData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    try {
        let everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
        /* Set para hacer UNIQUE :: Stackoverflow */
        let eachTemperament = [...new Set(everyTemperament.flat())];
        eachTemperament.forEach(el => {
            if (el) { // temperament : ,
                Temperament.findOrCreate({
                    where: { name: el }
                });
            }
        });
        eachTemperament = await Temperament.findAll();
        res.status(200).json(eachTemperament);
    } catch (error) {
        res.status(404).send(error)
    }
}

const handlerSearchTemperaments = async(req,res) => {
    const { temperament } = req.query;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (temperament === 'all') return everyDog
        else if (dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
        }
    });
    res.status(200).json(dogSearchResult);
}

const handlerPostDog = async(req, res) => {
    try{
    const newTemperament = req.params.temperament;
    const postedTemp = await Temperament.create({
       name: newTemperament,
    });
    return res.status(200).json(postedTemp)
    } catch (error) {
        res.status(404).send(error)
    }
}



module.exports = {handlerAllTemps, handlerSearchTemperaments,handlerPostDog}