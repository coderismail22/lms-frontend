import Category from "@/components/Category/Category";
import Hero from "@/components/Hero/Hero";
import Numbers from "@/components/Numbers/Numbers";
import PopularCourses from "@/components/PopularCourses/PopularCourses";

const Home = () => {
  return (
    <div>
      <Hero />
      <Category />
      <Numbers />
      <PopularCourses />
    </div>
  );
};

export default Home;
