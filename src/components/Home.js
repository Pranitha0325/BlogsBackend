import React, {useEffect, useState} from 'react'; 
import { useNavigate } from "react-router-dom";
import axios from "axios";


import "./login.css"
function Home() {

  const navigate = useNavigate()
  const [details, setDetails] = useState([])
  const [next, setNext] = useState("")
  const [previous, setprevious] = useState("")

    useEffect(() => {
        const fetchCharacters = async () => {
          try {
            const res = await axios.get('https://swapi.dev/api/people');
            setDetails(res.data.results)
            setNext(res.data.next)
            setprevious(res.data.previous)
            console.log(res.data.results);
          } catch (e) {
            console.log(e);
          } finally {
            console.log(false);
          }
        };
    
        fetchCharacters();
      }, []);

      const logout = () =>{
localStorage.removeItem("token")
localStorage.removeItem("email")
localStorage.removeItem("id")
navigate("/")
      }

      const nextPage = async(url) =>{
        const res = await axios.get(url);
            setDetails(res.data.results)
            setNext(res.data.next)
            setprevious(res.data.previous)
            console.log(res);
      }
      const previousPage = async (url) =>{
        if (url === null){
alert("This is the first page")
        }else{
          const res = await axios.get(url);
          setDetails(res.data.results)
          setNext(res.data.next)
          setprevious(res.data.previous)
          console.log(res);
        }
      }
    
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-brand">Star Wars</a>
      </div>
      <div className="navbar-right">
        <div className="navbar-user-info">
          {/* <img src={user.profilePicture} alt="Profile" className="navbar-profile-picture" /> */}
          <button className="navbar-logout" onClick={()=>logout()} >Logout</button>
        </div>
      </div>
    </nav>
<div>
<h1 style={{marginTop:"70px"}}> List Of Star War Characters</h1>

</div> 
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <table style={{ width: '70%', border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Height</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Gender</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.height}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.gender}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
    <div style={{marginTop:"20px"}}>
      <button className="buttons" onClick={() => previousPage(previous)}>Previous</button>
      <button className="buttons" onClick={() => nextPage(next)}>Next</button>
    </div>
        </div>
    )

}
export default Home