import React, { useEffect, useRef, useState } from 'react';
import { emailList } from '@/utils/fackData/emailList';


const removeDuplicates = (array, key) => {
    const seen = new Set();
    return array.filter(item => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
};


const EmailTagInput = ({ placeholder, className }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showUserList, setShowUserList] = useState(false);
    const [users, setUsers] = useState();
    const userRef = useRef()

    const handleInputClick = () => {
        setShowUserList(!showUserList);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleUserClick = (id) => {
        if (!selectedUsers.includes(id)) {
            const addUser = users.filter((user) => user.id === id)
            setSelectedUsers([...selectedUsers, ...addUser]);
            setUsers(users.filter((user) => user.id !== id));
        }
        setShowUserList(false);
        setSearchQuery('');
    };

    const handleTagClose = (id) => {
        setSelectedUsers(selectedUsers.filter((user) => user.id !== id));
        const removeUser = selectedUsers.filter((user) => user.id === id)
        setUsers([...users, ...removeUser]);
    };

    const handleTotalUserClick = () => {
        setSelectedUsers(users);
        setUsers([]);
    };

    useEffect(() => {
        const uniqueUsers = removeDuplicates(emailList.emails, 'user_email')
        setUsers(uniqueUsers)

        const handleHideDropdownList = (event) => {
            if (userRef.current && !userRef.current.contains(event.target)) {
                setShowUserList(false);
            }
        }
        document.addEventListener("click", (event) => handleHideDropdownList(event))

        return () => document.removeEventListener("click", (event) => handleHideDropdownList(event))
    }, [])


    const filteredUsers = users?.filter(({ user_email }) =>
        user_email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div ref={userRef} className={`email-tag-container ${className}`}>
            <div className='tag-field'>
                <div className='tags'>
                    {selectedUsers.map(({ id, user_img, user_email, user_name }) => (
                        <span key={id} className="tag chat-single-item">
                            {
                                user_img ?
                                    <img src={user_img} alt="" className="img-fluid" />
                                    :
                                    <div className="text-white user-avatar-text">{user_name.substring(0, 1)}</div>
                            }
                            <span className='text-dark'>{user_name}</span>

                            <button onClick={() => handleTagClose(id)}>x</button>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className='tag-input form-control border-0 text-dark'
                />
            </div>
            {showUserList && (
                <div className="user-list">
                    <div className='user' onClick={handleTotalUserClick}>
                        <b className='text-dark'>Add All</b>
                        <small className='d-block'>{users.length} Members</small>
                    </div>

                    <div >
                        {filteredUsers.map(({ id, user_email, user_name, user_img }) => (
                            <div key={id} onClick={() => handleUserClick(id)} className='user d-flex align-items-center gap-3 chat-single-item '>
                                {
                                    user_img ?
                                        <div className="avatar-image avatar">
                                            <img src={user_img} alt="img" className="img-fluid" />
                                        </div>
                                        :
                                        <div className="text-white avatar-text user-avatar-text avatar">{user_name.substring(0, 1)}</div>
                                }
                                <div>
                                    <b className='text-dark'>{user_name}</b>
                                    <small className='d-block'>{user_email}</small>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}


        </div>
    );
};

export default EmailTagInput;