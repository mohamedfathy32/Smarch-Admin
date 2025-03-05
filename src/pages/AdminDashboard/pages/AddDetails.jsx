import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TbStars } from "react-icons/tb";
import Swal from "sweetalert2";
import { Hourglass } from 'react-loader-spinner';
import { Oval } from 'react-loader-spinner';

export default function AddDetails() {

  const [siteData, setSiteData] = useState({ chalet: 0, reservation: 0, client: 0, rating: 0 })
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOvalupdate, setIsLoadingOvalupdate] = useState(false);
  const getSiteData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/siteData`);
      setSiteData(response.data.data);
      console.log(response.data.data);
      console.log(response.data);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getSiteData();
  }, []);
  const token = localStorage.getItem("tokenAdmin");
  const editFormik = useFormik({
    initialValues: {
      chalet: "",
      reservation: "",
      client: "",
      rating: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoadingOvalupdate(true);
      const siteData = {
        chalet: values.chalet,
        reservation: values.reservation,
        client: values.client,
        rating: values.rating,

      };
      try {
        await axios.post(
          `${import.meta.env.VITE_URL_BACKEND}/siteData/addSiteData`,
          siteData,
          {
            headers: {
              "Authorization": token,

            },
          }
        );
        setIsLoadingOvalupdate(false);
        Swal.fire({
          title: "تم تعديل البيانات بنجاح",
          icon: "success",
          confirmButtonText: "موافق",
        });

        resetForm();
        getSiteData();


      } catch (error) {
        Swal.fire({
          title: 'خطأ',
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "موافق",
        });
      } finally {
        setIsLoadingOvalupdate(false);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.chalet) {
        errors.chalet = "يجب إدخال عدد الشاليهات";
      }
      if (!values.reservation) {
        errors.reservation = "يجب إدخال عدد الحجوزات";
      }
      if (!values.client) {
        errors.client = "يجب إدخال عدد العملاء";
      }
      if (!values.rating) {
        errors.rating = "يجب إدخال عدد التقيمات";
      }


      return errors;
    },
  });
  if (isLoading) {
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
    </div>;
  }
  return (
    <>
      <div className="max-w-md mx-auto space-y-4 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        {/* الحقل الأول */}
        <form onSubmit={editFormik.handleSubmit} className="space-y-4">
          <div className="relative">
            <IoIosPeople className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-2xl " />
            <input
              type="number"
              name="client"
              placeholder="عدد العملاء "
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              value={editFormik.values.client}

            />
            {editFormik.errors.client && <p className="text-red-500 text-sm">{editFormik.errors.client}</p>}

          </div>

          {/* الحقل الثاني */}
          <div className="relative">
            <MdOutlineHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 text-2xl" />
            <input
              type="number"
              placeholder=" عدد الشاليهات"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              value={editFormik.values.chalet}
              name="chalet"
            />
            {editFormik.errors.chalet && editFormik.touched.chalet && <p className="text-red-500 text-sm">{editFormik.errors.chalet}</p>}
          </div>

          {/* الحقل الثالث */}
          <div className="relative">
            <SlCalender className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 text-2xl" />
            <input
              type="number"
              name="rating"
              placeholder=" التقيمات "
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              value={editFormik.values.rating}

            />
            {editFormik.errors.rating && editFormik.touched.rating && <p className="text-red-500 text-sm">{editFormik.errors.rating}</p>}
          </div>

          {/* الحقل الرابع */}
          <div className="relative">
            <TbStars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 text-2xl" />
            <input
              type="number"
              name="reservation"
              placeholder="عدد الحجوزات"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm"
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              value={editFormik.values.reservation}

            />
            {editFormik.errors.reservation && editFormik.touched.reservation && <p className="text-red-500 text-sm">{editFormik.errors.reservation}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-4 flex justify-center items-center"
          >
            {isLoadingOvalupdate ? (
              <Oval
                height={20}  // نفس ارتفاع النص تقريبا
                width={20}
                color="white"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "حفظ"
            )}
          </button>

        </form>
      </div>


      <div className="mx-auto lg:w-[80%] w-[90%] bg-blue-50 py-4 rounded-3xl mt-5">
        <div className="flex justify-evenly items-center flex-wrap md:flex-nowrap">

          <div className="flex flex-col items-center w-[22%] md:w-auto">
            <IoIosPeople className="mb-2 text-[#0061E0] text-3xl md:text-6xl" />
            <h1 className="mb-2 text-[#0D263B] text-lg md:text-3xl font-bold">+{siteData?.client}</h1>
            <p className="mb-2 text-[#0061E0] text-sm md:text-3xl">عدد العملاء</p>
          </div>
          <div className="flex flex-col items-center w-[22%] md:w-auto">
            <MdOutlineHome className="mb-2 text-[#0061E0] text-3xl md:text-6xl" />
            <h1 className="mb-2 text-[#0D263B] text-lg md:text-3xl font-bold">+{siteData?.chalet}</h1>
            <p className="mb-2 text-[#0061E0] text-sm md:text-3xl">عدد الشاليهات</p>
          </div>
          <div className="flex flex-col items-center w-[22%] md:w-auto">
            <SlCalender className="mb-2 text-[#0061E0] text-3xl md:text-6xl" />
            <h1 className="mb-2 text-[#0D263B] text-lg md:text-3xl font-bold">+{siteData?.rating}</h1>
            <p className="mb-2 text-[#0061E0] text-sm md:text-3xl">عدد التقيمات</p>
          </div>
          <div className="flex flex-col items-center w-[22%] md:w-auto">
            <TbStars className="mb-2 text-[#0061E0] text-3xl md:text-6xl" />
            <h1 className="mb-2 text-[#0D263B] text-lg md:text-3xl font-bold">+{siteData?.reservation}</h1>
            <p className="mb-2 text-[#0061E0] text-sm md:text-3xl">عدد الحجوزات</p>
          </div>


        </div>
      </div>
    </>
  );
}
