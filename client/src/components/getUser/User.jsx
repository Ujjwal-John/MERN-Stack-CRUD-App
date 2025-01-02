import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = ({url}) => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/users`);
        setUsers(response.data);


      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`${url}/api/delete/user/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));

        toast.success(response.data.message, { position: "top-right" });
      })

      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="userTable">
      <Link to="/add" type="button" className="btn btn-primary">
        <i className="fa-solid fa-user-plus"></i>User
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Profile</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {users.length === 0 ? (
          <div className="noData">
            <h3>No Data to Display</h3>
            <p>Please add new User</p>
          </div>
        ) : (
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {user.profileImage ?  // Display image if available
                      <img className="profile-img"
                      src={`http://localhost:8000/uploads/${user.profileImage}`}
                        
                        // style={{
                        //   width: "10px",
                        //   height: "100px",
                        //   borderRadius: "50%",
                          
                        // }} // Style the image
                      />
                     : (
                      <span>No Image</span> // Fallback if no image
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td className="actionButtons">
                    <Link
                      to={`/update/` + user._id}
                      type="button"
                      className="btn btn-warning"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button
                      onClick={() => deleteUser(user._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default User;
