import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { auth } from './firebase'
import { signOut } from "firebase/auth";

import Login from './pages/Login/Login'
import ChatPage from './pages/ChatPage/ChatPage'
import Home from './pages/Home/Home'

function App() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const signOutUser = () => {
        signOut(auth)
        .then(() => {
            setUser(null)
            localStorage.removeItem('user')
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <Router>
            <div className="App">
                {
                    user ? (
                        <Routes>
                            <Route
                                path='/:emailID'
                                element={<ChatPage currentUser={user} signOutUser={signOutUser} />}
                            />
                            <Route
                                path='/'
                                element={<Home currentUser={user} signOutUser={signOutUser} />}
                            />
                            <Route
                                path='/login'
                                element={<Login currentUser={user} signOutUser={signOutUser} />}
                            />
                        </Routes>
                    ) : (
                        <Login setUser={setUser} />
                    )
                }
            </div>
        </Router>
    );
}

export default App;
