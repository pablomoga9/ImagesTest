import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import styled from 'styled-components';
import Profiles from './pages/Profiles';

function Main() {
    

    return (
        <Container>
            <main>
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<Login />} path='/login' />
                    <Route element={<Signup />} path='/signup' />
                    <Route element={<Profiles/>} path='/profile/:id'/>
                </Routes>
            </main>
        </Container>
    )
}

const Container = styled.div`
    

`

export default Main