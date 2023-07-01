import React from 'react'
import './UserProfile.css'
import { useNavigate } from 'react-router-dom'

const UserProfile = ({ name, photoURL, email, lastMessage }) => {

    const navigate = useNavigate()

    const goToUser = (emailId) => {
        if (emailId) {
            navigate(`/${emailId}`)
        }
    }

    return (
        <div className="user-profile" onClick={ () => { goToUser(email) }}>
            <img className="user-image" src={ photoURL } alt="user-logo" />

            <div className="user-info">
                <p className="user-name">{ name }</p>
                <p className="user-lastmessage">{ lastMessage }</p>
            </div>
        </div>
    )
}

export default UserProfile