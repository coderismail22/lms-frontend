
const CourseCurriculum = ({ curriculum }: { curriculum: string[] }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg  w-full h-full p-5 font-siliguri">
      <div>
        <h3 className="text-4xl font-semibold my-8 text-center bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
          কোর্স কারিকুলাম
        </h3>
      </div>
      <div className="flex items-center justify-center  text-[20px] ">
        <ul className="grid grid-cols-1  gap-5 ">
          {curriculum?.map((curriculum: string) => (
            <li className="flex items-center  gap-3 mr-1">
              <p className="text-[#717172] ">{curriculum}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseCurriculum;
