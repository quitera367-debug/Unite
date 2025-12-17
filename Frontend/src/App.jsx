import React from "react";
import { Toaster } from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./Components/Utility/Nav/NavBar";

function App() {
  return (
    <div className="w-full items-center h-screen sm:flex justify-center">
      <Toaster/>
      <div className="w-full sm:w-[60%] md:h-[99vh] md:w-[26%] h-full  shadow-xl sm:rounded-3xl">
        <Outlet />
      </div>
      <footer className="fixed  bottom-2 w-full flex text-[#868686] justify-center items-center">
        <Link to={"https://harsh-jha.vercel.app/"} className=" text-xs">
          Developed by Harsh
        </Link>
      </footer>
      <NavBar/>
    </div>
  );
}

export default App;
