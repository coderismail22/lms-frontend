import icon1 from "/icons/icon-7.png";
import icon2 from "/icons/icon-8.png";
import icon3 from "/icons/icon-9.png";
import icon5 from "/icons/icon-11.png";
import icon6 from "/icons/icon-12.png";
import icon7 from "/icons/icon-13.png";

// Features
const features = [
  {
    icon: icon1,
    title: "Online Live Batch",
    description:
      "আমরা সমস্ত অফলাইন সুবিধা সহ অনলাইন ব্যাচ চালু করেছি যাতে আপনি আজকের বিশ্বের প্রযুক্তিগত অগ্রগতির সাথে তাল মিলিয়ে চলতে পারেন। এখন আপনি যেকোন কোর্সে যেকোন জায়গা থেকে যেকোন সময় ভর্তি হতে পারবেন।",
  },
  {
    icon: icon2,
    title: "Review Class",
    description:
      "অনেক সময় শিক্ষার্থীরা ক্লাসে কিছু টপিক বুঝতে পারেন না,তাদের জন্য রয়েছে ক্লাস ভিডিও এর সুবিধা। তাই এখন শিক্ষার্থীরা ক্লাস করতে পারেন নিশ্চিন্তে। যেকোন অসুবিধায় ভিডিও দেখে আপনি নিজেই যেকোন সমস্যার সমাধান করতে পারবেন।",
  },
  {
    icon: icon3,
    title: "Lifetime Support",
    description:
      "ট্রেনিং শেষ হলেও আপনার সঙ্গে সম্পর্ক কিন্তু এখানেই শেষ নয়। eJobsIT শিক্ষার্থী হিসেবে আপনি পাচ্ছেন লাইফ-টাইম সাপোর্ট। অনলাইনে ২৪/৭ সাপোর্ট পাচ্ছেন যেকোনো সময়। আমাদের বিষয় ভিত্তিক অভিজ্ঞ টিম অফলাইন বা অনলাইনে এই সাপোর্ট নিশ্চিত করে থাকেন।",
  },
  {
    icon: icon5,
    title: "Class Videos",
    description:
      "এখন শিক্ষার্থীরা ক্লাস করতে পারেন নিশ্চিন্তে। যেকোন অসুবিধায় ভিডিও দেখে আপনি নিজেই যেকোন সমস্যার সমাধান করতে পারবেন।",
  },
  {
    icon: icon6,
    title: "Career Placement Support",
    description:
      "শিক্ষার্থীদের যোগ্যতা অনুযায়ী সঠিক জায়গায় সিভি পৌঁছাতে কাজ করে থাকে ক্যারিয়ার প্লেসমেন্ট ডিপার্টমেন্ট। এখান থেকে আপনি পাবেন কোর্স পরবর্তী গ্রুমিং এবং ক্যারিয়ার গাইডলাইন বিষয়ক বিভিন্ন সেমিনার। যা ক্যারিয়ার দৌড়ে অন্য যে কারও থেকে আপনাকে এগিয়ে রাখবে অনেকখানি।",
  },
  {
    icon: icon7,
    title: "ভার্চুয়াল ইন্টার্নশিপ",
    description:
      "eJobsIT ইনস্টিটিউটে শিক্ষার্থীদের জন্য রয়েছে ইন্টার্নশিপের সুযোগ। ভার্চুয়াল হলেও এখানে বাস্তব অফিসের অভিজ্ঞতা অর্জনের জায়গা রয়েছে। তাই কোর্স শেষ করে আপনি ঘরে বসে ইন্ডাস্ট্রি এক্সপার্টের সাথে কাজ করার সুযোগ পাবেন ভার্চুয়াল ইন্টার্নশিপের মাধ্যমে। তাছাড়া অফিস ওয়ার্কের সুবিধাও থাকছে।",
  },
];
const ExclusiveSolutions = () => {
  return (
    <div className="rounded-lg  py-5  px-2 w-full h-full  font-siliguri">
      <div>
        <h3 className="text-4xl font-semibold my-8 text-center   bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
          Exclusive Solutions That Set Us Apart
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 ">
        {/* Feature Cards */}
        {features?.map((feature, index) => (
          <div
            key={index}
            className="rounded-md flex flex-col h-full gap-5 w-full bg-gradient-to-r from-cyan-50 to-blue-50  p-5"
          >
            {/* Icon */}
            <div className="flex justify-center">
              <img src={feature.icon} alt="icon" className="max-h-12" />
            </div>
            {/* Title */}
            <div className="text-center">
              <h1 className="font-md font-bold">{feature.title}</h1>
            </div>
            {/* Description */}
            <div className="flex-grow">
              <p className="text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveSolutions;
