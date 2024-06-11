import React, {useEffect, useState} from 'react'; 
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar.js'
import axios from "axios";


import "./login.css"
function Dashboard() {
    const [userDetails, setUserDetails] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const email = localStorage.getItem('email');
            console.log(email) // Make sure 'email' key is correct
            const response = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/users/details/${email}`);
            console.log(response.data)
            setUserDetails(response.data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    fetchUserDetails();
}, []);

      const logout = () =>{
localStorage.removeItem("token")
localStorage.removeItem("email")
localStorage.removeItem("id")
navigate("/")
      }

      const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        author: '',
        content: '',
        userEmail:"",
        userName:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(prevState => ({
            ...prevState,
            userName: userDetails.name,
            userEmail: userDetails.email
        }));
        console.log(formData)
        try{
            const res =await axios
            .post(`${process.env.REACT_APP_IP_ADDRESS}/blogs/newBlog `, {
                formData,
            })
            alert(res.data.message)
            setFormData({
                title: '',
        excerpt: '',
        author: '',
        content: '',
        userEmail:"",
        userName:""
            })
        }catch(e){
            alert(e)
        }
        // Here you can submit the form data to your backend or perform any other action
        console.log(formData);
    };

      
    
    return (
        <div>
            <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-brand">Blogs Page</a>
      </div>

      <div className="navbar-right">
        <div  className="navbar-user-info">
      <FontAwesomeIcon  style={{fontSize:"30px", marginRight:"5%", cursor: "pointer"}} title="Post New Blog" icon={faCirclePlus} />

          {/* <img src={user.profilePicture} alt="Profile" className="navbar-profile-picture" /> */}
          <button className="navbar-logout" onClick={()=>logout()} >Logout</button>
        </div>
      </div>
    </nav>
    <div className="container">
    <Sidebar />  
<div>
    <h1>List of all blogs</h1>
    <div >
        <div className="card">
            {/* <h3 className="circular-badge">{userDetails.name[0]? userDetails.name[0] :""} </h3> */}
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
        </div>
        <div className="blog-form">
        <h2>Post New Blog</h2>

        <form onSubmit={handleSubmit} className="blog-form">
                <div className="input-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="excerpt">Short Excerpt:</label>
                    <input
                        type="text"
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
       

    </div>
</div>

    </div>

        </div>
    )

}
export default Dashboard