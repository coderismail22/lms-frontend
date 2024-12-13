import img1 from "/icons/icon-1.png";
import img2 from "/icons/icon-2.png";
import img3 from "/icons/icon-3.png";
import img4 from "/icons/icon-4.png";
const CourseDesignedFor = () => {
  return (
    <div className="max-w-3xl mx-auto font-montserrat ">
      <h1 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-[#7a7679]">
        This Course is Designed for
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img1} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-xl mt-5 font-semibold text-center">
            For Freelancing
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img2} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-xl mt-5 font-semibold text-center">
            Job seekers
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img3} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-xl mt-5 font-semibold text-center">Students</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img4} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-xl mt-5 font-semibold text-center">Homemakers</h1>
        </div>
      </div>
    </div>
  );
};

export default CourseDesignedFor;
