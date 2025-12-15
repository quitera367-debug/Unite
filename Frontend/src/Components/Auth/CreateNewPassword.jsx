import React, { useEffect, useState } from "react";
import InputBlock from "./InputBlock";
import ButtonBlock from "./ButtonBlock";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateNewPassword() {
  const nevigate = useNavigate();
      const {registerData,resetPassword}=useAuth()
  
  const [init, setInit] = useState({
    email: registerData?.email || "",
    password: "",
    matchPassword: "",
  });
  const {email,password,matchPassword}=init

  useEffect(()=>{
    if(!registerData){
      nevigate("/");
      toast.error("Bad Request");
    }

  },[])

  const createFun = async (e) => {
    e.preventDefault();
    try {
      if (password == matchPassword) {
        await resetPassword(init)
        nevigate("/user");
      } else {
        toast.error("Password must match")
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInit({ ...init, [name]: value });
  };
  return (
    <main className="w-full h-screen flex flex-col gap-3">
      <header className=" my-3 flex text-3xl font-semibold flex-col">
        <h1> Create! Your new password</h1>
      </header>
      <section className="h-[60%] flex flex-col justify-center">
        <form
          action=""
          onSubmit={createFun}
          className="w-full flex flex-col gap-3"
        >
          <InputBlock
            labelVal="Email"
            inType="email"
            placeName="Enter your email"
            massage=""
            idValue="email"
            value={email}
            onChange={handleChange}
          />
          <InputBlock
            labelVal="Create New Password"
            inType="password"
            placeName="Create a new password"
            massage=""
            idValue="password"
            value={password}
            onChange={handleChange}
          />
          <InputBlock
            labelVal="Conform Password"
            inType="password"
            placeName="Conform your password"
            massage=""
            idValue="matchPassword"
            value={matchPassword}
            onChange={handleChange}
          />
          <ButtonBlock text={"Create"} />
        </form>
      </section>
    </main>
  );
}

export default CreateNewPassword;
