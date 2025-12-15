import { Link, Outlet } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function Auth() {


  return (
    <main className="h-full w-full flex items-start pt-6 gap-3 p-2 flex-col">
      <div className="flex justify-start items-center gap-2">
      <Link to={"/"} className="border cursor-pointer text-2xl p-2 rounded-full"><IoIosArrowBack/></Link>
        <p>Back to Home</p>
      </div>
      <Outlet/>
    </main>
  );
}

export default Auth;
