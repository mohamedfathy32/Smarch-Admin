import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
export default function ControlsPage() {
  const tickets = [
    {
      id: 12345,
      username: "احمد علي",
      room: "شاليه 1",
      checkin: "2022-01-01",
      checkout: "2022-01-01",
      price: "1000",
      status: "جديدة",
      statusColor: "green-600",
    },

    {
      id: 12347,
      username: "سعيد عبد الله",
      room: "شاليه 2",
     
      checkin: "2022-03-01",
      checkout: "2022-03-01",
      price: "1000",

      status: "مغلقة",
      statusColor: "red-500",
    },
  ];
  return (
    <div className="border border-blue-500 w-[80vw] rounded-xl overflow-hidden mr-5">
   
    <div className="flex justify-between items-center text-gray-800 gap-10 p-5 ">
      <div className="text-blue-500 font-bold text-lg">رقم الحجز</div>
      <div className="text-blue-500 font-bold text-lg">اسم العميل</div>
      <div className="text-blue-500 font-bold text-lg">اسم الشاليه</div>
      <div className="text-blue-500 font-bold text-lg">تاريخ الحجز</div>
      <div className="text-blue-500 font-bold text-lg">تاريخ المغادرة</div>
      <div className="text-blue-500 font-bold text-lg">مبلغ الحجز</div>
      <div className="text-blue-500 font-bold text-lg">حالة الحجز</div>
    
    </div>

 
    {tickets.map((ticket) => (
      <div
        key={ticket.id}
        className="flex justify-between items-center p-4 bg-white text-gray-800 gap-10 border-b last:border-none"
      >
        <div>{ticket.id}</div>
        <div>{ticket.username}</div>
        <div>{ticket.room}</div>
        <div>{ticket.checkin}</div>
        <div>{ticket.checkout}</div>
        <div>{ticket.price}</div>
        {/* <div>{ticket.status}</div> */}

        <div
          className={`border bg-${ticket.statusColor} text-white rounded-md px-2 py-1 text-center`}
        >
          {ticket.status}
         </div>
        
      </div>
    ))}
  </div>
  )
}
