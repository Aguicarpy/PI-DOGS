const axios = require("axios");
const { API_KEY } = process.env;
const { Temperament } = require("../../db");

const getAllTemps = async () => {
    try {
      const allData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`); //busca a los temps de la api

      let everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
        // Set para hacer UNIQUE
        let eachTemperament = [...new Set(everyTemperament.flat())]; //inserción a un nuevo array del mapeo de temperamento
        eachTemperament.forEach(el => {
            if (el) { // temperament : ,
                Temperament.findOrCreate({ //busca/crea el temperamento
                    where: { name: el }
                });
            }
        });
        eachTemperament = await Temperament.findAll(); //busca nuevamente los registros
        return eachTemperament
    } catch (error) {
      error.response.status === 404 ? console.error('Dato no encontrado') : console.error(error.message)
    }
  };


module.exports = getAllTemps;