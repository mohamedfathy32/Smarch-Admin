/* eslint-disable react/prop-types */
<<<<<<< HEAD
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
=======

import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> fathy

export default function SidebarDashboard({ isOpen }) {
    const nav = useNavigate();
    const location = useLocation();

<<<<<<< HEAD
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const isExactMatch = (path) => location.pathname === path;
    const isPartialMatch = (path) => location.pathname.includes(path);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <aside className={`bg-blue-50 w-64 h-full p-4 md:flex flex-col justify-between ${isOpen ? "" : "hidden"}`}>
            <div className="mt-5 text-center">
                <div
                    className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded ${isExactMatch("/") ? "bg-[#0061E0] text-white py-2" : ""}`}
                    onClick={() => nav("/")}
=======
    const isExactMatch = (path) => location.pathname === path;

    const isPartialMatch = (path) => location.pathname.includes(path);





    return (
        <aside className={`bg-blue-50 w-64 h-full p-4 md:flex flex-col justify-between ${isOpen ? '' : 'hidden'}`}>
            <div className="mt-5 text-center">
                <div
                    className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded ${isExactMatch("/") ? "bg-[#0061E0] text-white py-2" : ""
                        }`}
                    onClick={() => nav('/')}
>>>>>>> fathy
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        className={`text-[#0061E0] ${isExactMatch("/") ? "text-white" : ""}`}
                    >
                        <path d="M28.2267 13.7732H19.3334C18.7222 13.7732 18.2267 13.2777 18.2267 12.6665V3.77317C18.2267 3.16198 18.7222 2.6665 19.3334 2.6665C24.8562 2.6665 29.3334 7.14366 29.3334 12.6665C29.3334 13.2777 28.8379 13.7732 28.2267 13.7732ZM27.0267 11.5598C26.5354 8.14623 23.8536 5.46448 20.44 4.97317V11.5598H27.0267Z" />
                        <path d="M28.1067 15.9998H17.24C16.9182 15.9998 16.6096 15.872 16.3821 15.6444C16.1545 15.4169 16.0267 15.1083 16.0267 14.7865V3.89312C16.0288 3.54331 15.8814 3.20926 15.6216 2.97497C15.3619 2.74067 15.0144 2.62843 14.6667 2.66646C7.70661 3.4055 2.50275 9.40047 2.74951 16.3953C2.99627 23.3902 8.60964 29.0035 15.6045 29.2503C22.5993 29.4971 28.5943 24.2932 29.3334 17.3331C29.3633 16.9897 29.2474 16.6496 29.0141 16.3959C28.7807 16.1423 28.4514 15.9985 28.1067 15.9998Z" />
                    </svg>
<<<<<<< HEAD
                    <h1>لوحة التحكم</h1>
                </div>

                <div className="space-y-6 md:space-y-8">
                    <div>
                        <div
                            className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${isPartialMatch("/PricingPlans") ? "bg-[#0061E0] text-white py-2" : ""}`}
                            onClick={toggleDropdown}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
                                <path
                                    fill="currentColor"
                                    d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7a2.5 2.5 0 0 0 0 5M9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5S6 6.34 6 8s1.34 3 3 3m7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75M9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13"
                                ></path>
                            </svg>
                            <h1>المستخدمين</h1>

                           
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="1em"
                                height="1em"
                                className={`transform transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                            >
                                <path fill="currentColor" d="M7 10l5 5 5-5z" />
                            </svg>
                        </div>

                        {isDropdownOpen && (
                            <div className="pl-8 space-y-2 pt-3">
                                <div
                                    className={`text-lg cursor-pointer  border border-black ${isExactMatch("/ChaletOwner") ? "bg-[#0061E0] text-white" : ""}`}
                                    onClick={() => nav("/ChaletOwner")}
                                >
                                    مالك الشاليه
                                </div>
                                <div
                                    className={`text-lg cursor-pointer  border border-black ${isExactMatch("/ReservationRequester") ? "bg-[#0061E0] text-white" : ""}`}
                                    onClick={() => nav("/ReservationRequester")}
                                >
                                    طالب الحجز
                                </div>
                                <div
                                    className={`text-lg cursor-pointer  border border-black ${isExactMatch("/ReservationManagement") ? "bg-[#0061E0] text-white" : ""}`}
                                    onClick={() => nav("/ReservationManagement")}
                                >
                                    ادارة الحجوزات
                                </div>
                            </div>
                        )}
