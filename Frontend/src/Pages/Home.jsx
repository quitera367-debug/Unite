import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Background from "../Components/Home/Background";
import { FcGoogle } from "react-icons/fc";

function Home() {
  const {handleGoogleLogin}=useAuth()
  return (
    <main className="h-full w-full flex justify-center items-end relative">
      <section className="h-[40%] w-full flex justify-center items-center gap-2 flex-col p-2 ">
        <Link to={"/auth"} className=" bg-[#0e0e0e] text-[#fff] p-3 border border-[#202020] flex justify-center items-center w-[100%] text-lg rounded-md font-semibold">
          Continue with email
        </Link>
        <p className="text-[#7c7c7c]">or</p>
        <button onClick={()=>handleGoogleLogin()} className="  flex justify-center items-center gap-2 border border-[#5f5f5f] bg-[#ffffff] text-[#000] text-lg p-3 w-[100%] rounded-md font-semibold">
          Continue with google 
          {/* <div className="text-xl">
            <FcGoogle/>
          </div> */}
          
        </button>
      </section>
      <Background/>

    </main>
  );
}

export default Home;
