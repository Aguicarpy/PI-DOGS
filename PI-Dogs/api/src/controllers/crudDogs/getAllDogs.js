const apiDogs = require('../dataDogs/apiDogs');
const dbDogs = require('../dataDogs/dbDogs');

const getAllDogs = async () => {
        const api = await apiDogs();
        const db = await dbDogs(); 
        const allDogs = api.concat(db)
        return allDogs
}

module.exports = getAllDogs