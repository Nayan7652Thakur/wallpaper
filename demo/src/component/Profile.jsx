import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { currentUser } = useSelector((store) => store.user);

 console.log(currentUser);

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
         
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2>Profile page on working?</h2>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Profile Information</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        value={currentUser.username}
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Username"
                        readOnly
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        value={currentUser.email}
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Email"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
