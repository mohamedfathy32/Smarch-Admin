import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ContentDashbiard() {
    const token = localStorage.getItem("tokenAdmin");
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const id = decoded.id;
                const role = decoded.role;
                if (!id || role !== "admin") {
                    navigate("/");
                }
            } catch (error) {
                console.error("خطأ في فك تشفير التوكين:", error);
                navigate("/");
            } 
        } else {
            navigate("/");
        }
    }, [token , navigate]);
    return (
        <div className="mt-10 w-[100%]">
            <Outlet />
        </div>
    );
}
