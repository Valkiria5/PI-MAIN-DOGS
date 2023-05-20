import  SearchBar  from '../SearchBar/SearchBar';
import Orders from '../orders/Orders'
import style from './navbar.module.css';


const Nav = ({}) => {
  return(
    <div className={style.divnavbar}> 
      <SearchBar></SearchBar>
      <Orders></Orders>
    </div>
  )
}
export default Nav; 
