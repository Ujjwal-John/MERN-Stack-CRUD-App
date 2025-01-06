import React, {  useState } from 'react'
import "./Login.css"
import axios from "axios"

const Login = ({setShowLogin, token, setToken}) => {

  const Server_url = "http://localhost:8000"

  

  const [currState,setCurrState] = useState("Login");
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler =(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event) =>{
    event.preventDefault();
    let newUrl = Server_url
    if (currState==="Login") {
      newUrl += "/api/login"
      
    }else{
      newUrl += "/api/register"
    }

    const response = await axios.post(newUrl,data);

    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }


  }

  
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <i onClick={()=>setShowLogin(false)} className="fa-solid fa-xmark"></i>
        </div>
        <div className="login-popup-inputs">
          {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='your password' required />

        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continueing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Alreadyhave an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
        
        

      </form>
    </div>
  )
}

export default Login
