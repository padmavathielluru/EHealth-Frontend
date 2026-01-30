import React from "react";

const SocialLogin = () => {

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/auth/google";
    };

    const handleAppleLogin = () => {
        window.location.href = "http://localhost:8000/auth/apple";
    }
    return (
        <div className="mt-4 ">
            <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-3 text-xs text-gray-400 whitespace-nowrap">Or authorize with</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
             <button onClick={handleGoogleLogin}
             className="flex-1 border py-2 rounded-md flex shadow-sm justify-center items-center gap-2">
                    <img src="/images/Google.svg" alt="Google" className="w-4 h-4"/>
                   <span className="text-sm text-gray-400">Sign up with Google ID</span>
             </button>

             <button onClick={handleAppleLogin}
             className="flex-1 border py-2 rounded-md flex shadow-sm justify-center items-center gap-2">
                <img src="/images/Apple.svg" alt="Apple" className="w-4 h-4"/>
                <span className="text-sm text-gray-400">Sign up with Apple ID</span>
             </button>
             </div>
        </div>
    );
};

export default SocialLogin;