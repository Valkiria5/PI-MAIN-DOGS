import { useDispatch } from "react-redux";
import { OrderBy, OrderByWeight } from "../../redux/action/action";
import { A_Z, Z_A, WEIGHT_MAX, WEIGHT_MIN } from "../../constantes/orenamiento";
import style from './orders.module.css';
const Orders = () => {
    const dispatch = useDispatch();
    
    const onSelectChange=(event) => {
        event.preventDefault();
        dispatch(OrderBy(event.target.value))
    }
    const onSelect=(event) => {
        event.preventDefault();
        dispatch(OrderByWeight(event.target.value))
    }



    return (
        <div>
            <select onChange={onSelectChange} className={style.selectorderaz}>
                <option defaultValue>Ordenado por: </option>
                <option value={A_Z}> A - Z </option>
                <option value= {Z_A}> Z - A </option>
            </select> 
            <select onChange={onSelect} className={style.selectorderweight}>
            <option defaultValue> Peso: </option>
            <option value= 'small'> Peso Mínimo </option>
            <option value= 'big'> Peso Máximo </option> 
             </select>
        </div>
    )
}
export default Orders;