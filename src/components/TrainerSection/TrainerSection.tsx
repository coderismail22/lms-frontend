import img from "/as.jpg";
const TrainerSection = () => {
  return (
    <div className="text-center w-full rounded-lg lg:px-24 bg-gradient-to-r from-cyan-50 to-blue-50 font-montserrat py-10">
      <div className="flex justify-center ">
        <img className="w-40 " src={img} alt="Trainer" />
      </div>
      <div className="my-2">
        <p className="font-semibold">Instructor</p>
        <h1 className="text-3xl font-bold  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
          Ahsanullah Shaon
        </h1>
      </div>
    </div>
  );
};

export default TrainerSection;
