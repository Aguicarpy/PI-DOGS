const axios = require("axios");
const { API_KEY } = process.env;

const apiDogs = async () => {
  const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const dogsApi = await response.data?.map(({ id, name, life_span, image, height, weight, temperament }) => {
      return {
        id,
        name,
        image: image.url,
        minWeight: parseInt(weight.metric.slice(0, 2).trim()),
        maxWeight: parseInt(weight.metric.slice(4).trim()),
        minHeight: parseInt(height.metric.slice(0, 2).trim()),
        maxHeight: parseInt(height.metric.slice(4).trim()),
        age: life_span,
        temperament: temperament,
      };
    }
  );
  return dogsApi;
};

module.exports = apiDogs;
