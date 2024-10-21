import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Fetch user details using async/await
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                console.log(data);
                setName(data.name); // Set the user's name in state
                setEmail(data.email); // Set the user's email in state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    // Handle form submission using async/await
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = { name, email };

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser), // Send the updated user data as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const data = await response.json();
            console.log('User updated:', data);
            navigate('/users'); // Navigate back to user list after successful update
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Enter Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Enter Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update User</button>
            </form>
        </div>
    );
};

export default UpdateUser;
