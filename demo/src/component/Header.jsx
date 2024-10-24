import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {



    return (
        <div>
            {/* Top Section */}
            <div className='flex justify-between items-center p-4'>
                {/* Logo Section */}
                <div className='h-[70px] flex items-center'>
                    <img className='h-full w-auto' src="https://images.unsplash.com/photo-1432462770865-65b70566d673?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" />
                </div>

                {/* Navigation Section */}
                <div>
                    <ul className='flex gap-4'>
                        <Link to="/">
                            <li className="hidden sm:inline text-slate-700 hover:underline">
                                Home
                            </li>
                        </Link>
                        <Link to="/about">
                            <li className="hidden sm:inline text-slate-700 hover:underline">
                                About
                            </li>
                        </Link>
                        <Link to="/signup">
                            <li className="text-slate-700 hover:underline">
                                Sign In
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>

            {/* Image Section with fixed height */}

          
   </div>





    );
}

export default Header;
