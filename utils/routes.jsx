import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AdminDashboard from '../adminDashboard/layout/AdminDashboard'
import BalanceRecharge from '../adminDashboard/pages/BalanceRecharge'
import Notification from '../adminDashboard/pages/Notification'
import Payments from '../adminDashboard/pages/Payments'
import PricePlans from '../adminDashboard/pages/PricePlans'
import ReservationManagement from '../adminDashboard/pages/ReservationManagement'
import ReservationRequester from '../adminDashboard/pages/ReservationRequester'
import Subscriptions from '../adminDashboard/pages/Subscriptions'
import SupportPage from '../adminDashboard/pages/SupportPage'
import NotFound from '../NotFoundPage/NotFound'
import ControlsPage from '../adminDashboard/pages/controlsPage'


export const router=createBrowserRouter([
    {
        path:"/", element:<AdminDashboard/> ,children:[
            
            {index:true , element:<ControlsPage/>},
            {path:"BalanceRecharge",element:<BalanceRecharge/>},
            {path:"ChaletOwner",element:<ChaletOwner/>},
            {path:"Notification",element:<Notification/>},
            {path:"Payments",element:<Payments/>},
            {path:"PricePlans",element:<PricePlans/>},
            {path:"ReservationManagement",element:<ReservationManagement/>},
            {path:"ReservationRequester",element:<ReservationRequester/>},
            {path:"Supscriptions",element:<Subscriptions/>},
            {path:"SupportPage",element:<SupportPage/>}

        ]


    },
    { path: '*', element: <NotFound /> }

])
