// import ProjectCard from "@/components/ProjectCard/ProjectCard";
// import { useEffect, useState } from "react";
// import { RotatingLines } from "react-loader-spinner";
// import axios from "axios";
// import { TProject } from "./projectsforhome.type";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// const ProjectsForHome = () => {
//   const [projects, setProjects] = useState<TProject[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(
//         "https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/project"
//       );
//       setProjects(data?.data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       setError("Something went wrong while fetching the blogs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // Loading Spinner
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <RotatingLines
//           visible={true}
//           width="46"
//           strokeWidth="5"
//           animationDuration="0.75"
//           ariaLabel="rotating-lines-loading"
//         />
//       </div>
//     );
//   }

//   // Error Message
//   if (error) {
//     return (
//       <p className="text-red-500 text-xl text-center font-bold py-10 border-2 border-red-500 rounded-md m-5">
//         {error}
//       </p>
//     );
//   }

//   // Define animation variants for the cards
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     hover: {
//       transition: { duration: 0.3, type: "spring" },
//     },
//   };
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

//   // A separate component for each Project card with its own useInView hook
//   const ProjectItem = ({ project }: { project: TProject }) => {
//     const { ref, inView } = useInView({
//       threshold: 0.2, // Trigger when 20% of the card is visible
//       triggerOnce: true, // Trigger the animation only once
//     });

//     return (
//       <motion.div
//         ref={ref} // Attach the ref to trigger inView
//         key={project?._id}
//         variants={cardVariants}
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"} // Animate only when in view
//         whileHover="hover"
//         className="overflow-hidden"
//       >
//         <ProjectCard project={project} key={project._id} />
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen">
//       <motion.div initial="hidden" animate="visible">
//         <h1 className="uppercase text-3xl lg:text-4xl text-center text-white font-bold my-8 overline">
//           Latest Projects
//         </h1>
//       </motion.div>
//       {projects.length === 0 ? (
//         <p className="text-center text-red-600 text-xl font-semibold mt-6 border p-10 mx-2">
//           There&apos;s nothing to show
//         </p>
//       ) : (
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch px-16 my-20 gap-2"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {projects.map((project) => (
//             <ProjectItem key={project?._id} project={project} />
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ProjectsForHome;
