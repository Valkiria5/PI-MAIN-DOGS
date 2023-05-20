import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedsName,getDogs } from "../../redux/action/action";
import style from './searchbar.module.css';

 const SearchBar = () => {
   const [name, setName] = useState(''); 
   const dispatch = useDispatch();
   
   useEffect(() => {
    dispatch(getDogs())
   },[dispatch]);


   const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value)

    if(name.length>1){
      dispatch(getBreedsName(name));
    } else{
      dispatch(getDogs())
    }
   }

   
  
   return(
    <div>
        <input placeholder="Raza de perro..." className={style.inputsearchbar} onChange={(event) => handleChange(event)} type="search" name="search" value={name}/> 
    </div>
   )

}
export default SearchBar;