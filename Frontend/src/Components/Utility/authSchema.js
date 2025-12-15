import * as yup from "yup"
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const RegisterSchema = yup.object().shape({
    name:yup.string().min(3).required("Required"),
    email:yup.string().email().required("Required"),
    password:yup.string().min(5).matches(passwordRules,{message:"Please create a stronger password"}).required("Required"),
    confirmPassword:yup.string().oneOf([yup.ref('password'),null],"password must match").required('Required'),
})
export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup.string().required("Required"),
});