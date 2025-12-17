import React, { useEffect, useState } from "react";
import InputBlock from "./InputBlock";
import ButtonBlock from "./ButtonBlock";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";

function OtpVerification() {
  const nevigate = useNavigate();
  const location = useLocation();
  const { registerData, otpData,resendCode,RegisterUser,sendOTP } = useAuth();
  const [code,setCode]=useState()

  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (!registerData) {
      nevigate("/");
      toast.error("Session Failed");
    }
  }, []);

  const codeVarification = async (e) => {
    e.preventDefault();
    try {
        if(code==otpData){
      if (from == "/auth/check") {
        nevigate("/auth/create");
      } else {
        await RegisterUser(registerData)
        nevigate("/user");
      }
      }
      else{
      toast.error("Invalid code");

      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange=(e)=>{
    const {value} =e.target
    setCode(value)
  }
  
  return (
    <main className="w-full h-screen flex flex-col gap-3">
      <header className=" my-3 flex text-3xl font-semibold flex-col">
        <h1> Enter 4 digit code send to '{registerData?.email}',</h1>
      </header>
      <section className="h-[60%] flex flex-col justify-center">
        <form
          action=""
          onSubmit={codeVarification}
          className="w-full flex flex-col gap-3"
        >
          
          <div className="w-full flex flex-col items-end">
            <InputBlock
            labelVal="Code"
            inType="text"
            placeName="Enter 4 digit code"
            massage=""
            idValue="code"
            value={code}
            onChange={handleChange}
            digit={4}
          />
            <div onClick={()=>{resendCode(registerData?.email)}} className="text-sm text-[#14213D]">
              Resend Code
            </div>
          </div>

          <ButtonBlock text={"Verify"} />
        </form>
      </section>
    </main>
  );
}

export default OtpVerification;
