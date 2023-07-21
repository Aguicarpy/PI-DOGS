import axios from "axios";
//ACTIONS-TYPES
export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const GET_TEMPERAMENTS_LIST = "GET_TEMPERAMENTS_LIST";
export const GET_DETAILS = "GET_DETAILS";
export const DELETE_DETAILS = "DELETE_DETAILS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_DOGS_BY_TEMP = "GET_DOGS_BY_TEMP";
export const FILTER_BY_MIN_WEIGHT = "FILTER_BY_MIN_WEIGHT";
export const FILTER_BY_MAX_WEIGHT = "FILTER_BY_MAX_WEIGHT";

export function getDogs() {
  return async function (dispatch) {
    try {
        const json = await axios.get("http://localhost:3011/dogs");
        return dispatch({
          type: GET_DOGS,
          payload: json.data,
        });
    } catch (error) {
        console.log('Error al obtener los perros del servidor: ', error)
    }
  };
}

export function getDogsByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3011/dogs?name=${name}`);
      return dispatch({ //lo que enviará al componente para que se monte, evalua primero en el reducer
        type: GET_DOGS_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Perro no encontrado");
        console.error("Error al buscar perro:", error);
      }
    }
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    try {
        const response = await axios.post("http://localhost:3011/dogs", payload);
        return response;
    } catch (error) {
        console.error('Error al enviar el perro: ', error);
    }
  };
}

export function getTemperamentsList() {
  return async function (dispatch) {
    try {
        const json = await axios.get("http://localhost:3011/temperament");
        const listOfTemperaments = json.data.map((el) => el.name);
        return dispatch({//lo que enviará al componente para que se monte, evalua primero en el reducer
          type: GET_TEMPERAMENTS_LIST,
          payload: listOfTemperaments,
        });
    } catch (error) {
        console.log('Error al obtener los temperamentos del servidor: ', error)
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3011/dogs/${id}`);
      return dispatch({//lo que enviará al componente para que se monte, evalua primero en el reducer
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.error('No se puede acceder a la información del perro', error);
    }
  };
}

export function deleteDetails() {
  return async function (dispatch) {
    return dispatch({//lo que enviará al componente para que se monte, evalua primero en el reducer
      type: DELETE_DETAILS,
    });
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function filterDogsByTemperament(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3011/temperament/dog?temperament=${payload}`);
      return dispatch({//lo que enviará al componente para que se monte, evalua primero en el reducer
        type: GET_DOGS_BY_TEMP,
        payload: json.data,
      });
    } catch (error) {
      if(error.response.status === 404){
        alert('No existe un perro asociado a ese temperamento')
        console.error('No hubo coincidencia en la relacion', error);
      }
    }
  };
}

export function filterDogsByMINWeight(payload) {
  return {
    type: FILTER_BY_MIN_WEIGHT,
    payload,
  };
}

export function filterDogsByMAXWeight(payload) {
  return {
    type: FILTER_BY_MAX_WEIGHT,
    payload,
  };
}
