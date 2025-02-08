/* eslint-disable react/prop-types */
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function SidebarDashboard({ isOpen }) {
    const nav = useNavigate();
    const location = useLocation();

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
                    <h1>لوحة التحكم</h1>
                </div>

                <div className="space-y-6 md:space-y-8">
                    <div>
                        <div
                            className={`text-2xl flex items-center gap-2 cursor-pointer rounded ${isPartialMatch("/") ? "bg-[#0061E0] text-white py-2" : ""}`}
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
                    </div>
                </div>
            </div>

            <div
                className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded mt-4 ${isExactMatch("/Supscriptions") ? "bg-[#0061E0] text-white py-2" : ""}`}
                onClick={() => nav("/Supscriptions")}
            >
 <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      className={`text-[#0061E0] ${isExactMatch("/Supscriptions") ? "text-white" : ""}`}

   
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
      className={`text-[#0061E0] ${isExactMatch("/PricingPlans") ? "text-white" : ""}`}
     
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
      className={`text-[#0061E0] ${isExactMatch("/Payments") ? "text-white" : ""}`}
      
     
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
      className={`text-[#0061E0] ${isExactMatch("/Notification") ? "text-white" : ""}`}
     
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
      className={`text-[#0061E0] ${isExactMatch("/Support") ? "text-white" : ""}`}
    
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


<<<<<<< HEAD

=======
            <div
                className={`mb-6 text-2xl flex items-center gap-2 cursor-pointer rounded mt-1 ${isExactMatch("/Articles") ? "bg-[#0061E0] text-white py-2" : ""}`}
                onClick={() => nav("/Articles")}
            >
<svg 
     viewBox="0 0 24 24"
      width="1em"
      height="1em"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
       className={`text-[#0061E0] ${isExactMatch("/Articles") ? "text-white" : ""}`}
>
    <path d="M4 4h16v16H4z"/>
    <path d="M8 10h8M8 14h5M8 6h8"/>
</svg>
 

                <h1>مقاله جديدة </h1>
            </div>
>>>>>>> 2eb0d277cd08442cd782267ff2a729397ae3ee54



            <div className="mt-auto">
                <button className="w-full px-4 py-2 mt-4 bg-[#0061E0] rounded text-white text-2xl">
                    تسجيل خروج
                </button>
            </div>
        </aside>
    );
}



{/* <svg 
     viewBox="0 0 24 24"
      width="1em"
      height="1em"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
       className={`text-[#0061E0] ${isExactMatch("/Articles") ? "text-white" : ""}`}
>
    <path d="M4 4h16v16H4z"/>
    <path d="M8 10h8M8 14h5M8 6h8"/>
</svg> */}