import React from 'react';

const About = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Website Information</h1>

                <p className="text-gray-700 mb-4">
                    This website is fully secure and created for downloading high-quality wallpapers to match your dreams and style.
                </p>

                <p className="text-gray-700 mb-4">
                    To access all features, please create an account first.
                </p>

                <p className="text-gray-700">
                    Available quality options: HD, 4K, and 8K.
                </p>
            </div>
        </div>
    );
};

export default About;
