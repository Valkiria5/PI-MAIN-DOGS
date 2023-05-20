import { Link } from 'react-router-dom'; 
import React from 'react';
import style from './landingpage.module.css'

export default function LandingPage() {
    return (
        <div>
        <div className={style.divlanding}>
            <h1 className={style.LandingPage}>¡Bienvenidos al Dogs Tour!</h1>
         </div> 
         <div className={style.divbotonlanding}>    
           <Link to={'/home'}>
                    <button className={style.buttonLanding}>SUBMIT</button> 
           </Link>
         </div> 
         <div className={style.divimglanding}>
                 <img src={'https://i.pinimg.com/originals/d2/99/40/d2994005233783287041f6b90980546b.gif'} alt='perro gif' className={style.imglanding}/>
        </div> 
        </div>      
    ) 
}