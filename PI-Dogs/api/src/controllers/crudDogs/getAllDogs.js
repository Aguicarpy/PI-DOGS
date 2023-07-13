const apiDogs = require('../dataDogs/apiDogs');
const getAllTemps = require('../crudTemperaments/getTemperaments')

const getAllDogs = async () => {
        try {
                let allDogs = await apiDogs();
                let temperamentDb = await getAllTemps();
                return {
                  all_Dogs: allDogs,
                  DB_Temperament: temperamentDb,
                };
              } catch (error) {
                console.error(error);
              }
        }
module.exports = getAllDogs