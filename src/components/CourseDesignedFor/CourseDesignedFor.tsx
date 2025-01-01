import img1 from "/icons/icon-1.png";
import img2 from "/icons/icon-2.png";
import img3 from "/icons/icon-3.png";
import img4 from "/icons/icon-4.png";
const CourseDesignedFor = () => {
  return (
    <div className="max-w-3xl mx-auto font-siliguri ">
      <h1 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-[#7a7679] ">
        এই কোর্স যাদের জন্য
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img1} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-xl mt-5 font-semibold text-center">
            ফ্রিল্যান্সিং এ আগ্রহী
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img2} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-xl mt-5 font-semibold text-center">
            চাকুরী প্রত্যাশী
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img3} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-xl mt-5 font-semibold text-center">
            ছাত্র-ছাত্রী
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img4} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-xl mt-5 font-semibold text-center">গৃহিণী</h1>
        </div>
      </div>
    </div>
  );
};

export default CourseDesignedFor;
