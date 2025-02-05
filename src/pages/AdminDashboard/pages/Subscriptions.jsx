import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiMoreHorizontal } from "react-icons/fi";
import Swal from 'sweetalert2';
import { Hourglass } from 'react-loader-spinner';


export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null); // لتتبع الصف النشط
  const dropdownRef = useRef(null); 
  const [loadingPage, setLoadingPage] = useState(true); 


  const token = localStorage.getItem("token");


  const fetchData = async (page) => {
    const response = await axios.get("https://smarch-back-end-nine.vercel.app/subscription", {
      headers: { authorization: token },
      params: { page }
    });
    setSubscriptions(response.data.data);
    // console.log(response.data.data);
    setLoadingPage(false);
    setTotalPages(response.data.pagination.totalPages);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // إغلاق القائمة المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    // إضافة مستمع لحدث النقر
    document.addEventListener("click", handleClickOutside);

    // تنظيف المستمع عند إلغاء التثبيت
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // وظيفة لفتح/إغلاق القائمة المنسدلة
  const toggleDropdown = (id, event) => {
    event.stopPropagation(); // منع انتشار الحدث إلى document
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // وظائف الخيارات
  const handleExtend = async (_id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'هل تريد تمديد هذا العنصر؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالتمديد!',
      cancelButtonText: 'إلغاء'
    }).then(async (result) => {
      if (result.isConfirmed) {
  
    try {
      const response = await axios.patch(
        `https://smarch-back-end-nine.vercel.app/subscription/renew/${_id}`,
        {}, 
        {
          headers: { authorization: token }, 
        }
      );
      
      console.log("تم تمديد الاشتراك بنجاح", response.data);
      fetchData(currentPage); // إعادة تحميل البيانات بعد التحديث
    } catch (error) {
      console.error("حدث خطأ أثناء تمديد الاشتراك:", error);
      Swal.fire("خطأ!", "فشل تمديد الاشتراك. تأكد من أنك تملك الصلاحيات اللازمة.", "error");
    }
  }
  });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'هل تريد حذف هذا العنصر؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالحذف!',
      cancelButtonText: 'إلغاء'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`https://smarch-back-end-nine.vercel.app/subscription/delete/${id}`,  {
            headers: { authorization: token },
          });
          console.log(response.data);
          fetchData(currentPage);
        } catch (error) {
          console.log(error);
          Swal.fire("خطأ!", "فشل حذف العنصر. تأكد من أنك تملك الصلاحيات اللازمة.", "error");
        }

      } 


    });
  };

  const handleHide = (id) => {
    console.log("إخفاء الاشتراك:", id);
    // أضف هنا الوظيفة المناسبة
  };

  const handlePause = (id) => {
    console.log("إيقاف الاشتراك:", id);
    // أضف هنا الوظيفة المناسبة
  };

  const handleTerminate = (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'هل تريد إنهاء هذا العنصر؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالإنهاء!',
      cancelButtonText: 'إلغاء'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(`https://smarch-back-end-nine.vercel.app/subscription/end/${id}` , {}, {
            headers: { authorization: token },
          });
          console.log(response.data);
          fetchData(currentPage);
        } catch (error) {
          console.log(error);
          Swal.fire("خطأ!", "فشل إنهاء العنصر. تأكد من أنك تملك الصلاحيات اللازمة.", "error");
        }
      }
    });
  };

  return (
    <div>
    {loadingPage ? (
      <div className="flex justify-center items-center h-screen">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </div>
    ) : (
      <>
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-4 p-4 rounded-lg w-full max-w-2xl">
            <input

            type="email"
            placeholder="الحالة"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="البريد الالكتروني"
            className="px-3 py-2 border border-#1A71FF rounded-md w-full"
          />
          <input
            type="text"
            placeholder="رقم الهاتف"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition w-[15vw]">
            بحث
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="text-[#0061E0] p-2 text-xl">
              <th>الحالة</th>
              <th>الاسم</th>
              <th>نوع الخطة</th>
              <th>يبدأ من</th>
              <th>ينتهي في</th>
              <th>اجراء</th>
              <th>عرض التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription._id}>
                <td className="py-2 px-1 text-center text-lg">
                  <span className={`border px-3 py-1 text-center rounded-md text-white ${subscription.isActive ? "bg-green-500" : "bg-red-500"}`}>
                    {subscription.isActive ? "نشط" : "معطل"}
                  </span>
                </td>
                <td className="py-2 px-1 text-center text-lg">{subscription.userId.userName}</td>
                <td className="py-2 px-1 text-center text-lg">{subscription.packageId.name}</td>
                <td className="py-2 px-1 text-center text-lg">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-1 text-center text-lg">
                  {new Date(subscription.endDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-1 text-center text-lg relative">
                  <button
                    onClick={(event) => toggleDropdown(subscription._id, event)}
                    className="text-blue-500 hover:underline"
                  >
                    <FiMoreHorizontal size={20} />
                  </button>
                  {activeDropdown === subscription._id && (
  <div
    ref={dropdownRef}
    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-300 ease-in-out transform opacity-100 scale-100"
  >
    <button
      onClick={() => handleExtend(subscription._id)}
      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors duration-200"
    >
      تمديد
    </button>
    <button
      onClick={() => handleDelete(subscription._id)}
      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors duration-200"
    >
      حذف
    </button>
    <button
      onClick={() => handleHide(subscription._id)}
      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors duration-200"
    >
      إخفاء
    </button>
    <button
      onClick={() => handlePause(subscription._id)}
      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-500 transition-colors duration-200"
    >
      إيقاف
    </button>
    <button
      onClick={() => handleTerminate(subscription._id)}
      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700 transition-colors duration-200"
    >
      إنهاء الاشتراك
    </button>
  </div>
)}
                </td>
                <td className="p-2 text-center">
                  <button className="text-white bg-gray-500 px-3 py-1 rounded-md">
                    عرض التفاصيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          الصفحة السابقة
        </button>
        <span>الصفحة {currentPage} من {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          الصفحة التالية
        </button>
      </div>
    </>
    )}
    </div>
  );
}