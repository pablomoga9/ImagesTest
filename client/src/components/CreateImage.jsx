import React,{useContext,useReducer} from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import styled from 'styled-components';
import { userContext } from '../context/userContext';
import { ownListContext } from '../context/ownListContext';
import { useNavigate } from 'react-router-dom';

function CreateImage() {
    const [reducerValue,forceUpdate] = useReducer(x=>x+1,0)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {userLogged,setUserLogged} = useContext(userContext);
    const {ownList,setOwnList} = useContext(ownListContext);
    const navigate = useNavigate();

    const onSubmit = async (form) => {
        try {
            console.log(userLogged.id)
            let currentDate = new Date().toJSON().slice(0, 10);
            const newForm = {
                ...form,
                user_name:userLogged.name,
                user_id:userLogged.id,
                date_created:currentDate
            }
            const res = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/image/createImage`, newForm);
            await setOwnList([...ownList,newForm])
            forceUpdate();
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <form data-aos="fade-left" data-aos-duration="2000" className="createForm" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="loginTitle">Crear Publicación</h1>
                <label htmlFor="">Ingresa una URL de imagen: </label>
                <input type="text" {
                    ...register('url', {
                        required: true,
                        minLength: 3
                    })} />{errors.url?.type === 'required' && <p>El campo 'URL' es requerido</p>}
                <label htmlFor="">Escribe un título: </label>
                <input type="text" {
                    ...register('title', {
                        required: true,
                        minLength: 3
                    })} />{errors.title?.type === 'required' && <p>El campo 'Título' es requerido</p>}
                <label htmlFor="">Escribe una descripción: </label>
                <input type="text" {
                    ...register('description', {
                        required: true,
                        minLength: 3
                    })} />{errors.description?.type === 'required' && <p>El campo 'Descripción' es requerido</p>}
                <input className="sendCreate" type="submit" value="Crear" />
            </form>
        </Container>
    )
}

const Container = styled.div`
    margin-top: 40px;
    form{
      background: #09afbb7b;
      margin-top:30px;
      padding: 15px;
      border-radius: 20px 20px 0px 0px;
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
`

export default CreateImage