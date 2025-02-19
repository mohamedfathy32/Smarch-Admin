import { useEffect, useState } from 'react'

import axios from 'axios';

import { GrView } from "react-icons/gr";
import Swal from 'sweetalert2';
import { Hourglass } from 'react-loader-spinner';

import * as XLSX from "xlsx";


export default function SupportPage() {

  const token = localStorage.getItem("tokenAdmin");
  console.log(token);
  const [ticket, setTicket] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalPendingTickets, setTotalPendingTickets] = useState(0);
  const [totalClosedTickets, setTotalClosedTickets] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);






  const fetchData = async (page) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/ticket/admin`, {
        headers: { authorization: token },
        params: { page }
      });
      setTicket(response.data.data);
      setTotalPendingTickets(response.data.numOfTicketsPending)
      setTotalClosedTickets(response.data.numOfTicketsClosed)
      setTotalTickets(response.data.pagination.totalItems)
      setLoadingPage(false);
      setTotalPages(response.data.pagination.totalPages);





    } catch (error) {
      console.log(error);


    }

  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'هل تريد حذف هذا العنصر؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالحذف!',
      cancelButtonText: 'إلغاء'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/ticket/delete/${id}`, {
            headers: { authorization: token },
          });
          console.log(response);
          fetchData(currentPage);

        } catch (error) {
          console.log(error);
          Swal.fire("خطأ!", "فشل حذف العنصر. تأكد من أنك تملك الصلاحيات اللازمة.", "error");
        }

      }


    });
  };

  useEffect(() => {
    fetchData(currentPage);

  }, [currentPage]);

  const handleExportToExcel = () => {
    if (ticket.length === 0) {
      Swal.fire({
        title: "لا يوجد بيانات لتصدير",
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
    const formattedData = ticket.map((ticket, index) => ({
      'رقم التذاكر': index + 1,
      'اسم المستخدم': ticket.sender.userName,

      'تاريخ الإرسال': new Date(ticket.createdAt).toLocaleDateString(),
      'الموضوع ': ticket.subject,
      'الحالة': ticket.status,

    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "التذاكر");
    XLSX.writeFile(workbook, "التذاكر.xlsx");
  };


  return (
    <div>
      {loadingPage ? (
        <div className="flex justify-center items-center h-screen">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        </div>
      ) : (
        <>


          <div className="flex flex-wrap gap-4 justify-evenly">





            <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3"> عدد التذاكر</h3>
                <p className="text-2xl font-semibold text-[#101828]">{totalTickets}</p>
              </div>


              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                <svg width="50" height="50" viewBox="0 1 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" >

                  <path d="M17.3333 27.2985H5.33333C4.97971 27.2985 4.64057 27.158 4.39052 26.908C4.14048 26.6579 4 26.3188 4 25.9652V13.9652C4 13.6115 4.14048 13.2724 4.39052 13.0224C4.64057 12.7723 4.97971 12.6318 5.33333 12.6318H9.33333M17.3333 27.2985H21.3333C21.687 27.2985 22.0261 27.158 22.2761 26.908C22.5262 26.6579 22.6667 26.3188 22.6667 25.9652V22.6318M17.3333 27.2985V25.9652" stroke="#317FFF" />
                  <path d="M29.3333 8.63151C29.3333 7.92427 29.0524 7.24599 28.5523 6.74589C28.0522 6.2458 27.3739 5.96484 26.6667 5.96484H10.6667C9.95942 5.96484 9.28115 6.2458 8.78105 6.74589C8.28095 7.24599 8 7.92427 8 8.63151V20.6315C8 21.3388 8.28095 22.017 8.78105 22.5171C9.28115 23.0172 9.95942 23.2982 10.6667 23.2982H26.6667C27.3739 23.2982 28.0522 23.0172 28.5523 22.5171C29.0524 22.017 29.3333 21.3388 29.3333 20.6315V8.63151ZM24 8.63284C24 8.98647 23.8595 9.3256 23.6095 9.57565C23.3594 9.8257 23.0203 9.96618 22.6667 9.96618C22.313 9.96618 21.9739 9.8257 21.7239 9.57565C21.4738 9.3256 21.3333 8.98647 21.3333 8.63284C21.3333 8.27922 21.4738 7.93875 21.7239 7.6887C21.9739 7.43865 22.313 7.29818 22.6667 7.29818C23.0203 7.29818 23.3594 7.43865 23.6095 7.6887C23.8595 7.93875 24 8.27922 24 8.63284ZM22.6667 15.2995C23.0203 15.2995 23.3594 15.159 23.6095 14.909C23.8595 14.6589 24 14.3198 24 13.9662V13.9648C24 13.6112 23.8595 13.2721 23.6095 13.022C23.3594 12.772 23.0203 12.6315 22.6667 12.6315C22.313 12.6315 21.9739 12.772 21.7239 13.022C21.4738 13.2721 21.3333 13.6112 21.3333 13.9648V13.9662C21.3333 14.3198 21.4738 14.6589 21.7239 14.909C21.9739 15.159 22.313 15.2995 22.6667 15.2995ZM24 19.2995C24 19.6531 23.8595 19.9923 23.6095 20.2423C23.3594 20.4924 23.0203 20.6328 22.6667 20.6328C22.313 20.6328 21.9739 20.4924 21.7239 20.2423C21.4738 19.9923 21.3333 19.6531 21.3333 19.2995V19.2982C21.3333 18.9446 21.4738 18.6054 21.7239 18.3554C21.9739 18.1053 22.313 17.9648 22.6667 17.9648C23.0203 17.9648 23.3594 18.1053 23.6095 18.3554C23.8595 18.6054 24 18.9446 24 19.2982V19.2995Z" fill="#317FFF" />
                </svg>
                <path opacity="0.21" d="M0 30.6318V37.6318C0 50.3344 10.2975 60.6318 23 60.6318H30H37C49.7025 60.6318 60 50.3344 60 37.6318V30.6318V23.6318C60 10.9293 49.7025 0.631836 37 0.631836H30H23C10.2975 0.631836 0 10.9293 0 23.6318V30.6318Z" fill="#8DB8FF" />
              </svg>
            </div>






            <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3"> التذاكر المغلقة</h3>
                <p className="text-2xl font-semibold text-[#101828]">{totalClosedTickets}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                <svg width="50" height="50" viewBox="0 1 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" >

                  <path d="M17.3333 27.2985H5.33333C4.97971 27.2985 4.64057 27.158 4.39052 26.908C4.14048 26.6579 4 26.3188 4 25.9652V13.9652C4 13.6115 4.14048 13.2724 4.39052 13.0224C4.64057 12.7723 4.97971 12.6318 5.33333 12.6318H9.33333M17.3333 27.2985H21.3333C21.687 27.2985 22.0261 27.158 22.2761 26.908C22.5262 26.6579 22.6667 26.3188 22.6667 25.9652V22.6318M17.3333 27.2985V25.9652" stroke="red" />
                  <path d="M29.3333 8.63151C29.3333 7.92427 29.0524 7.24599 28.5523 6.74589C28.0522 6.2458 27.3739 5.96484 26.6667 5.96484H10.6667C9.95942 5.96484 9.28115 6.2458 8.78105 6.74589C8.28095 7.24599 8 7.92427 8 8.63151V20.6315C8 21.3388 8.28095 22.017 8.78105 22.5171C9.28115 23.0172 9.95942 23.2982 10.6667 23.2982H26.6667C27.3739 23.2982 28.0522 23.0172 28.5523 22.5171C29.0524 22.017 29.3333 21.3388 29.3333 20.6315V8.63151ZM24 8.63284C24 8.98647 23.8595 9.3256 23.6095 9.57565C23.3594 9.8257 23.0203 9.96618 22.6667 9.96618C22.313 9.96618 21.9739 9.8257 21.7239 9.57565C21.4738 9.3256 21.3333 8.98647 21.3333 8.63284C21.3333 8.27922 21.4738 7.93875 21.7239 7.6887C21.9739 7.43865 22.313 7.29818 22.6667 7.29818C23.0203 7.29818 23.3594 7.43865 23.6095 7.6887C23.8595 7.93875 24 8.27922 24 8.63284ZM22.6667 15.2995C23.0203 15.2995 23.3594 15.159 23.6095 14.909C23.8595 14.6589 24 14.3198 24 13.9662V13.9648C24 13.6112 23.8595 13.2721 23.6095 13.022C23.3594 12.772 23.0203 12.6315 22.6667 12.6315C22.313 12.6315 21.9739 12.772 21.7239 13.022C21.4738 13.2721 21.3333 13.6112 21.3333 13.9648V13.9662C21.3333 14.3198 21.4738 14.6589 21.7239 14.909C21.9739 15.159 22.313 15.2995 22.6667 15.2995ZM24 19.2995C24 19.6531 23.8595 19.9923 23.6095 20.2423C23.3594 20.4924 23.0203 20.6328 22.6667 20.6328C22.313 20.6328 21.9739 20.4924 21.7239 20.2423C21.4738 19.9923 21.3333 19.6531 21.3333 19.2995V19.2982C21.3333 18.9446 21.4738 18.6054 21.7239 18.3554C21.9739 18.1053 22.313 17.9648 22.6667 17.9648C23.0203 17.9648 23.3594 18.1053 23.6095 18.3554C23.8595 18.6054 24 18.9446 24 19.2982V19.2995Z" fill=" red" />
                </svg>
                <path opacity="0.21" d="M0 30.6318V37.6318C0 50.3344 10.2975 60.6318 23 60.6318H30H37C49.7025 60.6318 60 50.3344 60 37.6318V30.6318V23.6318C60 10.9293 49.7025 0.631836 37 0.631836H30H23C10.2975 0.631836 0 10.9293 0 23.6318V30.6318Z" fill="#FF0000" />
              </svg>         </div>



            <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3"> التذاكر قيد الانتظار</h3>
                <p className="text-2xl font-semibold text-[#101828]">{totalPendingTickets}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                <path opacity="0.21" d="M0 30.9069V37.9069C0 50.6094 10.2975 60.9069 23 60.9069H30H37C49.7025 60.9069 60 50.6094 60 37.9069V30.9069V23.9069C60 11.2043 49.7025 0.90686 37 0.90686H30H23C10.2975 0.90686 0 11.2043 0 23.9069V30.9069Z" fill="#FEC53D" />
                <path d="M15 25.2233L27.9005 32.6714C28.0394 32.7516 28.1851 32.8095 28.3333 32.8463V47.2915L15.9201 39.9453C15.3498 39.6078 15 38.9944 15 38.3317V25.2233ZM45 25.0253V38.3317C45 38.9944 44.6502 39.6078 44.0799 39.9453L31.6667 47.2915V32.7197C31.6969 32.7046 31.7269 32.6885 31.7566 32.6714L45 25.0253Z" fill="#FEC53D" />
                <path opacity="0.499209" d="M15.4053 21.6083C15.5628 21.4093 15.7617 21.2411 15.9936 21.1176L29.1186 14.127C29.6696 13.8335 30.3305 13.8335 30.8815 14.127L44.0065 21.1176C44.1852 21.2128 44.3444 21.3346 44.4801 21.4765L30.0899 29.7847C29.9953 29.8393 29.9081 29.9018 29.8286 29.9709C29.7491 29.9018 29.6618 29.8393 29.5672 29.7847L15.4053 21.6083Z" fill="#FEC53D" />
              </svg>
            </div>




          </div>


          <button
            onClick={() => { handleExportToExcel() }}
            className="m-3 p-5 text-1xl bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
          >
            تحميل البيانات

          </button>

          <div className="bg-white p-4 rounded-lg  mt-10 ">
            <table className="w-full">
              <thead>
                <tr className="text-[#0061E0] p-2 text-xl">
                  <th>رقم التذكرة</th>
                  <th> اسم المستخدم</th>
                  <th> تاريخ الارسال</th>
                  <th> الموضوع</th>

                  <th>الحالة</th>
                  <th>خيارات</th>
                </tr>
              </thead>
              <tbody>
                {ticket.map((ticket, index) => (
                  <tr key={ticket._id}>
                    <td className="py-2 px-1 text-center text-lg">{index + 1}</td>
                    <td className="py-2 px-1 text-center text-lg">{ticket.sender.userName}</td>
                    <td className="py-2 px-1 text-center text-lg">{new Date(ticket.createdAt).toLocaleDateString("ar-EG")}</td>
                    <td className="py-2 px-1 text-center text-lg">{ticket.subject}</td>

                    <td className="py-2 px-1 text-center text-lg">
                      <span className={`border px-3 py-1 text-center rounded-md text-white ${ticket.status === "pending" ? "bg-yellow-500" : ticket.status === "closed" ? " bg-red-500" : "bg-green-500 "}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      <button className="text-blue-500 hover:underline">
                        <GrView size={20} />
                      </button>
                      <span className="text-3xl">/</span>
                      <button onClick={() => handleDelete(ticket._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
                          <path d="M8.1665 24.5C7.52484 24.5 6.97573 24.2717 6.51917 23.8152C6.06261 23.3586 5.83395 22.8091 5.83317 22.1667V7H4.6665V4.66667H10.4998V3.5H17.4998V4.66667H23.3332V7H22.1665V22.1667C22.1665 22.8083 21.9382 23.3578 21.4817 23.8152C21.0251 24.2725 20.4756 24.5008 19.8332 24.5H8.1665ZM10.4998 19.8333H12.8332V9.33333H10.4998V19.8333ZM15.1665 19.8333H17.4998V9.33333H15.1665V19.8333Z" fill="#FF0000" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              الصفحة السابقة
            </button>
            <span>الصفحة {currentPage} من {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              الصفحة التالية
            </button>
          </div>



        </>
      )}
    </div>
  )
}
