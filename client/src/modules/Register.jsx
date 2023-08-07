import React, {useState} from 'react'
import {useNavigate, Link} from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"; 

export default function Register() {
    const navigate = useNavigate()
    const [creds, setCreds] = useState({
        email : "",
        username : "",
        password : "",
        confirmPassword : ""
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

    const registerUser = async(e) => {
        e.preventDefault();
        
        if(creds.email.length !== 0 && creds.username.length !== 0 && creds.password.length !== 0 && creds.confirmPassword.length !== 0){
            if(creds.password === creds.confirmPassword){
                const response = await axios.post("http://localhost:5000/user/addUser", {
                    email : creds.email,
                    username : creds.username,
                    password : creds.password
                });
                const accessToken = response.data.accessToken;
                Cookies.set("accessToken", accessToken)
                localStorage.setItem("accessToken", accessToken);
                if(accessToken){
                    navigate("/home", {state : {username : creds.username}})
                }
            }
            else{
                alert("Passwords don't match")
            }
        }
        else{
            alert("fields empty")
        }
    }



  return (
    <>
    <div className="container-wrapper">
        <h1 className="heading-display custom-text mb-5">Sign Up</h1>
        <div className="register-container">
            <form onSubmit={registerUser}>
                <div className="formGroup">
                    <input type="text" className = "inputBox custom-text" 
                        name="email"
                        placeholder="Email" 
                        onChange={handleChange}
                        value={creds.email}
                        />

                </div>
                <div className="formGroup">
                    <input type="text" className = "inputBox custom-text" 
                        name="username"
                        placeholder="Username" 
                        onChange={handleChange}
                        value={creds.username}
                    />
                </div>
                <div className="formGroup">
                    <input type="text" className = "inputBox custom-text" 
                        name="password"
                        placeholder="Password" 
                        onChange={handleChange}
                        value={creds.password}
                    />
                </div>
                <div className="formGroup">
                    <input type="text" className = "inputBox custom-text" 
                    name="confirmPassword"
                    placeholder="Confirm Password" 
                    onChange={handleChange}
                    value={creds.confirmPassword}
                    />
                </div>
                <button type="submit" 
                    className="registerbtn w-100 custom-text"
                    >Register
                </button>
                <p className="form-meta custom-text">Don't have an account? <Link to={"/login"}><span className="link">Sign In</span></Link></p>
            </form>
        </div>
    </div>
    </>
  )
}
