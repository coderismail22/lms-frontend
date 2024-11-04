import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-blue-100 flex items-center p-5 overflow-hidden relative">
      <div className="flex-1 min-h-full min-w-full rounded-3xl bg-slate-500 shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
        <div className="w-full md:w-1/2">
          <div className="mb-10 md:mb-20 text-gray-600 font-light">
            <h1 className="font-black uppercase text-3xl lg:text-5xl text-yellow-500 mb-10">
              You seem to be lost!
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <IoMdArrowRoundBack />
            <Link
              to="/"
              className="text-lg font-bold outline-none focus:outline-none transform transition-all text-yellow-500 hover:text-yellow-600"
            >
              Go Back
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <img
            src="/not-found.jpg"
            className="w-full max-w-lg lg:max-w-full mx-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
