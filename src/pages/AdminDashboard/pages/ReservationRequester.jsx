import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoEye } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";

export default function ReservationRequester() {
  const [users, setUsers] = useState([]); 
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

  return (
    <div className="flex flex-col items-center">
      
 
      <div className="flex justify-center gap-10 mb-4" style={{gap:900}}>
        <button className="bg-gray-600 text-white border border-white rounded-xl px-4 py-2 hover:bg-gray-500 transition">
          دعوة مستخدم
        </button>
        <button className="bg-gray-600 text-white border border-white rounded-xl px-4 py-2 hover:bg-gray-500 transition">
          مستخدم جديد
        </button>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-lg w-full max-w-2xl">
  {/* Email Input */}
  <input 
    type="email" 
    placeholder=" الحالة" 
    className="px-3 py-2 border border-gray-300 rounded-md  w-full"
  />

  {/* Name Input */}
  <input 
    type="text" 
    placeholder="البريد الالكتروني" 
    className="px-3 py-2 border border-#1A71FF rounded-md  w-full"
  />

  {/* Phone Input */}
  <input 
    type="text" 
    placeholder="رقم الهاتف" 
    className="px-3 py-2 border border-gray-300 rounded-md  w-full"
  />

  {/* Search Button */}
  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition w-[15vw]">
    بحث
  </button>
</div>


   
      <div className="border border-blue-500 w-[80vw] rounded-xl overflow-hidden">
 
        <div className="flex justify-between items-center text-gray-800 gap-10 p-5 ">
          <div className="text-blue-500 font-bold text-lg">الحالة</div>
          <div className="text-blue-500 font-bold text-lg">تاريخ التسجيل</div>
          <div className="text-blue-500 font-bold text-lg"> البريد الالكتروني</div>
          <div className="text-blue-500 font-bold text-lg">رقم الهاتف</div>
          <div className="text-blue-500 font-bold text-lg"> اجراء</div>
        </div>

       
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 bg-white text-gray-800 gap-10 border-b last:border-none"
          >
            <div className={`border bg-${user.statusColor} text-white rounded-md px-2 py-1 text-center`}>
              {user.status}
            </div>
            <div>{user.createdAt}</div>
            <div>{user.email}</div>
            <div>{user.phoneNumber}</div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="text-blue-500 hover:underline">
                <BiSolidEdit size={20} />
              </button>
              /
              <button className="text-red-500 hover:underline">
                <RiDeleteBin6Fill size={20} />
              </button>
              /
              <button className="text-gray-500 hover:underline">
                <IoEye size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
