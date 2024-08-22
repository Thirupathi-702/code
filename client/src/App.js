import React,{useEffect} from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import Login from './components/Login/Login.js';
import Signup  from './components/Signup/Signup.js';
import TodoList from './components/StockList/StockList.js';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {authState} from './store/authState.js';

import HomePage from './pages/Homepage.js';
import StockPage from './components/StockPage.js';
import Navbar from './components/Navbar/Navbar.js';



function App(){
  return(
    <RecoilRoot>
      <Router>
      
        <InitState/>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element ={<Signup/>}/>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<TodoList/>} />
          <Route path="/stocks/:symbol" element={<StockPage/>} />
    
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

  
    

function InitState(){
  const setAuth=useSetRecoilState(authState);
  const navigate=useNavigate();
  const init=async()=>{
    const token=localStorage.getItem("token");
    try{
      const response=await fetch("https://backend-hoac.onrender.com/auth/me",{
        headers:{Authorization: `Bearer ${token}`}
      });
      const data=await response.json();
      if(data.username){
        setAuth({token:data.token,username:data.username});
        navigate("/")
      }
      else{
        navigate("/login")
      }

    }
    catch(e){
      navigate("/login")
    }
  }
  useEffect(()=>{
    init();
  },[])
  return <></>
}


export default App
