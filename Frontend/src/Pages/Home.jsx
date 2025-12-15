import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function Home() {
  const {handleGoogleLogin}=useAuth()
  return (
    <main className="h-full w-full flex justify-center items-end relative">
      <section className="h-[40%] w-full flex justify-center items-center gap-2 flex-col ">
        <Link to={"/auth"} className=" bg-[#0e0e0e] text-[#fff] p-[10px] flex justify-center items-center w-[80%] rounded-md font-semibold">
          Continue with email
        </Link>
        <p className="text-[#7c7c7c]">or</p>
        <button onClick={()=>handleGoogleLogin()} className=" bg-[#0e0e0e] text-[#fff] p-[10px] w-[80%] rounded-md font-semibold">
          Continue with google
        </button>
      </section>
    </main>
  );
}

export default Home;
