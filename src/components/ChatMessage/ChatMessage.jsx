import React from 'react'
import './ChatMessage.css'

const ChatMessage = ({ message, time, sender, currentUser }) => {
    return (
        <div
            className="chat-message"
            style={{
                alignSelf: sender === currentUser?.email ? 'flex-end' : 'flex-start',
                backgroundColor: sender === currentUser?.email ? '#dcf8c6' : '#fff'
            }}
        >
            <div className="chat-message-text">
                <p>{ message }</p>
            </div>

            <div className="chat-message-date">
                <p>{ new Date(time.toDate()).toLocaleString() }</p>
            </div>
        </div>
    )
}

export default ChatMessage