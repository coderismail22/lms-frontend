import { Box } from "lucide-react";

const CourseSoftwares = ({ softwares }: { softwares: string[] }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg  p-5 ">
      <div>
        <h3 className="text-4xl font-semibold my-8 text-left font-siliguri  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
          সফটওয়্যার সমূহ
        </h3>
      </div>
      <div className="flex items-start justify-start  text-[16px] font-siliguri">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 items-center justify-center">
          {softwares?.map((softwares: string) => (
            <li className="flex items-center  gap-2 mr-1">
              <Box className="size-4 text-orange-500 font-bold" />
              <p className="text-[#717172] font-bold">{softwares}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseSoftwares;
