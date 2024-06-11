import React, {useEffect, useState} from 'react'; 
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faThumbsUp, faCommentDots, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar.js'
import axios from "axios";


import "./login.css"
function Dashboard() {
    const [userDetails, setUserDetails] = useState([])
    const [myBlogs, setMyBlogs] = useState([])
    const [commentBox, setCommentBox] = useState(false)


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

    const myBlogs = async () => {
        try{
            const email = localStorage.getItem('email');
            console.log(email) 
            const response = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/blogs/myBlogs/${email}`);
            setMyBlogs(response.data)
            console.log(response)
        }catch(e){
            alert(e)
        }
    }

    fetchUserDetails();
    myBlogs();
}, []);

      const logout = () =>{
localStorage.removeItem("token")
localStorage.removeItem("email")
localStorage.removeItem("id")
navigate("/")
      }

      const toggleCommentBox = () =>{
        setCommentBox(!commentBox)
      }

    return (
        <div>
            <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-brand">Blogs Page</a>
      </div>

      <div className="navbar-right">
        <div  className="navbar-user-info">
            <Link to="/dashboard">
      <FontAwesomeIcon  style={{fontSize:"30px", marginRight:"5%", cursor: "pointer", color:"white"}} title="Post New Blog" icon={faCirclePlus} />

            </Link>

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
        <h2>My Blogs</h2>
        {myBlogs.length >0 && (
            <div>
                {myBlogs.map((blog, index) =>(
                      <div className='blog-container'>
                        <div>
                        <h2>Title: {blog.title}</h2>
 <p> <span style={{fontWeight:"bold"}}>Author:</span> {blog.author}</p>
        <p> <span style={{fontWeight:"bold"}}>Excerpt:</span>{blog.excerpt}</p>
        <p><span style={{fontWeight:"bold"}}>Content:</span> {blog.content}</p>
        <div className="meta-info">
        <p>Posted By: {blog.userName}</p>
        <p>Date: {new Date(blog.updatedAt).toLocaleDateString()}</p>
        </div>
        <hr/>
<div style={{display:"flex", justifyContent:"space-around", fontSize:"30px"}}>
<FontAwesomeIcon icon={faThumbsUp}/>
<FontAwesomeIcon icon={faCommentDots} onClick={()=>toggleCommentBox()} />
<FontAwesomeIcon icon={faShareNodes} />
</div>
                            </div>
          
        </div>  
                ))}
                </div>
        )}
        </div>
       

    </div>
</div>

    </div>

        </div>
    )

}
export default Dashboard