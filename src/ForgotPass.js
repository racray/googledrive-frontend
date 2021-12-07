import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { formValidationSchema3 } from "./Login";
import {useState} from 'react';

export function ForgotPass({ setShow1, setShow2, show2,setShow }) {


  const API_URL = "https://b28-wd-movies2.herokuapp.com";
  const [exiUser,setExiUser] = useState(false);
  const [mess,setMess] = useState("Invalid Username")



  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { username: ""},
    validationSchema: formValidationSchema3,
    onSubmit: async (user) => {

      const userEr = await fetch(`${API_URL}/users/forgotpass `, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        },
      });

      console.log(userEr);
      const result = await userEr.json();
      const { message } = result;
      if (message !== "Invalid Username") {
        setMess("A confirmation mail will be sent to you. Proceeding to Login....");
        setExiUser(true);

        const delayInMilliseconds = 2500; 

        setTimeout(function() {
          setShow1(true); setShow2(false);setExiUser(false);
        }, delayInMilliseconds);



      }else{
        setMess("Invalid Username ");

        setExiUser(true);

      }
    }
  });


  return (
    <div>
      <div>
        <div style={{ display: show2 ? "block" : "none" }}>
        <h4 style={{display : exiUser ? "block" : "none"}} className="forgotpass-title">{mess}</h4>
          <form onSubmit={handleSubmit} className="forgot-form">
            <TextField placeholder="Enter Username"
              id="username3"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.username && touched.username && errors.username}
              variant="standard" />


            <br />
            <Button type="submit" variant="contained" className="button-create-user">Verify E-mail </Button>
          </form>
          <div className="login-button">
            <Button variant="outlined" className="button-design" onClick={() => { setShow(true);setShow2(false) }}>Create User </Button>
          </div>
        </div>



      </div>
    </div>
  );
}


