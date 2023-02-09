import React,{useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {userContext} from "../context/userContext";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import AOS from 'aos';
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
      await setUserLogged(user.name);
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
      <label htmlFor="">Escribe una contraseña: </label>
      <input type="password" {
        ...register('password',{
          required:true,
          minLength:3
        })}/>{errors.email?.type==='required'&& <p>El campo 'Contraseña' es requerido</p>}
      <input className="sendCreate" type="submit" value="Crear" />
    </form>
   
  </>
  )
}

export default Signup