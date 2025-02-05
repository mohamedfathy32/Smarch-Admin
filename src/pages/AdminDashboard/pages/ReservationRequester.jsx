<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoEye } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";

export default function ReservationRequester() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [visibleUserId, setVisibleUserId] = useState(null); // Tracks which user's data is visible
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const [usersPerPage] = useState(5); // Number of users to display per page
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://smarch-back-end-nine.vercel.app/user/users", {
          headers: {
            authorization: token,
          },
        });
        setUsers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://smarch-back-end-nine.vercel.app/user/users/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      setUsers(users.filter(user => user.id !== userId)); // Remove deleted user from state
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.response && error.response.status === 404) {
        alert("User not found or endpoint does not exist.");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `https://smarch-back-end-nine.vercel.app/user/users/${editingUser.id}`,
        editingUser,
        {
          headers: {
            authorization: token,
          },
        }
      );
      setUsers(users.map(user => (user.id === editingUser.id ? response.data.data : user)));
      setEditingUser(null); // Close edit modal
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response && error.response.status === 404) {
        alert("User not found or endpoint does not exist.");
      }
    }
  };

  const toggleView = (userId) => {
    // If the clicked row is already visible, hide it. Otherwise, show it and hide others.
    setVisibleUserId((prev) => (prev === userId ? null : userId));
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Users to display on the current page

  const totalPages = Math.ceil(users.length / usersPerPage); // Total number of pages

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-10 mb-4" style={{ gap: 900 }}>
        <button className="bg-gray-600 text-white border border-white rounded-xl px-4 py-2 hover:bg-gray-500 transition">
          دعوة مستخدم
        </button>
        <button className="bg-gray-600 text-white border border-white rounded-xl px-4 py-2 hover:bg-gray-500 transition">
          مستخدم جديد
        </button>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-lg w-full max-w-2xl">
        <input
          type="email"
          placeholder=" الحالة"
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

      <div className="border border-blue-500 w-[80vw] rounded-xl overflow-hidden">
        <div className="flex justify-between items-center text-gray-800 gap-10 p-5">
          <div className="text-blue-500 font-bold text-lg">الحالة</div>
          <div className="text-blue-500 font-bold text-lg">تاريخ التسجيل</div>
          <div className="text-blue-500 font-bold text-lg"> البريد الالكتروني</div>
          <div className="text-blue-500 font-bold text-lg">رقم الهاتف</div>
          <div className="text-blue-500 font-bold text-lg"> اجراء</div>
        </div>

        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 bg-white text-gray-800 gap-10 border-b last:border-none"
            onClick={() => toggleView(user.id)} // Toggle visibility on row click
          >
            <div className={`border bg-${user.statusColor} text-white rounded-md px-2 py-1 text-center`}>
              {user.status}
            </div>
            <div>{user.createdAt}</div>
            <div>
              {visibleUserId === user.id ? user.email : "***"}
            </div>
            <div>
              {visibleUserId === user.id ? user.phoneNumber : "***"}
            </div>
            <div className="flex gap-3">
              <button className="text-blue-500 hover:underline" onClick={(e) => { e.stopPropagation(); handleEdit(user); }}>
                <BiSolidEdit size={20} />
              </button>
              /
              <button className="text-red-500 hover:underline" onClick={(e) => { e.stopPropagation(); handleDelete(user.id); }}>
                <RiDeleteBin6Fill size={20} />
              </button>
              /
              <button className="text-gray-500 hover:underline" onClick={(e) => { e.stopPropagation(); toggleView(user.id); }}>
                <IoEye size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <input
              type="text"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md w-full mb-2"
            />
            <input
              type="text"
              value={editingUser.phoneNumber}
              onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md w-full mb-2"
            />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setEditingUser(null)}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Hourglass } from 'react-loader-spinner';

export default function ReservationRequester() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true); 
  const fetchData = async (page) => {
    const response = await axios.get("https://smarch-back-end-nine.vercel.app/user/users", {
      headers: { authorization: token },
      params: { page },
    });
    setUsers(response.data.data);
    setTotalPages(response.data.pagination.totalPages);
    setLoadingPage(false);
  };


  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .matches(/^[\u0600-\u06FF\s]+$/, "يجب أن يكون الاسم باللغة العربية فقط")
      .min(3, "يجب أن يكون الاسم 3 أحرف على الأقل")
      .max(10, "يجب أن يكون الاسم أقل من 10 أحرف")
      .required("الاسم مطلوب"),

    email: Yup.string()
    .matches(
      /^\S+@\S+\.\S+$/,
      "البريد الإلكتروني غير صالح"
    )
      .required("البريد الإلكتروني مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      active: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!selectedUser) return;
      setLoading(true);
      try {
        await axios.put(
          "https://smarch-back-end-nine.vercel.app/user/UpdateData",
          { id: selectedUser._id, ...values },
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

  const openModal = (user) => {
    setSelectedUser(user);
    formik.setValues({
      userName: user.userName,
      email: user.email,
      active: user.active,
    });
    setIsModalOpen(true);
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
      <button className="bg-gray-600 text-white border border-white rounded-xl px-4 py-2 hover:bg-gray-500 transition">
        مستخدم جديد
      </button>
    </div>
    <div>
   

    <div className="flex justify-center items-center">
        <div className="flex items-center gap-4 p-4 rounded-lg w-full max-w-2xl">
        
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
              <th>الحالة</th>
              <th>تاريخ التسجيل</th>
              <th>الاسم</th>
              <th>البريد الالكتروني</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-1 text-center text-lg">
                  <span className={`border px-3 py-1 text-center rounded-md text-white ${user.active ? "bg-green-500" : "bg-red-500"}`}>
                    {user.active ? "نشط" : "معطل"}
                  </span>
                </td>
                <td className="py-2 px-1 text-center text-lg">
                  {new Date(user.createdAt).getDate()}/{new Date(user.createdAt).getMonth() + 1}/{new Date(user.createdAt).getFullYear()}
                </td>
                <td className="py-2 px-1 text-center text-lg">{user.userName}</td>
                <td className="py-2 px-1 text-center text-lg">{user.email}</td>
                <td className="p-2 text-center">
                  <button onClick={() => openModal(user)} className="text-blue-500 hover:underline">
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
            <h2 className="text-xl mb-4">تعديل بيانات طالب الحجز</h2>
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

              <label className="flex items-center space-x-2 cursor-pointer">
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${formik.values.active ? "bg-green-500" : "bg-red-500"}`}
                  onClick={() => formik.setFieldValue("active", !formik.values.active)}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${formik.values.active ? "translate-x-6" : ""}`}></div>
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
>>>>>>> 2eb0d277cd08442cd782267ff2a729397ae3ee54
