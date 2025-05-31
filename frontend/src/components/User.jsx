import React from "react";
import { useNavigate } from "react-router-dom";

function User({username,firstname,lastname,userId}){
    const navigate=useNavigate();
    return(<>
        <div className="w-full flex justify-between p-5">
            <div className="flex flex-col">
                <div>{firstname} {lastname}</div>
                <div>{username}</div>
            </div>
            <div>
                <button type="button" class="px-6 py-3.5 text-base font-medium text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={async ()=>{
                    navigate(`/SendMoney?userId=${userId}&username=${username}`);
                }}>Transfer Money</button>
            </div>
        </div>
    </>)
}

export default User