=======


                    <h1>لوحة التحكم</h1>
                </div>
                <div className="space-y-6 md:space-y-8">
                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${isPartialMatch("/PricingPlans") ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => nav("PricingPlans")}
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                            className={`text-[#0061E0] ${isPartialMatch("/PricingPlans") ? "text-white" : ""}`}
                        >
                            <path d="M16 16.6665C14.7623 16.6665 13.5753 17.1582 12.7001 18.0333C11.825 18.9085 11.3333 20.0955 11.3333 21.3332C11.3333 22.5708 11.825 23.7578 12.7001 24.633C13.5753 25.5082 14.7623 25.9998 16 25.9998C17.2377 25.9998 18.4246 25.5082 19.2998 24.633C20.175 23.7578 20.6666 22.5708 20.6666 21.3332C20.6666 20.0955 20.175 18.9085 19.2998 18.0333C18.4246 17.1582 17.2377 16.6665 16 16.6665ZM14 21.3332C14 20.8027 14.2107 20.294 14.5858 19.919C14.9608 19.5439 15.4695 19.3332 16 19.3332C16.5304 19.3332 17.0391 19.5439 17.4142 19.919C17.7893 20.294 18 20.8027 18 21.3332C18 21.8636 17.7893 22.3723 17.4142 22.7474C17.0391 23.1225 16.5304 23.3332 16 23.3332C15.4695 23.3332 14.9608 23.1225 14.5858 22.7474C14.2107 22.3723 14 21.8636 14 21.3332Z" />
                            <path d="M23.368 6.82157L19.1293 0.878906L3.544 13.3296L2.68 13.3202V13.3336H2V29.3336H30V13.3336H28.7173L26.1653 5.86824L23.368 6.82157ZM25.9 13.3336H12.5293L22.488 9.93891L24.5173 9.28957L25.9 13.3336ZM20.7333 7.72024L10.4533 11.2242L18.5947 4.72024L20.7333 7.72024ZM4.66667 24.2256V18.4389C5.22957 18.2402 5.74087 17.9181 6.16308 17.4961C6.58528 17.0742 6.90769 16.563 7.10667 16.0002H24.8933C25.0921 16.5633 25.4145 17.0747 25.8367 17.4969C26.2589 17.9191 26.7703 18.2414 27.3333 18.4402V24.2269C26.7703 24.4257 26.2589 24.748 25.8367 25.1703C25.4145 25.5925 25.0921 26.1039 24.8933 26.6669H7.10933C6.90958 26.1038 6.58662 25.5924 6.16403 25.1701C5.74143 24.7477 5.22987 24.425 4.66667 24.2256Z" />
                        </svg>

                        <h1>شحن الرصيد</h1>
                    </div>

                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${isPartialMatch("/Support") ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => nav("Support")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"
                            className={`text-[#0061E0] ${isPartialMatch("/Support") ? "text-white" : ""}`}

                            fill="currentColor">
                            <path d="M24.96 19.6798C25.4267 18.5464 25.68 17.3331 25.68 15.9998C25.68 15.0398 25.5334 14.1198 25.28 13.2664C24.4134 13.4664 23.5067 13.5731 22.56 13.5731C20.6213 13.5752 18.7105 13.1111 16.9887 12.2201C15.2669 11.329 13.7846 10.037 12.6667 8.4531C11.472 11.3474 9.21564 13.6753 6.36002 14.9598C6.30669 15.2931 6.30669 15.6531 6.30669 15.9998C6.30669 17.2727 6.55741 18.5332 7.04455 19.7092C7.53168 20.8853 8.24569 21.9539 9.1458 22.854C10.9637 24.6718 13.4292 25.6931 16 25.6931C17.4 25.6931 18.7467 25.3864 19.96 24.8398C20.72 26.2931 21.0667 27.0131 21.04 27.0131C18.8534 27.7464 17.16 28.1064 16 28.1064C12.7734 28.1064 9.69335 26.8398 7.42669 24.5598C6.04675 23.1863 5.02171 21.4978 4.44002 19.6398H2.66669V13.5731H4.12002C4.56034 11.4298 5.57268 9.44565 7.04961 7.83122C8.52654 6.2168 10.413 5.03231 12.5087 4.40344C14.6045 3.77458 16.8314 3.7248 18.9532 4.25937C21.0749 4.79395 23.0124 5.89296 24.56 7.43977C26.2397 9.11387 27.3857 11.2481 27.8534 13.5731H29.3334V19.6398H29.2534L24.5067 23.9998L17.44 23.1998V20.9731H23.88L24.96 19.6798ZM12.36 15.6931C12.76 15.6931 13.1467 15.8531 13.4267 16.1464C13.7081 16.4301 13.866 16.8135 13.866 17.2131C13.866 17.6127 13.7081 17.9961 13.4267 18.2798C13.1467 18.5598 12.76 18.7198 12.36 18.7198C11.52 18.7198 10.84 18.0531 10.84 17.2131C10.84 16.3731 11.52 15.6931 12.36 15.6931ZM19.6267 15.6931C20.4667 15.6931 21.1334 16.3731 21.1334 17.2131C21.1334 18.0531 20.4667 18.7198 19.6267 18.7198C18.7867 18.7198 18.1067 18.0531 18.1067 17.2131C18.1067 16.81 18.2668 16.4234 18.5519 16.1383C18.8369 15.8532 19.2236 15.6931 19.6267 15.6931Z" />
                        </svg>
                        <h1>تذاكر الدعم</h1>
                    </div>
                    <div
                        className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${isPartialMatch("/Notification") ? "bg-[#0061E0] text-white py-2" : ""
                            }`}
                        onClick={() => nav("Notification")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                            className={`text-[#0061E0] ${isPartialMatch("/Notification") ? "text-white" : ""}`}
                            fill="currentColor">
                            <path d="M16 4C13.6131 4 11.3239 4.94821 9.63604 6.63604C7.94822 8.32387 7.00001 10.6131 7.00001 13V17.802L5.07201 22.63C5.01162 22.7816 4.98926 22.9457 5.00688 23.108C5.02451 23.2702 5.08157 23.4257 5.1731 23.5608C5.26463 23.6959 5.38784 23.8066 5.53198 23.8832C5.67612 23.9597 5.8368 23.9998 6.00001 24H26C26.1632 23.9998 26.3239 23.9597 26.468 23.8832C26.6122 23.8066 26.7354 23.6959 26.8269 23.5608C26.9184 23.4257 26.9755 23.2702 26.9931 23.108C27.0107 22.9457 26.9884 22.7816 26.928 22.63L25 17.8V13C25 10.6131 24.0518 8.32387 22.364 6.63604C20.6761 4.94821 18.387 4 16 4ZM16 29C15.113 29.0002 14.2512 28.7056 13.5499 28.1626C12.8486 27.6195 12.3477 26.8588 12.126 26H19.874C19.6523 26.8588 19.1514 27.6195 18.4501 28.1626C17.7488 28.7056 16.887 29.0002 16 29Z" />
                        </svg>
                        <h1>الإشعارات</h1>
>>>>>>> fathy
                    </div>
                </div>
            </div>

<<<<<<< HEAD
            <div
                className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded mt-4 ${isExactMatch("/Supscriptions") ? "bg-[#0061E0] text-white py-2" : ""}`}
                onClick={() => nav("/Supscriptions")}
            >
 <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
   
    >
      <g fill="currentColor">
        <path d="m421.654 327.53l47.68 23.83L256 458.026L42.667 351.36l47.68-23.83L256 410.37zM256 244.693L278.592 256L256 267.304L233.408 256z"></path>
        <path d="M421.675 232.153L469.334 256L256 362.666L42.667 256l47.659-23.847L256 315.009z"></path>
        <path d="M256 53.973L469.334 160.64L256 267.306L42.667 160.64z"></path>
      </g>
    </svg>

                <h1>الاشتراكات</h1>
            </div>


            <div
                className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded mt-1 ${isExactMatch("/PricingPlans") ? "bg-[#0061E0] text-white py-2" : ""}`}
                onClick={() => nav("/PricingPlans")}
            >
<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      width="1em"
      height="1em"
     
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="9" cy="5.5" rx="4.5" ry="2"></ellipse>
        <path d="M4.5 5.5v6c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-6"></path>
        <path d="M13.5 8.5c0 1.1-2 2-4.5 2s-4.5-.9-4.5-2m4.4-7A6.77 6.77 0 0 0 5 .5C2.51.5.5 1.4.5 2.5c0 .59.58 1.12 1.5 1.5"></path>
        <path d="M2 10C1.08 9.62.5 9.09.5 8.5v-6"></path>
        <path d="M2 7C1.08 6.62.5 6.09.5 5.5"></path>
      </g>
    </svg>

                <h1>خطط الاسعار</h1>
            </div>




            <div
                className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded mt-1 ${isExactMatch("/Payments") ? "bg-[#0061E0] text-white py-2" : ""}`}
                onClick={() => nav("/Payments")}
            >
<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
     
    >
      <path
        fill="currentColor"
        d="M2 5v14h20V5zm5 12a3 3 0 0 0-3-3v-4a3 3 0 0 0 3-3h10a3 3 0 0 0 3 3v4a3 3 0 0 0-3 3zm5-8c1.1 0 2 1.3 2 3s-.9 3-2 3s-2-1.3-2-3s.9-3 2-3"
      ></path>
    </svg>

                <h1> المدفوعات </h1>
            </div>




            <div
                className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded mt-1 ${isExactMatch("/Notification") ? "bg-[#0061E0] text-white py-2" : ""}`}
                onClick={() => nav("/Notification")}
            >
