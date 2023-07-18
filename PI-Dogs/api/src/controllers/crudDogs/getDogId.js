const getAllDogs = require("./getAllDogs");

const getDogId = async (id) => {
  const all_Dogs = await getAllDogs(id);
  const filterDog = await all_Dogs.find((dog) => dog.id.toString() === id);
  return filterDog

}

module.exports = getDogId;