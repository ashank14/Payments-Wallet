import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-blue-700 mb-10">Payments Wallet</h1>

      {/* Menu */}
      <div className="flex flex-col gap-6 text-lg">
        <Link 
          to="/Dashboard" 
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition shadow-md"
        >
          Dashboard
        </Link>
        <Link 
          to="/SendMoney" 
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition shadow-md"
        >
          Send Money
        </Link>
        <Link 
          to="/Signin" 
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition shadow-md"
        >
          Signin
        </Link>
        <Link 
          to="/Signup" 
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition shadow-md"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default App;
