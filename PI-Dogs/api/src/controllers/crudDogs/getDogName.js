const getAllDogs = require('./getAllDogs');
// const {Dog} = require('../../db')

const getDogName = async(name) => { //parametro recibida desde el handler
        const all_Dogs = await getAllDogs(name); //busqueda por query name
        const dogFilter = await all_Dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      return dogFilter
}
module.exports = getDogName