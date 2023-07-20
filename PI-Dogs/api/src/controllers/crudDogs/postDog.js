const {Dog, Temperament} = require('../../db')

const postDog = async(name, image, height_max, height_min, weight_min, weight_max, life_span, temperament) => { //recibido desde el handler
    const createDog = await Dog.create({name, image, height_max, height_min, weight_min, weight_max, life_span}) //data neceseria para crear a los dogs
    //Se incluyen los temperamentos
    temperament.map(async el => { //mapeo prop temperament
        const findTemp = await Temperament.findAll({ //asegura que incluya la columna name del temperament
            where: { name: el }
        });
        createDog.addTemperament(findTemp); //
    })
    return createDog
}

module.exports = postDog