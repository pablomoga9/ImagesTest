import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import styled from 'styled-components';
import ProfileContainer from './pages/ProfileContainer';

function Main() {
    

    return (
        <Container>
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<Login />} path='/login' />
                    <Route element={<Signup />} path='/signup' />
                    <Route element={<ProfileContainer/>} path='/profile/:id'/>
                </Routes>
            
        </Container>
    )
}

const Container = styled.div`
    
   margin-top: 45%;
   html {
  height:100%;
}

body {
  margin:0;
}

.bg {
  animation:slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #c7d296 50%, #fffa6c 50%);
  bottom:0;
  left:-50%;
  opacity:.5;
  position:fixed;
  right:-50%;
  top:0;
  z-index:-1;
}

.bg2 {
  animation-direction:alternate-reverse;
  animation-duration:4s;
}

.bg3 {
  animation-duration:5s;
}
@keyframes slide {
  0% {
    transform:translateX(-25%);
  }
  100% {
    transform:translateX(25%);
  }
}
`

export default Main