/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
import { FaSearch, FaImage } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProjectEditModal from "../ProjectEditModal/ProjectEditModal"; // Import ProjectEditModal

export interface Project {
  _id: string;
  title: string;
  technologies: string[];
  coverImage: string;
  description: string;
  duration: string;
  liveLink: string;
  githubLink: string;
  createdAt: string;
}

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [imgErrors, setImgErrors] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/project"
      );
      setProjects(data?.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Something went wrong while fetching the projects.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/project/${id}`
        );
        Swal.fire("Deleted!", "Your project has been deleted.", "success");
        fetchProjects();
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to delete project.", "error");
    }
  };

  const openEditModal = (project: Project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleImageError = (id: string) => {
    setImgErrors((prevErrors) => ({
      ...prevErrors,
      [id]: true,
    }));
  };

  const filteredProjects = projects
    .filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((project) => {
      const projectDate = new Date(project.createdAt);
      if (startDate && endDate) {
        return projectDate >= startDate && projectDate <= endDate;
      }
      return true;
    });

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <RotatingLines
          visible={true}
          // height="46"
          width="46"
          // color="gray"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-xl text-center font-bold py-10 border-2 border-red-500 rounded-md m-5">
        {error}
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects by title..."
            className="border px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleSearchChange}
          />
        </div>

        {/* Date filtering */}
        <div className="flex space-x-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date ?? undefined)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="From Date"
            className="border rounded px-4 py-2"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date ?? undefined)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="To Date"
            className="border rounded px-4 py-2"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-center text-gray-600 text-xl font-semibold mt-6">
          No projects to show
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="p-4 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:border-gray-300 bg-white"
            >
              {/* Title */}
              <div className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                {project.title}
              </div>
              {/* Title */}
              <div className="text-sm font-semibold text-gray-800 mb-3">
                {project.description}
              </div>

              <div>
                {imgErrors[project._id] ? (
                  <div className="my-2 w-full h-full flex flex-col items-center justify-center bg-gray-200 border border-dashed border-gray-400 rounded-lg shadow-md">
                    <FaImage className="size-8 md:size-10 lg:size-20 mt-10" />
                    <p className="text-2xl text-gray-500 text-center font-medium p-10">
                      Image Not Available
                    </p>
                  </div>
                ) : (
                  <img
                    className="w-full h-36 object-cover object-center rounded-lg shadow-md"
                    src={project.coverImage}
                    alt="Project Cover"
                    onError={() => handleImageError(project._id)}
                  />
                )}
              </div>

              <p className="text-gray-500 text-sm mt-2">
                <span className="font-bold">Duration:</span> {project.duration}
              </p>

              <p className="text-gray-500 text-sm">
                <span className="font-bold">Published:</span>{" "}
                {moment(project.createdAt).format("YYYY-MM-DD")}
              </p>

              <hr className="my-4" />

              <div className="flex justify-center space-x-5">
                <MdDeleteOutline
                  className="text-red-500 hover:text-red-700 text-2xl cursor-pointer transition-all duration-200"
                  onClick={() => deleteProject(project._id)}
                />
                <MdEdit
                  className="text-blue-500 hover:text-blue-700 text-2xl cursor-pointer transition-all duration-200"
                  onClick={() => openEditModal(project)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {currentProject && (
        <ProjectEditModal
          isOpen={isModalOpen}
          onClose={closeModal}
          project={currentProject}
          onUpdate={fetchProjects} // Pass down fetchProjects to update projects after edit
        />
      )}
    </div>
  );
};

export default MyProjects;
