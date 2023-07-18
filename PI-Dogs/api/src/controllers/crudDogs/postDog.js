const {Dog, Temperament} = require('../../db')

const postDog = async(name, image, maxHeight, minHeight, minWeight, maxWeight, age, temperament) => {
   
    const newCreate = await Dog.create({name, image, maxHeight, minHeight, minWeight, maxWeight, age})
    
    // await Dog.findAll({
    //     include: Temperament,
        
    // }) 
    temperament.map(( async (temp) => {
        const findTemp = await Temperament.findAll({
            where: {
                name: temp
            }
        })
        newCreate.addTemperaments(findTemp)
    }))
    return newCreate
}

module.exports = postDog