const getAllDogs = require('../controllers/crudDogs/getAllDogs');
const getDogId = require('../controllers/crudDogs/getDogId');
const getDogName = require('../controllers/crudDogs/getDogName');
const postDog = require('../controllers/crudDogs/postDog');
const {Temperament} = require('../db')
//Handler efectuando manejador a las rutas
const handlerAllDogs = async(req, res) => {
    try {
        const allDogs = await getAllDogs();
        return allDogs ? res.json(allDogs) : res.status(404).json('No hay perros ni en la api ni en la database');
    }catch (error) {
    return res.status(500).json(error.message);
 }
}

const handlerIdDog = async(req, res) => {
    try {
        const { id } = req.params;
        const dogs = await getAllDogs(id); //EJECUCIÓN POR ID
        if (id) {
          const idDog = await dogs.find((dog) => dog.id === +id);
          return idDog ? res.json(idDog) : res.status(404).json('Dog by id not found')
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

const handlerNameDog = async(req, res) => {
    try {
        const {name} = req.query
        const dogName = await getDogName(name); //EJECUCIÓN POR NAME
        return dogName ? res.json(dogName) : res.status(404).json('Raza no encontrada');
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const handlerCreateDog = async(req, res) => {
    try {
      const { name, image, height, weight, age, temperament } = req.body;
      const newDog = await postDog(name, image, height, weight, age, temperament);
        if(name){
            return newDog ? res.json(newDog) : res.status(404).send('Coloque nombre del perro')
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};



module.exports = {handlerAllDogs, handlerIdDog, handlerNameDog, handlerCreateDog}