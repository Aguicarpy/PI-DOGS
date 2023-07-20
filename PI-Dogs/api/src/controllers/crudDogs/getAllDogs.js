const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../../db');
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const getApiInfoDog = async () => {
    try {
        const apiURL = await axios.get(URL);
        const apiInfo = await apiURL.data.map(({id,name, image, temperament,life_span, weight, height}) => {
            return { // requiere datos de la API thedogapi.com
                id: id,
                name: name,
                image: image.url,
                temperament: temperament,
                life_span: life_span,
                weight_min: +(weight.metric.slice(0, 2).trim()),
                weight_max: +(weight.metric.slice(4).trim()),
                height_min: +(height.metric.slice(0, 2).trim()),
                height_max: +(height.metric.slice(4).trim()),
            };
        });
        return apiInfo;
    } catch (error) {
        error.response.status === 404 ? console.error('Datos no encontrados') : console.error(error.message)
    }
};

const getDBInfoDog = async () => {
    const dogsDB = await Dog.findAll({ //accede a todos los registros
        include: {
            model: Temperament, //enlazamiento de modelos
            attributes: ['name'],
            through: {
                attributes: [], //solamente el atributo name
            },
            order: [
                ['ASC']
            ],
        }
    });
    return dogsDB;
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfoDog();
    const DBInfo = await getDBInfoDog();
    const infoTotal = apiInfo.concat(DBInfo); //uniÓn de los datos, DB y API
    return infoTotal;
};

module.exports = getAllDogs