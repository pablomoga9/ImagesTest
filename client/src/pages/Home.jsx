import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import uuid4 from 'uuid4';

function Home() {
  const [list,setList] = useState([])


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
      <h2>Lista de todas las imágenes y sus usuarios</h2>
      {list.length>0?list.map((item,i)=>{
        return <div key={uuid4()}>
          <h3>{item.title}</h3>
            <img src={item.url} alt="" />
            <p><b>{item.user_name}</b></p>
            <p>{item.date_created}</p>
            <p>{item.description}</p>
        </div>
      }):null}
   </Container>
  )
}

const Container = styled.div`
  
`

export default Home