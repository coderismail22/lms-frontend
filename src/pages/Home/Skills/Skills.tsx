// import { motion } from "framer-motion";
// import { Card } from "@/components/ui/card";
// import { useInView } from "react-intersection-observer";

// // import { cn } from "shadcn/utils"; // for dynamic classNames
// const Skills = () => {
//   // Use useInView to detect when the section is in view
//   const { ref, inView } = useInView({
//     threshold: 0.2, // 20% of the section should be in view to trigger
//     triggerOnce: true, // Animation triggers only once
//   });

//   const skills = [
//     { name: "HTML", icon: "/svg-icons/html.svg" },
//     { name: "CSS", icon: "/svg-icons/css.svg" },
//     { name: "JavaScript", icon: "/svg-icons/js.svg" },
//     { name: "TypeScript", icon: "/svg-icons/ts.svg" },
//     { name: "Tailwind CSS", icon: "/svg-icons/tailwind.svg" },
//     { name: "Bootstrap", icon: "/svg-icons/bootstrap.svg" },
//     { name: "React JS", icon: "/svg-icons/react.svg" },
//     { name: "Next JS", icon: "/svg-icons/nextjs.svg" },
//     { name: "Redux", icon: "/svg-icons/redux.svg" },
//     { name: "Node JS", icon: "/svg-icons/nodejs.svg" },
//     { name: "Express JS", icon: "/svg-icons/express.svg" },
//     { name: "MongoDB", icon: "/svg-icons/mongodb.svg" },
//     { name: "Mongoose", icon: "/svg-icons/mongoose.svg" },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.2,
//         duration: 0.5,
//       },
//     },
//   };

//   const skillVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <section
//       ref={ref}
//       className="skills-section bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-8"
//     >
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"} // Trigger based on inView
//         className="text-center mb-12"
//       >
//         <h2 className="text-4xl font-bold mb-2 overline">My Skills</h2>
//       </motion.div>

//       {/* Motion Container */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"} // Trigger based on inView
//       >
//         {skills.map((skill, index) => (
//           <motion.div
//             key={index}
//             className="group"
//             variants={skillVariants}
//             // whileHover={{ scale: 1.1 }}
//             whileHover={{
//               boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
//               filter: "brightness(1.2)",
//             }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Card className="text-white h-20 flex items-center justify-center gap-3 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 text-center rounded-lg transition-transform duration-300 ease-in-out">
//               <div className="text-6xl mb-2">
//                 <img src={skill.icon} alt="Icon" className="size-10" />
//               </div>
//               <h3 className="text-xl font-semibold">{skill.name}</h3>
//             </Card>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// };

// export default Skills;
