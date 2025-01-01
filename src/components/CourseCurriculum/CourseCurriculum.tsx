import { Box } from "lucide-react";

const CourseCurriculum = ({ curriculum }: { curriculum: string[] }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg  p-5 font-siliguri">
      <div>
        <h3 className="text-4xl font-semibold my-4 text-left bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
          কোর্স কারিকুলাম
        </h3>
      </div>
      <div className="flex items-start justify-start  text-[16px] font-siliguri">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 items-center justify-center">
          {curriculum?.map((curriculum: string) => (
            <li className="flex items-center  gap-2 mr-1">
              <Box className="size-4 text-orange-500 font-bold" />
              <p className="text-[#717172] font-bold">{curriculum}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseCurriculum;
