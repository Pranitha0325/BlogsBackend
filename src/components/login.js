import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-modal";


import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";



import axios from "axios";

import './login.css';

function Login() {
    const navigate = useNavigate()
  const [details, setDetails] = useState({
    name:"",
    email:"",
    password:"",
    conformPassword:""
  })
  const [emailerror, setemailerror] = useState("");
  const [passworderror, setpassworderror] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [confrimshowPass, setConfrimShowPass] = useState(false);
  const [show, setshow] = useState(false);
  const [showModal, setShowModal] = useState(false);


  function closeModal() {
    setshow(false)
  }

  const customforreport = {
    content: {
      width: "500px", // Adjust the width as needed
      height: "400px", // Adjust the height as needed
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)", // Center the modal on the screen
      overflow: "hidden",
      zIndex: 2,
    },
  };

  function passwordChange(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    if (id === "pass") setShowPass(!showPass);
    else setConfrimShowPass(!confrimshowPass);
  }
const register = async() => {
    console.log(details, "details of the new user")
    const data = details
    try {
       const res =await axios
        .post(`${process.env.REACT_APP_IP_ADDRESS}/users/signup `, {
          details
        })
        console.log(res, "detailsofuser")
        alert("user has be registered successfully ")
        // navigate("/create")
    }catch(error){
console.log(error, "errormessage")
    }
}
  const submitlogin = async (event)=> {
    event.preventDefault();
    console.log(details)
    try {
        const res =await axios
        .post(`${process.env.REACT_APP_IP_ADDRESS}/users/login `, {
          email: details.email,
          password: details.password,
        })

        if (res.data.message === "Enter valid Password"){
          setpassworderror(res.data.message)
        }else{
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.name);

  
          console.log(res, "responseof the details")
          navigate("/home")
        } 
    }catch(error){
      alert(error)
console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (details.password !== details.conformPassword) {
      setpassworderror('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/users/forgetPassword`, { 
        email: details.email,
        password: details.password});
console.log(response)
      alert(response.data.message)
      setShowModal(false);
    } catch (error) {
    alert("Error updating password")
      
    }
  };
  

  return (
    <div className="login-container">
            <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-brand">Star Wars </a>
      </div>
      <div className="navbar-right">
        <div className="navbar-user-info">
          
        </div>
      </div>
    </nav>
      {!showModal && (
        <form
                          onSubmit={(e) => {
                            submitlogin(e);
                          }}
                           className="form-container"
                         
                        >
                          <div>
                            <h3 className="logosign" style={{marginBottom:"20px"}}>
                              <span className="logosign" style={{ color: "#094162" }}>SIGN</span>{" "}
                              <span className="logoin" style={{ color: "#ff5b22" }}>IN</span>
                            </h3>
                          </div>
                          <div className=" mb-3" style={{ display: "flex" }}>
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                style={{ width: "60px", maxWidth: "40px" }}
                                id="basic-addon1"
                              >
                                <MdEmail style={{ color: "rgb(3, 104, 104)", height:"30px" }} />
                              </span>
                            </div>

                            <input
                              type="text"
                              className="form-control changePlaceHolderSize"
                              wrapperClassName="mb-4"
                              style={{width:"260px"}}
                              required
                              value={details.email}
                              onChange={(e) =>
                                setDetails({ ...details, email: e.target.value })
                              }
                              placeholder="Email id"
                              aria-label="Email"
                              aria-describedby="basic-addon1"
                             
                              autoComplete="off"
                            />
                            <br />
                          </div>

                          {emailerror === false && details.email?.length > 0 ? (
                            <p style={{ color: "red" }}>email not registered</p>
                          ) : (
                            ""
                          )}

                          <div className="input-group mb-2" id="pass-div" style={{ display: "flex"}}
                          >
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                style={{ width: "60px", maxWidth: "40px" }}
                                id="basic-addon1"
                              >
                                <RiLockPasswordFill
                                  style={{ color: "rgb(3, 104, 104)", height:"30px" }}
                                />
                              </span>
                            </div>

                            <input
                              type="password"
                              id="pass"
                              className="form-control changePlaceHolderSize"
                              value={details.password}
                              onChange={(e) =>
                                setDetails({ ...details, password: e.target.value })
                              }
                              placeholder="Enter Password"
                              aria-label="Email"
                              aria-describedby="basic-addon1"
                              autoComplete="off"
                            />
                            </div>
                           

                            <span
                              onClick={() => passwordChange("pass")}
                              className="input-group-text"
                              style={{ width: "60px", maxWidth: "40px" }}
                              id="basic-addon1"
                            >
                              {showPass ? (
                                <AiTwotoneEyeInvisible
                                  style={{ color: "rgb(3, 104, 104)" }}
                                />
                              ) : (
                                <AiFillEye style={{ color: "rgb(3, 104, 104)" }} />
                              )}
                            </span>
                          </div>

                          <span style={{color:"red", fontSize:"16px" }}>*{passworderror}</span>

                         
                          <div style={{ display: "flex" }}>
                            <p style={{ fontSize: "23px" }}>
                              Not a user yet ?
                              <Link onClick={() => setshow(true)} >Signup</Link>
                            </p>
                          
                            
                            
                          </div>
                          
                          <div style={{ textAlign: "center", display:"flex", justifyContent:"center" , alignItems:"center"}} className="w-100">
                          <p
                                style={{
                                  fontSize: "13px",
                                  cursor: "pointer",
                                  color: "blue",
                                }}
                                onClick={() => setShowModal(true)}
                                
                              >
                                Forget password?
                              </p>
                            <button
                              
                              style={{
                                backgroundColor: "#094162",
                                color: "white",
                                borderStyle:"none",
                                width:"70px",
                                borderRadius:"10px",
                                height:"30px",
                                marginLeft:"15px"
                              }}
                              className="w-100 btn "
                              type="submit"
                            
                            >
                              Signin
                            </button>
                          </div>
                        </form>
      ) } 
     

                        <Modal
         isOpen={show}
         onRequestClose={closeModal}
         style={customforreport}
         contentLabel="Example Modal"
       >
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <h3 style={{ fontWeight: "600" }}>Sign up</h3>
         <div style={{ cursor: 'pointer'}} className="close-icon" onClick={closeModal}>&#10006;</div>

        
        </div>

        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                style={{ width: "60px", maxWidth: "40px" }}
                                id="basic-addon1"
                              >
                                <MdEmail style={{ color: "rgb(3, 104, 104)", height:"30px" }} />
                              </span>
                            </div>

                            <input
                              type="text"
                              className="form-control changePlaceHolderSize"
                              wrapperClassName="mb-4"
                              required
                              value={details.name}
                              onChange={(e) =>
                                setDetails({ ...details, name: e.target.value })
                              }
                              placeholder="Name"
                              aria-label="Email"
                              aria-describedby="basic-addon1"
                             
                              autoComplete="off"
                            />
                            <br />
                          </div>

                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                style={{ width: "60px", maxWidth: "40px" }}
                                id="basic-addon1"
                              >
                                <MdEmail style={{ color: "rgb(3, 104, 104)", height:"30px" }} />
                              </span>
                            </div>

                            <input
                              type="text"
                              className="form-control changePlaceHolderSize"
                              wrapperClassName="mb-4"
                              required
                              value={details.email}
                              onChange={(e) =>
                                setDetails({ ...details, email: e.target.value })
                              }
                              placeholder="Email id"
                              aria-label="Email"
                              aria-describedby="basic-addon1"
                             
                              autoComplete="off"
                            />
                            <br />
                          </div>

                          <div className="input-group mb-2" id="pass-div">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                style={{ width: "60px", maxWidth: "40px" }}
                                id="basic-addon1"
                              >
                                <RiLockPasswordFill
                                  style={{ color: "rgb(3, 104, 104)", height:"30px" }}
                                />
                              </span>
                            </div>

                            <input
                              type="password"
                              id="pass"
                              className="form-control changePlaceHolderSize"
                              value={details.password}
                              onChange={(e) =>
                                setDetails({ ...details, password: e.target.value })
                              }
                              placeholder="Enter Password"
                              aria-label="Email"
                              aria-describedby="basic-addon1"
                              autoComplete="off"
                            />

                            <span
                              onClick={() => passwordChange("pass")}
                              className="input-group-text"
                              style={{ width: "60px", maxWidth: "40px" }}
                              id="basic-addon1"
                            >
                              {showPass ? (
                                <AiTwotoneEyeInvisible
                                  style={{ color: "rgb(3, 104, 104)" }}
                                />
                              ) : (
                                <AiFillEye style={{ color: "rgb(3, 104, 104)" }} />
                              )}
                            </span>
                          </div>

                          <button
                              
                              style={{
                                backgroundColor: "#094162",
                                color: "white",
                              }}
                              onClick={register}
                              className="w-100 btn "
                              type="button"
                            
                            >
                              Signin
                            </button>
         
        
       </Modal>

       {showModal && (
        <div className="form-container">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{display:"flex"}}>
                <h5 className="modal-title">Reset Password</h5>
                <button style={{height:"20px"}} type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>x</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={details.email}
                      onChange={(e) =>
                        setDetails({ ...details, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={details.password}
                      onChange={(e) =>
                        setDetails({ ...details, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={details.conformPassword}
                      onChange={(e) =>
                        setDetails({ ...details, conformPassword: e.target.value })
                      }
                      required
                    />
                  </div>
                    <p className="text-danger" style={{color:"red", fontSize:"16px"}}>* {passworderror}</p>
                  <button type="submit" style={{
                                backgroundColor: "#094162",
                                color: "white",
                                borderStyle:"none",
                                width:"70px",
                                borderRadius:"10px",
                                height:"30px",
                                marginLeft:"15px"
                              }}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    
    
    
      
    </div>
  );
}

export default Login;
