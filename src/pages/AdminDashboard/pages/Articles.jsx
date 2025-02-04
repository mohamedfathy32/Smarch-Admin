import { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useFormik } from "formik";
import Alert from '@mui/material/Alert';
import { CircularProgress } from "@mui/material";

export default function Articles() {
    const token = localStorage.getItem("token");

    const formik = useFormik({
        initialValues: {
            title: "",
            subTitel: "",
            content: "",
            KeyPointes: [""],
            image: "",
        },

        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    `https://smarch-back-end-nine.vercel.app/article`,
                    values, // ✅ تصحيح الخطأ وإرسال القيم مباشرة
                    {
                        headers: {
                            "Authorization": token,
                        },
                    }
                );

                console.log("تم حفظ المقال بنجاح", response.data);
            } catch (error) {
                console.error("خطأ أثناء حفظ المقال", error);
            }
        },

        validate: (values) => {
            const errors = {};
            if (!values.title) {
                errors.title = "العنوان مطلوب";
            }
            if (!values.subTitel) {
                errors.subTitel = "العنوان الفرعي مطلوب";
            }
            if (!values.content) {
                errors.content = "المحتوى مطلوب";
            }
            if (!values.image) {
                errors.image = "يجب رفع صورة";
            }
            if (!values.KeyPointes.length || values.KeyPointes.some(point => point.trim() === "")) {
                errors.KeyPointes = "يجب إدخال نقاط أساسية";
            }
            return errors;
        },
    });

    // إضافة نقطة رئيسية جديدة
    const handleAddKeyPoint = () => {
        formik.setFieldValue("KeyPointes", [...formik.values.KeyPointes, ""]);
    };

    // إزالة نقطة رئيسية
    const handleRemoveKeyPoint = (index) => {
        const updatedKeyPoints = formik.values.KeyPointes.filter((_, i) => i !== index);
        formik.setFieldValue("KeyPointes", updatedKeyPoints);
    };

    // تحديث قيمة نقطة رئيسية
    const handleChange = (index, value) => {
        const updatedKeyPoints = [...formik.values.KeyPointes];
        updatedKeyPoints[index] = value;
        formik.setFieldValue("KeyPointes", updatedKeyPoints);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">إضافة مقال جديد</h2>

            <form onSubmit={formik.handleSubmit}>
                {/* حقل العنوان الرئيسي */}
                <input
                    type="text"
                    name="title"
                    placeholder="العنوان الرئيسي"
                    className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />
                {formik.errors.title && formik.touched.title ? (
                    <Alert severity="error">{formik.errors.title}</Alert>
                ) : null}

                {/* حقل العنوان الفرعي */}
                <input
                    type="text"
                    name="subTitel"
                    placeholder="العنوان الفرعي"
                    className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subTitel}
                />
                {formik.errors.subTitel && formik.touched.subTitel ? (
                    <Alert severity="error">{formik.errors.subTitel}</Alert>
                ) : null}

                {/* حقل المحتوى */}
                <textarea
                    name="content"
                    placeholder="المحتوى"
                    className="w-full px-4 py-2 border rounded-lg mb-3 h-32 focus:ring-2 focus:ring-blue-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                />
                {formik.errors.content && formik.touched.content ? (
                    <Alert severity="error">{formik.errors.content}</Alert>
                ) : null}

                {/* رفع الصورة */}
                <input
                    type="file"
                    name="image"
                    className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
                    onChange={(event) => formik.setFieldValue("image", event.target.files[0])}
                />
                {formik.errors.image && formik.touched.image ? (
                    <Alert severity="error">{formik.errors.image}</Alert>
                ) : null}

                {/* الحقول الديناميكية للنقاط الأساسية */}
                <div className="mb-3">
                    <label className="block font-semibold mb-1">النقاط الأساسية:</label>
                    {formik.values.KeyPointes.map((point, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                name={`KeyPointes[${index}]`}
                                value={point}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onBlur={formik.handleBlur}
                                placeholder={`نقطة ${index + 1}`}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            {/* زر الإضافة */}
                            {index === formik.values.KeyPointes.length - 1 && (
                                <button
                                    type="button"
                                    onClick={handleAddKeyPoint}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <AiOutlinePlusCircle size={24} />
                                </button>
                            )}
                            {/* زر الحذف */}
                            {formik.values.KeyPointes.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveKeyPoint(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <AiOutlineCloseCircle size={24} />
                                </button>
                            )}
                        </div>
                    ))}
                    {formik.errors.KeyPointes && formik.touched.KeyPointes ? (
                        <Alert severity="error">{formik.errors.KeyPointes}</Alert>
                    ) : null}
                </div>

                {/* زر حفظ المقال */}
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? "جاري الحفظ..." : "حفظ المقال"}
                    {formik.isSubmitting && <CircularProgress size={24} />}
                </button>
            </form>
        </div>
    );
}
