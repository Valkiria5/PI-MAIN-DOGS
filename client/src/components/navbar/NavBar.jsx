import  SearchBar  from '../SearchBar/SearchBar';
import Orders from '../orders/Orders'
import style from './navbar.module.css';
import TemperamentFilter from '../TemperamentFilter/TemperamentFilter'
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import  {getDogs} from '../../redux/action/action';
const Nav = ({setCurrentPage}) => {
  const temperament = useSelector((state)=> state.temperaments)
  const dispatch = useDispatch(); 
  
  useEffect(() => {
    dispatch(getDogs());
}, [dispatch])

const handleClick = (event) => { // me resetea los perros
  event.preventDefault(); 
  dispatch(getDogs())
}
  return(
    <div className={style.divnavbar}> 
     <button onClick={event => {handleClick(event)}} className={style.buttonhome}>  
            Volver a cargar a los perros
        </button>
      <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
      <Orders></Orders>
      <div className={style.tempfilter}>
            <TemperamentFilter temperament = {temperament} />
        </div>
        <Link to = '/createadog'>
            <button className={style.buttontoform} >Create un dog!</button>
      </Link>
    </div>
  )
}
export default Nav; 
