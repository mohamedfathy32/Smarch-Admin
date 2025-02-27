import HeaderNotification from './layout/HeaderNotification'
import { Outlet } from 'react-router-dom'

export default function NotificationPage() {
    return (
        <>
            <HeaderNotification />
            <Outlet />
        </>
    )
}
