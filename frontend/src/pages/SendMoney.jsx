import React from "react";
import { useSearchParams } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
function SendMoney(){
    const [amount,setAmount]=useState();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("userId");
    return(
        <>
            Sending to: {id}
            <div>
                <div>Enter amount:</div>
                <div>
                    <input onChange={(e) => {
                            setAmount(e.target.value);
                        }} type="number"/>
                </div>
                <button type="button" class="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
                        axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount:amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                    }}>Send!!!</button>
            </div>
        </>
    )
}

export default SendMoney