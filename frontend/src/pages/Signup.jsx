import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup(){
    
    const [username,setUsername]=useState("");
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    return(
        <div className="flex items-center justify-center w-full h-screen">
            <div className="justify-between px-12 py-6 flex flex-col items-center border-2 rounded-lg shadow-2xl w-2/3 h-2/3 lg:w-1/3 h-2/3 md:w-1/2">
                <h1 className="font-bold text-3xl">Sign Up</h1>
                <div>Enter your details to get started!</div>
                <div className="flex flex-col w-full">
                    <p>E-Mail</p>
                    <input className="border border-slate-500 rounded-md h-12" placeholder="E-mail" onChange={e=>{
                        setUsername(e.target.value);
                        console.log(e.target.value);
                    }}/>
                </div>
                <div className="flex flex-col w-full">
                    <p>First Name</p>
                    <input className="border border-slate-500 rounded-md h-12" onChange={e=>{
                        setFirstname(e.target.value);
                        console.log(e.target.value);
                    }}/>
                </div>
                <div className="flex flex-col w-full">
                    <p>Last Name</p>
                    <input className="border border-slate-500 rounded-md h-12" onChange={e=>{
                        setLastname(e.target.value);
                        console.log(e.target.value);
                    }}/>
                </div>
                <div className="flex flex-col w-full">
                    <p>Password</p>
                    <input className="border border-slate-500 rounded-md h-12" onChange={e=>{
                        setPassword(e.target.value);
                        console.log(e.target.value);
                    }}/>
                </div>
                <button type="button" class="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async ()=>{
                    const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username:username,
                        firstname:firstname,
                        lastname:lastname,
                        password:password
                    });
                    localStorage.setItem("token", response.data.token);
                    navigate('/Dashboard');
                }}>Sign Up</button>
                <div>Already have an account? <Link to="/Signin">Log In</Link></div>
            </div>
        </div>
    )
}

export default Signup