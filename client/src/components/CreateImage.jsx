import React,{useContext} from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import styled from 'styled-components';
import { userContext } from '../context/userContext';

function CreateImage() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {userLogged,setUserLogged} = useContext(userContext);

    const onSubmit = async (form) => {
        try {
            console.log(userLogged.id)
            let currentDate = new Date().toJSON().slice(0, 10);
            const newForm = {
                ...form,
                user_id:userLogged.id,
                date_created:currentDate
            }
            const res = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/image/createImage`, newForm);
           
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
    
`

export default CreateImage