// import Category from "@/components/Category/Category";
// import Numbers from "@/components/Numbers/Numbers";
// import PopularCourses from "@/components/PopularCourses/PopularCourses";
// import Testimonial from "@/components/Testimonial/Testimonial";
import { Helmet } from "react-helmet";
import HeroForGetWebsitePage from "./HeroForGetWebsitePage";
import WebsitesWeBuild from "./WebsitesWeBuild";

const GetYourWebsite = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>eJobsIT | Get Your Website</title>
      </Helmet>
      <HeroForGetWebsitePage />
      {/* <Category /> */}
      {/* <Numbers /> */}
      {/* <PopularCourses /> */}
      <WebsitesWeBuild />
      {/* <Testimonial /> */}
    </div>
  );
};

export default GetYourWebsite;
