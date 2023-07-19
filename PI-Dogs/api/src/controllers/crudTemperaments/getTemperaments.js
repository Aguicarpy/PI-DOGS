const axios = require("axios");
const { API_KEY } = process.env;
const { Temperament } = require("../../db");

const getAllTemps = async () => {
    try {
      //busca a los temps de la api
      const allData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

      let everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
        // Set para hacer UNIQUE
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


module.exports = getAllTemps;