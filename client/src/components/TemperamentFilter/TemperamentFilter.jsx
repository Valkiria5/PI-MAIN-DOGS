import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTemperaments, filterTemperament } from "../../redux/action/action";
import style from './temperamentfilter.module.css';

export default function TemperamentFilter(props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTemperaments());
        }, [dispatch])
    
    function onFilterTemperament(event){
        dispatch(filterTemperament(event.target.value))
    }

    return(
        <div>
            <select onChange={onFilterTemperament} className={style.optiontemperamentfilter} >
                <option value='All Temperaments' key='All Temperaments'>All Temperaments</option>
                {props.temperament?.map((el, index)=> (
                    <option value={el.name} key={index}>{el.name}</option>
                ))}
            </select>
        </div>
    )
}
