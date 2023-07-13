const {Dog, Temperament} = require('../../db')

const postDog = async(name, image, maxHeight, minHeight, minWeight, maxWeight, age, temperaments) => {
   
    const newCreate = await Dog.create({name, image, maxHeight, minHeight, minWeight, maxWeight, age})
    
    await Dog.findAll({
        include: Temperament
    })
    newCreate.addTemperaments(temperaments)
    return newCreate
}

module.exports = postDog