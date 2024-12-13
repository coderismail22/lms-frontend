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
        <title>EJobsIT | Home</title>
      </Helmet>
      <Hero />
      <Category />
      <Numbers />
      <PopularCourses />
      <Testimonial />
    </div>
  );
};

export default Home;
