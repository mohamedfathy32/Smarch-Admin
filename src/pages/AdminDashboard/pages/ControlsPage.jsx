import axios from 'axios';
import React, { useEffect, useState ,useMemo } from 'react';
import { Bar, Doughnut } from "react-chartjs-2";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Hourglass } from 'react-loader-spinner';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
 
} from "chart.js";



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
 
);

export default function ControlsPage() {
  const token = localStorage.getItem("tokenAdmin");
  const [reserv, setReserv] = useState([]);
  const [users, setUsers] = useState([]);
  const [reservCount, setReservCount] = useState(0);
  const [chaletsCount, setChaletsCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [chalets, setChalets] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true); 
  const getAllData = async () => {
    setLoading(true); // ✅ تشغيل اللودر قبل بدء جلب البيانات
    try {
      await Promise.all([
        getAllUsers(),
        getChalets(),
        getSubscriptions(),
        fetchData(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // ✅ إيقاف اللودر بعد اكتمال الجلب
    }
  };
  const itemsPerPage = 5;

  const optionsUsers = {
    cutout: "70%", 
    plugins: {
      legend: {
        labels: {

          font: {
           
            size: 20, // حجم الخط
            weight: "bold", // سمك الخط
          },
          color: "#333", // لون النص
        },
      },
    },
  };
  const data = {
    labels: [" نشط", " غير نشط "],
    datasets: [
      {
        label: "Usage",
        data: [activeUsers, inactiveUsers],
        backgroundColor: ["#41A86C" ,"#F1364E"],
        hoverOffset: 4,

      },
    ],
  };

  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "Sales",
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //         "rgba(100, 200, 255, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //         "rgba(100, 200, 255, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const chartData = useMemo(() => {
    const monthlyData = users.reduce((acc, user) => {
      const creationDate = new Date(user.timestamp);
      const monthYear = `${creationDate.getFullYear()}-${creationDate.getMonth() + 1}`;

      if (!acc[monthYear]) acc[monthYear] = 0;
      acc[monthYear]++;
      return acc;
    }, {});

    return {
      labels: Object.keys(monthlyData),
      datasets: [
        {
          label: "العملاء الجدد لكل شهر",
          data: Object.values(monthlyData),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [users]); // التحديث يتم فقط عند تغيير users

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false, text: "العملاء الجدد" },
    },
  };
  const getSubscriptions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/subscription`, {
        headers: { authorization: token },
        params: { page: 1 }
      });
      setTotalRevenue(response.data.totalRevenue);
      console.log(response.data.totalRevenue);
      console.log(response.data);


    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  }


  const getAllUsers = async () => {
    try {

      const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/user`, {
        headers: { authorization: token },
      });
      
      setUsers(response.data.data); // حفظ المستخدمين في الـ state
      // setActiveUsers(response.data.data.active);
      const activeCount = response.data.data.filter(user => user.active).length;
      setActiveUsers(activeCount);
      const inactiveCount = response.data.data.filter(user => !user.active).length;
      setInactiveUsers(inactiveCount);





    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/reservation?page=${currentPage}&limit=${itemsPerPage}`,
        {
        headers: {
          authorization: token,
        },
        
      }
    );
    setReserv(response.data.data);
    console.log(response.data);
    // console.log(response.data.pagination.totalItems);
    setReservCount(response.data.pagination.totalItems)
    
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const getChalets = async () => {
    try {
      let allChalets = [];
      let currentPage = 1;
      let totalPages = 1; // نفترض أن هناك على الأقل صفحة واحدة
  
      while (currentPage <= totalPages) {
        const response = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND}/chalet/admin?page=${currentPage}`, 
          { headers: { authorization: token } }
        );
  
        // استخراج البيانات
        const chaletsList = response.data.data;
        allChalets = [...allChalets, ...chaletsList];
  
        // تعيين العدد الإجمالي للشاليهات من الصفحة الأولى
        if (currentPage === 1) {
          setChaletsCount(response.data.pagination.totalItems);
          totalPages = response.data.pagination.totalPages; 
        }
  
        currentPage++; // الانتقال إلى الصفحة التالية
      }
  
      setChalets(allChalets); // حفظ كل الشاليهات في state
      console.log("جميع الشاليهات:", allChalets);
      
      calculateLocationPercentages(allChalets); // حساب النسب بناءً على جميع البيانات
    } catch (error) {
      console.error("حدث خطأ أثناء جلب الشاليهات:", error);
    }
  };
  const calculateLocationPercentages = (chaletsList) => {
    const locationCounts = {};
  
    // قائمة المدن المعروفة
    const knownCities = ["الرياض", "جدة", "الطائف"];
  
    // حساب عدد الشاليهات في كل مدينة
    chaletsList.forEach(chalet => {
      const city = chalet.location.city;
  
      // إذا كانت المدينة معروفة، نضيفها إلى locationCounts
      if (knownCities.includes(city)) {
        if (locationCounts[city]) {
          locationCounts[city]++;
        } else {
          locationCounts[city] = 1;
        }
      } else {
        // إذا كانت المدينة غير معروفة، نضيفها إلى فئة "Others"
        if (locationCounts["Others"]) {
          locationCounts["Others"]++;
        } else {
          locationCounts["Others"] = 1;
        }
      }
    });
  
    // تحويل الأعداد إلى نسب مئوية
    const totalChalets = chaletsList.length;
    const locationPercentages = Object.keys(locationCounts).map(city => ({
      label: city,
      value: (locationCounts[city] / totalChalets) * 100,
      color: getColorForCity(city),
    }));
  
    setLocationData(locationPercentages);
  };
  
  const getColorForCity = (city) => {
    const colors = {
      الرياض: "#343C6A", // أزرق
      جدة: "#FC7900",   // برتقالي
      الطائف: "#EF74AF", // وردي
      Others: "#0061E0", // لون افتراضي لفئة Others
    };
    return colors[city] || "#0061E0"; // لون افتراضي إذا لم تكن المدينة معروفة
  };

  const sizing = {
    margin: { right: 0 },
    width: 300,
    height: 300,
    legend: { hidden: true },
  };

  const TOTAL = locationData.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };
  
  useEffect(() => {
   getAllData();
  }, []);


  return (
   <div>
    {loading ? (
      <div className="flex justify-center items-center h-screen">
  <Hourglass
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#306cce', '#72a1ed']}
  />    </div>

    ) : (
      
  
    <>
    
    
  
      
{/* // ✅ المبيعات */}
    <div className="flex flex-wrap gap-4 justify-evenly">
                                               <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3"> الايرادات</h3>
                                <p className="text-2xl font-semibold text-[#101828]">{totalRevenue}</p>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                                        <path opacity="0.21" d="M0 30.9067V37.9067C0 50.6093 10.2975 60.9067 23 60.9067H30H37C49.7025 60.9067 60 50.6093 60 37.9067V30.9067V23.9067C60 11.2042 49.7025 0.906738 37 0.906738H30H23C10.2975 0.906738 0 11.2042 0 23.9067V30.9067Z" fill="#4AD991" />
                                        <path d="M19.1111 41.7956H42.4444C43.3036 41.7956 44 42.4921 44 43.3512C44 44.2103 43.3036 44.9067 42.4444 44.9067H17.5556C16.6964 44.9067 16 44.2103 16 43.3512V18.4623C16 17.6032 16.6964 16.9067 17.5556 16.9067C18.4147 16.9067 19.1111 17.6032 19.1111 18.4623V41.7956Z" fill="#4AD991" />
                                        <path opacity="0.5" d="M24.9126 35.0817C24.325 35.7085 23.3406 35.7402 22.7138 35.1526C22.0871 34.5651 22.0553 33.5806 22.6429 32.9539L28.4762 26.7317C29.0445 26.1255 29.9888 26.073 30.6208 26.6123L35.2248 30.5411L41.2235 22.9428C41.7558 22.2685 42.734 22.1534 43.4083 22.6858C44.0826 23.2181 44.1977 24.1963 43.6653 24.8706L36.6653 33.7373C36.1186 34.4298 35.1059 34.5294 34.4347 33.9567L29.7306 29.9425L24.9126 35.0817Z" fill="#4AD991" />
                                    </svg>
                        </div>

  

  
                        <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3"> المستخدمين</h3>
                                <p className="text-2xl font-semibold text-[#101828]">{users.length}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                                <path opacity="0.21" d="M0.5 30V37C0.5 49.7025 10.7975 60 23.5 60H30.5H37.5C50.2025 60 60.5 49.7025 60.5 37V30V23C60.5 10.2975 50.2025 0 37.5 0H30.5H23.5C10.7975 0 0.5 10.2975 0.5 23V30Z" fill="#8280FF" />
                                <path opacity="0.587821" d="M21.1667 23.3333C21.1667 26.2789 23.5545 28.6667 26.5 28.6667C29.4455 28.6667 31.8334 26.2789 31.8334 23.3333C31.8334 20.3878 29.4455 18 26.5 18C23.5545 18 21.1667 20.3878 21.1667 23.3333ZM34.5 28.6667C34.5 30.8758 36.2909 32.6667 38.5 32.6667C40.7092 32.6667 42.5 30.8758 42.5 28.6667C42.5 26.4575 40.7092 24.6667 38.5 24.6667C36.2909 24.6667 34.5 26.4575 34.5 28.6667Z" fill="#8280FF" />
                                <path d="M26.4778 31.3335C20.1826 31.3335 15.0177 34.5689 14.5009 40.9324C14.4727 41.2791 15.1356 42.0002 15.47 42.0002H37.4956C38.4972 42.0002 38.5128 41.1941 38.4972 40.9335C38.1065 34.3911 32.8616 31.3335 26.4778 31.3335ZM45.7746 42.0002L40.6333 42.0002C40.6333 38.9989 39.6417 36.2293 37.9683 34.001C42.5103 34.0506 46.2189 36.347 46.498 41.2002C46.5092 41.3956 46.498 42.0002 45.7746 42.0002Z" fill="#8280FF" />
                            </svg>
                        </div>
                       





                         <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3"> الشاليهات</h3>
                                <p className="text-2xl font-semibold text-[#101828]">{chaletsCount}</p>
                            </div>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
  <path opacity="0.21" fill-rule="evenodd" clip-rule="evenodd" d="M0 30.9069V37.9069C0 50.6094 10.2975 60.9069 23 60.9069H30H37C49.7025 60.9069 60 50.6094 60 37.9069V30.9069V23.9069C60 11.2043 49.7025 0.90686 37 0.90686H30H23C10.2975 0.90686 0 11.2043 0 23.9069V30.9069Z" fill="#FEC53D"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15 25.2233L27.9005 32.6714C28.0394 32.7516 28.1851 32.8095 28.3333 32.8463V47.2915L15.9201 39.9453C15.3498 39.6078 15 38.9944 15 38.3317V25.2233ZM45 25.0253V38.3317C45 38.9944 44.6502 39.6078 44.0799 39.9453L31.6667 47.2915V32.7197C31.6969 32.7046 31.7269 32.6885 31.7566 32.6714L45 25.0253Z" fill="#FEC53D"/>
  <path opacity="0.499209" fill-rule="evenodd" clip-rule="evenodd" d="M15.4053 21.6083C15.5628 21.4093 15.7617 21.2411 15.9936 21.1176L29.1186 14.127C29.6696 13.8335 30.3305 13.8335 30.8815 14.127L44.0065 21.1176C44.1852 21.2128 44.3444 21.3346 44.4801 21.4765L30.0899 29.7847C29.9953 29.8393 29.9081 29.9018 29.8286 29.9709C29.7491 29.9018 29.6618 29.8393 29.5672 29.7847L15.4053 21.6083Z" fill="#FEC53D"/>
  </svg>
                        </div>



                         <div className="flex justify-between items-center p-4 rounded-lg shadow w-full sm:w-[48%] md:w-[22%] h-[150px] flex-shrink-0 border border-[#1A71FF]">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3"> الحجوزات</h3>
                                <p className="text-2xl font-semibold text-[#101828]">{reservCount}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
                                <path opacity="0.3" d="M0.5 30.4722V37.4722C0.5 50.1747 10.7975 60.4722 23.5 60.4722H30.5H37.5C50.2025 60.4722 60.5 50.1747 60.5 37.4722V30.4722V23.4722C60.5 10.7696 50.2025 0.472168 37.5 0.472168H30.5H23.5C10.7975 0.472168 0.5 10.7696 0.5 23.4722V30.4722Z" fill="#FF9066" />
                                <path opacity="0.78" d="M29.1312 24.281C29.1512 24.0205 29.3684 23.8193 29.6297 23.8193H30.0475C30.3044 23.8193 30.5195 24.014 30.545 24.2696L31.1667 30.486L35.5814 33.0087C35.7372 33.0977 35.8333 33.2634 35.8333 33.4428V33.8314C35.8333 34.1611 35.5199 34.4005 35.2018 34.3138L28.8987 32.5947C28.6673 32.5316 28.5133 32.3131 28.5317 32.074L29.1312 24.281Z" fill="#FF9066" />
                                <path opacity="0.901274" d="M23.2218 15.4568C22.9577 15.142 22.4477 15.2625 22.3524 15.6621L20.7189 22.5103C20.6412 22.8359 20.8993 23.1444 21.2336 23.1255L28.2783 22.7263C28.6892 22.703 28.8976 22.221 28.633 21.9057L26.8316 19.7588C27.9965 19.3608 29.2317 19.1529 30.5 19.1529C36.7592 19.1529 41.8333 24.227 41.8333 30.4862C41.8333 36.7454 36.7592 41.8196 30.5 41.8196C24.2408 41.8196 19.1667 36.7454 19.1667 30.4862C19.1667 29.4355 19.309 28.4063 19.5864 27.4172L17.0188 26.697C16.6808 27.9021 16.5 29.1731 16.5 30.4862C16.5 38.2182 22.768 44.4862 30.5 44.4862C38.232 44.4862 44.5 38.2182 44.5 30.4862C44.5 22.7542 38.232 16.4862 30.5 16.4862C28.5551 16.4862 26.7029 16.8828 25.0197 17.5995L23.2218 15.4568Z" fill="#FF9066" />
                            </svg>
                        </div>
    
    
    
    
    </div>

  

    <div className="flex flex-wrap gap-4 justify-around mt-4">
                                               <div>
                                  


                                               <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, -5.5, 2, -7.5, 1.5, 6],
          area: true,
          baseline: 'min',
        },
      ]}
      width={500}
      height={300}
    />
                                 
                                               </div>


                                               <div className="rounded-lg shadow w-full sm:w-[48%] md:w-[22%]  flex-shrink-0 border border-[#1A71FF]  ">
                                               
                                               <PieChart
        series={[
          {
            outerRadius: 100,
            data: locationData,
            arcLabel: getArcLabel,
            paddingAngle: 5,
            cornerRadius: 10,
            highlightScope: { highlighted: 'item', faded: 'global' },
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
        {...sizing}
      />


                                               </div>


                                               <div className="rounded-lg shadow w-full sm:w-[48%] md:w-[22%]  flex-shrink-0 border border-[#1A71FF] p-4">
                                               <Doughnut data={data} options={optionsUsers} />
                                               </div>






  

  
                       
    
    
    
    </div>







{/* ✅ المستخدمين */}
    <div className="flex gap-4 p-6 "> 
      {/* ✅ الجدول */}
      <div className='rounded-lg shadow bg-white' style={{ width: "40%", margin: "0 auto" }}>
      {chartData ? <Bar data={chartData} options={options} /> : <p>جاري تحميل البيانات...</p>}
      </div>
     
      <div className="w-3/5 max-w-[700px] p-4 rounded-lg shadow bg-white overflow-x-auto">
        <p className='p-1 text-lg'>اخر الحجوزات</p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-[#0061E0] p-2 text-sm">
              <th>رقم الحجز</th>
              <th>اسم العميل</th>
              <th>اسم الشالية</th>
              <th>تاريخ الحجز</th>
              <th>تاريخ المغادرة</th>
              <th>مبلغ الحجز</th>
              <th>حالة الحجز</th>
            </tr>
          </thead>
          <tbody>
            {reserv.map((reserv , index) => (
              <tr key={reserv._id}>
                <td className="py-2 px-2 text-center text-sm">{index+1}</td>
                {/* <td className="py-2 px-2 text-center text-sm">{reserv.userID.userName}</td> */}
                <td className="py-2 px-2 text-center text-sm">{reserv.chaletID.name}</td>
                <td className="py-2 px-2 text-center text-sm">{new Date(reserv.checkInDate).toLocaleDateString("ar-EG")}</td>
                <td className="py-2 px-2 text-center text-sm">{new Date(reserv.checkOutDate).toLocaleDateString("ar-EG")}</td>
                <td className="py-2 px-2 text-center text-sm">{reserv.totalPrice}</td>
                <td className={`py-2 px-2 text-center text-sm rounded-lg text-white
                  ${reserv.status === "pending" ? "bg-yellow-500" :
                    reserv.status === "approved" ? "bg-green-500" :
                    "bg-red-500"}`}>
                  {reserv.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ المحتوى الجانبي */}
      
    </div>

    </>
    )}
   </div>
  );
}

