import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import Splash from "../../../components/Splash";

export default function PricePlans() {
    const [plans, setPlans] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        maxChalets: "",
        duration: "",
        features: [],
    });
    const [newFeature, setNewFeature] = useState(""); // For adding new features
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem("tokenAdmin");

    useEffect(() => {
        if (!token) {
            console.error("No token found, redirecting to login.");
            return;
        }
        fetchPlans();
    }, [token]);

    const fetchPlans = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/package`, {
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
        setLoading(true);
        try {
            if (editingPlan) {
                const response = await axios.put(
                    `${import.meta.env.VITE_URL_BACKEND}/package/${editingPlan._id}`,
                    formData,
                    {
                        headers: { Authorization: token },
                    }
                );
                // console.log(formData)
                Swal.fire({
                    title: "نجاح ",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "موافق",
                });
            } else {
                const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/package`, formData, {
                    headers: { Authorization: token },
                });
                Swal.fire({
                    title: "نجاح ",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "موافق",
                });
            }
            setModalOpen(false);
            fetchPlans();
        } catch (error) {
            console.error("Error saving plan:", error.response?.data || error.message);
            Swal.fire({
                title: "خطأ ",
                text: error.response.data.message || "حدث خطأ",
                icon: "error",
                confirmButtonText: "موافق",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        Swal.fire({
            title: "تحذير",
            text: "هل انت متأكد من حذف هذة الباقه ",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "موافق",
            cancelButtonText: "لا",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/package/${id}`, {
                        headers: { Authorization: token },
                    });
                    Swal.fire({
                        title: "نجاح ",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "موافق",
                    });
                    fetchPlans();
                } catch (error) {
                    Swal.fire({
                        title: "خطأ ",
                        text: error.response.data.message || "حدث خطأ",
                        icon: "error",
                        confirmButtonText: "موافق",
                    });
                } finally {
                    setLoading(false);
                }
            }
        });


    };

    // Add a new feature
    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData({
                ...formData,
                features: [...formData.features, newFeature.trim()],
            });
            setNewFeature("");
        }
    };

    // Delete a feature
    const deleteFeature = (index) => {
        const updatedFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: updatedFeatures });
    };

    // Handle drag and drop reordering
    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(formData.features);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFormData({ ...formData, features: items });
    };






    return loading ? (
        <div>Loading ....</div>
    ) : (
        <div className="text-center pt-10">
            <button
                onClick={() => openModal()}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
                إضافة خطة
            </button>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="border border-gray-300 rounded-lg shadow-md p-6 text-center w-[90%] md:w-[25%]"
                    >
                        <h3 className="text-3xl font-bold text-blue-700 mb-4">{plan.name}</h3>
                        <p className="text-2xl text-start font-semibold mb-4">{plan.price} ريال</p>
                        <p className="font-semibold text-sm">المدة: {plan.duration} يوم</p>
                        <div className="font-semibold text-sm mt-2">
                            <ul className="text-sm font-semibold space-y-2 min-h-28">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path opacity="0.1" d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#0061E0" />
                                            <path d="M15.7725 6.83313L10.0684 14.574C9.93234 14.7545 9.72948 14.8727 9.50539 14.9022C9.2813 14.9316 9.05478 14.8698 8.87671 14.7306L4.80338 11.474C4.44393 11.1863 4.38573 10.6617 4.67338 10.3023C4.96102 9.94285 5.4856 9.88465 5.84504 10.1723L9.24171 12.8898L14.4309 5.8473C14.601 5.59195 14.8978 5.45078 15.2032 5.47983C15.5087 5.50887 15.7735 5.70344 15.8925 5.98627C16.0115 6.26911 15.9654 6.59445 15.7725 6.83313Z" fill="#0061E0" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-between gap-4 mt-4">
                            <button
                                onClick={() => openModal(plan)}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                تعديل
                            </button>
                            <button
                                onClick={() => handleDelete(plan._id)}
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

                        <div className="mb-4">
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    placeholder="إضافة ميزة جديدة"
                                    className="w-full p-2 border rounded"
                                />
                                <button
                                    onClick={addFeature}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                >
                                    إضافة
                                </button>
                            </div>

                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="features">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-2"
                                        >
                                            {formData.features.map((feature, index) => (
                                                <Draggable key={index} draggableId={`feature-${index}`} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="flex justify-between items-center p-2 border rounded bg-gray-50"
                                                        >
                                                            <span>{feature}</span>
                                                            <button
                                                                onClick={() => deleteFeature(index)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                حذف
                                                            </button>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
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