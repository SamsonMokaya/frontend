import '../css/Login.css'
import LoginImage from '../images/login-image.png';
import Facebook from '../images/facebook.png';
import Google from '../images/google.png';
import Twitter from '../images/twitter.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value]}))
    }

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:5000/api/')
        .then(res => {
            if(res.data.valid){
            
                navigate('/doctor/patient')
            }else{
                navigate('/doctor_login')
            }
        })
        .catch(err => console.log(err))
    })


    const handleSubmit = async (event)  => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/dlogin', values)
        .then( res => { 
            if(res.data.status == 200){
                alert("Success")
                navigate('/doctor/patient')
            }else{
                alert("Invalid credentials")
                navigate('/doctor_login')
            }
        })
        .catch(err => {
            alert("Invalid credentials")
        }); 
    }



  return (
    <div className="App">

            <div class="overall">
                <div class="image">
                    <img src={LoginImage} alt=""/>
                </div>
                <div class="form">
                    <div class="header">
                        <h1>User <span>Account</span></h1>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <i class="fa fa-envelope" aria-hidden="true" id="email"></i>
                        <div class="email">
                            <input type="email" name="email" required onChange={handleInput} id="" placeholder="email"/>
                        </div>
                        <i class="fa fa-key" aria-hidden="true" id="password"></i>
                        <div class="password">
                            <input type="password" name="password" required onChange={handleInput} id="" placeholder="password"/>
                        </div>
                        <p>Or log in with the following</p>
                        <div class="log-icons">
                            <img src={Facebook} alt=""/>
                            <img src={Google} alt=""/>
                            <img src={Twitter} alt=""/>
                        </div>
                        <div class="button">
                            <button type='submit'>Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default Login;
