const getAllDogs = require('./getAllDogs');
// const {Dog} = require('../../db')

const getDogName = async(name) =>{
        const data = await getAllDogs(name);
        let dogName = null
        if (name) {
            dogName = data.filter((dog) =>
            dog.name.toLowerCase().includes(name.toLowerCase()));
                // if (oneDog.length === 0) return "No dogs with that name found";
            return dogName;
        }
}
module.exports = getDogName