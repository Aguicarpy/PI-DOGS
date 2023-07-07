const axios = require('axios')
const {API_KEY} = process.env


const apiDogs = async() => { 
    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        // console.log(response);
        const dataDogs = await response.data?.map(({ id, name, life_span, image, height, weight, temperament}) => {
            return{
                id,
                name,
                image: image.url,
                height: height.metric,
                weight: weight.metric,
                age: life_span,
                temperament: temperament ? temperament.split(',').map((temp) => temp.trim()) : [],
            }
        })
        return dataDogs
        
    } catch (error) {
        console.log(('Ocurrió un error:', error.message));
    }
}

module.exports = apiDogs





