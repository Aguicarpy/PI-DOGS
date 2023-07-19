const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../../db');
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const getApiInfoDog = async () => {
    const apiURL = await axios.get(URL);
    const apiInfo = await apiURL.data.map(({id,name, image, temperament,life_span, weight}) => {
        return { // requiere datos de la API thedogapi.com
            id: id,
            name: name,
            image: image.url,
            temperament: temperament,
            life_span: life_span,
            weight_min: +(weight.metric.slice(0, 2).trim()),
            weight_max: +(weight.metric.slice(4).trim()),
            height_min: +(weight.metric.slice(0, 2).trim()),
            height_max: +(weight.metric.slice(4).trim()),
        };
    });
    return apiInfo;
};

const getDBInfoDog = async () => {
    var dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    return dogsDB;
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfoDog();
    const DBInfo = await getDBInfoDog();
    const infoTotal = apiInfo.concat(DBInfo);
    return infoTotal;
};

module.exports = getAllDogs