import Category from "@/components/Category/Category";
import Hero from "@/components/Hero/Hero";
import Numbers from "@/components/Numbers/Numbers";
import PopularCourses from "@/components/PopularCourses/PopularCourses";
import Testimonial from "@/components/Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Hero />
      <Category />
      <Numbers />
      <PopularCourses />
      <Testimonial />
    </div>
  );
};

export default Home;
