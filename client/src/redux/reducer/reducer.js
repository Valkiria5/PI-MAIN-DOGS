import { GET_DOGS, GET_SEARCH, ORDER_BY, ORDER_BY_WEIGHT, GET_TEMPERAMENTS, RES_STATE, GET_DETAIL, FILTER_TEMPERAMENT, POST_FAILURE, POST_SUCCESS, POST_REQUEST } from '../action-types/action-types';
import { A_Z, Z_A } from "../../constantes/orenamiento"

const initialState = {
    dogs: [],
    temperaments:[], 
    allDogs: [],
    detail: [],
    loading: false,
    success: false,
    error: null
}


const reducer = (state = initialState, action) => {
       switch(action.type){
        case GET_DOGS: 
         return {
            ...state,
            dogs: action.payload,
            allDogs:action.payload
         }

         
        
        case GET_SEARCH:
         return {
            ...state,
             dogs: action.payload,    
            }
        case ORDER_BY: 

        let orderAz = [...state.dogs]

        orderAz = orderAz.sort((a, b) => {
            switch(action.payload){
                case A_Z:
                    if(a.name < b.name) {
                        return -1;
                    } else return 1
                case Z_A:
                    if(a.name > b.name) {
                        return -1;
                    } else return 1
                }  
        })
        return {
            ...state,
            dogs: orderAz

        } 
        case ORDER_BY_WEIGHT: 
        if( action.payload === 'All'){
            return {
                ...state,
                dogs: [...state.dogs],
            }
        }
        if( action.payload === 'small'){
            return{    
                dogs: [...state.dogs].sort((a, b) =>{
                    let pesoA= parseInt(a.weight);
                    let pesoB= parseInt(b.weight);
                        
                    
                    if(pesoA > pesoB) return 1;
                    if(pesoA < pesoB) return -1;
                    else return 0;
                })
            }
        }
        
            if( action.payload === 'big'){
                
            return {
                dogs: [...state.dogs].sort((a, b) =>{
                    let pesoA= parseInt(a.weight);
                    let pesoB= parseInt(b.weight);

                    if(pesoA < pesoB) return 1;
                    if(pesoA > pesoB) return -1;
                    else return 0;   
                })
            }
        }; 
        break;
        case GET_TEMPERAMENTS:
            return {
                ...state, 
                temperaments: action.payload 
            } 
        case RES_STATE:
            return{
                ...state, 
                detail:[]
            }
        case GET_DETAIL:
            return{
             ...state,
             detail: action.payload
                }
                case FILTER_TEMPERAMENT:
                    
                    //if(action.payload === 'All Temperaments') return {...state, breeds: state.breeds}
                    let aux2 = action.payload === 'All Temperaments' ? state.allDogs : state.allDogs.filter(el => el.temperament?.includes(action.payload))
                    console.log(aux2)                
                    return {
                        ...state,
                        dogs: aux2
                    } 
            case POST_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case POST_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case POST_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };
       default: 
        return {...state}
         
    } 
}


export default reducer; 