import React, { useEffect, useState } from 'react';
import './Update.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Update = ({url}) => {
  const initialUserState = {
    name: '',
    email: '',
    address: '',
    profileImage: null, // Added to handle profile image
  };
  const [user, setUser] = useState(initialUserState);
  const [image, setImage] = useState(null); // State for the uploaded image
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the uploaded file
  };

  useEffect(() => {
    axios
      .get(`${url}/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    // Create a FormData object to hold the user data and image
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('address', user.address);
    
    // If an image is selected, append it to the form data
    if (image) {
      formData.append('profileImage', image);
    }

    await axios
      .put(`${url}/api/update/user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      })
      .then((response) => {
        toast.success(response.data.message, { position: 'top-right' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='addUser'>
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Update User</h3>
      <form action="" className='addUserform' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id='name'
            value={user.name}
            onChange={inputHandler}
            name='name'
            autoComplete='on'
            placeholder='Enter your Name'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id='email'
            value={user.email}
            onChange={inputHandler}
            name='email'
            autoComplete='on'
            placeholder='Enter your Email'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id='address'
            value={user.address}
            onChange={inputHandler}
            name='address'
            autoComplete='on'
            placeholder='Enter your Address'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            id='profileImage'
            onChange={handleImageChange}
            name='profileImage'
            accept="image/*" // Accept image files only
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Update;
