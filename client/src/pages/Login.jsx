import React, { useContext,useEffect } from "react";
import {useForm} from 'react-hook-form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {userContext} from "../context/userContext";
import { Link } from "react-router-dom";
import jwt from 'jwt-decode';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import styled from "styled-components";

const Login = ()=>{
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
    const checkUser = async () => {
      try {
         const user = await cookieRead()
         user?navigate('/'):console.log("no user logged")
      }
      catch (error) {
         await setUserLogged({});
      }
  }
  checkUser();
  },[])

  const onSubmit = async(form)=>{
    try{
      const res = await fetch(`${process.env.REACT_APP_DOMAIN}/api/login`,{
        method:'POST',
        body: JSON.stringify(form),
        headers:{
            'Content-Type': 'application/json'
          },
          credentials:'include'
    })
    
      const user = await cookieRead();  
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Bienvenido${user.name}`,
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/')
    }
    catch(error){
      console.log(error);
    }
  }

  return(
    <>
      
     <Container>
     <form data-aos="fade-left"  data-aos-duration="2000" className="createForm" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="loginTitle">Login</h1>   
        <label htmlFor="">Email:</label>
        <input type="text" {
        ...register('email',{
          required:true,
          minLength:3
        })}/>{errors.email?.type==='required'&& <p>El campo 'Email' es requerido</p>}
        <label htmlFor="">Contraseña: </label>
        <input type="password" {
          ...register('password',{
            required:true,
            minLength:3
          })}/>{errors.email?.type==='required'&& <p>El campo 'Contraseña' es requerido</p>}
          <input className="btn" type="submit" value="Iniciar sesión" />
      </form>
      <label htmlFor="">¿Aún no tienes cuenta?</label>
      <Link to={'/signup'}>Crear cuenta</Link>
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

export default Login;