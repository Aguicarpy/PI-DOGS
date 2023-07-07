const { Temperament } = require("../../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getAllTemps = async () => {
  try{
    const response = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    response.data.forEach((dog) => {
      if (dog.temperament) {
        let temps = dog.temperament.split(", ");
        //creacion de un array con temperamentos
        temps.forEach((dogTemp) => {
          Temperament.findOrCreate({
            where: { name: dogTemp },
          });
        });
      }
    });
    const alltemps = await Temperament.findAll();
    return alltemps

  } catch (error) {
    if(!tempsFound) throw Error('Error founded')
  }
};

module.exports = getAllTemps;