import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {

    const { currentUser } = useSelector((store) => store.user)


    return (
        <div>
            {/* Top Section */}
            <div className="flex justify-between items-center p-4">
                {/* Logo Section */}
                <div className="flex items-center">
                    <img
                        className="h-10 w-auto sm:h-[70px]" // Adjust height for small and larger screens
                        src="https://img.freepik.com/free-vector/gradient-coding-logo-template_23-2148809439.jpg?t=st=1729874783~exp=1729878383~hmac=e226a68969f86bbef0d9ead7698e16a86a4b8bf54ba156f92833de51b856d862&w=740"
                        alt="Logo"
                    />
                </div>

                {/* Navigation Section */}
                <div>
                    <ul className="flex gap-4">
                        <Link to="/">
                            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
                        </Link>
                        <Link to="/about">
                            <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
                        </Link>


                        {
                            currentUser ? (
                                <Link to="/profile">
                                    <li className="text-slate-700 hover:underline">Profile</li>
                                </Link>
                            ) : (
                                <Link to="/sign-up">
                                    <li className="text-slate-700 hover:underline">Sign In</li>
                                </Link>
                            )
                        }



                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
