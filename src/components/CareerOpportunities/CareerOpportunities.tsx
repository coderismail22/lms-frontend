import img1 from "/icons/icon-5.png";
import img2 from "/icons/icon-6.png";

const CareerOpportunities = () => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center font-siliguri mt-16">
      <h1 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-[#7e787c]">
        ক্যারিয়ার ক্ষেত্র
      </h1>
      <div className="max-w-xl grid grid-cols-2 gap-1 ">
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img1} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-[12px] mt-5  text-center">
          কোর্সটি শেষ করার পর আপনি আমাদের দেশে বা বাইরে একটি দূরবর্তী চাকরি পেতে সক্ষম হবেন। আমাদের ক্যারিয়ার প্লেসমেন্ট বিভাগ আপনাকে এই বিষয়ে সাহায্য করবে।

          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img2} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-[12px] mt-5  text-center">
          সংখ্যাটি সময়ের সাথে সাথে বাড়ছে কারণ আরও বেশি লোক ভাল উপার্জনের সাথে একটি স্বাধীন ক্যারিয়ার বেছে নিচ্ছে। ফাইভার, আপওয়ার্ক, লিজিটের মতো বিশ্বব্যাপী মার্কেটপ্লেসগুলি প্রচুর প্রজেক্ট অফার করে। আপনি একজন দক্ষ ব্যক্তি হয়েও একটি ফ্রিল্যান্সিং ক্যারিয়ার শুরু করতে পারেন।

          </h1>
        </div>
      </div>
    </div>
  );
};

export default CareerOpportunities;
