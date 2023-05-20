import React, {  useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import  {getDogs} from '../../redux/action/action';
import HomeCard from '../homecard/Homecard'
import NavBar from '../navbar/NavBar'
import style from './home.module.css';
import TemperamentFilter from '../TemperamentFilter/TemperamentFilter'
import { getTemperaments } from "../../redux/action/action";
import { Link } from "react-router-dom";
import Paginado from "../paginado/Paginado";
import { useState } from "react";



const Home = () => {

    const dispatch = useDispatch(); 
    const allDogs = useSelector((state) => state.dogs) //paso la accion
    const temperament = useSelector((state)=> state.temperaments)
    //traernos del estado los personajes cuando dog componente se monta

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])
     
    
     const handleClick = (event) => { // me resetea los personajes
        event.preventDefault(); 
        dispatch(getDogs())
     }
     
 const [currentPage, setCurrentPage] = useState(1);
 const [postPerPage, setPostPerPage] = useState(8);
     
   
 const indexOfLastPost = currentPage * postPerPage;
 const indexOfFirstPost = indexOfLastPost - postPerPage;
 const currentPosts = allDogs.slice(indexOfFirstPost, indexOfLastPost);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className={style.divhome}>
        <h1>Dogs Tour</h1>
            </div>
            <div className={style.paginadohome}>
        <Paginado
            postPerPage={postPerPage}
            totalPost={allDogs.length}
            paginate={paginate}
            currentPage={currentPage}
          />  
        </div>
      <div className={style.divtempnav}> 
        <button onClick={event => {handleClick(event)}} className={style.buttonhome}>  
            Volver a cargar a los perros
        </button>
        <Link to = '/createadog'>
            <button className={style.buttontoform} >Create un dog!</button>
      </Link>
      <div className={style.tempfilter}>
            <TemperamentFilter temperament = {temperament} />
        </div>
        <div className={style.homenavbar}>
            <NavBar
            paginate={paginate}/>
        </div>
       
        </div>
        <div className={style.cardenhome}>
        {
           currentPosts?.map(dog => {
           return(
             <HomeCard 
            key={dog.id}
            id={dog.id}
            name={dog.name} 
            image_url = {dog.image_url}
            weight={dog.weight}
            temperament={dog.temperament}/>
           )})
        }
        </div>

        </div>
       
    )
}
export default Home; 