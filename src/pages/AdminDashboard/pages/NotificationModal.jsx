import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { NotificationContext } from "../../../../Context/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function NotificationModal({ onClose }) {
    const { notifications, markAsRead } = useContext(NotificationContext);
    const navigate = useNavigate();

    const handleNotificationClick = (notif) => {
        markAsRead(notif._id);
        navigate(`/notification/${notif._id}`); // Navigate to detail page
        onClose(); // Close modal
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    <FaTimes size={18} />
                </button>
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">الإشعارات</h2>

                {notifications.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">لا توجد إشعارات جديدة</p>
                ) : (
                    <div className="mt-4 space-y-4">
                        {notifications.map((notif) => (
                            <div
                                key={notif._id}
                                onClick={() => handleNotificationClick(notif)}
                                className={`p-3 border rounded-md shadow-sm cursor-pointer ${
                                    notif.isRead ? "bg-gray-100" : "bg-blue-50 border-blue-400"
                                }`}
                            >
                                <p className={`text-sm ${notif.isRead ? "text-gray-600" : "text-blue-700 font-semibold"}`}>
                                    {notif.text}
                                </p>
                                <p className="text-xs text-gray-500">{notif.createdAt}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
