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
                minWeight: +(weight.metric.slice(0, 2).trim()),
                maxWeight: +(weight.metric.slice(4).trim()),
                minHeight: +(height.metric.slice(0, 2).trim()) ,
                maxHeight: +(height.metric.slice(4).trim()) ,
                age: life_span,
                temperament: temperament
            }
        })
        const dogDb = await Dog.findAll({
            include: [
              {
                model: Temperament,
                attributes: ["name"], //atributos a traer del modelo
                through: {
                  attributes: [], //medio por las que vendran
                },
              },
            ],
          });
          let apiDogs = [...dogsApi].concat(dogDb);
          return apiDogs;
}

module.exports = apiDogs





