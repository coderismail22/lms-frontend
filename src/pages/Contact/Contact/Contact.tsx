import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ContactForm from "../ContactForm/ContactForm";

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
        className="w-full max-w-2xl"
        variants={animationVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <ContactForm />
      </motion.div>
    </div>
  );
};

export default Contact;
