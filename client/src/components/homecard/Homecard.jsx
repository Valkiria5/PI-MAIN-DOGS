import React from "react";
import { Link } from "react-router-dom";
import style from './homecard.module.css';
const HomeCard = ({id, image_url, name, weight, temperament, life_span}) => {
    
    return(
        <div className={style.divcard}>
            <div className={style.divcard2}>
                <div className={style.divcard3}>
             <Link to={`/home/${id}`}>
          <img src={image_url} alt={name} className={style.imghomecard}/> 
           </Link>
        <p className={style.pweightcard}>{weight}</p> 
        <p className={style.ptemperamentcard}>{temperament}</p>                
        <p className={style.pnamecard}>{name}</p>
         </div>  
         </div>
        </div>
    )
}
export default HomeCard;