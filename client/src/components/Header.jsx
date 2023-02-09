import React,{useEffect,useContext} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { userContext } from '../context/userContext';
import jwt from 'jwt-decode';
import axios from 'axios'

function Header() {
  const { userLogged, setUserLogged } = useContext(userContext);

  useEffect(() => {
    const checkUser = async () => {
        try {
            const seeUser = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkUser`, { withCredentials: true });
            const userToken = seeUser.data.msg.substr(6, seeUser.data.msg.length);

            const user = await jwt(userToken);
            await setUserLogged(user.name);
           
        }
        catch (error) {
           await setUserLogged("");
        }
    }
    checkUser();
}, [])
  return (
    <Container>
      <div>
        <Link data-text="Awesome" className="button" to={'/'}>
          <span className="actual-text">&nbsp;FavImages&nbsp;</span>
          <span className="hover-text" aria-hidden="true">&nbsp;FavImages&nbsp;</span>
        </Link>
      </div>
    </Container>
  )
}

const Container = styled.div`
  
  .button {
  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
}

/* button styling */
.button {
  --border-right: 6px;
  --text-stroke-color: rgba(0, 0, 0, 0.6);
  --animation-color: #37afff;
  --fs-size: 2em;
  letter-spacing: 3px;
  text-decoration: none;
  font-size: var(--fs-size);
  font-family: "Arial";
  position: relative;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px var(--text-stroke-color);
}
/* this is the text, when you hover on button */
.hover-text {
  position: absolute;
  box-sizing: border-box;
  content: attr(data-text);
  color: var(--animation-color);
  width: 0%;
  inset: 0;
  border-right: var(--border-right) solid var(--animation-color);
  overflow: hidden;
  transition: 0.5s;
  -webkit-text-stroke: 1px var(--animation-color);
}
/* hover */
.button:hover .hover-text {
  width: 100%;
  filter: drop-shadow(0 0 23px var(--animation-color))
}
`

export default Header