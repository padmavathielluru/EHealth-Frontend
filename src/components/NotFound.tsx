import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound : React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600 mb-6">Page not found</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    );
  };

  export default NotFound;
  