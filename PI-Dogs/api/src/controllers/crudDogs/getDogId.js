const getAllDogs = require("./getAllDogs");

const getDogId = async (id) => { //parametro recibida desde el handler
  const all_Dogs = await getAllDogs(id); //busqueda por params
  const filterDog = await all_Dogs.find((dog) => dog.id.toString() === id); //data relacionada por id con el params
  return filterDog

}

module.exports = getDogId;