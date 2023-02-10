import React, { useState,useEffect,useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import uuid4 from 'uuid4';
import {Link} from 'react-router-dom'
import { userContext } from '../context/userContext';

function Home() {
  const [list,setList] = useState([])
  const {userLogged,setUserLogged} = useContext(userContext);

  useEffect(()=>{
    const getAllImages = async()=>{
      try{
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/image/getImages`);
        setList(res.data);
      } 
      catch(error){
        console.log(error)
      }
    }
    getAllImages();
  },[])

  return (
   <Container>
      <div className="homeHeader">
      {userLogged.id?<div className='introduce'>
        <p>Revisa, sube y actualiza tus imágenes desde tu perfil</p>
        <Link className='btn' to={`/profile/${userLogged.id}`}>Ir a Perfil</Link>
      </div>:<div className='introduce'>
        <p>Encuentra las imágenes favoritas de otros usuarios y muestra las tuyas</p>
        <Link className='btn' to={'/signup'}>Crear cuenta</Link></div>}
      <h2>Lista de todas las imágenes y sus usuarios</h2>
      </div>
      <div className='homeList'>
      {list.length>0?list.map((item,i)=>{
        return <div className='homeListItem' key={uuid4()}>
          <h3>{item.title}</h3>
            <img src={item.url} alt="" />
            <div className='itemText'>
            <div className='excludeDescription'>
            <p><b>{item.user_name}</b></p>
            <p><b>Fecha de publicación:</b> {item.date_created}</p>
            </div>
            <p><b>Descripción:</b> {item.description}</p>
            </div>
        </div>
      }):null}
      </div>
   </Container>
  )
}

const Container = styled.div`
  .homeList{
    display: flex;
    flex-direction: column;
    gap: 30px;
    .homeListItem{
      background: #3fbfff46;
      width: 90%;
      margin: auto;
      padding: 20px;
      border-radius: 20px;
      h3{

      }
      img{
        width: 100%;
        border-radius: 20px;
      }
      .itemText{
        
        display: flex;
        flex-direction: row;
        text-align: center;
        border-radius: 0px 0px 20px 20px;
        padding: 20px;
        gap: 20px;
        width: 90%;
        top: 100%;
        justify-content: center;
        margin: auto;
        background: #0233f8b9;

        .excludeDescription{
          display: flex;
          flex-direction: column;
          gap: 30px;
          justify-content: space-around;
        }
        
      }
      p{
        color: white;
        margin: 0;
      }
    }
  }

  .homeHeader{
    width: 90%;
    margin: auto;
    p{
      background: #00b7ff67;
      padding: 10px;
      border-radius: 10px;
      text-align: start;
      font-size: 20px;
    }
    h2{
    margin-top: 0;
    text-align: start;
  }
  .introduce{
    display: flex;
    flex-direction: column;
    .btn {
  margin-left: 60%;
  font-size: 17px;
  background: #5dadc757;
  width: 30%;
  /* margin: auto; */
  border: none;
  padding: 1em 1.5em;
  color: #1c1c1c;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  transition: .5s ease;
  text-decoration: none;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.btn::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: #0666ff;
  border-radius: 10px;
  color: white;
  transition: .5s ease;
}

.btn:hover {
  color: #1e1e2b;
  transition-delay: .5s;
}

.btn:hover::before {
  width: 100%;
}

.btn::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  color: white;
  background-color: #0666ff;
  transition: .4s ease;
  border-radius: 10px;
  z-index: -1;
}

.btn:hover::after {
  height: 100%;
  transition-delay: 0.4s;
  color: aliceblue;
}
  }
  }
 
`

export default Home