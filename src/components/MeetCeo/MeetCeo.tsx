import { Link } from "react-router-dom";
import img from "/as.jpg";
import { FaFacebookF, FaYoutube } from "react-icons/fa6";

const MeetCeo = () => {
  return (
    <div className=" bg-gradient-to-r from-cyan-50 to-blue-50  hover:bg-gradient-to-l overflow-x-hidden  font-siliguri py-8 pb-24 w-full border">
      <div className="max-w-6xl mx-auto grid grid-cols-1   gap-10 items-center ">
        {/* Desc */}
        <div className="flex flex-col items-center w-full mx-auto rounded-lg lg:px-24 bg-gradient-to-r from-cyan-50 to-blue-50 font-montserrat p-10">
          <h1 className=" text-2xl text-center text-[#3a3a3a] font-semibold mb-4 leading-snug font-siliguri">
          eJobsIT হলো একটি আধুনিক আইটি ট্রেনিং একাডেমি যেখানে প্রযুক্তিগত দক্ষতা অর্জনের জন্য মানসম্পন্ন প্রশিক্ষণ প্রদান করা হয়। এখানে শিক্ষার্থীরা ওয়েব ডেভেলপমেন্ট, সফটওয়্যার ডেভেলপমেন্ট, গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিং, এবং নেটওয়ার্কিংসহ বিভিন্ন অত্যাধুনিক প্রযুক্তি সম্পর্কে জানতে পারে। অভিজ্ঞ প্রশিক্ষকদের তত্ত্বাবধানে ব্যবহারিক ও তাত্ত্বিক জ্ঞান প্রদান করা হয়। eJobsIT এর আধুনিক ল্যাব সুবিধা এবং আপডেটেড সিলেবাস শিক্ষার্থীদের বাস্তবজীবনের প্রজেক্টে কাজ করার প্রস্তুতি দেয়। আইটি সেক্টরে সফল ক্যারিয়ার গড়তে এবং ফ্রিল্যান্সিংয়ে এগিয়ে যেতে এই একাডেমি শিক্ষার্থীদের সঠিক দিকনির্দেশনা প্রদান করে। দক্ষতাভিত্তিক প্রশিক্ষণের মাধ্যমে eJobsIT একটি উজ্জ্বল ভবিষ্যৎ গড়ার সুযোগ তৈরি করে।
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
            <p className="font-semibold">Founder and CEO, eJobsIT</p>
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
