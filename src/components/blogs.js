import React, {useEffect, useState} from 'react'; 
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faThumbsUp, faCommentDots, faShareNodes } from '@fortawesome/free-solid-svg-icons';

import Sidebar from './sidebar.js'
import axios from "axios";

import './login.css' 

function Blogs  () {
    const {id} = useParams()
    const [blogDetails, setBlogDetails] = useState([])
    const [commentBox, setCommentBox] = useState(false)
    const [comment, setComment] = useState("")

    const navigate = useNavigate()
    const fetchData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/blogs/${id}`);
            setBlogDetails(res.data)
            // Handle the response data
            console.log(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
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

              const submitComment = async() =>{

                const userId = localStorage.getItem("id")
                const name = localStorage.getItem("name") 

                try {
                    const response = await axios.post(
                      `${process.env.REACT_APP_IP_ADDRESS}/blogs/${id}`, 
                      {
                        comment: comment,
                        userId: userId,
                        name: name
                      }
                    );
                    alert("Commented Successfully") 
                    setCommentBox(!commentBox)
                    setComment("")
                    fetchData();
                    console.log(response.data);
                  } catch (error) {
                    console.error('Error submitting comment:', error);
                  }

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
    <h2>Blog Details</h2>
    <div className='blog-container'>
        <div>
        <h2>Title: {blogDetails.title}</h2>
 <p> <span style={{fontWeight:"bold"}}>Author:</span> {blogDetails.author}</p>
        <p> <span style={{fontWeight:"bold"}}>Excerpt:</span>{blogDetails.excerpt}</p>
        <p><span style={{fontWeight:"bold"}}>Content:</span> {blogDetails.content}</p>
        <div className="meta-info">
        <p>Posted By: {blogDetails.userName}</p>
        <p>Date: {new Date(blogDetails.updatedAt).toLocaleDateString()}</p>
        </div>
        <hr/>
<div style={{display:"flex", justifyContent:"space-around", fontSize:"30px"}}>
<FontAwesomeIcon icon={faThumbsUp}/>
<FontAwesomeIcon icon={faCommentDots} onClick={()=>toggleCommentBox()} />
<FontAwesomeIcon icon={faShareNodes} />
</div>
{commentBox && (
    <div>
        <hr/>
        <label>Comment Here: </label>
         <input type ="text"style={{height:"20px", marginRight:"10px"}} value={comment} onChange={(e) => setComment(e.target.value)}  />
         <button type="button" onClick={submitComment}>Submit</button>
        {blogDetails.comments.length > 0 && (
  <div>
    {blogDetails.comments.map((comment, index) => (
      <div key={index} className="comment-card">
        <p><span style={{fontWeight:"bold"}}>Comment:</span> {comment.comment}</p>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <p><span style={{fontWeight:"bold"}}>Commented By:</span> {comment.name}</p>
        <p><span style={{fontWeight:"bold"}}>Comment At:</span> {new Date(comment.updatedAt).toLocaleDateString()}</p>
            </div>
      </div>
    ))}
  </div>
)}

</div>
)}

       
        </div>
 
        
    </div>
    </div> 
</div>
</div>
    )


}

export default Blogs