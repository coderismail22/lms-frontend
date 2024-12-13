import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ContactForm from "../ContactForm/ContactForm";
import ContactCards from "@/components/ContactCards/ContactCards";
import Map from "@/components/Map/Map";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Start animation when 20% of the component is in view
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
    <div
      className="w-full h-full flex flex-col items-center justify-center py-20"
      ref={ref}
    >
      <motion.div
        className=""
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
  );
};

export default Contact;
