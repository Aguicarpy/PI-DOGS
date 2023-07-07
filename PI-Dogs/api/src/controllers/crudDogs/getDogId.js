const getAllDogs = require("./getAllDogs");

const getDogId = async (req, res) => {
  try {
    const { id } = req.params;
    const dogs = await getAllDogs(id);

    if (id) {
      const idDog = await dogs.find((dog) => dog.id === +id);
      return idDog
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDogId;