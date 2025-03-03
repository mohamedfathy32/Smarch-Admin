import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import Pusher from 'pusher-js';
import {jwtDecode} from 'jwt-decode';
import { Hourglass } from 'react-loader-spinner';
import { AiOutlineLoading3Quarters, AiOutlineExclamationCircle } from "react-icons/ai";
import { FaCheck } from 'react-icons/fa';
export default function ChatAdmin() {
    const { id } = useParams();
    const token = localStorage.getItem("tokenAdmin");
    const [ticket, setTicket] = useState(null);
    const [sendMessagefromAdmin, setSendMessagefromAdmin] = useState("");
    const [messages, setMessages] = useState([]);
    const decodedToken = jwtDecode(token);
    const messagesEndRef = useRef(null);
    


    const getTicketByChatId = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/chat/${id}`, {
                headers: { authorization: token },
            });
            console.log(response.data);
            setTicket(response.data.data);
            setMessages(response.data.data.messages);
        } catch (error) {
            console.log(error);
        } 
    };

    
const sendMessage = async () => {
    if (!sendMessagefromAdmin.trim()) return;

   
    const tempMessage = {
        id: Date.now(), 
        message: sendMessagefromAdmin,
        senderRole: "admin",
        timestamp: new Date().toISOString(),
        status: "pending",  
    };


    setMessages((prevMessages) => [...prevMessages, tempMessage]);
    setSendMessagefromAdmin("");

    try {
        await axios.post(`${import.meta.env.VITE_URL_BACKEND}/chat/sendMessage/${id}`,
            { message: sendMessagefromAdmin },
            { headers: { authorization: token } }
        );

        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === tempMessage.id ? { ...msg, status: "sent" } : msg
            )
        );
    } catch (error) {
        console.log(error.response.data.message);

        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === tempMessage.id ? { ...msg, status: "failed" } : msg
            )
        );
    }
};

    useEffect(() => {
        getTicketByChatId();
       
    }, []);
useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
}, [messages]);

    useEffect(() => {
       
        
        
        const pusherNotification = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster:import.meta.env.VITE_PUSHER_CLUSTER,
        });
        
        const channel = pusherNotification.subscribe(`message-${id}`);
  
        channel.bind('newMessage', function (chat) {
          setMessages(chat);
            console.log(chat);
            
        });
  
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusherNotification.disconnect();
        };
      
    }, [id])

    if (!ticket) {
        return <div className="flex justify-center items-center h-screen">
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
    

    }

    return (
        <>
            <div className="p-6 bg-gray-100 grid grid-cols-1 md:grid-cols-12 gap-4 h-screen">
                {/* صندوق الرسائل */}
                <div className="col-span-1 md:col-span-9 bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-blue-600 p-4">متابعة تذكرة الدعم</h3>
                    <div className="flex-1 overflow-auto p-4 max-h-[calc(100vh-200px)] ">
    {messages?.length === 0 ? (
        <div className="text-gray-500  flex flex-col items-center justify-center h-full">
            <HiChatBubbleLeftRight className="w-16 h-16 text-gray-400 animate-bounce"  />
            <p className="mt-2">لا توجد رسائل حتى الآن، يمكنك بدء المحادثة الآن.</p>
        </div>
    ) : (
        <div className="w-full flex flex-col space-y-4">
            {messages?.map((msg, index) => {
                const isAdmin = msg.senderRole === "admin";
            

                const messageTime = new Date(msg.timestamp).toLocaleString("ar-EG", {
                  weekday: "short", // اسم اليوم (مثل: السبت)
                  hour: "2-digit", 
                  minute: "2-digit",
                  hour12: true // لعرض الوقت بصيغة 12 ساعة
              });
              return (
                <div key={msg.id || index} className={`flex items-start gap-2 ${isAdmin ? "flex-row" : "flex-row-reverse"}`}>
                    <Stack direction="row" spacing={2}>
                        <Avatar>{isAdmin ? "A" : "O"}</Avatar>
                    </Stack>
                    <div className={`${isAdmin ? "text-left" : "text-right"} relative`}>
                        {isAdmin ? 
                            <p className="text-start">{decodedToken.username}</p> 
                            : <p className="text-end">{ticket?.ticketID.sender.userName}</p>
                        }
        
                        <div className="flex items-center gap-2">
                            <p className={`p-2 rounded-md ${isAdmin ? "bg-gray-200" : "bg-blue-500 text-white"} break-all whitespace-pre-wrap overflow-hidden w-full`}>
                                {msg.message}
                                
                            </p>
        
                          
                            {msg.status === "failed" && (
                                <AiOutlineExclamationCircle size={30} className="text-red-500" title="فشل الإرسال" />
                            )}
                        </div>
        
                        {isAdmin ? <p className="text-xs text-gray-500 text-start ">{messageTime}</p> : <p className="text-xs text-gray-500 text-end ">{messageTime}</p>}
                    </div>
                </div>
            );
            })}
            <div ref={messagesEndRef} />
        </div>
    )}
</div>


           {/* إدخال الرسالة أو رسالة الإغلاق */}
            {ticket?.status === "closed" ? (
      <p className="mt-4 text-center text-gray-500">تم غلق تذكرة الدعم</p>
           ) : (
         <div className="mt-4 flex items-center gap-2">
          <textarea
  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  rows="2"
  placeholder="اكتب رسالتك هنا..."
  value={sendMessagefromAdmin}
  onChange={(e) => setSendMessagefromAdmin(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();     
      sendMessage();
    }
  }}
></textarea>
           <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={sendMessage}
        >
            إرسال
        </button>
    </div>
)} 
                </div>

                {/* صندوق المعلومات */}
                <div className="col-span-1 md:col-span-3 bg-white shadow-md rounded-lg p-4 w-full md:w-fit self-start">
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">معلومات</h3>
                    <p><strong>العميل:</strong> {ticket?.ticketID.sender.userName}</p>

                    <p><strong>الحالة:</strong> {ticket?.status}</p>
                    <p><strong>تاريخ الإنشاء:</strong> {new Date(ticket?.createdAt).toLocaleString("en-US")}</p>
                    <p><strong>آخر تحديث:</strong> {new Date(ticket?.updatedAt).toLocaleString("en-US")}</p>
                </div>
            </div>
        </>
    );
}





