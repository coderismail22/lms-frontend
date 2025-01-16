import { Link, useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaRegClock } from "react-icons/fa6";

const SeminarCard = ({
  seminar,
}: {
  seminar: {
    _id: string;
    name: string;
    coverImage: string;
    category: string;
    startDate: string;
    location: string;
    trainers: [{ teacherName: string; profileImg: string }];
  };
}) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto font-siliguri">
      <div className="card card-compact  bg-base-100 shadow-xl h-full">
        <figure>
          <img src={seminar?.coverImage} alt="seminar" className="min-h-[200px] object-cover object-center"/>
        </figure>
        <div className="card-body">
          <button className="btn w-40 text-[#3a67ae]  btn-sm">
            <Link to={"/"}>{seminar?.category}</Link>
          </button>

          <h2 className="font-semibold text-[20px] text-white min-h-[50px] font-montserrat leading-snug">
            {seminar?.name}
          </h2>
          {/* Instructor */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 my-2 rounded-md  ">
            <div className="p1 border-r-2 border-gray-400 pr-4">
              <img
                className="size-6 object-cover object-left rounded-full"
                src={seminar?.trainers[0].profileImg}
                alt="trainer"
              />
            </div>
            <Link to="#">
              <p className="text-[#3a67ae] font-semibold text-[16px]">
                {seminar?.trainers[0].teacherName || "N/A"}
              </p>
            </Link>
          </div>
          <div className="flex justify-between  my-1">
            <div className="flex gap-2 items-center justify-center text-zinc-400">
              <FaCalendarCheck className="text-[17px] text-blue-400" />
              <p className="text-[15px] font-semibold">{seminar?.startDate}</p>
            </div>
            <div className="flex gap-2 items-center justify-center text-zinc-400">
              <FaRegClock className="text-[17px] text-blue-400" />
              <p className="flex justify-end text-[15px] font-semibold ">
                10 PM
                {/* TODO: add time */}
              </p>
            </div>
          </div>

          <div
            className="flex justify-between items-center "
            onClick={() => navigate(`/seminar/${seminar?._id}`)}
          >
            <div className="w-full mx-auto">
              <button className="btn text-white bg-gradient-to-r w-full font-semibold text-[16px] from-cyan-500 to-blue-500">
                Register For Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;
