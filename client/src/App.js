
import './App.css';
import React,{useState} from 'react';
import Main from './Main';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter} from 'react-router-dom';
import {userContext} from './context/userContext';

function App() {
  const [userLogged,setUserLogged] = useState("");


  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{userLogged,setUserLogged}}>
          <Header/>
          <Main/>
          <Footer/>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
