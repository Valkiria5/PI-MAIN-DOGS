import React from "react";
import style from './paginado.module.css'

export default function Paginado({postPerPage, totalPost, paginate, currentPage}) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++){
        pageNumbers.push(i);
    }


    

    return (
        <div>
               
            <ul className={style.ul}>
                <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1 )} className={style.buttonpaginado}>
                   Prev 
                </button> 
                {pageNumbers.map(number => (
                    <button key={number} onClick={()=> paginate(number)} className={style.buttonpaginado}>
                         
                            {number}
                    </button>                    
                ))}
                <button
                onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)} className={style.buttonpaginado}>
                    Next
                </button> 
            </ul>
                
        </div>
    )
                }