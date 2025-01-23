import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { validateForms } from './ValidateForms';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs

const UserTasks = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', department: '' });
    const [error, setError] = useState('');

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch users from API
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            // Modify the API response to include necessary form fields
            const formattedUsers = response.data.map(user => ({
                id: user.id,
                firstName: user.name.split(' ')[0] || '',
                lastName: user.name.split(' ')[1] || '',
                email: user.email,
                department: user.company?.name || ''
            }));
            setUsers(formattedUsers);
        } catch (err) {
            setError('Error fetching users');
        }
    };

    // Function to add a new user
    const addUser = async () => {
        const validationError = validateForms(form);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', form);

            // Assign a unique ID for the manually added user
            const newUser = { ...form, id: uuidv4() };

            setUsers([...users, newUser]);
            setForm({ firstName: '', lastName: '', email: '', department: '' });
            setError('');
        } catch (err) {
            setError('Error adding user');
        }
    };

    // Function to handle editing a user
    const handleEdit = (user) => {
        setForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            department: user.department,
        });
        setEditingUserId(user.id);
    };

    // Function to update an existing user
    const updateUser = async () => {
        const validationError = validateForms(form);
        if (validationError) {
            setError(validationError);
            return;
        }

        const updatedUser = {
            id: editingUserId,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            department: form.department,
        };

        // Check if the user is manually added (UUID-based ID)
        const isManualUser = typeof editingUserId === 'string';

        if (isManualUser) {
            // Update manually added user in state
            setUsers(users.map(user =>
                user.id === editingUserId ? { ...user, ...updatedUser } : user
            ));
        } else {
            try {
                const response = await axios.put(
                    `https://jsonplaceholder.typicode.com/users/${editingUserId}`,
                    updatedUser
                );

                if (response.status === 200) {
                    setUsers(users.map(user =>
                        user.id === editingUserId ? { ...user, ...updatedUser } : user
                    ));
                }
            } catch (err) {
                setError('Error updating user');
                return;
            }
        }

        setForm({ firstName: '', lastName: '', email: '', department: '' });
        setEditingUserId(null);
        setError('');
    };

    const deleteUser = async (id) => {
        const isManualUser = typeof id === 'string';

        if (isManualUser) {
            setUsers(users.filter(user => user.id !== id));
        } else {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                setError('Error deleting user');
            }
        }
    };



    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            {error && <p className="text-red-500">{error}</p>}



            <div className="mb-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="border p-2"
                />
                {editingUserId ? (
                    <button onClick={updateUser} className="bg-green-500 text-white p-2 mb-4">Update User</button>
                ) : (
                    <button onClick={addUser} className="bg-blue-500 text-white p-2 mb-4">Add User</button>
                )}
            </div>

            <ul>
                {users.map((user) => (
                    <li key={user.id} className="border p-2 mb-2">

                        {user.name || `${user.firstName} ${user.lastName}`} - {user.email} - {user.company?.name || user.department}
                        <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white p-1 ml-2">
                            Edit
                        </button>
                        <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white p-1 ml-2">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserTasks;
