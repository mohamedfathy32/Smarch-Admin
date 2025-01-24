import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

export default function ContentDashboard() {
    const token = localStorage.getItem("token");
    const nav = useNavigate();


    useEffect(() => {
        if (token) {
            console.log("decodedToken");
            const decoded = jwtDecode(token);
            const id = decoded.id;
            id ? '' : nav('/')
        } else {
            nav('/')
        }
    }, [token, nav]);


    return (
        <div className="mt-10 w-[100%]">
            {/* {renderContent()} */}
            <Outlet />
        </div>
    );
}



