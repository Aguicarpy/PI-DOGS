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
  // takes these properties to build the new dog
  let { name,height_min,height_max,weight_min,weight_max,life_span,temperament,image} = req.body;

if(!image){
    try {
        image = await (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message;
    } catch (error) {
        console.log(error)
    }
}

if (name && height_min && height_max && weight_min && weight_max && temperament && image) {
    // takes that data for the new dog  
    const createDog = await Dog.create({
        name: name,
        height_min: parseInt(height_min),
        height_max: parseInt(height_max),
        weight_min: parseInt(weight_min),
        weight_max: parseInt(weight_max),
        life_span: life_span,
        image: image || 'https://dog.ceo/api/breeds/image/random',
    });
    temperament.map(async el => {
        const findTemp = await Temperament.findAll({
            where: { name: el }
        });
        createDog.addTemperament(findTemp);
    })
    res.status(200).send(createDog);
} else {
    res.status(404).send('Data needed to proceed is missing');
}
}


module.exports = {handlerAllDogs, handlerIdDog, handlerCreateDog}