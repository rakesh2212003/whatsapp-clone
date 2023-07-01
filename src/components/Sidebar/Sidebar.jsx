import React, { useState, useEffect } from 'react'
import './Sidebar.css'

import TollIcon from "@mui/icons-material/Toll"
import InsertCommentIcon from "@mui/icons-material/InsertComment"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import SearchIcon from "@mui/icons-material/Search"
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";

import UserProfile from '../../components/UserProfile/UserProfile'
import { db } from '../../firebase'

const Sidebar = ({ currentUser, signOutUser }) => {

    const [allUsers, setAllUsers] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [friendList, setFriendList] = useState([])

    const searchedUser = allUsers.filter((user) => {
        if (searchInput && user.fullname.toLowerCase().includes(searchInput.toLowerCase())) {
            return user;
        }
        return null;
    });

    const searchItem = searchedUser.map((user) => {
        return (
            <UserProfile
                key={user.email}
                name={user.fullname}
                photoURL={user?.photoURL}
                email={user.email}
            />
        )
    })

    useEffect(() => {
        const getAllUsers = () => {
            if (currentUser) {
                const colRef = query(collection(db, "users"), where("email", "!=", currentUser.email));
                onSnapshot(colRef, (snapshot) => {
                    const users = [];
                    snapshot.docs.forEach((doc) => {
                        users.push(doc.data());
                    });
                    setAllUsers(users);
                }, (error) => {
                    console.log("Error fetching users:", error);
                });
            }
        };
        getAllUsers();
    }, [currentUser]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'friendlist', currentUser.email, 'list'));
                const friends = querySnapshot.docs.map((doc) => doc.data());
                setFriendList(friends);
            } catch (error) {
                console.log("Error fetching friend list:", error);
            }
        };
        getFriends();
    }, [friendList]);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-header-img" onClick={signOutUser}>
                    <img src={currentUser?.photoURL} alt="user" />
                </div>

                <div className="sidebar-header-btn">
                    <TollIcon />
                    <InsertCommentIcon />
                    <MoreVertIcon />
                </div>
            </div>

            <div className="sidebar-search">
                <div className="sidebar-search-input">
                    <SearchIcon />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        value={searchInput}
                        onChange={e => { setSearchInput(e.target.value) }}
                    />
                </div>
            </div>

            <div className="sidebar-chat-list">

                {
                    searchItem.length > 0 ? (
                        searchItem
                    ) : (
                        friendList.map((user) => (
                            <UserProfile
                                key={user.id}
                                name={user.fullname}
                                photoURL={user?.photoURL}
                                email={user.email}
                                lastMessage={user.lastMessage}
                            />
                        ))
                    )
                }

            </div>
        </div>
    )
}

export default Sidebar