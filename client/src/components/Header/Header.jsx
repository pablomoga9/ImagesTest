import React, { useEffect, useContext, useReducer } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import jwt from 'jwt-decode';
import axios from 'axios';
import SideBar from "./sidebar";
import SidebarUnlogged from './sidebarUnlogged';
import { ownListContext } from '../../context/ownListContext';

function Header() {
  const { userLogged, setUserLogged } = useContext(userContext);
  const { ownList, setOwnList } = useContext(ownListContext);


  



  useEffect(() => {
    const checkUser = async () => {
      try {
        const seeUser = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkUser`, { withCredentials: true });
        const userToken = seeUser.data.msg.substr(6, seeUser.data.msg.length);

        const user = await jwt(userToken);
        await setUserLogged(user);
        
      }
      catch (error) {
        await setUserLogged({});
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
      <div className='headerUser'>
      {userLogged.name ? <SideBar pageWrapId={"page-wrap"} outerContainerId={"navContainer"} /> : <SidebarUnlogged pageWrapId={"page-wrap"} outerContainerId={"navContainer"} />}
      {userLogged.name ? <div className='picHeader'>
        <img src={userLogged.picture} alt="" />
        <h2>{userLogged.name}</h2>
      </div> : null}
      </div>
    </Container>

  )
}

const Container = styled.div`

  padding: 30px;
  background: rgb(132, 255, 251);
  background: linear-gradient(180deg, #74fffa 0%, rgba(175, 254, 255, 0.762) 52%, rgba(86, 210, 255, 0.152) 100%);
  position: fixed;
  width: 100%;
  margin-top: 0;
  z-index: 1;
  top: 0;
  .button {
  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
}


.button {
  --border-right: 6px;
  --text-stroke-color: rgba(0, 0, 0, 0.6);
  --animation-color: #69c061d0;
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

.button:hover .hover-text {
  width: 100%;
  filter: drop-shadow(0 0 23px var(--animation-color))
}

.bm-burger-button {
    position: relative;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 10px;
  }
  .bm-burger-bars {
    background: #373a47;
  }
  .bm-cross-button {
    height: 30px;
    width: 30px;
    margin-top: 60px;
  }
  .bm-cross {
    background: #2e5764;
  }
  .bm-menu {
    background-image: linear-gradient(to bottom, #3aa8e3dc, #689dc9c1, #c9d8e897, #e0e9f234, #ffffff08);
    padding: 10px;
    font-size: 1.15em;
    margin-top: 60px;
    height: 10px;
    border-radius: 30px 30px 10px 0px;
    overflow: hidden;
    a{
      text-decoration: none;
      color: white;
      margin: 20px;
      padding: 15px;
    }
    a:hover{
      background: #79befe;
      border-radius: 10px;
    }
  }
  .bm-menu::-webkit-scrollbar{
    display: none;
  }
  .bm-morph-shape {
    fill: #373a4700;
  }
  .bm-item-list {
    color: #b8b7ad;
    margin-top: 40px;
  }
  .bm-overlay {
    display: none;
  }

  .headerUser{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    .picHeader{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      img{
        max-width: 30px;
        max-height: 30px;
        border-radius: 120px;
        background: #589e588e;
        padding: 5px;
      }
    }
  }
`

export default Header