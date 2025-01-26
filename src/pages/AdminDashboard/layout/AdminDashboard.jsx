import { useState } from 'react'
import HeaderDashboard from './HeaderDashboard';
import SidebarDashboard from './SidebarDashboard';
import ContentDashbiard from '../ContentDashbiard';

export default function AdminDashboard() {
    const [selectedPage, setSelectedPage] = useState("");

    return (


        <div className="h-screen flex flex-col">
            {/* الهيدر */}
            <HeaderDashboard />
            <div className="flex flex-1">
                {/* الشريط الجانبي */}
                <SidebarDashboard onSelect={setSelectedPage} />

                {/* المحتوى */}
                <ContentDashbiard page={selectedPage} />
            </div>
        </div>
    )
}
