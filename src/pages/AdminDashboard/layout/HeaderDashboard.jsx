import { useState, useContext } from 'react';
import { IoIosMenu } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { FaCoins, FaUser } from "react-icons/fa";
import SidebarDashboard from './SidebarDashboard';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from "../../../../Context/NotificationContext";
import NotificationModal from './../pages/NotificationModal'; // Import the modal

export default function HeaderDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { notifications } = useContext(NotificationContext);
    
    const unreadCount = notifications.filter(notif => !notif.isRead).length;
    const nav = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleNotifications = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <header className="bg-blue-50 shadow px-6 py-4 flex justify-between items-center">
            <div className='md:hidden'>
                <IoIosMenu
                    onClick={toggleMenu}
                    className="text-4xl md:text-3xl transition-transform duration-300"
                />
            </div>
            <div className="flex items-center gap-4">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    className="w-24"
                    onClick={() => { nav('/dashboard') }}
                />
            </div>

            <div className='flex flex-row gap-5 ms-4 relative'>
                <button onClick={toggleNotifications} className="relative">
                    <IoMdNotifications size={22} className='text-blue-700' />
                    {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </button>

                <button>
                    <FaCoins size={20} className='text-blue-700' />
                </button>

                <button>
                    <FaUser size={20} className='text-blue-700' />
                </button>
            </div>

            <input
                type="text"
                placeholder="بحث"
                className="hidden md:block w-[50%] border rounded-lg border-blue-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center gap-2">
                <span className="hidden md:block">fathy</span>
                <img
                    src="/assets/images/copy1.JPG"
                    alt="Profile"
                    className="rounded-full w-10 h-10 cursor-pointer"
                    onClick={() => nav('/Profile')}
                />
            </div>

            {/* Sidebar */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-[#00000080] z-20 transition-opacity duration-300"
                    onClick={toggleMenu}
                >
                    <SidebarDashboard isOpen={isMenuOpen} />
                </div>
            )}

            {/* Notification Modal */}
            {isNotificationOpen && <NotificationModal onClose={toggleNotifications} />}
        </header>
    );
}
