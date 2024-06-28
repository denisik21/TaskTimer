import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [name, setName] = useState(currentUser?.displayName || '');
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            await updateUserProfile({ displayName: name });
            navigate('/');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="edit-profile text-white w-4/5 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
            <div className="mb-4">
                <label className="block text-lg mb-2">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 text-black"
                />
            </div>
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                Save
            </button>
        </div>
    );
};

export default EditProfile;
