import { useState } from 'react';
import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { formValidationSchema } from './App';
import { Login } from "./Login";

export function Signup() {



  const API_URL = "https://b28-wd-movies2.herokuapp.com";

  const [showMain, setShowMain] = useState(false);
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(false);
  const [exiUser,setExiUser] = useState(false);



  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { username: "", firstName: "", lastName: "", password: "" },
    validationSchema: formValidationSchema,
    onSubmit: async (user) => {


     const userEr = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        },
      });
      const result = await userEr.json();
      console.log(result);
      const {message} = result;
      console.log(message);
      if(message !== "Username already exists"){
      setShow(false); setShow1(true);setExiUser(false);
    }else{
      setExiUser(true);
    }

    }
  });


  return (
    <section className="signup-login-container">
      <div>
        <h1 className="GoogleDrive-title">Welcome to Google Drive using AWS S3</h1>
        <div style={{ display: show ? "block" : "none" }}>
        <h4 style={{display : exiUser ? "block" : "none"}} className="username-title">This username already exists. Please Login</h4>

          <form onSubmit={handleSubmit} className="signup-form">
            <TextField placeholder="Enter Username"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.username && touched.username && errors.username}
              variant="standard" />
            <br />

            <TextField placeholder="Enter First Name"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.firstName && touched.firstName && errors.firstName}

              variant="standard" />
            <br />
            <TextField placeholder="Enter Last name"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.lastName && touched.lastName && errors.lastName}

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
            <Button type="submit" variant="contained" className="button-create-user">Create User </Button>
          </form>
          <div className="login-button">
            <Button variant="outlined" className="button-design" onClick={() => { setShow(false); setShow1(true); }}>Login </Button>
          </div>
        </div>
        <Login showMain={showMain} setShowMain={setShowMain} setShow={setShow} setShow1={setShow1} show1={show1} />

      </div>

    </section>
  );
}
