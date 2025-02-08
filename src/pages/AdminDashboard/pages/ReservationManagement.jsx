import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { Hourglass } from 'react-loader-spinner';

export default function ReservationManagement() {
  const token = localStorage.getItem("token");
  const [owners, setOwners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true); 
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    numOfChalets: ""
  });


  const fetchData = async (page) => {
    const response = await axios.get("https://smarch-back-end-nine.vercel.app/reservation", {
      headers: { authorization: token },
      params: { page }
    });

    setOwners(response.data.data);
    setLoadingPage(false);
    console.log(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const openModal = (owner) => {
    setSelectedOwner(owner);
    setFormData({
      userName: owner.userName,
      email: owner.email,
      phoneNumber: owner.phoneNumber,
      active:owner.active
   
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!selectedOwner) return;
  
    setLoading(true); // ⬅️ بدء التحميل
    
    try {
      const response = await axios.put(
        "https://smarch-back-end-nine.vercel.app/user/UpdateData",  
        { 
          id: selectedOwner._id,  
          userName: formData.userName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          active: formData.active
        },
        { headers: { authorization: token } }
      );
  
      console.log("✅ تم التحديث بنجاح:", response.data);
      setIsModalOpen(false);
      fetchData(currentPage);
    
    } catch (error) {
      console.error("❌ حدث خطأ أثناء التحديث:", error);
  
    } finally {
      setLoading(false); // ⬅️ إنهاء التحميل
    }
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
  

    <div className="flex justify-start gap-10 mb-4" style={{ gap: 900 }}>
     

      <button className="bg-gray-600 text-white border border-white rounded-xl px-4 py-2 hover:bg-gray-500 transition">
        تصدير 
      </button>
    </div>
    <div className="flex justify-center gap-10 mb-4" style={{ gap: 900 }}>
      <h3 className='text-2xl'>تصفية الحجوزات حسب المعايير</h3>
    </div>
    <div>


   

    <div className="flex justify-center items-center">
        <div className="flex items-center gap-4 p-4 rounded-lg w-full max-w-2xl">
          <input
            type="text"
            placeholder="الاسم"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="الحالة"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />



          <input
            type="email"
            placeholder="البريد الالكتروني"
            className="px-3 py-2 border border-#1A71FF rounded-md w-full"
          />

          <input
            type="number"
            placeholder="رقم الهاتف"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />

          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition w-[15vw]">
            بحث
          </button>
        </div>
      </div>

    </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="text-[#0061E0] p-2 text-xl">
              <th>رقم الحجز</th>
              <th>اسم العميل</th>
              <th>اسم الشاليه</th>
              <th>تاريخ الحجز</th>
              <th>تاريخ المغادرة</th>
              <th>مبلغ الحجز</th>
              <th>حالة الحجز</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, index) => (
              <tr key={owner._id}>
                {/* <td className="py-2 px-1 text-center text-lg">{index + 1}</td> */}
                <td className="py-2 px-1 text-center text-lg">{index + 1}</td>
                <td className="py-2 px-1 text-center text-lg">{owner.userID.userName}</td>

                <td className="py-2 px-1 text-center text-lg">{owner.chaletID.name}</td>
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
                  <button onClick={() => openModal(owner)}  className="text-blue-500 hover:underline">
                  <FaEdit size={20} />
                  </button>
                  <span className="text-3xl">/</span>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">تعديل بيانات المالك</h2>
            <input placeholder='الاسم' type="text" name="userName" value={formData.userName} onChange={handleChange} className="border p-2 w-full mb-2" />
            <input placeholder='البريد الالكتروني' type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full mb-2" />
            <input placeholder='رقم الهاتف' type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border p-2 w-full mb-2" />
            <label className="flex items-center space-x-2 cursor-pointer">
  
  <div 
    className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out cursor-pointer ${
      formData.active ? 'bg-green-500' : 'bg-red-500'
    }`} 
    onClick={() => setFormData({ ...formData, active: !formData.active })} // ✅ تبديل الحالة
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
      formData.active ? 'translate-x-6' : ''
    }`}></div>
  </div>
</label>
            <button onClick={handleSubmit} className="bg-blue-500 text-white m-3 px-4 py-2 rounded"> {loading ? (
    <Oval visible={true} height="20" width="20" color="#fff" ariaLabel="oval-loading" />
  ) : "حفظ"}</button>
            <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded  ">إغلاق</button>
          </div>
        </div>
      )}
    </>
    )}
    </div>
  );
}

