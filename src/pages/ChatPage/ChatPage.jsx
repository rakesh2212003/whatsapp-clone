import React from 'react'
import './ChatPage.css'

import Sidebar from '../../components/Sidebar/Sidebar'
import ChatContainer from '../../components/ChatContainer/ChatContainer'

const ChatPage = ({ currentUser, signOutUser }) => {
    
    return (
        <div className="chatpage">
            <div className="chatpage-container">
                <Sidebar currentUser={currentUser} signOutUser={signOutUser}/>
                <ChatContainer currentUser={currentUser}/>
            </div>
        </div>
    )
}

export default ChatPage