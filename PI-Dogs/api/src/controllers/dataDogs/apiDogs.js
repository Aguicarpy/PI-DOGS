const axios = require('axios')
const {API_KEY} = process.env
const {Temperament, Dog} = require('../../db') 

const apiDogs = async() => { 
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        // console.log(response);
        const dogsApi = await response.data?.map(({ id, name, life_span, image, height, weight, temperament}) => {
            return{
                id,
                name,
                image: image.url,
                minWeight: weight.metric.slice(0, 2).replace(" ", ""),
                maxWeight: weight.metric.slice(4).replace(" ", ""),
                minHeight: height.metric.slice(0, 2).replace(" ", ""),
                maxHeight: height.metric.slice(4).replace(" ", ""),
                age: life_span,
                temperament: temperament ? temperament.split(',').map((temp) => temp.trim()) : [],
            }
        })
        const dogDb = await Dog.findAll({
            include: [
              {
                model: Temperament,
                attributes: ["name"],
                through: {
                  attributes: [],
                },
              },
            ],
          });
          let apiDogs = [...dogsApi].concat(dogDb);
          return apiDogs;
}

module.exports = apiDogs





