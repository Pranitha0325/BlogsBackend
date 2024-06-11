import React, {useEffect, useState} from 'react'; 
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar.js'
import axios from "axios";


import "./login.css"
function Home() {
  const [allBlogs, setAllBlogs] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/blogs/allBlogs`);
            setAllBlogs(res.data)
            // Handle the response data
            console.log(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);




      const logout = () =>{
localStorage.removeItem("token")
localStorage.removeItem("email")
localStorage.removeItem("id")
navigate("/")
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
    <div style={{marginLeft:"30px", width:"70vw"}}>
      <h2 style={{marginTop:"50px"}}>List of All Blogs</h2>
      <div className="blog-grid">
        
      {allBlogs && allBlogs.map(blog => (
        <Link to={`/blogs/${blog._id}`} className="blog-link" key={blog._id}>
        <div className="blog-card" >
 <h2>Title: {blog.title}</h2>
 <p>Author: {blog.author}</p>
        <p>{blog.excerpt}</p>
        <p>Date: {new Date(blog.updatedAt).toLocaleDateString()}</p>
        {/* <Link to={`/blog/${id}`} className="read-more">Read More</Link> */}
        {/* <Blog key={blog.id} id={blog.id} title={blog.title} excerpt={blog.excerpt} /> */}
          </div>
          </Link>
       
      ))}
      </div>
    </div>
    </div>


        </div>
    )

}
export default Home