import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import { useState } from "react";
import { ownListContext } from '../context/ownListContext';
import { userContext } from '../context/userContext';

function EditImage(props){
    const {userLogged,setUserLogged} = useContext(userContext);
    const {register,formState:{errors},handleSubmit} = useForm();
    const {ownList,setOwnList} = useContext(ownListContext);
    const [openForm,setOpenForm] = useState("");

    const deleteImage = async()=>{
        try{
            const res = await axios.delete(`${process.env.REACT_APP_DOMAIN}/api/image/deleteImage/${props.data.id}`);
            props.remove();
        }
        catch(error){
            console.log(error);
        }
    }

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
            
            const applyForm = {
                user_id:userLogged.id,
                url:form.url!==""?form.url:props.data.url,
                description:form.description!==""?form.description:props.data.description,
                date_created:props.data.date_created,
                title:form.title!==""?form.title:props.data.title,
                id:props.data.id
            }
          
          const res = await axios.put(`${process.env.REACT_APP_DOMAIN}/api/image/updateImage/${props.data.id}`,applyForm);
          setOwnList();
        }
        catch(error){
          console.log(error);
        }
      }

    return(
        <Container>
            <>
                <div className='editButtons'>
                        <button onClick={deleteImage}>Borrar</button>
                        <button onClick={openUpdate}>Actualizar</button>
                </div>
                {openForm==="open"?<div>
            <form data-aos="flip-right" className="updateForm" onSubmit={handleSubmit(onSubmit)}>
               <label htmlFor="">Cambiar URL de la imagen:</label>
              <input  type="text" {
                ...register('url')
              }/>
              <label htmlFor="">Cambia el título:</label>
              <input  type="text" {
                ...register('title')
              }/>
              <label htmlFor="">Cambia la descripción:</label>
              <input  type="text" {
                ...register('description')
              }/>
              <input className="sendCreate" type="submit" value="Enviar"/>
            </form>
        </div>:null}
            </>
        </Container>
    )
}

const Container = styled.div`
    
`

export default EditImage;