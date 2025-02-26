import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

const DeleteUser = () => {
    const [users, setUsers] = useState<User[]>([]);

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users");
            const result = await response.json();
            if (response.ok) {
                setUsers(result);
            } else {
                throw new Error(result.message || "Failed to fetch users");
            }
        } catch (err) {
            alert(err);
        }
    };

    // Delete User
    const handleDelete = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: "DELETE",
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Delete failed");
            }

            alert(result.message);
            fetchUsers(); // Refresh user list
        } catch (err) {
            alert(err);
        }
    };

    // Fetch users when component loads
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Delete Users</h1>

            {/* List of Users */}
            <ul className="border border-gray-300 p-4 rounded">
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id} className="flex justify-between items-center p-2 border-b">
                            <span>{user.name} ({user.email})</span>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="p-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default DeleteUser;
