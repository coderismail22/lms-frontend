import AboutUs from "@/components/AboutUs/AboutUs";
import MeetCeo from "@/components/MeetCeo/MeetCeo";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ContactCards from "@/components/ContactCards/ContactCards";
import Map from "@/components/Map/Map";
import ContactForm from "../Contact/ContactForm/ContactForm";

const About = () => {
  // Animation variants
  const animationVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  // Hooks for each section
  const [contactSectionRef, contactSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div>
      {/* About Us Section */}
      <div>
        <AboutUs />
      </div>

      {/* Meet the CEO Section */}
      <div>
        <MeetCeo />
      </div>

      {/* Contact Section */}
      <div
        className="w-full h-full flex flex-col items-center justify-center py-20 bg-[#DBEBFE]"
        ref={contactSectionRef}
      >
        <motion.div
          className="w-[80%] mx-auto"
          variants={animationVariants}
          initial="hidden"
          animate={contactSectionInView ? "visible" : "hidden"}
        >
          {/* Form */}
          <ContactForm />

          {/* Cards */}
          <motion.div
            variants={animationVariants}
            initial="hidden"
            animate={contactSectionInView ? "visible" : "hidden"}
          >
            <ContactCards />
          </motion.div>

          {/* Map */}
          <motion.div
            variants={animationVariants}
            initial="hidden"
            animate={contactSectionInView ? "visible" : "hidden"}
          >
            <Map />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
