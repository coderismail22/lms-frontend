const CourseOverview = ({ overview }: { overview: string }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg  p-5 ">
      <div>
        <h3 className="text-4xl font-semibold my-8 text-left font-siliguri  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
          কোর্স সম্পর্কে
        </h3>
      </div>
      <h1>{overview}</h1>
    </div>
  );
};

export default CourseOverview;
