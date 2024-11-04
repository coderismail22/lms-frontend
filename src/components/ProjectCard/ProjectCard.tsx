// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import { TProject } from "@/pages/Home/ProjectsForHome/projectsforhome.type";
// import { Link } from "react-router-dom";
// import { Badge } from "../ui/badge";
// import { FaGithub, FaImage } from "react-icons/fa";
// import { VscVmRunning } from "react-icons/vsc";
// import { useState } from "react";

// interface ProjectCardProps {
//   project: TProject;
// }

// const ProjectCard = ({ project }: ProjectCardProps) => {
//   const {
//     coverImage,
//     title,
//     description,
//     liveLink,
//     githubLink,
//     technologies,
//     duration,
//   } = project;

//   // State to track image load error
//   const [imgError, setImgError] = useState(false);

//   // Fallback function when the image fails to load
//   const handleImageError = () => {
//     setImgError(true);
//   };
//   return (
//     <Card className="bg-slate-300 flex flex-col justify-between h-full">
//       <CardHeader>
//         <CardTitle className="text-2xl text-black font-semibold">
//           {title}
//         </CardTitle>
//         <CardDescription className="text-black">{description}</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-grow">
//         {/* Cover image with fallback */}
//         <Link target="_blank" to={liveLink}>
//           <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
//             {imgError ? (
//               <div className="my-2 w-full h-28 flex flex-col items-center justify-center bg-gray-200 border border-dashed border-gray-400 rounded-lg shadow-md">
//                 <FaImage className="size-8" />
//                 <p className="text-xl text-gray-500 text-center font-medium">
//                   Image Not Available
//                 </p>
//               </div>
//             ) : (
//               <img
//                 src={coverImage}
//                 alt="Cover Image"
//                 className="object-cover w-full h-full"
//                 onError={handleImageError} // Handle image error
//               />
//             )}
//           </div>
//         </Link>
//         {/* Technologies */}
//         <div className="grid md:grid-cols-2 mt-2">
//           {technologies.map((technology) => (
//             <Badge
//               key={technology} // Make sure to add a key here
//               variant="outline"
//               className="m-1 font-semibold text-black bg-slate-100 hover:bg-slate-200 flex flex-col justify-center"
//             >
//               {technology}
//             </Badge>
//           ))}
//         </div>
//         {/* Duration */}
//         <Badge
//           variant="destructive"
//           className="m-1 font-semibold flex flex-col justify-center w-full"
//         >
//           Duration: {duration}
//         </Badge>
//       </CardContent>
//       <CardFooter className="flex flex-col">
//         <div className="flex gap-5 items-center">
//           <Button variant="outline" className="bg-slate-400 w-full">
//             <Link
//               className="font-bold flex gap-2 items-center justify-center"
//               target="_blank"
//               to={liveLink}
//             >
//               Live App
//               <VscVmRunning />
//             </Link>
//           </Button>
//           <Button variant="outline" className="bg-slate-400 w-full">
//             <Link
//               className="font-bold flex gap-2 items-center justify-center"
//               target="_blank"
//               to={githubLink}
//             >
//               GitHub
//               <FaGithub />
//             </Link>
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ProjectCard;
