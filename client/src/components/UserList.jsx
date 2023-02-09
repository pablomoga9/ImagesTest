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
  const itemsPerPage = 10;
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
          <ReactPaginate className="paginationItem"
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activateLinkClassName="active"
      />
        <CreateImage/>
        <h1>Tus imágenes</h1>
        {currentItems.length>0?currentItems.map((item,i)=>{
          return <div key={uuid4()}>
            <h3>{item.title}</h3>
            <img src={item.url} alt="" />
            <p>{item.date_created}</p>
            <p>{item.description}</p>
            <div className='editButtons'>
              <EditImage key={i} data={item} remove={()=>deleteImage(i)}/>
            </div>
          </div>
        }):null}
      </>
    </Container>
  )
}

const Container = styled.div`
  

`

export default UserList