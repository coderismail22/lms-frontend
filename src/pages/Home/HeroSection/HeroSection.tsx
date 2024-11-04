import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { GrDocumentPdf } from "react-icons/gr";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  // Using Intersection Observer to trigger animations
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // Trigger when 20% of the section is visible
  });

  // Animation variants
  const textVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.5, ease: "easeOut" },
    },
  };

  const videoVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section
      className="h-screen flex items-center justify-center px-2 md:px-8"
      ref={ref} // Ref for triggering animations
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 ">
        {/* Hero Text */}
        <motion.div
          className="order-2 md:order-1 text-center items-center justify-center space-y-4"
          variants={textVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-400">
            Hi, It's Ismail
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            <span>I am a </span>
            <span className="text-blue-400 font-semibold">
              <Typewriter
                words={[
                  "Passionate",
                  "MERN Stack Developer",
                  "UI/UX Enthusiast",
                  "Content Creator",
                ]}
                loop={false} // Set true to repeat the animation
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </p>
          <motion.div
            variants={buttonVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <a
              href="#"
              className="animate-bounce flex gap-2 items-center justify-center px-2 py-3 w-1/2 mx-auto mt-4 text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 transition-all duration-1000"
            >
              My Resume
              <GrDocumentPdf />
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Image / Video */}
        <motion.div
          className="order-1 md:order-2 flex flex-col items-center justify-center px-5 mt-5 md:mt-0 "
          variants={videoVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <VideoPlayer />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
