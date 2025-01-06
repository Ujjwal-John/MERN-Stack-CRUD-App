import React, { useEffect, useState } from 'react'
import User from './components/getUser/User'
import './App.css'
import {Routes, Route} from "react-router-dom"
import AddUser from './components/addUser/AddUser'
import Update from './components/UpdateUser/Update'
import Login from './components/LoginPop/Login'

const App = () => {
  const [token,setToken] = useState("")

  useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
  },[])

  const [showLogin,setShowLogin] = useState(false)

  const url="http://localhost:8000"
  
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin} token={token} setToken={setToken}/>:<></>}
      <div className='App'>
        <Routes>
          <Route path='/' element={<User url={url} setShowLogin ={setShowLogin} token={token} setToken={setToken}/>}/>
          <Route path="/add" element={<AddUser url={url}/>}/>
          <Route path="/update/:id" element={<Update url={url}/>}/>

        </Routes>
      </div>
    </>
    
  )
}

export default App
