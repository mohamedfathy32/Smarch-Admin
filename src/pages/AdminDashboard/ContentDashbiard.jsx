import { Outlet } from 'react-router-dom';

export default function ContentDashbiard() {
    return (
        <div className="mt-10 w-[100%]">
            <Outlet />
        </div>
    );
}
