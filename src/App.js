import './App.css';

import { useState,useEffect } from 'react';
import { MiniDrawer} from './Box'
import React from "react";
import * as yup from 'yup';
import { Signup } from './Signup';

export const formValidationSchema = yup.object({
  username:yup
  .string()
  .min(5,"Need bigger email")
  .email("Please ener valid email")
  .required("why not fill this"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  firstName: yup
      .string()
      .required("Please enter first name"),    
  lastName: yup
      .string()
      .required("Please enter last name"),    


})

export const formValidationSchema2 = yup.object({
  username:yup
  .string()
  .min(5,"Need bigger email")
  .email("Please ener valid email")
  .required("why not fill this"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )  


})

export default function App(){
 
  return (<Signup/>)
}

export function Main(){

  const [movies,setMovies] = useState([]);

  // const API_URL = "https://6166c4d713aa1d00170a66f5.mockapi.io"
  const API_URL = "https://b28-wd-movies2.herokuapp.com"
  useEffect(()=>{
    fetch(`${API_URL}/movies`)
    .then((data)=>data.json())
    .then((mvs)=>setMovies(mvs))
  },[]);

  return  <MiniDrawer movies={movies} setMovies={setMovies}/>
}



