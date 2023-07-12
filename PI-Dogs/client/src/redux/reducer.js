import { GET_DOGS,GET_TEMPERAMENTS, GET_DETAIL, CLEAN_DETAIL, SEARCH_DOG_NAME } from './actions'

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
                searchQuery: state.dogs.filter(el => el.name.toLowerCase().includes(action.payload.toLowerCase()))
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


        
        default:
            return {
                ...state,
            }
            
        }
    }






export default rootReducer;