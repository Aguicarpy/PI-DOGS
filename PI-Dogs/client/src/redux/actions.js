import axios from 'axios';

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3011/dogs')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function filterDogsByMAXWeight(payload) {
    return {
        type: 'FILTER_BY_MAX_WEIGHT',
        payload
    }
}

export function filterDogsByMINWeight(payload) {
    return {
        type: 'FILTER_BY_MIN_WEIGHT',
        payload
    }
}

export function getDogsByName(name) {
    return async function (dispatch) {
        const { data } = await axios.get(`http://localhost:3011/dogs?name=${name}`);
        return dispatch({
            type: "GET_DOGS_BY_NAME",
            payload: data
        });
    };
}

export function getTemperamentsList() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3011/temperaments');
        var listOfTemperaments = json.data.map(el => el.name)
        return dispatch({
            type: 'GET_TEMPERAMENTS_LIST',
            payload: listOfTemperaments
        });
    }
}

export function postDog(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3011/dogs', payload);
        return response;
    }
}

export function getDogsByBreed(payload) {
  return async function (dispatch) {
      try {
          var json = await axios.get(`http://localhost:3011/breedGroup?breedGroup=${payload}`);
          return dispatch({
              type: 'GET_DOGS_BY_BREED',
              payload: json.data
          })
      } catch (error) {
          console.log(error, "Error on the filters in actions file")
      }
  }
}

export function getBreeds() {
  return async function (dispatch) {
      var json = await axios.get('http://localhost:3011/breedGroups');
      return dispatch({
          type: 'GET_BREEDS',
          payload: json.data
      });
  }
}

export function filterDogsByTemperament(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3011/temperaments/dog?temperament=${payload}`);
            return dispatch({
                type: 'GET_DOGS_BY_TEMP',
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}


export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3011/dogs/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: 'DELETE_DETAILS'
    })
}
}

export const filterDogs = (filters) => {
    return (dispatch, getState) => {
      const { allDogs } = getState(); // Obtener los datos de los perros desde el estado
  
      // Aplicar los filtros y órdenes
      let filteredDogs = allDogs;
  
      if (filters.filterCreatedValue !== "all") {
        // Aplicar filtro por origen
        filteredDogs = filteredDogs.filter(
          (dog) => dog.origin === filters.filterCreatedValue
        );
      }
  
      if (filters.filterTempValue !== "all") {
        // Aplicar filtro por temperamento
        filteredDogs = filteredDogs.filter((dog) =>
          dog.temperaments.includes(filters.filterTempValue)
        );
      }
  
      if (filters.filterMaxWeight !== "all") {
        // Aplicar filtro por peso máximo
        filteredDogs = filteredDogs.filter(
          (dog) => dog.weight_max <= filters.filterMaxWeight
        );
      }
  
      if (filters.filterMinWeight !== "all") {
        // Aplicar filtro por peso mínimo
        filteredDogs = filteredDogs.filter(
          (dog) => dog.weight_min >= filters.filterMinWeight
        );
      }
  
      if (filters.orderBy !== "all") {
        // Aplicar ordenamiento por nombre
        filteredDogs.sort((a, b) => {
          if (filters.orderBy === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      }
  
      if (filters.orderByWeight !== "all") {
        // Aplicar ordenamiento por peso
        filteredDogs.sort((a, b) => {
          if (filters.orderByWeight === "asc") {
            return b.weight_max - a.weight_max;
          } else {
            return a.weight_max - b.weight_max;
          }
        });
      }
  
      // Enviar los perros filtrados al estado
      dispatch({ type: "SET_FILTERED_DOGS", payload: filteredDogs });
    };
  };