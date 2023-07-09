import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

interface NavbarProps {
    links: { name: string; path: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
    const location = useLocation();
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <span className="text-white font-bold text-xl">YZ Pharmarcy</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end
                                className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === link.path ? 'text-white bg-gray-900' : ''
                                }`}
                            >
                            {link.name}
                            </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;