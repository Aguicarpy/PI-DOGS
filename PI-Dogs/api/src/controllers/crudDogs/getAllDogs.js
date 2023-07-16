const apiDogs = require('../dataDogs/apiDogs');
const dbDogs = require('../dataDogs/dbDogs')

const getAllDogs = async () => {
  const apiInfo = await apiDogs();
  const dbDogsInfo = await dbDogs();
  const infoTotal = apiInfo.concat(dbDogsInfo);
  return infoTotal;
}
module.exports = getAllDogs