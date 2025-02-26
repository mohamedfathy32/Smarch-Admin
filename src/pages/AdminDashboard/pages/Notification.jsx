import { useContext, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { NotificationContext } from "../../../../Context/NotificationContext";

export default function Notification() {
  const { notifications, markAsRead } = useContext(NotificationContext);
  const[sendingTodayNotification,setsendingTodayNotification] =useState(0);
  const[notificationAsreading,setnotificationAsreading] = useState(0);
  const[notificationNotreading,setnotificationNotreading] = useState(0);



  return (
   <>
 <div className="flex flex-wrap gap-4 justify-evenly">






 <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3"> 
      الاشعارات المرسلة اليوم
    </h3>
    <p className="text-2xl font-semibold text-[#101828]">
      {notificationAsreading}
    </p>
  </div>

 
  <div className="flex justify-center items-center w-[60px] h-[60px] border  rounded-full bg-green-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="#48BB78"  
    >
      <path
        d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6V11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10 3.17 10 4v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"
      />
    </svg>
  </div>
</div>




<div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3"> 
      الاشعارات التي تمت قراءتها
    </h3>
    <p className="text-2xl font-semibold text-[#101828]">
      {notificationAsreading}
    </p>
  </div>

 
  <div className="flex justify-center items-center w-[60px] h-[60px] border  rounded-full bg-blue-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="#1A71FF"  
    >
      <path
        d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6V11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10 3.17 10 4v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"
      />
    </svg>
  </div>
</div>




<div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3"> 
      الاشعارات غير المقروئة
    </h3>
    <p className="text-2xl font-semibold text-[#101828]">
      {notificationAsreading}
    </p>
  </div>

 
  <div className="flex justify-center items-center w-[60px] h-[60px] border  rounded-full bg-red-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="#FF0000"  
    >
      <path
        d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6V11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10 3.17 10 4v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"
      />
    </svg>
  </div>
</div>


</div>

<div className="" style={{paddingTop:80 , }}>   

<h1 className="  text-center text-blue-500 font-bold text-3xl	 ">اختر المستلم </h1>

</div>


<div className="max-w-3xl mx-auto mt-16 space-y-6">
  {/* خيارات الإشعار */}
  <div className="grid grid-cols-2 gap-y-4 text-center">
    <label className="flex items-center justify-center gap-2">
      <input type="radio" name="hamada" value="all1" className="w-6 h-6 accent-blue-600" />
      <span className="text-xl font-bold text-black">جميع المستخدمين</span>
    </label>

    <label className="flex items-center justify-center gap-2">
      <input type="radio" name="hamada" value="all2" className="w-6 h-6 accent-blue-600" />
      <span className="text-xl font-bold text-black">جميع مالكي الشاليهات</span>
    </label>

    <label className="flex items-center justify-center gap-2">
      <input type="radio" name="hamada" value="all3" className="w-6 h-6 accent-blue-600" />
      <span className="text-xl font-bold text-black">مستأجر معين</span>
    </label>

    <label className="flex items-center justify-center gap-2">
      <input type="radio" name="hamada" value="all4" className="w-6 h-6 accent-blue-600" />
      <span className="text-xl font-bold text-black">مالك شاليه معين</span>
    </label>
  </div>

  {/* إدخالات النص */}
  <div className="grid grid-cols-2 gap-4">
    <input
      type="text"
      name="a"
      className="w-full p-2 border border-blue-600 rounded-lg text-lg font-bold text-blue-600"
      placeholder="الاسم"
    />

    <input
      type="text"
      name="b"
      className="w-full p-2 border border-blue-600 rounded-lg text-lg font-bold text-blue-600"
      placeholder="الاسم"
    />
  </div>

  {/* إدخال عنوان الإشعار */}
  <input
    type="text"
    name="c"
    className="w-full p-3 border border-blue-600 rounded-lg text-lg font-bold text-blue-600"
    placeholder="عنوان الإشعار"
  />

  {/* تفاصيل الإشعار */}
  <textarea
    name="description"
    rows="4"
    className="w-full p-3 border border-blue-600 rounded-lg text-lg font-bold text-blue-600 resize-none"
    placeholder="تفاصيل الإشعار"
  ></textarea>

  {/* زر الإرسال */}
  <button className="w-full py-3 text-white text-lg font-bold bg-blue-500 hover:bg-blue-700 rounded-lg">
    إرسال الإشعار الآن
  </button>
</div>




    </>
  );
}