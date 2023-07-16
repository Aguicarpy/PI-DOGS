const getAllDogs = require('../controllers/crudDogs/getAllDogs');
const getDogId = require('../controllers/crudDogs/getDogId');
const getDogName = require('../controllers/crudDogs/getDogName');
const postDog = require('../controllers/crudDogs/postDog');
const {Temperament, Dog} = require('../db')

//Handler efectuando manejador a las rutas
const handlerAllDogs = async(req, res) => {
    try {
        const { name } = req.query;
        // Llama a la funcion GetAllDogs que trae todos los perros
        const all_Dogs  = await getAllDogs();
    
        if (name) {
          let nameDog = await getDogName(name);
          return nameDog.length > 0 ? res.json(nameDog) : res.status(404).send(`Perro no encontrado`);
        } else {
          return res.json(all_Dogs);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
      }
}

const handlerIdDog = async(req, res) => {
    try {
        const { id } = req.params;
       
        if (id) {
            let dogId = await getDogId(id)
            return dogId ? res.json(dogId) : res.status(404).send(`Perro con ${id} no encontrado`)
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor' });
      }
}

const handlerCreateDog = async(req, res) => {
    const { name, image, maxHeight, minHeight, minWeight, maxWeight, age, temperaments } = req.body;
    if (!name || !maxHeight || !minHeight || !minWeight || !maxWeight) {
        return res.status(400).send(`Ingrese datos en los campos`);
    }
    try {
      const newDog = await postDog(name, image, maxHeight, minHeight, minWeight, maxWeight, age, temperaments);
        if(name){
            return newDog ? res.json(newDog) : res.status(404).send('Coloque nombre del perro')
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
};


module.exports = {handlerAllDogs, handlerIdDog, handlerCreateDog}