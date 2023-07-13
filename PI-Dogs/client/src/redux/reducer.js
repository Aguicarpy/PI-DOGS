import { GET_DOGS,GET_TEMPERAMENTS, GET_DETAIL, CLEAN_DETAIL, SEARCH_DOG_NAME,FILTER_BY_TEMPERAMENTS,FILTER_CREATED,FILTER_BY_WEIGHT,FILTER_BY_NAME } from './actions'

const initialState ={
    dogs:[],
    displayedDogs:[],
    temperaments: [],
    displayedTemperaments: [],
    dogDetail: {},
    filterDogs: [],
}


const rootReducer = (state =initialState, action) =>{
    switch(action.type){
        case GET_DOGS:
            return{
                ...state, 
                dogs: action.payload, 
                displayedDogs: action.payload
            }

        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload,
                displayedTemperaments: action.payload,
            }

        case SEARCH_DOG_NAME:
            return {
                ...state,
                dogs: action.payload
      }
        case GET_DETAIL:
            return{
                ...state,
                dogDetail: action.payload,
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                dogDetail: {}
            }
            case FILTER_BY_TEMPERAMENTS:
                const allDogs = state.filterDogs;
                const filterDogs =
                  action.payload === "all"
                    ? allDogs
                    : allDogs.filter((dog) => dog.temperament?.includes(action.payload));
                return {
                  ...state,
                  dogs: filterDogs,
                };
              case FILTER_CREATED:
                const allDogsCreated = state.filterDogs;
                const filterCreated =
                  action.payload === "created"
                    ? allDogsCreated.filter((dog) => dog.dataBaseDog)
                    : action.payload === "api"
                    ? allDogsCreated.filter((dog) => !dog.dataBaseDog)
                    : action.payload === "all" && allDogsCreated;
          
                return {
                  ...state,
                  dogs: filterCreated,
                };
              case FILTER_BY_WEIGHT:
                const filterByWeight =
                  action.payload === "desc"
                    ? state.dogs.sort((a, b) => {
                        return b.maxWeight - a.maxWeight;
                      })
                    : state.dogs.sort((a, b) => {
                        return a.maxWeight - b.maxWeight;
                      });
                return {
                  ...state,
                  dogs: filterByWeight,
                };
              case FILTER_BY_NAME:
                const filterByName =
                  action.payload === "az"
                    ? state.dogs.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                      })
                    : state.dogs.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                        return 0;
                      });
                return {
                  ...state,
                  dogs: filterByName,
                };

        
        default:
            return {
                ...state,
            }
            
        }
}



export default rootReducer;