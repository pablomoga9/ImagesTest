import React, { useContext, useEffect,useReducer,useState } from 'react';
import Profiles from '../components/UserList'
import styled from 'styled-components'
import { ownListContext } from '../context/ownListContext';
import axios from 'axios';
import { userContext } from '../context/userContext';
import {useForm} from 'react-hook-form';

function ProfileContainer() {
const {ownList,setOwnList} = useContext(ownListContext);
const {userLogged,setUserLogged} = useContext(userContext);
const [reducerValue,forceUpdate] = useReducer(x=>x+1,0);
const [openForm,setOpenForm] = useState("");
const {register,formState:{errors},handleSubmit} = useForm();

useEffect(() => {
    
    const getOwnList = async () => {
      try {
        if (ownList.length == 0) {
          const res = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/image/getImages/${userLogged.id}`);
          setOwnList(res.data);

        }

      }
      catch (error) {
        console.log(error)
      }

      
    }
    getOwnList();
  }, [ownList,reducerValue])

  const openUpdate = async()=>{
    try{
      openForm==="open"?setOpenForm(""):setOpenForm("open");
    }
    catch(error){
      console.log(error);
    }
  }

  const onSubmit = async(form)=>{
    try{
    //   const newData = data;
    //   console.log(form.discovery_date)
    //   const applyForm = {
    //     designation:neas.designation,
    //     discovery_date:form.discovery_date,
    //     h_mag:neas.h_mag,
    //     i_deg:neas.i_deg,
    //     moid_au:neas.moid_au,
    //     orbit_class:form.orbit_class,
    //     period_yr:neas.period_yr,
    //     pha:neas.pha,
    //     q_au_1:neas.q_au_1,
    //     q_au_2:neas.q_au_2
    //   }
    //   console.log(applyForm)
    //   const res = await axios.put('http://localhost:3000/api/astronomy/neas/update',applyForm);
    //   setData(newData);
    }
    catch(error){
      console.log(error);
    }
  }


  return (
   <Container>
        <div className='profileData'>
            <img src={userLogged.picture} alt="" />
            <h1>{userLogged.name}</h1>
            <p>{userLogged.description}</p>
            <button onClick={openUpdate}>Actualizar</button>
        </div>
        <div>
        {openForm==="open"?<div>
            <form data-aos="flip-right" className="updateForm" onSubmit={handleSubmit(onSubmit)}>
               <label htmlFor="">Cambia tu nombre:</label>
              <input  type="text" {
                ...register('name')
              }/>
              <label htmlFor="">Cambia tu descripción:</label>
              <input  type="text" {
                ...register('description')
              }/>
               <label htmlFor="">Cambia tu imagen:</label>
              <input  type="text" {
                ...register('picture')
              }/>
              <input className="sendCreate" type="submit" value="Enviar"/>
            </form>
        </div>:null} 
        </div>

        <Profiles/>
   </Container>
  )
}

const Container = styled.div`
    

`

export default ProfileContainer