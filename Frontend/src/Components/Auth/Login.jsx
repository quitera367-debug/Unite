import React from "react";
import InputBlock from "./InputBlock";
import ButtonBlock from "./ButtonBlock";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "../Utility/authSchema";
import { useFormik } from "formik";
import { useAuth } from "../../Contexts/AuthContext";

function Login() {
  const {LoginUser}=useAuth()
  const onSubmit = async (values, actions) => {
      actions.resetForm();
      await LoginUser(values)
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
      password: "",
      email: "",
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  return (
    <main className="w-full h-screen flex flex-col gap-3">
      <header className=" my-3 flex text-3xl font-semibold flex-col">
        <h1>Welcome back! Glad to see you, Again!</h1>
      </header>
      <section className="">
        <form action="" onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
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

          <div className="w-full flex flex-col items-end">
            <InputBlock
              labelVal="Password"
              inType="password"
              placeName="Enter your password"
              massage={errors.password}
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              idValue="password"
            />
            <Link to={"/auth/check"} className="text-sm text-[#14213D]">
              Forget password ?
            </Link>
          </div>
          <ButtonBlock text={"Let's Start"} />
          <Link
            to={"/auth"}
            className=" mx-auto text-sm cursor-pointer text-[#14213D]"
          >
            Don't have any account ? create new account
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Login;
