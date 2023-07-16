const { Temperament } = require("../../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getAllTemps = async () => {
    try {
     
      //busca a los temps de la api
      const consultaApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

      let everyTemperament = consultaApi.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
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
        return eachTemperament
    } catch (error) {
      console.log(error);
    }
  };

//ACA PODRIA IR MAS PETICIONES A TEMPERAMENTS

module.exports = getAllTemps;