import axiosInstance from "@/api/axiosInstance";
import Loader from "@/components/Loader/Loader";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Helmet } from "react-helmet";
import { FaCalendarCheck, FaPeopleGroup, FaRegClock } from "react-icons/fa6";
import { TiTicket } from "react-icons/ti";

import { Link, useParams } from "react-router-dom";

const fetchSeminarDetails = async (seminarId: string) => {
  const { data } = await axiosInstance.get(`/seminar/${seminarId}`);
  return data?.data;
};
const SeminarDetailsPage = () => {
  const { seminarId } = useParams();

  // Fetch seminar details
  const {
    data: seminarData,
    error: seminarError,
    isLoading: isLoadingSeminar,
    isError: isErrorSeminar,
  } = useQuery({
    queryKey: ["seminarDetails", seminarId],
    queryFn: () => fetchSeminarDetails(seminarId as string),
    enabled: !!seminarId, // Only fetch if courseId is defined
  });

  if (isLoadingSeminar) {
    return <Loader />;
  }

  if (isErrorSeminar) {
    handleAxiosError(
      seminarError as AxiosError,
      "Failed to fetch seminar details"
    );
    return (
      <div className="p-6 text-center text-red-500">
        Error: {seminarError?.message || "Failed to fetch seminar details"}
      </div>
    );
  }


  return (
    <div>
      <Helmet>
        <title>EJobsIt | Seminar Details</title>
      </Helmet>

      <div className="bg-gradient-to-r  from-cyan-50 to-blue-50 py-4">
        {/* Breadcrumbs */}
        <div className="flex items-start justify-start breadcrumbs w-10/12 mx-auto my-5">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/workshop"}>Workshop</Link>
            </li>
            <li>
              <Link to={"#"}>{seminarData?.name}</Link>
            </li>
          </ul>
        </div>
        {/* Top Left and Right Tiles */}
        <div className="flex lg:flex-row flex-col items-center justify-between w-10/12 mx-auto mb-12  ">
          {/* Left Tile*/}
          <div>
            <div className="text-center lg:text-start px-2 font-siliguri max-w-2xl mx-auto">
              <div className="flex justify-center items-center gap-2 lg:justify-normal">
                <FaPeopleGroup className="text-blue-500" />
                <h3 className="text-[17px] text-blue-500 font-semibold my-2">
                  আজই সেমিনারের জন্য রেজিস্টার করুন
                </h3>
              </div>
              <div className="mb-2">
                <span
                  className="text-3xl font-bold  bg-gradient-to-r from-blue-500 to-cyan-500 
                         text-transparent bg-clip-text "
                >
                  {seminarData?.name}
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start  gap-4 my-2">
                <div className="flex gap-2 justify-center items-center">
                  <FaCalendarCheck className=" text-blue-400" />
                  <p>সেমিনার অনুষ্ঠিত হবেঃ {seminarData?.startDate}</p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-4 my-2">
                <div className="flex gap-2 justify-center items-center">
                  <FaRegClock className=" text-blue-400" />
                  <p>সময়ঃ N/A</p>
                </div>
              </div>

              <p className="mt-8 mb-4 lg:mb-0text-[18px] leading-8">
                {seminarData?.description}
              </p>

              {/* TODO: Conditionally Render Embedded Form or Regular Form Link */}
              {/* <div className="flex items-center justify-center lg:justify-start my-6">
                <div>
                  <Link to={`/`}>
                    <button className="btn m-1 text-white bg-gradient-to-r font-semibold text-[16px] from-blue-500 to-cyan-500">
                      <span className="text-xl ">
                        <IoBookOutline />
                      </span>
                      Start Your Course
                    </button>
                  </Link>
                </div>
                <button
                  onClick={() => console.log("clicked")}
                  className="btn btn-outline mx-4 btn-primary text-yellow-600"
                >
                  {" "}
                  <span>
                    <IoBookOutline />
                  </span>
                  Add to Cart
                </button>
              </div> */}
            </div>
          </div>
          {/* Right Tile*/}
          <div>
            <img
              className="w-full  rounded-2xl"
              src={seminarData?.coverImage}
              alt=""
            />
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-screen-lg mx-auto px-4">
          {seminarData?.googleFormEmbedUrl ? (
            <div className="w-full md:max-w-2xl mx-auto">
              {/* Heading */}
              <h1 className="text-center font-semibold text-2xl md:text-3xl mb-5 underline underline-offset-8 text-blue-500">
                Registration Form
              </h1>

              {/* Responsive Iframe Container */}
              <div className="relative w-full overflow-hidden rounded-lg shadow-md bg-white">
                <iframe
                  src={seminarData?.googleFormEmbedUrl}
                  title="Seminar Registration Form"
                  className="w-full h-[600px] sm:h-[700px] lg:h-[800px] border-none"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center rounded-md p-2 mt-5  ">
              <div>
                <h3 className="text-4xl font-semibold my-8 px-4 pt-2 text-center font-siliguri  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
                  সেমিনারে যুক্ত হতে এখনই ...
                </h3>
              </div>
              {/* Enroll Button */}
              <div className="relative w-fit mx-auto">
                {/* Outer Animated Border */}
                <Link to={seminarData?.googleFormUrl} target="_blank" className="absolute inset-0 rounded-md border-4 border-cyan-500 animate-borderGlow"></Link>
                {/* Button */}
                <div  className="btn text-white bg-gradient-to-r w-full font-semibold text-[16px] from-cyan-500 to-blue-500 border-none font-siliguri">
                  <TiTicket className="animate-bounce text-xl" />
                  <p className="font-semibold text-xl"> রেজিস্ট্রেশন করুন</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeminarDetailsPage;
