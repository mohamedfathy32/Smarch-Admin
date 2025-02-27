import { useEffect, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";

export default function HeaderNotification() {
    const buttons = ["جميع الاشعارات ", "اشعارات جديدة", "اشعارات مقروءة"];
    const { pathname } = useResolvedPath()
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(null); // Track selected button index


    useEffect(() => {
        if (pathname.includes('new')) setSelectedIndex(1)
        else if (pathname.includes('read')) setSelectedIndex(2)
        else setSelectedIndex(0)
    }, [pathname])
    useEffect(() => {
        if (selectedIndex == 1) navigate('new')
        else if (selectedIndex == 2) navigate('read')
        else navigate('')
    }, [selectedIndex])
    return (
        <>
            <div className="flex flex-row gap-12 justify-center">
                {buttons.map((btn, index) => (


                    <button
                        key={index}
                        className={`text-xl text-white border rounded-lg py-2 px-5 text-center ${selectedIndex === index ? "bg-blue-600" : "bg-gray-700"
                            }`}
                        onClick={() => setSelectedIndex(index)}

                    >
                        {btn}
                    </button>


                ))}
            </div>

        </>
    );
}