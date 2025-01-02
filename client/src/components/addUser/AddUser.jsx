import React, {useState} from 'react'
import "./AddUser.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from "react-hot-toast"

const AddUser = ({url}) => {

  

  

    const users = {
        name: "",
        email: "",
        address: "",
        profileImage: null,
    };
    const [user, setUser] = useState(users)
    const navigate = useNavigate();

    const inputHandler = (e) =>{
        const {name, value }= e.target
        setUser({...user, [name]: value});
    };

    // Handle file input changes
    const fileHandler = (e) => {
        setUser({ ...user, profileImage: e.target.files[0] });
    };

    const submitForm = async(e)=>{
        e.preventDefault();

        // Create FormData to handle file and other user inputs
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('address', user.address);
        if (user.profileImage) {
        formData.append('profileImage', user.profileImage);
        }
        await axios.post(`${url}/api/user`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
        .then((response)=>{
            toast.success(response.data.message, {position: "top-right"});
            navigate("/");
        })
        .catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div className='addUser'>
        <Link to="/" type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i> Back</Link>

      <h3>Add New User</h3>
      <form action="" className='addUserform' onSubmit={submitForm}>
        <div className="inputGroup">
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' onChange={inputHandler} name='name' autoComplete='on' placeholder='Enter your Name' />
        </div>
        <div className="inputGroup">
            <label htmlFor="name">email:</label>
            <input type="text" id='email' onChange={inputHandler} name='email' autoComplete='on' placeholder='Enter your Email' />
        </div>
        <div className="inputGroup">
            <label htmlFor="email">Address:</label>
            <input type="text" id='address' onChange={inputHandler} name='address' autoComplete='on' placeholder='Enter your Address' />
        </div>
        <div className="inputGroup">
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={fileHandler}
            accept="image/*"
          />
        </div>
        <div className="inputGroup">
            <button type="submit" class="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddUser
