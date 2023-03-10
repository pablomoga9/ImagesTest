import React, { useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";

export default props => {
    const { userLogged, setUserLogged } = useContext(userContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
           
            await setUserLogged({});
            document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
            window.location.reload();
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <>
                <Menu {...props}>
                    <Link className="menu-item" to='/'>
                        Inicio
                    </Link>

                    <Link className="menu-item" to={`/profile/${userLogged.id}`}>
                        Perfil
                    </Link>

                    <Link className="menu-item" onClick={handleLogout}>
                        Cerrar sesión
                    </Link>
                </Menu>
                   
            </>
        </Container>
    );
};


const Container = styled.div`
    
  `