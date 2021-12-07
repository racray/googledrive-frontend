import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { formValidationSchema2, Main } from './App';
import {useState} from 'react';
import * as yup from 'yup';
import { ForgotPass } from "./ForgotPass";


export const formValidationSchema3 = yup.object({
  username:yup
  .string()
  .min(5,"Need bigger email")
  .email("Please ener valid email")
  .required("why not fill this")
 


})




export function Login({ showMain, show1, setShow1, setShow, setShowMain }) {


  const API_URL = "https://b28-wd-movies2.herokuapp.com";
  const [show2,setShow2] = useState(false)
  const [exiUser,setExiUser] = useState(false);




  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: formValidationSchema2,
    onSubmit: async (user) => {

      const userEr = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        },
      });

      const result = await userEr.json();
      const {message} = result;
      console.log(message);
      if(message !== "Invalid credentials")
      {
      setShowMain(true); setShow1(false);setExiUser(false);

      }
      else{
        setExiUser(true);
      }
    }
  });

  return (
    <div>
      <div>
        <div style={{ display: show1 ? "block" : "none" }}>
        <h4 style={{display : exiUser ? "block" : "none"}} className="login-title">Invalid Credentials</h4>
          <form onSubmit={handleSubmit} className="login-form">
            <TextField placeholder="Enter Username"
              id="username2"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.username && touched.username && errors.username}
              variant="standard" />


            <br />

            <TextField placeholder="Enter password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.password && touched.password && errors.password}

              variant="standard" />
            <br />
            <Button type="submit" variant="contained" className="button-create-user">Login </Button>
          </form>
          <div className="login-forgot">
            <Button variant="outlined" className="button-design" onClick={() => { setShow(true); setShow1(false); }}>Create User </Button>
            <Button variant="text" className="button-design" onClick={() => { setShow2(true); setShow1(false); }}>Forgot Password? </Button>
          </div>
          
        </div>



      </div>
      <ForgotPass setShow1={setShow1} show2={show2} setShow2={setShow2} setShow={setShow} show1={show1}/>
      {showMain ? <Main /> : ""}

    </div>
  );
}

