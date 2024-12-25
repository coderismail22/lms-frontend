import { Box } from "lucide-react";

const CourseSoftwares = ({ softwares }: { softwares: string[] }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg  py-5  px-2 w-full h-full">
      <div>
        <h3 className="text-4xl font-semibold my-8 text-center font-siliguri  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
          সফটওয়্যার সমূহ
        </h3>
      </div>
      <div className="flex items-center justify-center  text-[16px] font-montserrat">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center justify-center">
          {softwares?.map((softwares: string) => (
            <li className="flex items-center  gap-3 mr-1">
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
