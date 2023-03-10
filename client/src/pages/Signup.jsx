import React,{useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {userContext} from "../context/userContext";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import AOS from 'aos';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import 'aos/dist/aos.css';
AOS.init();

function Signup() {
  const {register,formState:{errors},handleSubmit} = useForm();
  const {userLogged,setUserLogged} = useContext(userContext);
  const navigate = useNavigate();

  const cookieRead = async()=>{
    try{
      const seeUser = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkUser`, { withCredentials: true });
          
      const userToken = seeUser.data.msg.substr(6, seeUser.data.msg.length);

      const user = await jwt(userToken);
      await setUserLogged(user);
      return user;
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    const checkUser = async()=>{
      try{
        const user = await cookieRead()
        user?navigate('/'):console.log("no user logged")
      }
      catch(error){
        await setUserLogged("")
      }
    }
    checkUser();
  },[])

  const onSubmit = async(form)=>{
    try{
      const res = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/signup`,form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro satisfactorio',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/login")
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <>
     
    <Container>
    <form data-aos="fade-left"  data-aos-duration="2000" className="createForm" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="loginTitle">Registro</h1>
      <label htmlFor="">Escribe un email: </label>
      <input type="text" {
        ...register('email',{
          required:true,
          minLength:3
        })}/>{errors.email?.type==='required'&& <p>El campo 'Email' es requerido</p>}
      <label htmlFor="">Escribe un nombre: </label>
      <input type="text" {
        ...register('name',{
          required:true,
          minLength:3
        })}/>{errors.name?.type==='required'&& <p>El campo 'Nombre' es requerido</p>}
      <label htmlFor="">Escribe una contrase??a: </label>
      <input type="password" {
        ...register('password',{
          required:true,
          minLength:3
        })}/>{errors.email?.type==='required'&& <p>El campo 'Contrase??a' es requerido</p>}
      <input className="btn" type="submit" value="Crear" />
    </form>
    <label htmlFor="">??Ya tienes una cuenta creada?</label>
    <Link to="/login">Iniciar sesi??n</Link>
    </Container>
   
  </>
  )
}

const Container = styled.div`
  form{
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: auto;
    gap: 25px;
    label{
      padding:10px;
      background: #33eeff6b;
      width: 50%;
      margin: auto;
      border-radius: 20px 20px 0px 0px;
    }
    input[type=text], input[type=password]{
      padding: 15px;
      border: 2px solid green;
      background: #f1f1ff;
      border-radius: 0px 0px 20px 20px;
      font-size: 20px;
      color: #064e06;
    }
    .btn{
      padding: 20px;
      background: #3fce3f77;
      border-radius: 20px;
      width: 50%;
      margin: auto;
      color: white;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
      transition: 1s ease;
      border: solid 2px green;
      margin-bottom: 15px;
    }
    .btn:hover{
      background: #c2fdc277;
      color: black;
      border: solid 2px white;
    }
   
   
  }
  a{
      margin: 10px;
      text-decoration: none;
      font-weight: bold;
      color: green;
    }
    a:hover{
      color: #63c063;
    }
`

export default Signup