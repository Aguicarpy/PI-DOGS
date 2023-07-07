const {Dog, Temperament} = require('../../db')

const postDog = async(name, image, height, weight, age, temperament) => {
    const newCreate = await Dog.create({name, image, height, weight, age, temperament})
    
    const temperamentDb = await Temperament.findAll({
        where: {
            name: temperament,
        },
    });
    newCreate.addTemperament(temperamentDb);
    return newCreate
}


module.exports = postDog