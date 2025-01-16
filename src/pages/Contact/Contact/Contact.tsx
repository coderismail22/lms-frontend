import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ContactForm from "../ContactForm/ContactForm";
import ContactCards from "@/components/ContactCards/ContactCards";
import Map from "@/components/Map/Map";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0, // Start animation when 20% of the component is in view
  });

  // Animation variants for the container
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

  return (
    <div>
      {/* Top Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-siliguri">
        {/* Header Section */}
        <section className="relative overflow-hidden py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">যোগাযোগ</h1>
          </div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 opacity-30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-600 opacity-40 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </section>
      </div>
      {/* Contents */}
      <div
        className="w-full h-full flex flex-col items-center justify-center py-20 bg-[#DBEBFE]"
        ref={ref}
      >
        <motion.div
          className="w-[80%] mx-auto"
          variants={animationVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Form */}
          <ContactForm />
          {/* Cards */}
          <ContactCards />
          {/* Map */}
          <Map />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
