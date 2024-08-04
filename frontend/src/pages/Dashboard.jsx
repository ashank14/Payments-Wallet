import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import User from '../components/User'
import { useNavigate } from "react-router-dom";
function Dashboard(){

    const [users,setUsers]=useState([]);
    const [amount,setAmount]=useState();
    const navigate=useNavigate();
    useEffect(() => {
        (async () => {
            
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/Signin");
                    return;
                }
    
                const response1 = await axios.get("http://localhost:3000/api/v1/user/bulk",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                setUsers(response1.data.user);
                const response2 = await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                setAmount(response2.data.balance);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        })();
    }, []);
    return(
        <>
            <header className="flex w-ful items-center justify-between p-5">
                <div className="text-2xl font-bold">Dashboard</div>
                <button type="button" class="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/Signin");
                    }}>Log out</button>
            </header>
            <div className="p-4 flex flex-col justify-between">
                <div className="p-2">Account Balance</div>
                <div className="text-5xl p-2">&#8377;{amount}</div>
            </div>
            <div className="p-5 text-xl">
                <div className="text-2xl font-bold">Users:</div>
                <div>
                    {users.map(user => (
                        <User key={user._id} username={user.username} firstname={user.firstname} lastname={user.lastname} userId={user._id}/>
                    ))}
                </div>
            </div>
        </>


    )
}

export default Dashboard;