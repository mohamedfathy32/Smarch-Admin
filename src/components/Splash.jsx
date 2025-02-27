import { useEffect, useState } from "react";
import { FaHotel } from "react-icons/fa";

export default function Splash() {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center h-screen relative overflow-hidden">

            <div className="relative flex flex-col items-center">
                <div className="bg-blue-600 w-20 h-20 flex items-center justify-center rounded-lg shadow-lg animate-bounce">
                    <FaHotel className="text-white text-4xl" />
                </div>
                <p className="mt-4 text-3xl font-semibold ">
                    جاري التحميل {dots}
                </p>
            </div>
        </div>
    );
}