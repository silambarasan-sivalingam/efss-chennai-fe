import React from "react";
import logo from '../assets/images/efsslogo.png'
import { Logo, FormRow, Alert } from "../components";
import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

export const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate()

// global state and useNavigate
// const state = useAppContext()
// console.log(state)

  const { isLoading, 
          showAlert, 
          displayAlert, 
          // registerUser, 
          user,
          // loginUser, 
          setupUser,
         } = useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setValues({
      ...values, [e.target.name]: e.target.value
      ,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values

    if(!email || !password || (!isMember && !name )) {
       displayAlert()
       return
      
    } 

    const currentUser = { name, email, password }
   
      setupUser({currentUser, endPoint: 'login', alertText: 'Login Successful! Redirecting...'})
  

  };

  useEffect(()=>{
      if(user){
        setTimeout(()=>{
          navigate('/')
        }, 30)
      }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        
        <Logo logo={logo} />

        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {showAlert && <Alert />}

        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          ></FormRow>
        )}

        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        ></FormRow>

        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        ></FormRow>

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>


      </form>
    </Wrapper>
  );
};
