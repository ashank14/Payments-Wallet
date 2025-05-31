import React, { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
  import { useNavigate } from "react-router-dom";

function SendMoney() {
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("userId");
  const username = searchParams.get("username");
  const navigate=useNavigate();

  const handleTransfer = async () => {
    if (!amount || amount <= 0) {
      setStatusMessage("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      await axios.post("http://localhost:3000/api/v1/account/transfer", {
        to: id,
        amount: amount
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      setStatusMessage("✅ Transfer Successful!");
    } catch (error) {
      setStatusMessage("❌ Insufficient funds. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Transfer Money</h1>

        <div className="text-lg font-medium text-gray-700 mb-4">
          Sending to: <span className="text-blue-600">{username}</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Enter Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="₹ Amount"
          />
        </div>

        <button
          type="button"
          disabled={loading}
          className={`w-full px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleTransfer}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Sending...
            </div>
          ) : (
            "Send 💸"
          )}
        </button>

        {statusMessage && (
          <div className="mt-6 text-center text-lg font-medium text-gray-700">
            {statusMessage}
          </div>
        )}
        <button class="flex items-center justify-center mt-6 text-blue-500 w-full" onClick={async ()=>{navigate('/Dashboard')}}>Dashboard</button>
      </div>
    </div>
  );
}

export default SendMoney;