<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
     
    >
      <path
        fill="currentColor"
        d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"
      ></path>
    </svg>
 

                <h1>الاشعارات </h1>
            </div>





            <div
                className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded mt-1 ${isExactMatch("/Support") ? "bg-[#0061E0] text-white py-2" : ""}`}
                onClick={() => nav("/Support")}
            >
 <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    
    >
      <circle cx="9" cy="13" r="1" fill="currentColor"></circle>
      <circle cx="15" cy="13" r="1" fill="currentColor"></circle>
      <path
        fill="currentColor"
        d="M18 11.03A6.04 6.04 0 0 0 12.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.07 8.07 0 0 0 4.86-5.89c1.31 2.63 4 4.44 7.12 4.47"
      ></path>
      <path
        fill="currentColor"
        d="M20.99 12c-.11-5.37-4.31-9-8.99-9c-4.61 0-8.85 3.53-8.99 9H2v6h3v-5.81c0-3.83 2.95-7.18 6.78-7.29a7.007 7.007 0 0 1 7.22 7V19h-8v2h10v-3h1v-6z"
      ></path>
    </svg>

                <h1> تذاكر الدعم</h1>
            </div>






=======
>>>>>>> fathy
            <div className="mt-auto">
                <button className="w-full px-4 py-2 mt-4 bg-[#0061E0] rounded text-white text-2xl">
                    تسجيل خروج
                </button>
            </div>
        </aside>
    );
}
