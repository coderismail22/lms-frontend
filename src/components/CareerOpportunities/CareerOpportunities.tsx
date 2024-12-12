import img1 from "/icons/icon-5.png";
import img2 from "/icons/icon-6.png";

const CareerOpportunities = () => {
  return (
    <div className="max-w-3xl mx-auto font-montserrat flex flex-col items-center justify-center ">
      <h1 className="text-center font-semibold text-2xl md:text-3xl mb-5 text-[#7e787c]">
        Career Opportunities
      </h1>
      <div className="max-w-xl grid grid-cols-2 gap-1 ">
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img1} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-[12px] mt-5  text-center">
            You will be able to get a remote job in or outside our country after
            completing the course. Our career placement department will help you
            in this regard.
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center">
            <img src={img2} alt="image" className="h-full object-contain" />
          </div>
          <h1 className="text-[12px] mt-5  text-center">
            The number is increasing with time as more people are opting for an
            independent career with a good earning. The global marketplaces like
            Fiverr, Upwork, Legit offer loads of projects. You can also start a
            freelancing career being a skilled individual.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CareerOpportunities;
