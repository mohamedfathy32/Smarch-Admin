import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Splash from "../../../components/Splash";
import Swal from 'sweetalert2'
export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    if (token) {
      console.log("decodedToken");
      const decoded = jwtDecode(token);
      const id = decoded.id;

      console.log("userID من الـ token:", id);

      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/user/${id}`, {

          });
          console.log("بيانات المستخدم:", response.data);
          const userData = response.data.data;
          setUser(userData);

          setName(userData.userName);
          setEmail(userData.email);
          setPhone(userData.phoneNumber);
          setBirthdate(userData.birthdate);

        } catch (error) {
          console.error("خطأ في استرجاع بيانات المستخدم:", error);
        }
      };

      fetchUserData();
    }
  }, [token]);

  const handleUpdate = async () => {
    const updatedData = {
      userName,
      email,
      phoneNumber: phone,
      birthdate,
    };
    const token = localStorage.getItem("token");
    console.log(updatedData);
    if (!token) {
      console.error("لا يوجد توثيق. يرجى تسجيل الدخول.");
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/user/UpdateData`, updatedData, {
        headers: {
          Authorization: ` ${token}`,
        },
      });
      console.log("تم تحديث البيانات بنجاح:", response.data);
      Swal.fire({
        title: "تم التحديث بنجاح",
        text: "تم حفظ بياناتك بنجاح.",
        icon: "success",
        confirmButtonText: "حسناً",
      });
    } catch (error) {
      console.error("خطأ في تحديث البيانات:", error.response ? error.response.data : error.message);
      Swal.fire({
        title: " خطأ ",
        text: "حدث خطأ اثناء تحديث البيانات ",
        icon: "erorr",
        confirmButtonText: "حسناً",
      });
    }
  };

  if (!user) {
    return <Splash />;
  }

  return (
    <>

      <div className="text-end sm:px-10 ">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          🔒 تغيير كلمة السر
        </button>
      </div>

      <div className="mx-4 sm:mx-8 bg-white rounded-lg shadow-md border border-blue-300 mt-6 pb-8">

        <div className="flex flex-wrap items-center justify-between px-6 sm:px-10 py-6 gap-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={handleUpdate}
          >
            تعديل
          </button>
          <div className="flex items-center gap-4">
            <div className="text-end">
              <h2 className="text-lg font-semibold">{userName}</h2>
              <p className="text-gray-500">{email}</p>
            </div>
            <img
              src="/assets/images/copy1.JPG"
              alt="Profile Picture"
              className="w-20 h-20 rounded-full"
            />
          </div>
        </div>


        <div className="flex flex-wrap justify-evenly gap-4 px-6 sm:px-10">
          {/* الاسم */}
          <div className="w-[80%] sm:w-[40%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {/* البريد الإلكتروني */}
          <div className="w-[80%] sm:w-[40%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الالكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {/* الهاتف */}
          <div className="w-[80%] sm:w-[40%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">الهاتف</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="w-[80%] sm:w-[40%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ الميلاد
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring focus:ring-blue-200"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            >
              <option>اختر التاريخ</option>

            </select>
          </div>
        </div>
      </div>
    </>
  );
}