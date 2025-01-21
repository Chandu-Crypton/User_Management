import React, { useState } from 'react'

const UserTasks = () => {
    const [users, setUsers] = useState([]);
    return (
        <>
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
                    <button onClick={addUser} className="bg-blue-500 text-white p-2 ml-2">Add User</button>
                </div>

            </div>
        </>
    )
}

export default UserTasks