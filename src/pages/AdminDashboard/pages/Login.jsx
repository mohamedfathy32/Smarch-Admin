import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
function Login() {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // لتخزين الأخطاء
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // إرسال البريد الإلكتروني وكلمة المرور إلى الخادم
      const response = await axios.post('https://smarch-back-end-nine.vercel.app/admin/login', { email, password });
      console.log(response);
      Swal.fire({
        title: "نجاح!",
        text: "تم تسجيل الدخول بنجاح",
        icon: "success",
      });

      // التأكد من نجاح الاستجابة
      if (response.status === 200) {
        const admin = response.data;
      

        console.log("تم تسجيل الدخول بنجاح:", admin);

        // حفظ حالة تسجيل الدخول في Local Storage
       
        localStorage.setItem("tokenAdmin", admin.token);
        localStorage.setItem("admin", admin);
        localStorage.setItem("isLoggedIn", true);
      
       

        // التوجيه إلى صفحة أخرى بعد تسجيل الدخول
        navigate("/");
      } else {
        setError("بيانات تسجيل الدخول غير صحيحة");
      }
    } catch (err) {
     console.log(err);
     
      // تحقق مما إذا كانت err.response موجودة
      if (err.response) {
        Swal.fire({
            title: "خطأ!",
            text: err.response?.data?.message || "حدث خطأ غير متوقع!",
            icon: "error",
          });
      setError(errorMessage);
      } else {
        setError("حدث خطأ في الاتصال بالخادم");
      }
    }
  };

    return (<>
     <div className="flex flex-col md:flex-row justify-around py-10 items-center bg-blue-50 rounded-lg shadow-lg overflow-hidden w-full">
      {/* form section */}
      <div className="w-full md:w-1/3 p-8">
        <h1 className="text-4xl font-bold text-[#1E293B] mb-4">مرحبًا بعودتك!</h1>
        <p className="text-2xl text-[#718096] mb-6">
          سجّل دخولك للوصول إلى حسابك والتحكم في  موقعك.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريد إلكتروني"
              className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
              required
            />
          </div>

          <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة مرور"
              className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
              required
            />
          </div>
          <div>
            <Link to="/ForgetPassword" className="text-[#0061E0] pb-4 hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
          >
            تسجيل الدخول
          </button>
        </form>
       
      </div>

      {/* image section */}
      <div className="hidden md:block w-full md:w-[40%]">
        <img
          src="/assets/images/login.png"
          alt="Building"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
    
    </>  );
}

export default Login;