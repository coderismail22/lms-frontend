import Category from "@/components/Category/Category";
import Hero from "@/components/Hero/Hero";
import Numbers from "@/components/Numbers/Numbers";
import PopularCourses from "@/components/PopularCourses/PopularCourses";
import Testimonial from "@/components/Testimonial/Testimonial";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>eJobsIT | Home</title>
      </Helmet>
      <Hero />
      <div className="bg-[#211B52">
        <Category />
      </div>
      <PopularCourses />
      <Numbers />
      <Testimonial />
    </div>
  );
};

export default Home;
