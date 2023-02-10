import React, { useContext, useEffect, useReducer, useState } from 'react';
import Profiles from '../components/UserList'
import styled from 'styled-components'
import { ownListContext } from '../context/ownListContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { userContext } from '../context/userContext';
import { useForm } from 'react-hook-form';
import jwt from 'jwt-decode';

function ProfileContainer() {
  const { ownList, setOwnList } = useContext(ownListContext);
  const { userLogged, setUserLogged } = useContext(userContext);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const [openForm, setOpenForm] = useState("");
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();

  const cookieRead = async () => {
    try {
      const seeUser = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkUser`, { withCredentials: true });

      const userToken = seeUser.data.msg.substr(6, seeUser.data.msg.length);

      const user = await jwt(userToken);
      await setUserLogged(user);
      return user;
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await cookieRead()
        user ? console.log(userLogged.name) : navigate('/login')
      }
      catch (error) {
        await setUserLogged({});
      }
    }
    checkUser();
  }, [])

  useEffect(() => {

    const getOwnList = async () => {
      try {
        if (ownList.length == 0) {
          const res = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/image/getImages/${userLogged.id}`);
          setOwnList(res.data);
          console.log(userLogged)
        }

      }
      catch (error) {
        console.log(error)
      }


    }
    getOwnList();
  }, [ownList, reducerValue])

  const openUpdate = async () => {
    try {
      openForm === "open" ? setOpenForm("") : setOpenForm("open");
    }
    catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (form) => {
    try {
      const newData = ownList;
      const applyForm = {
        name: form.name !== "" ? form.name : userLogged.name,
        picture: form.picture !== "" ? form.picture : userLogged.picture,
        description: form.description !== "" ? form.description : userLogged.picture,
        id: userLogged.id
      }
      const res = await axios.put(`${process.env.REACT_APP_DOMAIN}/api/updateUser/${userLogged.id}`, applyForm);
      await setOwnList(newData);

    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <Container>
      <div className='profileData'>
        <div className='picHeader'>
          <img src={userLogged.picture} alt="" />
          <h1>{userLogged.name}</h1>
        </div>
        <p><b>Descripción: </b>{userLogged.description}</p>
        <button className='openUpdate' onClick={openUpdate}>Actualizar</button>
      
      <div >
        {openForm === "open" ? 
          <form data-aos="flip-right" className="updateForm" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Cambia tu nombre:</label>
            <input type="text" {
              ...register('name')
            } />
            <label htmlFor="">Cambia tu descripción:</label>
            <input type="text" {
              ...register('description')
            } />
            <label htmlFor="">Cambia tu imagen:</label>
            <input type="text" {
              ...register('picture')
            } />
            <input className="sendCreate" type="submit" value="Enviar" />
          </form>
        : null}
      </div>
      </div>
      <Profiles />
    </Container>
  )
}

const Container = styled.div`

    .paginationItem{
      list-style: none;
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: center;
      li{
        a{
          background: #12b31282;
          padding: 5px;
          border-radius: 10px;
          cursor: pointer;
          transition: 1s ease;
          color: white;
        }
        a:hover{
          background: #9ee39e82;
          color: black;
        }
      }
    }
    .openUpdate{
      padding: 10px;
      border-radius: 20px;
      margin-bottom: 20px;
      background: #09afbb7b;
      color: white;
      font-weight: bold;
      border: solid 2px green;
      cursor: pointer;
      transition: 1s ease;
    }
    .openUpdate:hover{
      background: #87e3ea79;
      color: black;
    }
    .updateForm{
      background: #09afbb7b;
      margin-top:30px;
      padding: 15px;
      border-radius: 0px 0px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 80%;
      margin: auto;
      input[type=text]{
      padding: 10px;
      border: 2px solid green;
      background: #f1f1ff;
      border-radius: 0px 0px 20px 20px;
      font-size: 15px;
      color: #064e06;
    }
    input[type=submit]{
     
      padding: 10px;
      background: #3fce3f77;
      border-radius: 20px;
      width: 50%;
      margin: auto;
      color: white;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
      transition: 1s ease;
      border: solid 2px green;
      margin-bottom: 15px;
    }
    input[type=submit]:hover{
      background: #c2fdc277;
      color: black;
      border: solid 2px white;
    }
    }
    .profileData{
        padding: 10px;
        width: 90%;
        background: #1d90b05c;
        border-radius: 20px;
        margin: auto;
        .picHeader{
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          /* margin-left: 40px; */
          margin: auto;
          background: #09afbb7b;
          padding: 20px;
          width: 80%;
          border-radius: 20px 20px 0px 0px;
          img{
            max-width: 50px;
            max-height: 50px;
            border-radius: 10px;
            background: #589e588e;
            padding: 5px;
          }
        }
      
    }

   

`

export default ProfileContainer