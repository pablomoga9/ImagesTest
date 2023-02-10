import React, { useContext, useEffect,useReducer,useState } from 'react';
import CreateImage from './CreateImage';
import styled from 'styled-components';
import { ownListContext } from '../context/ownListContext';
import { userContext } from '../context/userContext';
import axios from 'axios';
import EditImage from './EditImage';
import uuid4 from 'uuid4';
import ReactPaginate from 'react-paginate';

function UserList() {
  const itemsPerPage = 5;
  const {ownList,setOwnList} = useContext(ownListContext);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  
  
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
   
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(ownList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(ownList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,ownList]);

  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % ownList.length;
    setItemOffset(newOffset);
  };
  

  const deleteImage = (i)=>{
    try{
      const remainingImages = ownList.filter((item,j)=>i!==j)
     
      setOwnList(remainingImages);
    }
    catch(error){
      console.log(error)
    }
  }

  


  return (
    <Container>
      <>
        
        <CreateImage/>
        
        <h1>Tus imágenes</h1>
        <ReactPaginate className="paginationItem"
        breakLabel="..."
        nextLabel="Siguiente"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="Anterior"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activateLinkClassName="active"
      />
        <div className='homeList'>
        {currentItems.length>0?currentItems.map((item,i)=>{
          return <div className='homeListItem' key={uuid4()}>
            <h3>{item.title}</h3>
            <img src={item.url} alt="" />
            <div className='itemText'>
            <p><b>Fecha de publicación:</b> {item.date_created}</p>
            <p><b>Descripción:</b> {item.description}</p>
            </div>
            <div className='editButtons'>
              <EditImage key={i} data={item} remove={()=>deleteImage(i)}/>
            </div>
          </div>
        }):<h2>Aún no hay imágenes en tu perfil</h2>}
        </div>
      </>
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
        
      }
      p{
        color: white;
        margin: 0;
      }
    }
  }

`

export default UserList