import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChaletOwner() {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
      setError('Authorization token is missing');
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}user/owners`, {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzg3MjE3MjRhM2FmMjBhYmRmZGY2YmEiLCJlbWFpbCI6Im1haG1vdWQxMjNAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM4MDI2MDg2fQ.hTrlC49bDbm5ztVRZXOyT9Rkn7ilf1Hu6-qCPJnwZYU",
        },
      });

      console.log('API Response:', res); // Log the full response for debugging

      if (res.data.status === 'success') {
        console.log('Response Data:', res.data.data);
        setOwners(res.data.data);
      } else {
        setError('Error fetching data');
      }
    } catch (err) {
      console.error('Error fetching:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to fetch data. Please try again.');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="p-4 rounded-lg shadow">
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if any */}
        <table className="w-full">
          <thead>
            <tr className="text-[#0061E0] p-2 text-xl">
              <th> الاسم</th>
              <th>البريد الاليكتروني </th>
              <th>رقم الهاتف </th>
              <th>عدد الشاليهات</th>
              <th>الايرادات الكلية</th>
              <th>الحالة</th>
              <th>خيارات</th>

            </tr>
          </thead>
          <tbody>
            {owners.length > 0 ? (
              owners.map((owner) => (
                <tr key={owner.id}>
                  <td className="py-5 px-2 text-center text-lg ">{owner.userName}</td>
                  <td className="py-5 px-2 text-center text-lg">{owner.email}</td>
                  <td className="py-5 px-2 text-center text-lg">{owner.phoneNumber
}</td>
                  <td className="py-5 px-2 text-center text-lg">{owner.role
}</td>
                  <td className="py-5 px-2 text-center text-lg">
                    <span className={`px-3 py-1 text-white ${owner.statusColor} rounded-lg`}>
                      {owner.status}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 16" fill="none">
                        <path d="M11 5C10.2044 5 9.44129 5.31607 8.87868 5.87868C8.31607 6.44129 8 7.20435 8 8C8 8.79565 8.31607 9.55871 8.87868 10.1213C9.44129 10.6839 10.2044 11 11 11C11.7956 11 12.5587 10.6839 13.1213 10.1213C13.6839 9.55871 14 8.79565 14 8C14 7.20435 13.6839 6.44129 13.1213 5.87868C12.5587 5.31607 11.7956 5 11 5ZM11 13C9.67392 13 8.40215 12.4732 7.46447 11.5355C6.52678 10.5979 6 9.32608 6 8C6 6.67392 6.52678 5.40215 7.46447 4.46447C8.40215 3.52678 9.67392 3 11 3C12.3261 3 13.5979 3.52678 14.5355 4.46447C15.4732 5.40215 16 6.67392 16 8C16 9.32608 15.4732 10.5979 14.5355 11.5355C13.5979 12.4732 12.3261 13 11 13ZM11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5Z" fill="#0061E0" />
                      </svg>
                    </button>
                    <span className="text-3xl">/</span>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
                        <path d="M8.1665 24.5C7.52484 24.5 6.97573 24.2717 6.51917 23.8152C6.06261 23.3586 5.83395 22.8091 5.83317 22.1667V7H4.6665V4.66667H10.4998V3.5H17.4998V4.66667H23.3332V7H22.1665V22.1667C22.1665 22.8083 21.9382 23.3578 21.4817 23.8152C21.0251 24.2725 20.4756 24.5008 19.8332 24.5H8.1665ZM10.4998 19.8333H12.8332V9.33333H10.4998V19.8333ZM15.1665 19.8333H17.4998V9.33333H15.1665V19.8333Z" fill="#FF0000" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-lg text-red-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
