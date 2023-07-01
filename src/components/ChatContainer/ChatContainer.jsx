import React, { useState, useEffect, useRef } from 'react'
import './ChatContainer.css'
import { useParams } from 'react-router-dom';

import MoreVertIcon from "@mui/icons-material/MoreVert"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import { onSnapshot, doc, Timestamp, setDoc, addDoc, collection, orderBy, query } from "firebase/firestore";

import ChatMessage from '../ChatMessage/ChatMessage'
import { db } from '../../firebase'

const ChatContainer = ({ currentUser }) => {

    const [message, setMessage] = useState('')
    const [openEmojiBox, setOpenEmojiBox] = useState(false)
    const [chatUser, setChatUser] = useState({})
    const [chatMessages, setChatMessages] = useState([])
    const { emailID } = useParams()
    const chatbox = useRef(null)

    const getMessages = () => {
        const queryData = query(
            collection(db, 'chats', emailID, 'messages'),
            orderBy('timeStamp', 'asc')
        );

        const unsubscribe = onSnapshot(queryData, (snapshot) => {
            const messages = snapshot.docs.map((doc) => doc.data());
            const filteredMessages = messages.filter((message) =>
                message.senderEmail === (currentUser.email || emailID) ||
                message.receiverEmail === (currentUser.email || emailID)
            );
            setChatMessages(filteredMessages);
        });
        return unsubscribe;
    };

    const send = async (e) => {
        e.preventDefault();

        if (emailID) {
            const payload = {
                text: message,
                senderEmail: currentUser.email,
                receiverEmail: emailID,
                timeStamp: Timestamp.fromDate(new Date()),
            };

            try {
                await Promise.all([
                    addDoc(collection(db, 'chats', currentUser.email, 'messages'), payload),
                    addDoc(collection(db, 'chats', emailID, 'messages'), payload),
                ]);

                if (chatUser) {
                    await Promise.all([
                        setDoc(doc(db, 'friendlist', currentUser.email, 'list', emailID), {
                            email: chatUser.email,
                            fullname: chatUser.fullname,
                            photoURL: chatUser.photoURL,
                            lastMessage: message,
                        }),
                        setDoc(doc(db, 'friendlist', emailID, 'list', currentUser.email), {
                            email: currentUser.email,
                            fullname: currentUser.fullname,
                            photoURL: currentUser.photoURL,
                            lastMessage: message,
                        }),
                    ]);
                }
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };


    useEffect(() => {
        const getUser = onSnapshot(doc(db, 'users', emailID), (doc) => {
            setChatUser((prev) => ({
                ...prev,
                ...doc.data(),
            }));
        });
    }, [emailID]);

    useEffect(() => {
        chatbox.current.addEventListener('DOMNodeInserted', (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: "smooth" })
        })
    }, [chatMessages])

    useEffect(() => {
        if (chatUser) {
            getMessages();
        }
    }, [chatUser]);

    return (
        <div className="chat-container">
            <div className="chat-container-header">
                <div className="chat-user-info">
                    <div className="chat-user-img">
                        <img src={chatUser?.photoURL} alt="" />
                    </div>

                    <p>{chatUser.fullname}</p>
                </div>

                <div className="chat-container-header-btn">
                    <MoreVertIcon />
                </div>
            </div>

            <div className="chat-display-container" ref={chatbox}>
                {
                    chatMessages.map((messages) => {
                        return (
                            <ChatMessage
                                message={messages.text}
                                time={messages.timeStamp}
                                sender={messages.senderEmail}
                                currentUser={currentUser}
                            />
                        )
                    })
                }
            </div>

            <div className="chat-input">
                {
                    openEmojiBox &&
                    <EmojiPicker
                        onEmojiClick={(EmojiObjects) => {
                            setMessage(message + EmojiObjects.emoji)
                        }}
                    />
                }

                <div className="chat-input-btn">
                    <InsertEmoticonIcon onClick={() => { setOpenEmojiBox(!openEmojiBox) }} />
                    <AttachFileIcon />
                </div>

                <form onSubmit={send}>
                    <input type="text"
                        placeholder="Type a Message"
                        value={message}
                        onChange={(e) => { setMessage(e.target.value) }}
                    />
                </form>

                <div className="chat-input-send-btn">
                    <SendIcon onClick={send} />
                </div>
            </div>
        </div>
    )
}

export default ChatContainer