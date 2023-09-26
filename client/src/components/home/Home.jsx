import React, {  useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import  {getDogs} from '../../redux/action/action';
import HomeCard from '../homecard/Homecard'
import NavBar from '../navbar/NavBar'
import style from './home.module.css';

import { getTemperaments } from "../../redux/action/action";
import { Link } from "react-router-dom";
import Paginado from "../paginado/Paginado";
import { useState } from "react";



const Home = () => {

    const dispatch = useDispatch(); 
    const allDogs = useSelector((state) => state.dogs) //paso la accion

     
 const [currentPage, setCurrentPage] = useState(1);
 const [postPerPage, setPostPerPage] = useState(8);
     
   
 const indexOfLastPost = currentPage * postPerPage;
 const indexOfFirstPost = indexOfLastPost - postPerPage;
 const currentPosts = allDogs.slice(indexOfFirstPost, indexOfLastPost);
//Los índices indexOfLastPost e indexOfFirstPost se utilizan para obtener el rango
// correcto de perros del array original allDogs, 
// y currentPosts contiene los perros que se mostrarán actualmente en la página actual.



const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className={style.divhome}>
        <h1>Dogs Tour</h1>
            </div>
           
      <div className={style.divtempnav}> 
       
        <div className={style.homenavbar}>
            <NavBar
            paginate={paginate}
            setCurrentPage={setCurrentPage}/>
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
        <div className={style.paginadohome}>
        <Paginado
            postPerPage={postPerPage}
            totalPost={allDogs.length}//longitud
            paginate={paginate}
            currentPage={currentPage}
          />  
        </div>
        </div>
       
    )
}
export default Home; 