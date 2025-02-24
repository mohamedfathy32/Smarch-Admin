import React, { useContext } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { NotificationContext } from "../../../../Context/NotificationContext";

export default function Notification() {
  const { notifications, markAsRead } = useContext(NotificationContext);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">الإشعارات</h2>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد إشعارات جديدة</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 shadow-md transition-all duration-300 ${
                notif.isRead ? "bg-gray-100" : "bg-blue-50 border-blue-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg ${notif.isRead ? "font-normal text-gray-700" : "font-semibold text-blue-700"}`}>
                    {notif.text}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {notif.createdAt} 
                  </p>
           

                </div>

                {!notif.isRead && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="flex items-center px-3 py-1 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 transition duration-200"
                  >
                    <FaCheckSquare className="mr-1" />

                    <span className="text-sm">تعيين كمقروء</span>

                  </button>
                )}
              </div>

              {!notif.isRead && (
                <div className="mt-2 text-sm text-blue-500 font-semibold">إشعار جديد 🔔</div>

              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
