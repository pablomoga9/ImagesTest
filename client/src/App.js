
import './App.css';
import React,{useState} from 'react';
import Main from './Main';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import {BrowserRouter} from 'react-router-dom';
import {userContext} from './context/userContext';
import { ownListContext } from './context/ownListContext';


function App() {
  const [userLogged,setUserLogged] = useState({});
  const [ownList,setOwnList] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{userLogged,setUserLogged}}>
          <ownListContext.Provider value={{ownList,setOwnList}}>
           
            <Header/>
            <Main/>
            
            
          </ownListContext.Provider>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}



export default App;
