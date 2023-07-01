import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

import { signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";

import whatsapp from '../../assets/whatsapp.png'
import google from '../../assets/google.png'
import { auth, googleProvider, db } from '../../firebase'

const Login = ({ setUser }) => {

    const navigate = useNavigate()

    const signupWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const newUser = {
                fullname: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            }
            navigate('/')
            setUser(newUser)
            try{
                localStorage.setItem('user', JSON.stringify(newUser))
                setDoc(doc(db, "users", result.user.email), newUser)
            } catch(e){
                console.log(e)
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div className="login">
            <div className="login-container">
                <img className="login-logo" src={ whatsapp } alt="whatsapp" />

                <p className="login-name">WhatsApp Web</p>

                <button className="login-btn" onClick={ signupWithGoogle }>
                    <img src={ google } alt="login with google" />
                    Login With Google
                </button>
            </div>
            <p className='copyright'>Develop by Rakesh Rana © 2023 - 2024</p>
        </div>
    )
}

export default Login