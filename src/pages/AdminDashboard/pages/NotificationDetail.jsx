import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotificationContext } from "../../../../Context/NotificationContext";
import axios from "axios";

export default function NotificationDetail() {
    const { id } = useParams();
    const { notifications, markAsRead } = useContext(NotificationContext);
    const navigate = useNavigate();

    const notification = notifications.find((notif) => notif._id === id);

    if (!notification) {
        return <div className="text-center text-red-500">الإشعار غير موجود</div>;
    }

    const handleApprove = async () => {
        try {
            await axios.put(`https://smarch-back-end-nine.vercel.app/notification/admin/${id}/approve`);
            alert("تمت الموافقة على الطلب!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };

    const handleDecline = async () => {
        try {
            await axios.put(`https://smarch-back-end-nine.vercel.app/notification/admin/${id}/decline`);
            alert("تم رفض الطلب!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error declining request:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{notification.text}</h2>
            <p className="text-gray-500 mb-6">تاريخ الإشعار: {notification.createdAt}</p>

            <div className="flex gap-4">
                <button onClick={handleApprove} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    الموافقة ✅
                </button>
                <button onClick={handleDecline} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    الرفض ❌
                </button>
            </div>
        </div>
    );
}
