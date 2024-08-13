import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginNow = async (e) => {
        e.preventDefault();

        // Validation check
        if (!email || !password) {
            toast.error('Please fill in both email and password fields.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                email,
                password,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('currentUser', JSON.stringify(response.data.data));
                toast.success("Logged in successfully!");
                toast.loading("Redirecting to home..")
                setTimeout(() => {
                    toast.dismiss();
                    navigate('/');
                }, 3000);
            } else {
                toast.error('User not found. Please check your email and password.');
            }
        } catch (error) {
            console.log('Login Error :', error);
            toast.error('An error occurred during login. Please try again.');
        }
    };

    return (
        <div> 
            <header className="header">
                <h1>Login Page</h1>
                <button onClick={() => navigate('/')}>Home</button>
            </header>
            <h1 className='signup-login-heading'>USER LOGIN</h1>
            <div className='signup-login-form'>
                <input
                    type='email'
                    placeholder='Email     (eg. vaibhavi@gmail.com) '
                    className='user-input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password    (eg. 1234321)'
                    className='user-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={loginNow} className='btn-auth'>Login</button>
            </div>

            <Link to='/signup' className="signup-login-link"> Don't have an account? SIGNUP</Link>
            <Toaster />
        </div>
    );
}

export default Login;
