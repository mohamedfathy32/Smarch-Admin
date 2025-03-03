import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { FaFacebook, FaPhone, FaSnapchatGhost, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function NotificationDetail() {
    const { id } = useParams();
    // const { notifications, markAsRead } = useContext(NotificationContext);
    // const navigate = useNavigate();
    const [chalet, setChalet] = useState([]);
    const [forUpdate, setForUpdate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openSection, setOpenSection] = useState("المرافق");
    const token = localStorage.getItem("tokenAdmin");

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };
    // const location = useLocation()
    // const {notificationID}=location.state;
    // console.log(notificationID);
    // console.log(id);
    // console.log(notifications);
    // const notification = notifications.find((notif) => notif._id === id);

    // if (!notification) {
    //     return <div className="text-center text-red-500">الإشعار غير موجود</div>;
    // }


    const handlePatch = async (status) => {
        const confirmText = status === "active" ? "هل أنت متأكد من الموافقة على الشاليه؟" : "هل أنت متأكد من رفض الشاليه؟";

        const result = await Swal.fire({
            title: "تأكيد",
            text: confirmText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم",
            cancelButtonText: "إلغاء",
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.patch(
                    `${import.meta.env.VITE_URL_BACKEND}/chalet/status/${id}`,
                    { status },
                    { headers: { Authorization: token } }
                );
                console.log(response.data);

                Swal.fire({
                    title: "ناجح",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "حسنًا",
                });
            } catch (error) {
                console.error("Error updating request:", error);
                Swal.fire({
                    title: "خطأ",
                    text: error.response.data.message,
                    icon: "error",
                    confirmButtonText: "حسنًا",
                });
            }
        }
    };



    const confirmUpdate = async (status) => {
        const confirmText = status === "active" ? "هل أنت متأكد من الموافقة على التعديلات ؟" : "هل أنت متأكد من رفض التعديلات ؟";

        const result = await Swal.fire({
            title: "تأكيد",
            text: confirmText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم",
            cancelButtonText: "إلغاء",
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.patch(
                    `${import.meta.env.VITE_URL_BACKEND}/chalet/permissionUpdate/${id}`,
                    { status },
                    { headers: { Authorization: token } }
                );
                console.log(response.data);
                getChalet();
                Swal.fire({
                    title: "ناجح",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "حسنًا",
                });
            } catch (error) {
                console.error("Error updating request:", error);
                Swal.fire({
                    title: "خطأ",
                    text: error.response.data.message,
                    icon: "error",
                    confirmButtonText: "حسنًا",
                });
            }
        }
    };

    const getChalet = async () => {
        try {


            const response = await axios.get(
                `${import.meta.env.VITE_URL_BACKEND}/chalet/${id}`
            );
            const pendingChalet = response.data.data.pendingUpdates != null ? response.data.data.pendingUpdates : response.data.data
            response.data.data.pendingUpdates != null ? setForUpdate(true) : setForUpdate(false);

            setChalet(pendingChalet);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching chalet details:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        getChalet();
    }, [chalet.status]);
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }


    return (
        <>
            <div className="my-10 mx-4 sm:mx-8">
                {forUpdate ?

                    <div className="my-6 sm:my-8 px-4 sm:px-8 flex justify-center gap-5 ">
                        {chalet.status == 'active' ? <h1 className="text-3xl font-semibold"> تمت الموافقه على التعديلات من قبل  </h1> : chalet.status == 'rejected' ? <h1 className="text-3xl font-semibold"> تم رفض  التعديلات من قبل  </h1> :
                            <>
                                <button
                                    onClick={() => confirmUpdate("active")}
                                    className="flex items-center gap-5 bg-green-600 text-white py-2 px-6 sm:px-16 rounded-lg text-sm sm:text-2xl font-semibold"
                                >
                                    الموافقه على التعديلات

                                </button>
                                <button
                                    onClick={() => confirmUpdate("rejected")}
                                    className="flex items-center gap-5 bg-red-600 text-white py-2 px-6 sm:px-16 rounded-lg text-sm sm:text-2xl font-semibold"
                                >
                                    عدم الموافقه على التعديلات

                                </button>
                            </>
                        }

                    </div> : (
                        <div className="my-6 sm:my-8 px-4 sm:px-8 flex justify-center gap-5 ">
                            {chalet.status == 'active' ? <h1 className="text-3xl font-semibold"> تمت الموافقه على الشاليه من قبل  </h1> : chalet.status == 'rejected' ? <h1 className="text-3xl font-semibold"> تم رفض  الشاليه من قبل  </h1> :
                                <>
                                    <button
                                        onClick={() => handlePatch("active")}
                                        className="flex items-center gap-5 bg-green-600 text-white py-2 px-6 sm:px-16 rounded-lg text-sm sm:text-2xl font-semibold"
                                    >
                                        تأكيد الشاليه
                                    </button>
                                    <button
                                        onClick={() => handlePatch("rejected")}
                                        className="flex items-center gap-5 bg-red-600 text-white py-2 px-6 sm:px-16 rounded-lg text-sm sm:text-2xl font-semibold"
                                    >
                                        رفض الشاليه

                                    </button>
                                </>
                            }
                        </div>

                    )}

                <div className="bg-blue-50 py-10 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">

                    <div className="w-full md:w-[60%] px-2 sm:px-4">
                        <h1 className="text-3xl font-bold my-4 sm:my-6">{chalet.name}</h1>
                        <h1 className="text-3xl font-bold my-4 sm:my-6">{chalet.title}</h1>
                        <p className="text-xl font-normal">{chalet.description}</p>
                        <h1 className="text-2xl font-bold text-[#0061E0] my-6 sm:my-8">
                            {chalet.price} رس / ليله
                        </h1>
                        <div className="w-full md:w-[80%] space-y-4 sm:space-y-6 pb-8">
                            {/* المرافق */}
                            <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection("المرافق")}
                                >
                                    <h2 className="text-lg sm:text-2xl text-white">المرافق والوصف</h2>
                                    {openSection === "المرافق" ? (
                                        <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                    ) : (
                                        <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                    )}
                                </div>
                            </div>
                            {openSection === "المرافق" && (
                                <div className="mt-2 sm:mt-4 text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                                    {chalet.facilities.map((facilitie, index) => (
                                        <div key={index} className="mb-4">
                                            <p className="text-sm sm:text-xl">{facilitie}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* الموقع */}
                            <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection("الموقع")}
                                >
                                    <h2 className="text-lg sm:text-2xl text-white">الموقع</h2>
                                    {openSection === "الموقع" ? (
                                        <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                    ) : (
                                        <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                    )}
                                </div>
                            </div>
                            {openSection === "الموقع" && (
                                <div className="flex gap-2 items-center text-[#101828]  text-2xl bg-white p-4 sm:p-6 rounded-lg">
                                    <IoLocation size={24} />
                                    {chalet.location.city} {chalet.location.street}
                                </div>
                            )}

                            {/* شروط الحجز */}
                            <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection("شروط الحجز")}
                                >
                                    <h2 className="text-lg sm:text-2xl text-white">شروط الحجز وسياسة الإلغاء</h2>
                                    {openSection === "شروط الحجز" ? (
                                        <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                    ) : (
                                        <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                    )}
                                </div>
                            </div>
                            {openSection === "شروط الحجز" && (
                                <div className="text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                                    {chalet.reservationPolicy.map((policy, index) => (
                                        <div key={index} className="mb-4">
                                            <p className="text-sm sm:text-xl">{policy}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {(chalet.facebook || chalet.instagram || chalet.tiktok || chalet.whatsapp || chalet.snapchat || chalet.phoneOfChalet) && (

                                <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleSection("وسائل التواصل")}
                                    >
                                        <h2 className="text-lg sm:text-2xl text-white">وسائل التواصل</h2>
                                        {openSection === "وسائل التواصل" ? (
                                            <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                        ) : (
                                            <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                        )}
                                    </div>
                                </div>
                            )}
                            {openSection === "وسائل التواصل" && (
                                <div className="mt-2 sm:mt-4 text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                                    <div className="flex items-center">

                                        {chalet.phoneOfChalet && (
                                            <a href={`tel:${chalet.phoneOfChalet}`} className="text-green-500 text-lg me-4">
                                                <FaPhone size={28} />
                                            </a>
                                        )}
                                        {chalet.facebook && (
                                            <a href={chalet.facebook} target="_blank" className="me-4">
                                                <FaFacebook className="text-blue-800" size={28} />
                                            </a>
                                        )}

                                        {chalet.instagram && (
                                            <a href={chalet.instagram} target="_blank" className="me-4">
                                                <FaSquareInstagram className="text-pink-600" size={28} />
                                            </a>
                                        )}
                                        {chalet.whatsapp && (
                                            <a href={`https://wa.me/${chalet.whatsapp}`} target="_blank" className="me-4">
                                                <FaWhatsapp className="text-green-600" size={28} />
                                            </a>
                                        )}

                                        {chalet.tiktok && (
                                            <a href={chalet.tiktok} target="_blank" className="me-4 relative inline-block">
                                                {/* الطبقة الخلفية - الأزرق */}
                                                <FaTiktok
                                                    size={28}
                                                    className="absolute text-[#25F4EE] top-[2px] left-[2px]"
                                                />

                                                {/* الطبقة الخلفية - الأحمر */}
                                                <FaTiktok
                                                    size={28}
                                                    className="absolute text-[#FE2C55] top-[-3px] left-[-2px]"
                                                />

                                                {/* الطبقة الأساسية - الأبيض */}
                                                <FaTiktok
                                                    size={28}
                                                    className="relative text-black"
                                                />
                                            </a>
                                        )}
                                        {chalet.snapchat && (
                                            <a href={chalet.snapchat} target="_blank" className="me-4">
                                                <FaSnapchatGhost className="text-yellow-400" size={28} />
                                            </a>
                                        )}

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full md:w-[50%] my-6 sm:my-10 px-2 sm:px-4">
                        <img
                            src={chalet.img}
                            alt={chalet.title}
                            className="w-full h-[500px] sm:h-[500px] object-cover rounded-lg"
                        />
                        <div
                            dir="ltr"
                            className="flex flex-wrap gap-1 mt-6"
                        >
                            {chalet.gallery.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-[32%] h-[150px] sm:h-[250px] object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                </div>


            </div >



        </>
    );
}
