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