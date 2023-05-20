import axios from 'axios'; 
import { GET_DOGS, GET_SEARCH, ORDER_BY, ORDER_BY_WEIGHT, GET_TEMPERAMENTS, GET_DETAIL, RES_STATE, FILTER_TEMPERAMENT, POST_FAILURE, POST_REQUEST, POST_SUCCESS} from '../action-types/action-types';


export const getDogs = () =>{ 
    return async function(dispatch){
       let response = await axios ("http://localhost:3001/dogs")
       return dispatch({
        type: GET_DOGS, 
        payload: response.data
    })
  }
} 

export const getBreedsName = (name) => async dispatch =>{
  try{
  await axios.get('http://localhost:3001/dogs?name='+ name)
  .then((response) => {
      dispatch({
          type: GET_SEARCH,
          payload: response.data
      })
  })
} catch (error) { 
  return alert("Raza no encontrada")
}
}

export const OrderBy = (payload) => {
  return {
  type : ORDER_BY,
  payload 
  }
} 

export const OrderByWeight = (payload) => {
    return {
        type:ORDER_BY_WEIGHT,
        payload,
    }
}

export const getTemperaments = () => async dispatch =>{
  try{
      await axios.get('http://localhost:3001/temperaments')
      .then((response) => {
          dispatch({
              type: GET_TEMPERAMENTS,
              payload: response.data
          })            
      })
  } catch (error){
      return (error)
  }
}

export function postDogs(data) {
  return async function(dispatch) {
    dispatch({
      type: POST_REQUEST
    });

    try {
      const create = await axios.post('http://localhost:3001/dogs', data);
      
      if (!create.ok) {
        throw new Error('Error en la solicitud POST');
      }

      dispatch({ type: POST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: POST_FAILURE, payload: error.message });
    }
  };
}

export function resState(){
  return {
      type: RES_STATE,
  }
}

export function getDetail(id){
  return async function(dispatch){
      const json = await axios.get('http://localhost:3001/dogs/'+id)
      return dispatch({
          type: GET_DETAIL,
          payload: json.data,
      })
  }
}  
export const filterTemperament = (payload) => {
  return(dispatch) => {
  return dispatch({
      type: FILTER_TEMPERAMENT,
      payload: payload
  });
}
}
