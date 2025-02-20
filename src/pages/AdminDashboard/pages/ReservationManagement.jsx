import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Oval } from "react-loader-spinner";

import { Hourglass } from 'react-loader-spinner';
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';

export default function ReservationManagement() {
  const token = localStorage.getItem("tokenAdmin");
  const [owners, setOwners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingPage, setLoadingPage] = useState(true); 
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
   
    name: "",
    checkInDate: "",
    active: "",
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleFilter = async ( page = 1) => {
    setLoadingFilter(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/reservation/filter`, {
        headers: { authorization: token },
        params: {
          page,

          ...filters,


        },
      });
      setOwners(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error filtering reservations:", error);
    } finally {
      setLoadingFilter(false);
    }
  };
  useEffect(() => {
    // إذا كانت جميع الحقول فارغة، جلب جميع البيانات
    if (
      filters.city === "" &&
 
        filters.name === "" &&
      filters.checkInDate === "" 
      
    
    
      
    ) {
      setButtonDisabled(true);
      fetchData(currentPage); // جلب جميع البيانات الأصلية
    }
    else{
      setButtonDisabled(false);
    }
  }, [filters]); // مراقبة تغييرات filters


  const fetchData = async (page) => {
    try {
    const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/reservation`, {
      headers: { authorization: token },
      params: { page }
    });
    console.log(response.data.data)


    setOwners(response.data.data);
    setLoadingPage(false);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoadingPage(false);
    }
  };

