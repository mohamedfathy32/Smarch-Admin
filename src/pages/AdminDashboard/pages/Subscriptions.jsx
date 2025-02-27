import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiMoreHorizontal } from "react-icons/fi";
import Swal from 'sweetalert2';
import { Hourglass } from 'react-loader-spinner';
import * as XLSX from "xlsx";
import { Oval } from 'react-loader-spinner';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null); // لتتبع الصف النشط
  const dropdownRef = useRef(null); 
  const [loadingPage, setLoadingPage] = useState(true); 


  const token = localStorage.getItem("tokenAdmin");

  const [loadingFilter, setLoadingFilter] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [noResults, setNoResults] = useState(false)
  const [filters, setFilters] = useState({
    name: "",
    isActive: "",
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleFilter = async ( page = 1) => {
    setLoadingFilter(true);
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/subscription/filter`, {
        headers: { authorization: token },
        params: {
          page,
          ...activeFilters,
                    
        },
      });
      console.log(response.data);
      setSubscriptions(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      if (response.data.data.length === 0) {
        setNoResults(true);
        Swal.fire({
          title: "لا توجد نتائج",
          text: "المستخدم غير موجود.",
          icon: "warning",
          confirmButtonText: "موافق",
        });
      }
      
    } catch (error) {
      console.error("Error filtering users:", error);
    } finally {
      setLoadingFilter(false);
    }
  };

  const fetchData = async (page) => {
    try {
    const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/subscription`, {
      headers: { authorization: token },
      params: { page },
    });
    console.log(response.data.data);
    setSubscriptions(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
    setLoadingPage(false);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    if (filters.name || filters.isActive) {
      handleFilter(currentPage);
    } else {
      fetchData(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    // إذا كانت جميع الحقول فارغة، جلب جميع البيانات
    if (
      filters.name === '' &&
      filters.isActive === '' 
    
      
    ) {
      setButtonDisabled(true);
      fetchData(currentPage); // جلب جميع البيانات الأصلية
    }
    else{
      setButtonDisabled(false);
    }
  }, [filters]); // مراقبة تغييرات filters


  


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
        `${import.meta.env.VITE_URL_BACKEND}/subscription/renew/${_id}`,
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
          const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/subscription/delete/${id}`,  {
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



  const handlePause = async (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'هل تريد إيقاف هذا الاشتراك؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالإيقاف!',
      cancelButtonText: 'إلغاء'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/subscription/status/${id}`, {
            isActive: false,
      }, {
        headers: { authorization: token },
      });
      console.log(response.data);
      fetchData(currentPage);
    } catch (error) {
      console.log(error);
      Swal.fire("خطأ!", "فشل إيقاف الاشتراك. تأكد من أنك تملك الصلاحيات اللازمة.", "error");
    }
  }
  });
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
          const response = await axios.patch(`${import.meta.env.VITE_URL_BACKEND}/subscription/end/${id}` , {}, {
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

  const handleExportToExcel = () => {
    if (subscriptions.length === 0) {
      Swal.fire({
        title: "لا يوجد بيانات لتصدير",
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
    const formattedData = subscriptions.map(subscription => ({
      'الحالة': subscription.isActive ? 'نشط' : 'معطل',
      'الاسم': subscription.userId.userName,
      'نوع الخطة': subscription.packageId.name,
      'يبدأ من': new Date(subscription.startDate).toLocaleDateString(),
      'ينتهي في': new Date(subscription.endDate).toLocaleDateString(),

    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "الاشتراكات");
    XLSX.writeFile(workbook, "الاشتراكات.xlsx");
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
            type="text"
            placeholder="اسم الخطة"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
         
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />



         
          <select
            name="isActive"
            value={filters.isActive}
            onChange={handleFilterChange}
          >
            <option value="">الجميع</option>
            <option value="true">نشط</option>
            <option value="false">معطل</option>
          </select>

          

          <button disabled={buttonDisabled} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition w-[15vw]" onClick={handleFilter}>
            {loadingFilter ?<Oval visible={true} height="20" width="20" color="#fff" ariaLabel="oval-loading" /> : "بحث"}
            
          </button>
        </div>
      </div>
      <button
                        onClick={() => { handleExportToExcel() }}
                        className="m-5 p-5 text-1xl bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                    >
                        تحميل البيانات

                    </button>

                    <div className="bg-white p-4 rounded-lg shadow">
  {/* ✅ جدول عادي للشاشات الكبيرة */}
  {subscriptions.length > 0 ? (
  <div className="hidden md:block">
 

    
    <table className="w-full">
      <thead>
        <tr className="text-[#0061E0] p-2 text-xl">
          <th>الحالة</th>
          <th>الاسم</th>
          <th>نوع الخطة</th>
          <th>يبدأ من</th>
          <th>ينتهي في</th>
          <th>اجراء</th>
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
              <button onClick={(event) => toggleDropdown(subscription._id, event)} className="text-blue-500 hover:underline">
                <FiMoreHorizontal size={20} />
              </button>
              {activeDropdown === subscription._id && (
                <div ref={dropdownRef} className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button onClick={() => handleExtend(subscription._id)} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500">
                    تمديد
                  </button>
                  <button onClick={() => handleDelete(subscription._id)} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500">
                    حذف
                  </button>
                  <button disabled={subscription.isActive === false} onClick={() => handlePause(subscription._id)} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-500 disabled:opacity-50">
                    إيقاف
                  </button>
                  <button onClick={() => handleTerminate(subscription._id)} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700">
                    إنهاء الاشتراك
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  ) : (
    <div className="text-center text-gray-500 text-lg py-4">
      لا يوجد اشتراكات بعد
    </div>
  )}

  {/* ✅ بطاقات (Cards) للشاشات الصغيرة */}
  {subscriptions.length > 0 ? (
  <div className="md:hidden">
    {subscriptions.map((subscription) => (
      <div key={subscription._id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{subscription.userId.userName}</h3>
          <span className={`px-3 py-1 rounded-md text-white ${subscription.isActive ? "bg-green-500" : "bg-red-500"}`}>
            {subscription.isActive ? "نشط" : "معطل"}
          </span>
        </div>
        <p className="text-gray-700"><strong>نوع الخطة:</strong> {subscription.packageId.name}</p>
        <p className="text-gray-700"><strong>يبدأ من:</strong> {new Date(subscription.startDate).toLocaleDateString()}</p>
        <p className="text-gray-700"><strong>ينتهي في:</strong> {new Date(subscription.endDate).toLocaleDateString()}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={() => handleExtend(subscription._id)} className="bg-blue-500 text-white px-3 py-1 rounded-md">
            تمديد
          </button>
          <button onClick={() => handleDelete(subscription._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
            حذف
          </button>
          <button disabled={subscription.isActive === false} onClick={() => handlePause(subscription._id)} className="bg-purple-500 text-white px-3 py-1 rounded-md disabled:opacity-50">
            إيقاف
          </button>
          <button onClick={() => handleTerminate(subscription._id)} className="bg-red-700 text-white px-3 py-1 rounded-md">
            إنهاء
          </button>
        </div>
      </div>
    ))}
  </div>
  ) : (
    <div className="text-center text-gray-500 text-lg py-4">
      لا يوجد اشتراكات بعد
    </div>
  )}
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