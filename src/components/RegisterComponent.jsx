import React, { useState } from 'react';
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI';
import { postUserData } from '../api/FirestoreAPIs';
import LinkedinLogo from "../assets/linkedin_logo.png";
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import '../Sass/LoginComponent.scss';
import { toast } from 'react-toastify';
import { getUniqeID } from '../helpers/getUniqueid';

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Account is now created");
      postUserData({ 
        userID: getUniqeID(),
        name: credentials.name, 
        email: credentials.email});
      navigate('/home');
      localStorage.setItem('userEmail', res.user.email);
    }
    catch (err) {
      console.log(err);
      toast.error("Cannot create your account");
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    console.log(response);
  };
  return (
    <div className='login-wrapper'>
      <img src={LinkedinLogo} className='linkedinLogo' />
      <div className='login-wrapper-inner'>
        <h1 className="heading">Make the most of your professional life </h1>
        <p className="sub-heading">And Stay updated on your professional world</p>

        <div className='auth-inputs'>
        <input
            onChange={(event) =>
              setCredentials({ ...credentials, name: event.target.value })
            }
            type='text'
            className='common-input'
            placeholder='Your Name'
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type='email'
            className='common-input'
            placeholder='Email or phone number'
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type='password'
            className='common-input'
            placeholder='Password (6 or more characters)'
          />
        </div>
        <button onClick={register} className='login-btn'>
          Agree & Join
        </button>

        <hr className='hr-text' data-content='or' />
        <div className='google-btn-container'>
          <GoogleButton
            className='google-btn' onClick={googleSignIn} />

          <p className='go-to-signup'>
            Already on LinkedIn?{' '}
            <span className='join-now' onClick={() => navigate('/')}>
              Sign in
            </span>
          </p>
          
        </div>
      </div>
    </div>
  )
};
