import icon1 from "/icons/icon-7.png";
import icon2 from "/icons/icon-8.png";
import icon3 from "/icons/icon-9.png";
import icon5 from "/icons/icon-11.png";
import icon6 from "/icons/icon-12.png";
import icon7 from "/icons/icon-13.png";

// Features
const features = [
  {
    icon: icon1,
    title: "Online Live Batch",
    description:
      "Do you live abroad or prefer a remote learning process? We have launched online batches with all the offline facilities so that you can keep up with the technical advancement of today's world. Now you can enroll in any course from anywhere, at any time.",
  },
  {
    icon: icon2,
    title: "Review Class",
    description:
      "Do you face difficulty when you review the previous concepts? To ensure the best learning outcome, we arrange review classes that help our students overcome any problem in their skill development process. You will be able to understand the topics that you find complex under the close supervision of our skilled mentors.",
  },
  {
    icon: icon3,
    title: "Lifetime Support",
    description:
      "Do you live abroad or prefer a remote learning process? We have launched online batches with all the offline facilities so that you can keep up with the technical advancement of today's world. Now you can enroll in any course from anywhere, at any time.",
  },
  {
    icon: icon5,
    title: "Class Videos",
    description:
      "No need to worry if you miss a topic in the class. We record most of our classes so that students who miss a session can still get the information they need. They can watch the videos again and again until they understand the topic thoroughly. Our motto is to provide you with a flexible learning experience to gradually improve your competence.",
  },
  {
    icon: icon6,
    title: "Career Placement Support",
    description:
      "Our career placement department is ready to help you find a lucrative job. We ensure your resume gets into the hands of the right hiring manager.",
  },
  {
    icon: icon7,
    title: "Virtual Internship",
    description:
      "The online internships qualify to be as effective as offline work experience. So, you can also complete your internship under us online.",
  },
];
const ExclusiveSolutions = () => {
  return (
    <div className="rounded-lg  py-5  px-2 w-full h-full ">
      <div>
        <h3 className="text-4xl font-semibold my-8 text-center font-siliguri  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
          Exclusive Solutions That Set Us Apart
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 font-montserrat">
        {/* Feature Cards */}
        {features?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col h-full gap-5 w-full bg-gradient-to-r from-cyan-50 to-blue-50  p-5"
          >
            {/* Icon */}
            <div className="flex justify-center">
              <img src={feature.icon} alt="icon" className="max-h-12" />
            </div>
            {/* Title */}
            <div className="text-center">
              <h1 className="font-md font-bold">{feature.title}</h1>
            </div>
            {/* Description */}
            <div className="flex-grow">
              <p className="text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveSolutions;
