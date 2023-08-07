import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie"; 

export default function Login() {

    const navigate = useNavigate();
    const [creds, setCreds] = useState({
      username : "",
      password : "",
  })

  const handleChange = (e) => {
      const {name, value} = e.target;
      setCreds((prevValue)=>{
          return{
              ...prevValue,
              [name] : value
          }
      })
  }

  const login = async(e)=>{
    e.preventDefault();
    if(creds.username !== 0 && creds.password !== 0){
      try {
        const response = await axios.post("http://localhost:5000/login", {
          username : creds.username,
          password : creds.password
        })
        const accessToken = response.data.accessToken
        Cookies.set("accessToken", accessToken)
        localStorage.setItem("accessToken", accessToken);
  
        if(accessToken){
          navigate("/home", {state : {username : creds.username}})
        }
      } catch (error) {
        if(error.response.status === 401){
          alert("Authentication failed. Please check your username and password.")
        }
        else{
          console.log(error);
        }
      }
    }
    else{
      alert("empty")
    }

  }
  return (
    <>
    
    <div className="container-wrapper">
      <h1 className="heading-display custom-text mb-5">Sign In</h1>
      <div className="login-container">
        <form onSubmit={login}>
          <div className="formGroup">
            <input
              type="text"
              className="inputBox custom-text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={creds.username}
            />
          </div>
          <div className="formGroup">
            <input
              type="text"
              className="inputBox custom-text"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={creds.password}
            />
          </div>
          <button type="submit" className="loginbtn w-100 custom-text">
            Login
          </button>
          <p className="form-meta custom-text">Don't have an account? <Link to={"/register"}><span className="link">Sign Up</span></Link></p>
        </form>
      </div>
    </div>
    </>
  );
}
