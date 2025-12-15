import React, { useEffect, useState } from "react";
import InputBlock from "./InputBlock";
import ButtonBlock from "./ButtonBlock";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

function CheckEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestReset } = useAuth();
  const [mail,setMail] =useState()

  const checkEmailFun = async (e) => {
    e.preventDefault();
    try {
      await requestReset({email:mail})
      navigate("/auth/verify", { state: { from: location } });
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange=(e)=>{
    const {value}=e.target
    setMail(value)
  }
  return (
    <main className="w-full h-screen flex flex-col gap-3">
      <header className=" my-3 flex text-3xl font-semibold flex-col">
        <h1> Authenticate user by email, securely!</h1>
      </header>
      <section className="h-[60%] flex flex-col justify-center">
        <form
          action=""
          onSubmit={checkEmailFun}
          className="w-full flex flex-col gap-3"
        >
          <InputBlock
            labelVal="Email"
            inType="email"
            placeName="Enter your email"
            massage=""
            idValue="email"
            value={mail}
            onChange={handleChange}
          />
          <ButtonBlock text={"Check email"} />
        </form>
      </section>
    </main>
  );
}

export default CheckEmail;
