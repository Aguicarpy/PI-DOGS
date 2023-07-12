import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3011';
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SEARCH_DOG_NAME = "GET_DOG_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";


export const getDogs = () => {
    const endpoint = '/dogs';
        return async(dispatch) => {
            try {
                let response = await axios.get(endpoint);
                return dispatch({
                    type: GET_DOGS,
                    payload: response.data,
                });
            } catch (error) {
                console.log(error);
            }
        };
};

export const getTemperaments = () => {
        const endpoint = '/temperaments';
        return async(dispatch) => {
            try {
                let response = await axios.get(endpoint);
                return dispatch({
                    type: GET_TEMPERAMENTS,
                    payload: response.data,
                });
                
            } catch (error) {
                console.log(error);
            }
        };
}

export const searchDogName = (name) => {
    const endpoint = `/dogs?name=${name}`
      return async(dispatch)=>{
        try {
            const response = await axios.get(endpoint);
              return dispatch({
                type: SEARCH_DOG_NAME,
                payload: response.data,
              });
        } catch (error) {
            console.log('Dog not found', error);
        }
    }
}

export const getDetail = (id) => {
    const endpoint = `/dogs/${id}`
    return async(dispatch) =>{
        let response = await axios.get(endpoint)
        return dispatch({
            type: GET_DETAIL,
            payload: response.data
        })
    }
}
export const cleanDetail = () =>{
    return ({type: CLEAN_DETAIL})
}

export const createDog = (payload) => {
    const endpoint = '/dogs'
    return async function (dispatch) {
      try {
        const response = await axios.post(endpoint,payload);
        return response;
      } catch (error) {
        console.log(error);
      }
    };
}

export const filterByTemperaments = (payload) => {
    return {
      type: FILTER_BY_TEMPERAMENTS,
      payload,
    };
}
  
export const filterByName = (payload) => {
    return {
      type: FILTER_BY_NAME,
      payload,
    };
}

export const filterByWeight = (payload) => {
    return {
      type: FILTER_BY_WEIGHT,
      payload,
    };
}

export const filterCreated = (payload) => {
    return {
      type: FILTER_CREATED,
      payload,
    };
}