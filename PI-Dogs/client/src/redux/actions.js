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

export function filterDogsByTemperament(payload) {
    return (dispatch, getState) => {
        const allDogs = getState().dogs;
        const allTemps = getState().temperaments; // Obtener la lista de temperamentos del estado
    
        if (payload === 'all') {
          // Si se selecciona "All Temperaments", mostrar todos los perros
          dispatch({ type: 'FILTER_DOGS_BY_TEMPERAMENT', payload: allDogs });
        } else {
          // Filtrar los perros por el temperamento seleccionado
          const filteredDogs = allDogs.filter((dog) =>
            dog.temperament && dog.temperament.includes(payload)
          );
          dispatch({ type: 'FILTER_DOGS_BY_TEMPERAMENT', payload: filteredDogs });
        }
      };
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