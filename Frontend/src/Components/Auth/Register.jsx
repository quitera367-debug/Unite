import React from "react";
import InputBlock from "./InputBlock";
import { useFormik } from "formik";
import ButtonBlock from "./ButtonBlock";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RegisterSchema } from "../Utility/authSchema";
import { useAuth } from "../../Contexts/AuthContext";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
    const {setRegisterData,genrateOtp,setOtpData}=useAuth()
  

  const onSubmit = async (values, actions) => {
    try {
      setRegisterData(values)
      const otp = genrateOtp()
      setOtpData(otp)
      actions.resetForm();
      navigate("/auth/verify", { state: { from: location } });
    } catch (err) {
      console.log(err);
    }
  };

  const {
    values,
    handleChange,
    touched,
    handleBlur,
    isSubmitting,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: RegisterSchema,
    onSubmit,
  });
  return (
    <main className="w-full h-screen flex flex-col gap-3">
      <header className=" my-3 flex    text-3xl font-semibold flex-col">
        <h1>Hello! Register to get started</h1>
      </header>
      <section>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-3"
        >
          <InputBlock
            labelVal="Full Name"
            inType="text"
            placeName="Enter your name"
            idValue="name"
            massage={errors.name}
            onBlur={handleBlur}
            value={values.name}
            onChange={handleChange}
          />
          <InputBlock
            labelVal="Email"
            inType="email"
            placeName="Enter your email"
            massage={errors.email}
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            idValue="email"
          />
          <InputBlock
            labelVal="Create Password"
            inType="password"
            placeName="Create a password"
            massage={errors.password}
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
            idValue="password"
          />
          <InputBlock
            labelVal="Conform Password"
            inType="password"
            placeName="Conform your password"
            massage={errors.confirmPassword}
            onBlur={handleBlur}
            value={values.confirmPassword}
            onChange={handleChange}
            idValue="confirmPassword"
          />
          <ButtonBlock text={"Let's Start"} />
        </form>
      </section>
      <Link
        to={"login"}
        className=" mx-auto text-sm cursor-pointer text-[#14213D]"
      >
        Already have a Account ? Login
      </Link>
    </main>
  );
}

export default Register;
