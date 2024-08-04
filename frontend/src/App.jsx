
import React from 'react';
import {Link} from 'react-router-dom';

function App() {

  return (
    <div className="flex flex-col">
        <h1 className="font-bold">WELCOME TO PAYTM</h1>
        <Link to='/Dashboard'>Dashboard</Link>
        <Link to='/SendMoney'>Send Money</Link>
        <Link to='/Signin'>Signin</Link>
        <Link to='/Signup'>Signup</Link>
    </div>
  )
}

export default App
