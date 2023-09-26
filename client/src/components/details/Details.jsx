import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getDetail, resState } from "../../redux/action/action"
import style from './details.module.css';
const Detail = () => {
    const {id} = useParams()
    const dogsDetail= useSelector((event) => event.detail)
    const dispatch = useDispatch(); 


 useEffect(() => {
     dispatch(getDetail(id));
     dispatch(resState(resState));
 },[dispatch, id])

 return (
     <div >
        <div>
            <Link to= '/home'>
                <button onClick={resState} className= {style.buttonhomedetail}>HOME</button>
            </Link>
        </div>
                <main>
                    <div className={style.divdetail}>
                        <div className={style.divimage}>
                            <img src={dogsDetail.image_url} alt='' className={style.detailimage_url} />
                        </div>
                        <div className={style.detaildivh3}>
                            <h3 className={style.detalid}> ID : {dogsDetail.id} </h3>
                            <h3 className={style.detailname}> NOMBRE : {dogsDetail.name}</h3>
                            <h3 className={style.detailweight}> PESO : {dogsDetail.weight} {dogsDetail.weightMin} - {dogsDetail.weightMax}  </h3>
                             <h3 className={style.detailheight}> ALTURA : {dogsDetail.height} {dogsDetail. heightMin} - {dogsDetail.heightMax}   </h3>
                             <h3 className={style.detailtemperament}> TEMPERAMENTO : {dogsDetail.temperament} {dogsDetail.temperamentName}</h3>
                             <h3 className={style.detaillifespan}> TIEMPO DE VIDA : {dogsDetail.life_span}</h3>
                        </div>
                    </div>
                </main>
           
          
        </div>
 )

}
export default Detail;
