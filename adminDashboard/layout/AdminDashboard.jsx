import React from 'react'
import SidebarDashboard from './SidebarDashboard';
import ContentDashboard from '../pages/ContentDashboard';
import HeaderDashboard from './Header';

export default function AdminDashboard() {
    const [selectedPage ,setSelectedPage]=  useState("");
  return (
    
    <div className="h-screen flex flex-col">
    {/* الهيدر */}
    <HeaderDashboard />
    <div className="flex flex-1">
        {/* الشريط الجانبي */}
        <SidebarDashboard onSelect={setSelectedPage} />

        {/* المحتوى */}
        <ContentDashboard page={selectedPage} />
    </div>
</div>
  )
}


