const getAllDogs = require('./getAllDogs');
// const {Dog} = require('../../db')

const getDogName = async(name) =>{
        const all_Dogs = await getAllDogs(name);
        const dogFilter = await all_Dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      return dogFilter
}
module.exports = getDogName