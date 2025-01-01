import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const AdmissionGoingOn = () => {
  return (
    <div className="rounded-md  font-montserrat  bg-gradient-to-r from-cyan-50 to-blue-50  p-5 overflow-hidden">
      {/* Title and Description */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-center">
          Admission is Going On
        </h1>
        <p className="text-sm text-[#7a7679] max-w-md mx-auto text-center">
          Enroll now to any of our Offline (On- Campus) or Online (Live Class)
          courses as per your suitable time.
        </p>
      </div>

      <div className="flex flex-col md:flex-row lg:flex-col gap-2 justify-center items-center">
        {/* Online Course */}
        <div className="rounded-lg p-5  bg-slate-50 border w-full   xl:w-full">
          <h1 className="text-[15px] font-semibold ">Course Fee Offline</h1>
          <p className="text-xl font-semibold mb-2">BDT 50,000</p>
          <Link to="/courses">
            <Button className="w-32 h-12 bg-destructive hover:bg-red-400">
              Get Course
            </Button>
          </Link>
        </div>

        {/* Offline Course */}
        <div className="rounded-lg p-5  bg-slate-50 border w-full  xl:w-full">
          <h1 className="text-[15px] font-semibold ">Course Fee Online</h1>
          <p className="text-xl font-semibold mb-2">BDT 30,000</p>
          <Link to="/courses">
            <Button className="w-32 h-12 bg-destructive hover:bg-red-400">
              Get Course
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdmissionGoingOn;