useEffect(() => {
  if (filters.city || filters.name || filters.checkInDate ) {
    handleFilter(currentPage); // جلب البيانات المفلترة
  } else {
    fetchData(currentPage); // جلب جميع البيانات
  }
}, [currentPage]);
 
  const handleExportToExcel = () => {
    if (owners.length === 0) {
      Swal.fire({
        title: "لا يوجد بيانات لتصدير",
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
    const formattedData = owners.map(owner => ({
      'رقم الحجز': owner._id,
      'اسم العميل': owner.userID.userName,
      'اسم الشاليه': owner.chaletID.name,
      'تاريخ الحجز': new Date(owner.checkInDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
      'تاريخ المغادرة': new Date(owner.checkOutDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
      'مبلغ الحجز': owner.totalPrice,
      'حالة الحجز': owner.status
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "حجوزات الشاليهات");
    XLSX.writeFile(workbook, "حجوزات الشاليهات.xlsx");
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
  

   
    <div className="flex justify-center gap-10 mb-4 " style={{ gap: 900 }}>
      <h3 className='text-2xl'>تصفية الحجوزات حسب المعايير</h3>
    </div>
    <div>


   

    <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg w-full max-w-4xl">
        <input
            type="text"
            placeholder="المدينة"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />
          
          
          <input
            type="text"
            placeholder="اسم الشاليه"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-#1A71FF rounded-md w-full"
          />

          <input
            type="date"
            placeholder=" التاريخ"
            name="checkInDate"
            value={filters.checkInDate}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        

          <button disabled={ buttonDisabled} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition w-full sm:w-auto" onClick={handleFilter}>
            {loadingFilter ?<Oval visible={true} height="20" width="20" color="#fff" ariaLabel="oval-loading" /> : "بحث"}
            
          </button>
        </div>
      </div>

      <div className="flex justify-start" >
     

     <button
     onClick={() => { handleExportToExcel() }}
     className="m-5 p-4 text-lg bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white rounded-lg w-full sm:w-auto"
 >
     تحميل البيانات

 </button>
</div>

    </div>


      <div className="bg-white p-4 rounded-lg shadow">
        {/* ✅ جدول عادي على الشاشات المتوسطة والكبيرة */}  
        <div className="hidden md:block overflow-x-auto"> 
        <table className="w-full">
          <thead>
            <tr className="text-[#0061E0] p-2 text-xl">
              <th>رقم الحجز</th>
              <th>اسم العميل</th>
              <th>اسم الشاليه</th>
              <th>المدينة</th>
              <th>تاريخ الحجز</th>
              <th>تاريخ المغادرة</th>
              <th>مبلغ الحجز</th>
              <th>حالة الحجز</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, index) => (
              <tr key={owner._id} className="border-b">
                {/* <td className="py-2 px-1 text-center text-lg">{index + 1}</td> */}
                <td className="py-2 px-1 text-center text-lg"> {index + 1}</td>
                <td className="py-2 px-1 text-center text-lg">{owner.userID.userName}</td>

                <td className="py-2 px-1 text-center text-lg">{owner.chaletID.name}</td>
                <td className="py-2 px-1 text-center text-lg">{owner.chaletID.location.city}</td>
                <td className="py-2 px-1 text-center text-lg"> {new Date(owner.checkInDate  ).getDate()}/{new Date(owner.checkInDate).getMonth() + 1}/{new Date(owner.checkInDate).getFullYear()}</td>
                <td className="py-2 px-1 text-center text-lg"> {new Date(owner.checkOutDate).getDate()}/{new Date(owner.checkOutDate).getMonth() + 1}/{new Date(owner.checkOutDate).getFullYear()}</td>
                <td className="py-2 px-1 text-center text-lg">{owner.totalPrice}</td>
                <td className="py-2 px-1 text-center text-lg">
                  <span className={`border px-3 py-1 text-center rounded-md text-white ${owner.status === "pending" ? "bg-yellow-500" :
                    owner.status === "approved" ? "bg-green-500" :
                    "bg-red-500"}`}>
                  {owner.status}
                  </span>
                </td>
                <td className="p-2 text-center">
                 
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
                      <path d="M8.1665 24.5C7.52484 24.5 6.97573 24.2717 6.51917 23.8152C6.06261 23.3586 5.83395 22.8091 5.83317 22.1667V7H4.6665V4.66667H10.4998V3.5H17.4998V4.66667H23.3332V7H22.1665V22.1667C22.1665 22.8083 21.9382 23.3578 21.4817 23.8152C21.0251 24.2725 20.4756 24.5008 19.8332 24.5H8.1665ZM10.4998 19.8333H12.8332V9.33333H10.4998V19.8333ZM15.1665 19.8333H17.4998V9.33333H15.1665V19.8333Z" fill="#FF0000" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
        {/* ✅ عرض كـ Cards على الشاشات الصغيرة */}
        <div className="md:hidden flex flex-col gap-4">
    {owners.map((owner) => (
      <div key={owner._id} className="border rounded-lg shadow p-4 bg-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{owner.userID.userName}</h3>
          <span className={`border px-3 py-1 rounded-md text-white ${owner.status === "pending" ? "bg-yellow-500" :
                    owner.status === "approved" ? "bg-green-500" :
                    "bg-red-500"}`}>
          {owner.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-1"><strong>المدينة:</strong> {owner.chaletID.location.city}</p>
        <p className="text-gray-600 text-sm mt-1"><strong>اسم الشاليه:</strong> {owner.chaletID.name}</p>
        <p className="text-gray-600 text-sm mt-1"><strong>المبلغ:</strong> {owner.totalPrice}</p>

        <p className="text-gray-600 text-sm"><strong>تاريخ الحجز:</strong> {new Date(owner.checkInDate).getDate()}/{new Date(owner.checkInDate).getMonth() + 1}/{new Date(owner.checkInDate).getFullYear()}</p>
        <p className="text-gray-600 text-sm"><strong>تاريخ المغادرة:</strong>  {new Date(owner.checkOutDate).getDate()}/{new Date(owner.checkOutDate).getMonth() + 1}/{new Date(owner.checkOutDate).getFullYear()}</p>

        <div className="flex justify-end gap-3 mt-3">
        
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M8.1665 24.5C7.52484 24.5 6.97573 24.2717 6.51917 23.8152C6.06261 23.3586 5.83395 22.8091 5.83317 22.1667V7H4.6665V4.66667H10.4998V3.5H17.4998V4.66667H23.3332V7H22.1665V22.1667C22.1665 22.8083 21.9382 23.3578 21.4817 23.8152C21.0251 24.2725 20.4756 24.5008 19.8332 24.5H8.1665ZM10.4998 19.8333H12.8332V9.33333H10.4998V19.8333ZM15.1665 19.8333H17.4998V9.33333H15.1665V19.8333Z" fill="#FF0000" />
            </svg>
          </button>
      
        </div>
      </div>
    ))}
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

