import { useContext, useEffect } from "react";
import Splash from "../../../../../components/Splash";
import NotificationTemp from "./NotificationTemp";
import { NotificationContext } from "../../../../../../Context/NotificationContext";
import Pagination from "../../../../../components/Pagination";

export default function AllNotification() {
  const { notifications, currentPage, loading,
    fetchNotifications, totalPages, setCurrentPage , toggleReadStatus
  } = useContext(NotificationContext)

  useEffect(() => {
    fetchNotifications()
  }, [currentPage])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'UTC' };
    const date = new Date(dateString);
    const dateAr = new Intl.DateTimeFormat('ar-EG', options).format(date);

    return {
      date: dateAr.split("في ")[0],
      time: dateAr.split("في ")[1]
    }
  }

  if (loading) return (<Splash />)

  return (
    <>
    {console.log(notifications)}
      {notifications?.map((notif, index) => (
        <div key={index} className="flex justify-center mt-7 px-4 sm:px-6 lg:px-8">
          <NotificationTemp
            notification={notif}
            formatDate={formatDate}
            toggleReadStatus={toggleReadStatus}
            all={false}
          />
        </div>
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
    </>
  );
}
