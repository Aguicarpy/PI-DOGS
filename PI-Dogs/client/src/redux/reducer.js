import {GET_DOGS,GET_DOGS_BY_NAME,GET_TEMPERAMENTS_LIST,GET_DETAILS,DELETE_DETAILS,ORDER_BY_NAME,ORDER_BY_WEIGHT,FILTER_CREATED,GET_DOGS_BY_TEMP,FILTER_BY_MIN_WEIGHT,FILTER_BY_MAX_WEIGHT} 
from "./actions";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  details: [],
  filteredAndSortedDogs: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        filteredAndSortedDogs: action.payload, // Initialize filtered and sorted dogs with all dogs data
      };
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        allDogs: action.payload,
        filteredAndSortedDogs: action.payload, // Update filtered and sorted dogs with the filtered data
      };
    case GET_DOGS_BY_TEMP:
      return {
        ...state,
        filteredAndSortedDogs: action.payload, // Update filtered and sorted dogs with the filtered data
      };
    case GET_TEMPERAMENTS_LIST:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case DELETE_DETAILS:
      return {
        ...state,
        details: [],
      };
    case ORDER_BY_NAME:
      const sortedArr = action.payload === 'asc' ?
              [...state.dogs].sort(function (a, b) {
                  if (a.name > b.name) { return 1 }
                  if (b.name > a.name) { return -1 }
                  return 0;
              }) :
              [...state.dogs].sort(function (a, b) {
                  if (a.name > b.name) { return -1; }
                  if (b.name > a.name) { return 1; }
                  return 0;
              })
          return {
              ...state,
              filteredAndSortedDogs: sortedArr
          }
    case ORDER_BY_WEIGHT:
          const sortedWeight = action.payload === 'asc' ?
              [...state.dogs].sort(function (a, b) {
                  if(a.weight_min === null) { return 0 }
                  if (a.weight_min < b.weight_min) { return 1 }
                  if (b.weight_min < a.weight_min) { return -1 }
                  return 0;
              }) :
              [...state.dogs].sort(function (a, b) {
                  if(a.weight_min === null) { return 0 }
                  if (a.weight_min < b.weight_min) { return -1; }
                  if (b.weight_min < a.weight_min) { return 1; }
                  return 0;
              })
          return {
              ...state,
              filteredAndSortedDogs: sortedWeight
          }
    case FILTER_CREATED:
      const allDogsFiltered = action.payload === "all" ? state.allDogs : state.allDogs.filter((el) => el.createdInDb === (action.payload === "true"));
      return {
        ...state,
        filteredAndSortedDogs: allDogsFiltered,
      };
    case FILTER_BY_MIN_WEIGHT:
      const minWeightFiltered = action.payload === "all" ? state.allDogs : state.allDogs.filter((el) => el.weight_min >= parseInt(action.payload));
      return {
        ...state,
        filteredAndSortedDogs: minWeightFiltered,
      };
    case FILTER_BY_MAX_WEIGHT:
      const maxWeightFiltered = action.payload === "all" ? state.allDogs : state.allDogs.filter((el) => el.weight_max <= parseInt(action.payload));
      return {
        ...state,
        filteredAndSortedDogs: maxWeightFiltered,
      };
    default:
      return state;
  }
}

export default rootReducer;

