import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../../../Context/NotificationContext";
import axios from "axios";

export default function NotificationDetail() {
    const { id } = useParams();
    const { notifications, markAsRead } = useContext(NotificationContext);
    const navigate = useNavigate();
    const [chalet, setChalet] = useState(null);
    const location = useLocation()
    const {notificationID}=location.state;
    console.log(notificationID);
    console.log(id);
console.log(notifications);
    // const notification = notifications.find((notif) => notif._id === id);

    // if (!notification) {
    //     return <div className="text-center text-red-500">الإشعار غير موجود</div>;
    // }

    const handleApprove = async () => {
        try {
            await axios.put(`https://smarch-back-end-nine.vercel.app/notification/admin/${id}/approve`);
            alert("تمت الموافقة على الطلب!");
            navigate(""); // يمكنك استبدال "" بالمسار المطلوب
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };

    const handleDecline = async () => {
        try {
            await axios.put(`https://smarch-back-end-nine.vercel.app/notification/admin/${id}/decline`);
            alert("تم رفض الطلب!");
            navigate(""); // يمكنك استبدال "" بالمسار المطلوب
        } catch (error) {
            console.error("Error declining request:", error);
        }
    };

    useEffect(() => {
        const getChalet = async () => {
            try {
                const response = await axios.get(
                    `https://smarch-back-end-nine.vercel.app/chalet/${id}`
                );
                setChalet(response.data.data); // حفظ بيانات الشاليه في الـ state
            } catch (error) {
                console.error("Error fetching chalet details:", error);
            }
        };

        getChalet();
    }, [id]); // يتم استدعاء useEffect عند تغيير id

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{notifications.text}</h2>
            <p className="text-gray-500 mb-6">تاريخ الإشعار: {notifications.createdAt}</p>

            {chalet ? (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700">تفاصيل الشاليه:</h3>
                    <p className="text-gray-600">{notifications.name}</p>

                </div>
            ) : (
                <p className="text-gray-400">جارٍ تحميل بيانات الشاليه...</p>
            )}

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
