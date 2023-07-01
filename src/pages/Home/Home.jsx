import React from 'react'
import './Home.css'

import Sidebar from '../../components/Sidebar/Sidebar'
import whatsappbg from '../../assets/whatsappbg.png'

const Home = ({ currentUser, signOutUser }) => {
    return (
        <div className="home">
            <div className="home-container">
                <Sidebar currentUser={ currentUser } signOutUser={ signOutUser }/>
                
                <div className="home-bg">
                    <img src={ whatsappbg } alt="whatsappbg" />
                </div>
            </div>
        </div>
    )
}

export default Home