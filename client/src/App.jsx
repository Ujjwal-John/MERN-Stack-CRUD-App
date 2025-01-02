import React from 'react'
import User from './components/getUser/User'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import AddUser from './components/addUser/AddUser'
import Update from './components/UpdateUser/Update'

const App = () => {

  const url="http://localhost:8000"
  
  const route = createBrowserRouter([
    {
      path:"/",
      element:<User url={url}/>,
    },
    {
      path:"/add",
      element:<AddUser url={url}/>

    },
    {
      path:"/update/:id",
      element:<Update url={url}/>

    },
  ])
  return (
    <div className='App'>
      <RouterProvider router={route}></RouterProvider>
    </div>
  )
}

export default App
