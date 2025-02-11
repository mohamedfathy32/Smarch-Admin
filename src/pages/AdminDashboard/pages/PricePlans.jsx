import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PricePlans() {
    const [plans, setPlans] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        maxChalets: "",
        duration: "",
        features: [],
    });
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            console.error("No token found, redirecting to login.");
            return;
        }
        fetchPlans();
    }, [token]);

    const fetchPlans = async () => {
        try {
            const response = await axios.get("https://smarch-back-end-nine.vercel.app/package", {
                headers: { Authorization: token },
            });
            const data = response.data.data;
            console.log(data);
            setPlans(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching plans:", error.response?.data || error.message);
            setPlans([]);
        }
    };

    const openModal = (plan = null) => {
        setEditingPlan(plan);
        setFormData(
            plan || {
                name: "",
                price: "",
                maxChalets: "",
                duration: "",
                features: [],
            }
        );
        setModalOpen(true);
        setErrors({});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "الاسم مطلوب";
        if (!formData.price || isNaN(formData.price)) newErrors.price = "السعر يجب أن يكون رقمًا";
        if (!formData.duration || isNaN(formData.duration)) newErrors.duration = "المدة يجب أن تكون رقمًا";
        if (formData.features.length === 0) newErrors.features = "المزايا مطلوبة";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (editingPlan) {
                await axios.put(
                    `https://smarch-back-end-nine.vercel.app/package/${editingPlan._id}`,
                    formData,
                    {
                        headers: { Authorization: token },
                    }
                );
            } else {
                await axios.post("https://smarch-back-end-nine.vercel.app/package", formData, {
                    headers: { Authorization: token },
                });
            }
            setModalOpen(false);
            fetchPlans();
        } catch (error) {
            console.error("Error saving plan:", error.response?.data || error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://smarch-back-end-nine.vercel.app/package/${editingPlan._id}`, {
                headers: { Authorization: token },
            });
            fetchPlans();
        } catch (error) {
            console.error("Error deleting plan:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-6 p-6">
            <button
                onClick={() => openModal()}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
                إضافة خطة
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="border border-gray-300 rounded-lg shadow-md p-6 text-center"
                    >
                        <h3 className="text-xl font-bold text-blue-700 mb-4">{plan.name}</h3>
                        <p className="text-lg font-semibold mb-4">{plan.price} ريال</p>
                        <p className="text-gray-700 text-sm">المدة: {plan.duration} يوم</p>
                        <div className="text-gray-700 text-sm mt-2">
                            <span className="font-bold">المزايا:</span>{" "}
                            {plan.features.length > 0 ? plan.features.join(", ") : "لا توجد مزايا"}
                        </div>
                        <div className="flex justify-between gap-4 mt-4">
                            <button
                                onClick={() => openModal(plan)}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                تعديل
                            </button>
                            <button
                                onClick={() => handleDelete(plan.id)}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">{editingPlan ? "تعديل الخطة" : "إضافة خطة جديدة"}</h2>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="الاسم"
                            className="w-full p-2 border rounded mb-2"
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

                        <input
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="السعر"
                            className="w-full p-2 border rounded mb-2"
                        />
                        {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}

                        <input
                            name="maxChalets"
                            value={formData.maxChalets}
                            onChange={handleChange}
                            placeholder="عدد الشاليهات"
                            className="w-full p-2 border rounded mb-2"
                        />

                        <input
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="المدة (أيام)"
                            className="w-full p-2 border rounded mb-2"
                        />
                        {errors.duration && <div className="text-red-500 text-sm">{errors.duration}</div>}

                        <textarea
                            name="features"
                            value={formData.features.join(", ")}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    features: e.target.value.split(",").map((f) => f.trim()),
                                })
                            }
                            placeholder="المزايا (افصل بينها بفاصلة)"
                            className="w-full p-2 border rounded mb-4 h-20"
                        />
                        {errors.features && <div className="text-red-500 text-sm">{errors.features}</div>}

                        <div className="flex gap-2">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
                            >
                                حفظ
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-gray-400 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-500"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
