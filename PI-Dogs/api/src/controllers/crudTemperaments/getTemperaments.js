const { Temperament } = require("../../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getAllTemps = async () => {
    try {
      let temperamentApi = new Set();

      //busca a los temps de la api
      const consultaApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      consultaApi.data.forEach((temp) => {
        let resultTempArray = temp.temperament ? temp.temperament.split(", ") : [];
        resultTempArray.forEach((temp) => temperamentApi.add(temp));
      });
      const temperamentApiResult = Array.from(temperamentApi);

      temperamentApiResult.forEach(async (temperament) => {
        await Temperament.findOrCreate({ where: { name: temperament } });
      });
      const temperamentDb = await Temperament.findAll();
      return temperamentDb;
    } catch (error) {
      console.log(error);
    }
  };

module.exports = getAllTemps;