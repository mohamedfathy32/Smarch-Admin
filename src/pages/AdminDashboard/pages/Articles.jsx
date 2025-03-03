import { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useFormik } from "formik";
import Alert from '@mui/material/Alert';
import { CircularProgress } from "@mui/material";
import Swal from 'sweetalert2';
import { Oval } from "react-loader-spinner";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Hourglass } from 'react-loader-spinner';
export default function Articles() {
    const [articles, setArticles] = useState([]);
    const token = localStorage.getItem("tokenAdmin");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [loading, setLoading] = useState(false);
    // دالة رفع الصورة إلى Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fekryAlqady");
        formData.append("cloud_name", "dwwaqxeyl");
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dwwaqxeyl/image/upload`,
                formData
            );
            console.log(response.data.secure_url)
            return response.data.secure_url;
        } catch (error) {
            console.error("خطأ أثناء رفع الصورة إلى Cloudinary", error);
            return null;
        }
    };

    // نموذج إضافة المقال (addFormik)
    const addFormik = useFormik({
        initialValues: {
            title: "",
            subTitel: "",
            content: "",
            KeyPointes: [{ content: "", images: [""] }],
            image: "",
        },
        onSubmit: async (values, { resetForm }) => {
            const articleData = {
                title: values.title,
                subTitel: values.subTitel,
                content: values.content,
                KeyPointes: values.KeyPointes,
                image: values.image,
            };
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_URL_BACKEND}/article`,
                    articleData,
                    {
                        headers: {
                            "Authorization": token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                Swal.fire({
                    title: "ناجح",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "موافق",
                });
                fetchArticles(currentPage);
                resetForm();
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error",
                    confirmButtonText: "موافق",
                });
            }
        },
        validate: (values) => {
            const errors = {};
            if (!values.title) {
                errors.title = "العنوان مطلوب";
            } else if (values.title.length < 15 || values.title.length > 100) {
                errors.title = "يجب أن يكون العنوان بين 15 و 100 حرف";
            }
            if (!values.subTitel) {
                errors.subTitel = "العنوان الفرعي مطلوب";
            } else if (values.subTitel.length < 50 || values.subTitel.length > 300) {
                errors.subTitel = "يجب أن يكون العنوان الفرعي بين 50 و 300 حرف";
            }
            if (!values.content) {
                errors.content = "المحتوى مطلوب";
            } else if (values.content.length < 250 || values.content.length > 3000) {
                errors.content = "يجب أن يكون المحتوى بين 250 و 3000 حرف";
            }
            if (!values.image) {
                errors.image = "يجب رفع صورة";
            }
            if (!values.KeyPointes.length || values.KeyPointes.some(point => point.content.trim() === "")) {
                errors.KeyPointes = "يجب إدخال نقاط أساسية";
            }
            return errors;
        },
    });

    // نموذج تعديل المقال (editFormik) الذي يستخدم داخل المودال
    const editFormik = useFormik({
        initialValues: {
            title: "",
            subTitel: "",
            content: "",
            KeyPointes: [{ content: "", images: [""] }],
            image: "",
        },
        onSubmit: async (values, { resetForm }) => {
            const articleData = {
                title: values.title,
                subTitel: values.subTitel,
                content: values.content,
                KeyPointes: values.KeyPointes,
                image: values.image,
            };
            try {
                await axios.patch(
                    `${import.meta.env.VITE_URL_BACKEND}/article/${selectedArticleId}`,
                    articleData,
                    {
                        headers: {
                            "Authorization": token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                Swal.fire({
                    title: "تم تعديل المقال بنجاح",
                    icon: "success",
                    confirmButtonText: "موافق",
                });
                fetchArticles(currentPage);
                resetForm();
                setIsModalOpen(false);
                setSelectedArticleId(null);
            } catch (error) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error",
                    confirmButtonText: "موافق",
                });
            }
        },
        validate: (values) => {
            const errors = {};
            if (!values.title) {
                errors.title = "العنوان مطلوب";
            } else if (values.title.length < 15 || values.title.length > 100) {
                errors.title = "يجب أن يكون العنوان بين 15 و 100 حرف";
            }
            if (!values.subTitel) {
                errors.subTitel = "العنوان الفرعي مطلوب";
            } else if (values.subTitel.length < 50 || values.subTitel.length > 300) {
                errors.subTitel = "يجب أن يكون العنوان الفرعي بين 50 و 300 حرف";
            }
            if (!values.content) {
                errors.content = "المحتوى مطلوب";
            } else if (values.content.length < 250 || values.content.length > 3000) {
                errors.content = "يجب أن يكون المحتوى بين 250 و 3000 حرف";
            }
            if (!values.image) {
                errors.image = "يجب رفع صورة";
            }
            if (!values.KeyPointes.length || values.KeyPointes.some(point => point.content.trim() === "")) {
                errors.KeyPointes = "يجب إدخال نقاط أساسية";
            }
            return errors;
        },
    });

    // دوال إدارة KeyPointes لنموذجي الإضافة والتعديل (تستخدم instance المُناسب)
    const handleAddKeyPoint = (formikInstance) => {
        formikInstance.setFieldValue("KeyPointes", [
            ...formikInstance.values.KeyPointes,
            { content: "", images: [""] },
        ]);
    };

    const handleRemoveKeyPoint = (formikInstance, index) => {
        const updatedKeyPoints = formikInstance.values.KeyPointes.filter((_, i) => i !== index);
        formikInstance.setFieldValue("KeyPointes", updatedKeyPoints);
    };

    const handleChange = (formikInstance, index, value) => {
        const updatedKeyPoints = [...formikInstance.values.KeyPointes];
        updatedKeyPoints[index].content = value;
        formikInstance.setFieldValue("KeyPointes", updatedKeyPoints);
    };

    const handleAddImage = async (formikInstance, index, file) => {
        const url = await uploadImageToCloudinary(file);
        const updatedKeyPoints = [...formikInstance.values.KeyPointes];
        updatedKeyPoints[index].images = [url];
        formikInstance.setFieldValue("KeyPointes", updatedKeyPoints);
    };

    const fetchArticles = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/article`, {
                headers: { Authorization: token },
                params: { page, limit: 6 },
            });
            setArticles(response.data.data);
            setTotalPages(response.data.pagination.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("❌ خطأ أثناء تحميل المقالات", error);
        }
    };

    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "لن تتمكن من استرجاع هذا المقال بعد الحذف!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم، احذف!",
            cancelButtonText: "إلغاء",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/article/${id}`, {
                        headers: { Authorization: token },
                    });
                    fetchArticles(currentPage);
                    Swal.fire("تم الحذف!", "تم حذف المقال بنجاح.", "success");
                } catch (error) {
                    Swal.fire({
                        title: error.response.data.message,
                        icon: "error",
                        confirmButtonText: "موافق",
                    });
                }
            }
        });
    };

    const handleEdit = (id) => {
        const articleToEdit = articles.find((article) => article._id === id);
        if (articleToEdit) {
            setSelectedArticleId(id);
            editFormik.setValues({
                title: articleToEdit.title,
                subTitel: articleToEdit.subTitel,
                content: articleToEdit.content,
                KeyPointes: articleToEdit.KeyPointes,
                image: articleToEdit.image,
            });
            setIsModalOpen(true);
        }
    };

    return (
        <div>
            {loading ? (
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

                    {/* نموذج إضافة المقال (Add Form) */}
                    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-bold mb-4">إضافة مقال جديد</h2>
                        <form onSubmit={addFormik.handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="العنوان الرئيسي"
                                className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
                                onChange={addFormik.handleChange}
                                onBlur={addFormik.handleBlur}
                                value={addFormik.values.title}
                            />
                            {addFormik.touched.title && addFormik.errors.title && (
                                <Alert severity="error">{addFormik.errors.title}</Alert>
                            )}
                            <input
                                type="text"
                                name="subTitel"
                                placeholder="العنوان الفرعي"
                                className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
                                onChange={addFormik.handleChange}
                                onBlur={addFormik.handleBlur}
                                value={addFormik.values.subTitel}
                            />
                            {addFormik.touched.subTitel && addFormik.errors.subTitel && (
                                <Alert severity="error">{addFormik.errors.subTitel}</Alert>
                            )}
                            <textarea
                                name="content"
                                placeholder="المحتوى"
                                className="w-full px-4 py-2 border rounded-lg mb-3 h-32 focus:ring-2 focus:ring-blue-500"
                                onChange={addFormik.handleChange}
                                onBlur={addFormik.handleBlur}
                                value={addFormik.values.content}
                            />
                            {addFormik.touched.content && addFormik.errors.content && (
                                <Alert severity="error">{addFormik.errors.content}</Alert>
                            )}
                            <input
                                type="file"
                                name="image"
                                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
                                onChange={async (event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const imageUrl = await uploadImageToCloudinary(file);
                                        addFormik.setFieldValue("image", imageUrl);
                                    }
                                }}
                            />
                            {addFormik.touched.image && addFormik.errors.image && (
                                <Alert severity="error">{addFormik.errors.image}</Alert>
                            )}
                            <div className="mb-3">
                                <label className="block font-semibold mb-1">النقاط الأساسية:</label>
                                {addFormik.values.KeyPointes.map((kp, index) => (
                                    <div key={index} className="flex flex-col gap-2 mb-2 border p-2 rounded">
                                        <input
                                            type="text"
                                            name={`KeyPointes[${index}].content`}
                                            value={kp.content}
                                            onChange={(e) => handleChange(addFormik, index, e.target.value)}
                                            onBlur={addFormik.handleBlur}
                                            placeholder={`نقطة ${index + 1} - المحتوى`}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="file"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    await handleAddImage(addFormik, index, file);
                                                }
                                            }}
                                            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                                {addFormik.touched.KeyPointes && addFormik.errors.KeyPointes && (
                                    <Alert severity="error">{addFormik.errors.KeyPointes}</Alert>
                                )}
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => handleAddKeyPoint(addFormik)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        <AiOutlinePlusCircle size={22} /> إضافة
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveKeyPoint(addFormik, addFormik.values.KeyPointes.length - 1)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        <AiOutlineMinusCircle size={22} /> حذف
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition"
                                disabled={addFormik.isSubmitting}
                            >
                                {addFormik.isSubmitting ? "جاري الحفظ..." : "حفظ المقال"}
                                {addFormik.isSubmitting && <CircularProgress size={24} />}
                            </button>
                        </form>
                    </div>

                    {/* عرض قائمة المقالات */}
                    {articles.length > 0 ? (
                        <div className="max-w-5xl mx-auto mt-10">
                            <h2 className="text-3xl font-bold mb-6 text-center">📜 قائمة المقالات</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.map((article) => (
                                    <div
                                        key={article._id}
                                        className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition-all"
                                    >
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <h3 className="text-xl font-semibold mt-3">{article.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                            {article.subTitel}
                                        </p>
                                        <div className="flex justify-between mt-4">
                                            <button
                                                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                                                onClick={() => handleEdit(article._id)}
                                            >
                                                <AiOutlineEdit size={22} /> تعديل
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700 flex items-center gap-1"
                                                onClick={() => handleDelete(article._id)}
                                            >
                                                <AiOutlineDelete size={22} /> حذف
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                >
                                    الصفحة السابقة
                                </button>
                                <span>
                                    الصفحة {currentPage} من {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                >
                                    الصفحة التالية
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 text-lg py-4">
                            لا يوجد مقالات بعد
                        </div>
                    )}

                    {/* مودال التعديل باستخدام editFormik */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-5 rounded-lg shadow-lg w-1/3 max-h-[80vh] overflow-y-auto">
                                <div className="flex justify-start hover:cursor-pointer" onClick={() => setIsModalOpen(false)}>
                                    <IoMdCloseCircleOutline size={30} />
                                </div>

                                <h2 className="text-xl mb-4 text-center font-bold">تعديل المقال</h2>
                                <form onSubmit={editFormik.handleSubmit}>
                                    <input
                                        placeholder="العنوان"
                                        type="text"
                                        name="title"
                                        value={editFormik.values.title}
                                        onChange={editFormik.handleChange}
                                        onBlur={editFormik.handleBlur}
                                        className="border p-2 w-full mb-2"
                                    />
                                    {editFormik.touched.title && editFormik.errors.title && (
                                        <p className="text-red-500">{editFormik.errors.title}</p>
                                    )}
                                    <input
                                        placeholder="العنوان الفرعي"
                                        type="text"
                                        name="subTitel"
                                        value={editFormik.values.subTitel}
                                        onChange={editFormik.handleChange}
                                        onBlur={editFormik.handleBlur}
                                        className="border p-2 w-full mb-2"
                                    />
                                    {editFormik.touched.subTitel && editFormik.errors.subTitel && (
                                        <p className="text-red-500">{editFormik.errors.subTitel}</p>
                                    )}
                                    <input
                                        placeholder="المحتوى"
                                        type="text"
                                        name="content"
                                        value={editFormik.values.content}
                                        onChange={editFormik.handleChange}
                                        onBlur={editFormik.handleBlur}
                                        className="border p-2 w-full mb-2"
                                    />
                                    {editFormik.touched.content && editFormik.errors.content && (
                                        <p className="text-red-500">{editFormik.errors.content}</p>
                                    )}
                                    <input
                                        placeholder="الصورة"
                                        type="file"
                                        name="image"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imageUrl = await uploadImageToCloudinary(file);
                                                editFormik.setFieldValue("image", imageUrl);
                                            }
                                        }}
                                        onBlur={editFormik.handleBlur}
                                        className="border p-2 w-full mb-2"
                                    />
                                    {editFormik.values.image && (
                                        <img
                                            src={editFormik.values.image}
                                            alt="صورة المقال"
                                            className="w-full h-40 object-cover rounded-lg mb-2"
                                        />
                                    )}
                                    {editFormik.touched.image && editFormik.errors.image && (
                                        <p className="text-red-500">{editFormik.errors.image}</p>
                                    )}
                                    <div className="mb-3">
                                        <label className="block font-semibold mb-1">النقاط الأساسية:</label>
                                        {editFormik.values.KeyPointes.map((kp, index) => (
                                            <div key={index} className="flex flex-col gap-2 mb-2 border p-2 rounded">
                                                <input type="text" name={`KeyPointes[${index}].content`} value={kp.content} onChange={(e) => handleChange(editFormik, index, e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                                                <input type="file" onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        await handleAddImage(editFormik, index, file);
                                                    }
                                                }} className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                                {kp.images.map((image, i) => (
                                                    <img key={i} src={image} alt={`صورة المقال ${index + 1}`} className="w-full h-40 object-cover rounded-lg mb-2" />
                                                ))}
                                            </div>
                                        ))}
                                        <div className="flex justify-between">
                                            <button type="button" onClick={() => handleAddKeyPoint(editFormik)} className=" text-blue-500 px-4 py-2 rounded">
                                                <AiOutlinePlusCircle size={22} /> إضافة
                                            </button>
                                            <button type="button" onClick={() => handleRemoveKeyPoint(editFormik, editFormik.values.KeyPointes.length - 1)} className=" text-red-500 px-4 py-2 rounded">
                                                <AiOutlineMinusCircle size={22} /> حذف
                                            </button>
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-blue-500 text-white m-3 px-4 py-2 rounded">
                                        {editFormik.isSubmitting ? (
                                            <Oval visible={true} height="20" width="20" color="#fff" ariaLabel="oval-loading" />
                                        ) : (
                                            "حفظ"
                                        )}
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
