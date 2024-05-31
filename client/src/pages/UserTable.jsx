import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState({ _id: '', username: '', email: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleDelete = async (id) => {
        try {
            console.log("the id is ", id);
            await axios.delete(`/api/admin/users/${id}`);
            // Remove the deleted user from the state
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditClick = (user) => {
        setIsEditing(true);
        setCurrentUser(user);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/admin/edituser/${currentUser._id}`, currentUser);
            console.log("Response after editing:", response.data);
            // Update the state with the edited user
            setUsers(users.map(user => user._id === currentUser._id ? response.data : user));
            setIsEditing(false);
            setCurrentUser({ _id: '', username: '', email: '', role: '' });
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const filteredUsers = users.filter(user => {
        const username = user.username ? user.username.toLowerCase() : '';
        const email = user.email ? user.email.toLowerCase() : '';
        
        return (
            username.includes(searchTerm.toLowerCase()) ||
            email.includes(searchTerm.toLowerCase()) 
            );
    });

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
            />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user._id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.username}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                                <button onClick={() => handleEditClick(user)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <div>
                    <h3>Edit User</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>Username: </label>
                            <input
                                type="text"
                                name="username"
                                value={currentUser.username}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div>
                            <label>Email: </label>
                            <input
                                type="email"
                                name="email"
                                value={currentUser.email}
                                onChange={handleEditChange}
                            />
                        </div>
                      
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserTable;
