import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import {  useFormik } from 'formik';


const formValidationSchema = yup.object({
  title:yup
  .string()
  .min(5,"Need bigger Title")
  .required("why not fill this"),
  picture:yup
  .string()
  .min(8,"require longer picture address")
  .required("fill this pls"),
  rating:yup
  .number("enter only numbers")
  .min(0,"require rating greater than 0")
  .max(10,"require rating smaller than 10")
  .required("fill this pls"),
  summary:yup
  .string()
  .min(5,"require longer summary")
  .required("fill this pls"),
  trailer:yup
  .string()
  .min(5,"require longer trailer address")
  .required("fill this pls")

})


export function MovieInput() {

  const API_URL = "https://b28-wd-movies2.herokuapp.com" //export to another file and use across all files


  const { handleSubmit,values,handleChange,handleBlur,errors,touched} = useFormik({
    initialValues: { title: "", picture: "",rating: "", summary: "",trailer: "",},
    validationSchema: formValidationSchema,
    onSubmit: (newmovie) => {
     
      fetch(`${API_URL}/movies`, {
        method: "POST",
        body: JSON.stringify(newmovie),
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(() =>  {history.push("/")
      console.log("success")})
      console.log("onsubmit",values)
    }
  });

  const [movies, setMovies] = useState([]);
  console.log(movies);

  useEffect(() => {
    fetch(`${API_URL}/movies`)
      .then((data) => data.json())
      .then((mvs) => setMovies(mvs))
  }, []);
  const history = useHistory();
 
  return (
    <form onSubmit={handleSubmit} className="movie-input">
      <TextField placeholder="Enter Movie Title"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur} 
              helperText= {errors.title && touched.title && errors.title}

        variant="standard" />

      <TextField placeholder="Enter Movie image address"
              id="picture"
              name="picture"
              value={values.picture}
              onChange={handleChange}
              onBlur={handleBlur}        
              helperText= {errors.picture && touched.picture && errors.picture}

              variant="standard" />
              
      <TextField placeholder="Enter Movie Rating"
              id="rating"
              name="rating"
              value={values.rating}
              onChange={handleChange}
              onBlur={handleBlur} 
              helperText= {errors.rating && touched.rating && errors.rating}
              variant="standard" />
             

      <TextField placeholder="Enter Movie Summary"
              id="summary"
              name="summary"
              value={values.summary}
              onChange={handleChange}
              onBlur={handleBlur}        
              helperText= {errors.summary && touched.summary && errors.summary}

              variant="standard" />


      <TextField placeholder="Enter Movie Trailer"
              id="trailer"
              name="trailer"
              value={values.trailer}
              onChange={handleChange}
              onBlur={handleBlur}        
              helperText= {errors.trailer && touched.trailer && errors.trailer}

              variant="standard" />

      <Button  type="submit" variant="contained" className="add-button">Add Movie</Button>

    </form>);
}
