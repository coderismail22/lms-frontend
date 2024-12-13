import { Link } from "react-router-dom";
import img from "/as.jpg";
import { FaFacebookF, FaYoutube } from "react-icons/fa6";

const MeetCeo = () => {
  return (
    <div className=" bg-gradient-to-r from-cyan-50 to-blue-50  hover:bg-gradient-to-l overflow-x-hidden  font-siliguri py-8 pb-24 w-full border">
      <div className="max-w-6xl mx-auto grid grid-cols-1   gap-10 items-center ">
        {/* Desc */}
        <div className="flex flex-col items-center w-full mx-auto rounded-lg lg:px-24 bg-gradient-to-r from-cyan-50 to-blue-50 font-montserrat p-10">
          <h1 className=" text-2xl text-center text-[#3a3a3a] font-bold mb-4 leading-snug font-siliguri">
            "EJobsIT" বাংলাদেশের সব থেকে জনপ্রিয় মোশন গ্রাফিক্স ইউটিউবার
            আহসানুল্লাহ শাওন স্যার দ্বারা প্রতিষ্ঠিত এবং পরিচালিত । আমাদের এখানে
            থাকছে প্রতিদিন দুইবেলা করে গুগল মিটে স্ক্রিন শেয়ারের মাধ্যমে লাইভ
            সাপোর্ট, রেকর্ডেড ভিডিও, ফ্রিল্যান্সিং এবং জব প্লেসমেন্ট সাপোর্ট ।
            <br />
          </h1>
        </div>
        {/* CEO */}
        <div className="text-center w-full rounded-lg lg:px-24 bg-gradient-to-r from-cyan-50 to-blue-50 font-montserrat py-10">
          <div className="flex justify-center ">
            <img className="w-40 " src={img} alt="Trainer" />
          </div>
          <div className="my-2">
            <h1 className="text-3xl font-bold  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
              Ahsanullah Shaon
            </h1>
            <p className="font-semibold">Founder and CEO, EJobsIT</p>
            <div className="flex items-center justify-center my-4">
              <Link
                to="https://www.youtube.com/@AhsanullahSHAON"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2 text-red-500 hover:text-blue-700 border rounded-full p-2 border-blue-500"
              >
                <FaYoutube size={24} />
              </Link>
              <Link
                to="https://www.facebook.com/@ahsanullahshaon1"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2 text-blue-500 hover:text-blue-700 border rounded-full p-2 border-blue-500"
              >
                <FaFacebookF size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetCeo;
