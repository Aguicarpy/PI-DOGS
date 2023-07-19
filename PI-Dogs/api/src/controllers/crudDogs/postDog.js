const {Dog, Temperament} = require('../../db')

const postDog = async(name, image, height_max, height_min, weight_min, weight_max, life_span, temperament) => {
    const createDog = await Dog.create({name, image, height_max, height_min, weight_min, weight_max, life_span})
    //Se incluyen los temperamentos
    temperament.map(async el => {
        const findTemp = await Temperament.findAll({
            where: { name: el }
        });
        createDog.addTemperament(findTemp);
    })
    return createDog
}

module.exports = postDog