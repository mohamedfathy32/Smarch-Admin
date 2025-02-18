import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaArrowRight } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Hourglass } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import * as XLSX from "xlsx";


export default function ChaletOwner() {
  const token = localStorage.getItem("tokenAdmin");
  const [owners, setOwners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true); 
  const [modelRegisterOpen, setModelRegisterOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);

  const [filters, setFilters] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    active: "",
  });




  
  

   const RegisterForm = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "owner",
    },
   
    onSubmit: async (values , {resetForm}) => {
      setLoading(true);
      try {
        await axios.post("https://smarch-back-end-nine.vercel.app/user", values);
        Swal.fire({
          title: "تم الحفظ بنجاح",
          icon: "success",
          confirmButtonText: "موافق",
        });
        setModelRegisterOpen(false);
        fetchData(currentPage);
        resetForm();
      } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({

        title: error.response.data.message,
        icon: "error",
        confirmButtonText: "موافق",
      });
      } finally {
        setLoading(false);
      }


    },
      validate: (values) => {
        const errors = {};
        if (!values.userName) {
          errors.userName = "الاسم مطلوب";
        }else if (values.userName.length < 3 || values.userName.length > 10) {
          errors.userName = "يجب أن يكون الاسم بين 3 و 10 حرف";
        }
        if (!values.email) {
          errors.email = "البريد الإلكتروني مطلوب";
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
          errors.email = "البريد الإلكتروني غير صالح";
        }

        if (!values.phoneNumber) {
          errors.phoneNumber = "رقم الهاتف مطلوب";
        }else if (!/^05[0-9]{8}$/.test(values.phoneNumber)) {
          errors.phoneNumber = "رقم الهاتف غير صالح";
        }else if (isNaN(values.phoneNumber)) {
          errors.phoneNumber = "يجب أن يكون رقم الهاتف رقمًا";

        }
        if (!values.password) {
          errors.password = "كلمة المرور مطلوبة";


        }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(values.password)) {
          errors.password = "يجب أن يكون كلمة المرور على الأقل 8 حروف وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص";

        }



        return errors;
      }
     
   });





  const fetchData = async (page) => {
    try { 

    const response = await axios.get(`https://smarch-back-end-nine.vercel.app/user/owners`, {
      headers: { authorization: token },
      params: { page  }
    });
    console.log(response.data);
    setOwners(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
    setLoadingPage(false);
    } catch (error) { 
      console.error("Error fetching owners:", error);
    } finally {
      setLoadingPage(false);
    }
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleFilter = async ( page = 1) => {
    setLoadingFilter(true);
    try {
      const response = await axios.get(`https://smarch-back-end-nine.vercel.app/user/filter`, {
        headers: { authorization: token },
        params: {
          page,
          ...filters,
          role: "owner",
        },
      });
   
      setOwners(response.data.data);
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

  const handleGoToOwnerDashboard = async (ownerId) => {
    console.log(ownerId);
  
    try {
      const response = await axios.get(`https://smarch-back-end-nine.vercel.app/user/token/${ownerId}`, {
        headers: { authorization: token },
      });
      const tokenOwner = response.data.token;
      console.log(tokenOwner);
      localStorage.setItem("token", tokenOwner);
      

      window.location.href = `https://fronts-end-smarch.vercel.app/`;
    

    } catch (error) {
      console.error("Error fetching owner dashboard:", error);
    }
  }

  useEffect(() => {
    if (filters.userName || filters.email || filters.phoneNumber || filters.active) {
      handleFilter(currentPage);
    } else {
      fetchData(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    // إذا كانت جميع الحقول فارغة، جلب جميع البيانات
    if (
      filters.userName === '' &&
      filters.email==='' &&
      filters.phoneNumber === '' &&
      filters.active === '' &&
      
      filters.active === ""
    
      
    ) {
      setButtonDisabled(true);
      fetchData(currentPage); // جلب جميع البيانات الأصلية
    }
    else{
      setButtonDisabled(false);
    }
  }, [filters]); // مراقبة تغييرات filters


 


  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "يجب أن يكون الاسم 3 أحرف على الأقل")
      .max(10, "يجب أن يكون الاسم أقل من 10 حرف")
      .matches(/^[\u0600-\u06FF\s]+$/, "يجب أن يكون الاسم باللغة العربية فقط") 
      .required("الاسم مطلوب"),


    email: Yup.string()
    .matches(
      /^\S+@\S+\.\S+$/,
      "البريد الإلكتروني غير صالح"
    )
      .required("البريد الإلكتروني مطلوب"),
    phoneNumber: Yup.string()
      .matches(/^05[0-9]{8}$/, "رقم الهاتف يجب أن يكون سعوديًا بصيغة صحيحة")
      .required("رقم الهاتف مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      active: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.put(
          "https://smarch-back-end-nine.vercel.app/user/UpdateData",
          { id: selectedOwner._id, ...values },
          { headers: { authorization: token } }
        );
        console.log("✅ تم التحديث بنجاح");
        setIsModalOpen(false);
        fetchData(currentPage);
      } catch (error) {
        console.error("❌ حدث خطأ أثناء التحديث:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const openModal = (owner) => {
    setSelectedOwner(owner);
    formik.setValues({
      userName: owner.userName,
      email: owner.email,
      phoneNumber: owner.phoneNumber,
      active: owner.active,
    });
    setIsModalOpen(true);
  };
  const openModelRegister = () => {
    setModelRegisterOpen(true);
  };
  const handleExportToExcel = () => {
    if (filteredOwners.length === 0) {
      Swal.fire({
        title: "لا يوجد بيانات لتصدير",
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
    const formattedData = filteredOwners.map(owner => ({
      'الاسم': owner.userName,
      'البريد الإلكتروني': owner.email,
      'رقم الهاتف': owner.phoneNumber,
      'عدد الشاليهات': owner.numOfChalets,
      'الايرادات الكلية': 600,  
      'الحالة': owner.active ? 'نشط' : 'معطل'
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "مالكي الشاليهات");
    XLSX.writeFile(workbook, "مالكي الشاليهات.xlsx");

    

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

      <div className="flex justify-center gap-10 mb-4" style={{ gap: 900 }}>
      <button className="bg-gray-600 text-white border border-white rounded-xl px-4 py-2 hover:bg-gray-500 transition">
        دعوة مستخدم
      </button>
      
      <button onClick={openModelRegister} className="bg-gray-600 text-white border border-white rounded-xl px-4 py-2 hover:bg-gray-500 transition">
        مستخدم جديد
      </button>

      {modelRegisterOpen && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
       <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
         <h2 className="text-xl mb-4">دعوة مستخدم</h2>
         <form onSubmit={RegisterForm.handleSubmit}>
           <input
             placeholder="الاسم"

             type="text"
             name="userName"
             value={RegisterForm.values.userName}
             onChange={RegisterForm.handleChange}
             onBlur={RegisterForm.handleBlur}
             className="border p-2 w-full mb-2"

           />
           {RegisterForm.touched.userName && RegisterForm.errors.userName && (
             <p className="text-red-500">{RegisterForm.errors.userName}</p>
           )}


           <input
             placeholder="البريد الالكتروني"
             type="email"
             name="email"
             value={RegisterForm.values.email}
             onChange={RegisterForm.handleChange}
             onBlur={RegisterForm.handleBlur}
             className="border p-2 w-full mb-2"
           />

           {RegisterForm.touched.email && RegisterForm.errors.email && (
             <p className="text-red-500">{RegisterForm.errors.email}</p>
           )}


           <input
             placeholder="رقم الهاتف"
             type="text"
             name="phoneNumber"
             value={RegisterForm.values.phoneNumber}
             onChange={RegisterForm.handleChange}
             onBlur={RegisterForm.handleBlur}
             className="border p-2 w-full mb-2"
           />

           {RegisterForm.touched.phoneNumber && RegisterForm.errors.phoneNumber && (
             <p className="text-red-500">{RegisterForm.errors.phoneNumber}</p>
           )}

           <input
             placeholder="كلمة المرور"
             type="password"
             name="password"
             value={RegisterForm.values.password}
             onChange={RegisterForm.handleChange}
             onBlur={RegisterForm.handleBlur}
             className="border p-2 w-full mb-2"
           />

           {RegisterForm.touched.password && RegisterForm.errors.password && (
             <p className="text-red-500">{RegisterForm.errors.password}</p>
           )}
           
           
           <button type="submit" className="bg-blue-500 text-white m-3 px-4 py-2 rounded">
             {loading ? <Oval visible={true} height="20" width="20" color="#fff" ariaLabel="oval-loading" /> : "حفظ"}
           </button>
           <button onClick={() => setModelRegisterOpen(false)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
             إغلاق
           </button>
         </form>

         
       </div>
       
     </div>
     
   )}

 




     
    </div>

    <div>
   

    <div className="flex justify-center items-center">
        <div className="flex items-center gap-4 p-4 rounded-lg w-full max-w-2xl">
          <input
            type="text"
            placeholder="الاسم"
            name="userName"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
            value={filters.userName}
            onChange={handleFilterChange}
          />
  
          <input
            type="email"
            placeholder="البريد الالكتروني"
            name="email"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"

            value={filters.email}
            onChange={handleFilterChange}
          />



          <input
            type="number"
            placeholder="رقم الهاتف"
            name="phoneNumber"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
            value={filters.phoneNumber}
            onChange={handleFilterChange}
          />

<select
            name="active"
            value={filters.active}
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

    </div>
                      <button
                        onClick={() => { handleExportToExcel() }}
                        className="m-5 p-5 text-1xl bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                    >
                        تحميل البيانات

                    </button>
    
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="text-[#0061E0] p-2 text-xl">
              <th>الاسم</th>
              <th>البريد الالكتروني</th>
              <th>رقم الهاتف</th>
              <th>عدد الشاليهات</th>
              <th>الايرادات الكلية</th>
              <th>الحالة</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner._id}>
                <td className="py-2 px-1 text-center text-lg">{owner.userName}</td>
                <td className="py-2 px-1 text-center text-lg">{owner.email}</td>

                <td className="py-2 px-1 text-center text-lg">{owner.phoneNumber}</td>
                <td className="py-2 px-1 text-center text-lg">{owner.numOfChalets}</td>
                <td className="py-2 px-1 text-center text-lg">600</td>
                <td className="py-2 px-1 text-center text-lg">
                  <span className={`border px-3 py-1 text-center rounded-md text-white ${owner.active ? "bg-green-500" : "bg-red-500"}`}>
                    {owner.active ? "نشط" : "معطل"}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <button onClick={() => openModal(owner)} className="text-blue-500 hover:underline">
                    <FaEdit size={20} />
                  </button>
                  <span className="text-3xl">/</span>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
                      <path d="M8.1665 24.5C7.52484 24.5 6.97573 24.2717 6.51917 23.8152C6.06261 23.3586 5.83395 22.8091 5.83317 22.1667V7H4.6665V4.66667H10.4998V3.5H17.4998V4.66667H23.3332V7H22.1665V22.1667C22.1665 22.8083 21.9382 23.3578 21.4817 23.8152C21.0251 24.2725 20.4756 24.5008 19.8332 24.5H8.1665ZM10.4998 19.8333H12.8332V9.33333H10.4998V19.8333ZM15.1665 19.8333H17.4998V9.33333H15.1665V19.8333Z" fill="#FF0000" />
                    </svg>
                    
                  </button>
                  <span className="text-3xl">/</span>
                  <button onClick={() => handleGoToOwnerDashboard(owner._id)}>
                    <FaArrowRight size={20} />
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
            <form onSubmit={formik.handleSubmit}>
              <input
                placeholder="الاسم"
                type="text"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full mb-2"
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500">{formik.errors.userName}</p>
              )}

              <input
                placeholder="البريد الالكتروني"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full mb-2"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}

              <input
                placeholder="رقم الهاتف"
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full mb-2"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500">{formik.errors.phoneNumber}</p>
              )}

              <label className="flex items-center space-x-2 cursor-pointer">
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out cursor-pointer ${
                    formik.values.active ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => formik.setFieldValue("active", !formik.values.active)}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                      formik.values.active ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </label>
              
              <button type="submit" className="bg-blue-500 text-white m-3 px-4 py-2 rounded">
                {loading ? <Oval visible={true} height="20" width="20" color="#fff" ariaLabel="oval-loading" /> : "حفظ"}
              </button>
              <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                إغلاق
              </button>
            </form>
            
          </div>
          
        </div>
        
      )}
    </>
    )}
    </div>
  );
}
