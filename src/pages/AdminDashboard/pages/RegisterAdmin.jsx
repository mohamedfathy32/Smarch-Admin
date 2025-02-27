import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";    
import { IoMdCloseCircleOutline } from "react-icons/io";

const RegisterAdmin = () => {
    const token = localStorage.getItem("tokenAdmin");
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const AddAdmin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/admin`, formData, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response);
            Swal.fire({
                title: "تم إضافة المدير",
                icon: "success"
            });
            setIsOpen(false);
            setLoading(false);
            setFormData({ userName: "", email: "", password: "" }); // إعادة تعيين الحقول
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: error.response.data.message,
                icon: "error"
            });
            setLoading(false);
        }
    };

    const isFormValid = Object.values(formData).some(value => !value); // التحقق من الحقول

    return (
        <>
            {/* زر فتح المودال */}
            <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition m-4"
                onClick={() => setIsOpen(true)}
            >
                دعوة مدير جديد
            </button>

            {/* المودال */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        {/* عنوان المودال */}
                        <div className="flex justify-end">
                            <IoMdCloseCircleOutline className="text-2xl cursor-pointer" onClick={() => setIsOpen(false)} />
                        </div>
                        <h2 className="text-xl font-semibold mb-4 text-center">إضافة مدير جديد</h2>

                        {/* إدخالات النموذج */}
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium">الاسم</label>
                                <input 
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="أدخل الاسم"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">البريد الإلكتروني</label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="أدخل البريد الإلكتروني"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">كلمة المرور</label>
                                <input 
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* أزرار المودال */}
                        <div className="mt-4 flex justify-between">
                            <button 
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                إلغاء
                            </button>
                            {loading ? (
                                <Oval color="#00BFFF" height={20} width={20} />
                            ) : (
                                <button 
                                    className={`px-4 py-2 rounded-lg transition ${isFormValid ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
                                    onClick={AddAdmin}
                                    disabled={isFormValid || loading} // تعطيل الزر في حال كان هناك حقل فارغ أو أثناء التحميل
                                >
                                    إضافة المدير
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegisterAdmin;
