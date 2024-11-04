// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import ServicePackages from "@/components/ServicePackages/ServicePackages";
// import Faq from "@/components/FAQ/Faq";
// import { Element } from "react-scroll";

// const Services = () => {
//   // Use the Intersection Observer hook
//   const { ref, inView } = useInView({
//     threshold: 0.2, // Trigger animation when 20% of the component is visible
//     triggerOnce: true, // The animation will trigger only once
//   });

//   // Define variants for the container animation
//   const containerVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.8,
//         ease: "easeInOut",
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref} // Attach the ref to trigger inView
//       variants={containerVariants}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"} // Animate only when in view
//       style={{
//         backgroundImage: "url(/service-bg.jpg)",
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 50 }} // Start state for child content
//         animate={inView ? { opacity: 1, y: 0 } : {}} // Animate when in view
//         transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
//       >
//         <ServicePackages />
//         <Element name="faq">
//           <Faq />
//         </Element>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Services;
