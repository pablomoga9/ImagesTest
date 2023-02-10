import React, { useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";


export default props => {
   
    return (
       
            <>
                
                    <Menu {...props}>
                       
                        <Link className="menu-item" to='/'>
                            Inicio
                        </Link>

                        <Link className="menu-item" to={'/login'}>
                            Inicio sesión
                        </Link>

                        <Link className="menu-item" to={'/signup'}>
                            Registro
                        </Link>
                    </Menu>
            </>
        
    );
};



  