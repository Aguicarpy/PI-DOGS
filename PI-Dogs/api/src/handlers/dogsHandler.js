const getAllDogs = require("../controllers/crudDogs/getAllDogs");
const getDogId = require("../controllers/crudDogs/getDogId");
const getDogName = require("../controllers/crudDogs/getDogName");
const postDog = require("../controllers/crudDogs/postDog");
const { Temperament, Dog } = require("../db");


//Handler efectuando manejador a las rutas
const handlerAllDogs = async (req, res) => {
  try {
    const { name } = req.query;
    // Llama a la funcion GetAllDogs que trae todos los perros
    const all_Dogs = await getAllDogs();
    if (name) {
      let nameDog = await getDogName(name); //busqueda hecha por name
      return nameDog.length > 0
        ? res.status(200).json(nameDog)
        : res.status(404).send(`Perro no encontrado`);
    } else {
      return res.json(all_Dogs);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};

const handlerIdDog = async (req, res) => {
  try {
    const { id } = req.params; 

    if (id) {
      let dogId = await getDogId(id); //busqueda hecha por id
      return dogId
        ? res.status(200).json(dogId)
        : res.status(404).send(`Perro con id ${id} no encontrado`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};

const handlerCreateDog = async (req, res) => {
  try {
    const {name,height_min,height_max,weight_min,weight_max,life_span,temperament,image,} = req.body;
    
    if ( name && height_min && height_max && weight_min && weight_max && temperament && image) {
      const createDog = await postDog(name,image,height_max,height_min,weight_min,weight_max,life_span,temperament); //Datos necesarios para crear al perro
      return createDog
        ? res.status(201).json(createDog)
        : res.status(400).send("Faltan datos del perro a crear");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};

module.exports = { handlerAllDogs, handlerIdDog, handlerCreateDog };
