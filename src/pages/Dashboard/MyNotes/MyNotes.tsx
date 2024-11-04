import axios from "axios";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";
import NoteEditModal from "../NoteEditModal/NoteEditModal";
import moment from "moment";
import debounce from "lodash.debounce";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaImage, FaSearch } from "react-icons/fa";

export interface Note {
  _id: string;
  title: string;
  image: string;
  content: string;
  author: string;
  createdAt: string;
  category: string[];
}

const MyNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleNotes, setVisibleNotes] = useState(6);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [imgErrors, setImgErrors] = useState<{ [key: string]: boolean }>({});

  // Fetch notes from API
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/note"
      );
      const notes: Note[] = data?.data;
      setNotes(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Something went wrong while fetching the notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const loadMoreNotes = () => {
    setVisibleNotes((prevVisibleNotes) => prevVisibleNotes + 6);
  };

  const deleteNote = async (id: string) => {
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
          `https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/note/${id}`
        );
      }
      Swal.fire("Deleted!", "Your note has been deleted.", "success");
      fetchNotes();
    } catch (error) {
      Swal.fire("Error!", "Failed to delete note.", "error");
    }
  };

  const openEditModal = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleNoteUpdate = () => {
    fetchNotes();
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => setSearchQuery(query), 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleImageError = (id: string) => {
    setImgErrors((prevErrors) => ({
      ...prevErrors,
      [id]: true,
    }));
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    const noteDate = moment(note.createdAt);
    const matchesDateRange =
      (!startDate || noteDate.isSameOrAfter(moment(startDate))) &&
      (!endDate || noteDate.isSameOrBefore(moment(endDate)));

    return matchesSearch && matchesDateRange;
  });

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <RotatingLines
          visible={true}
          // height="46"
          width="46"
          // color="grey"
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
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search notes by title or content..."
            className="border px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative w-full md:w-auto">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border px-10 py-2 text-center rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholderText="Start Date"
              isClearable
            />
          </div>
          <div className="relative w-full md:w-auto">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="border text-center px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholderText="End Date"
              isClearable
            />
          </div>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-600 text-xl font-semibold mt-6">
          There&apos;s no note to show
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.slice(0, visibleNotes).map((note) => (
            <div
              key={note._id}
              className="p-4 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:border-gray-300 bg-white"
            >
              <div className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                {note.title}
              </div>

              <div>
                {imgErrors[note._id] ? (
                  <div className="my-2 w-full h-full flex flex-col items-center justify-center bg-gray-200 border border-dashed border-gray-400 rounded-lg shadow-md">
                    <FaImage className="size-8 md:size-10 lg:size-20 mt-10" />
                    <p className="text-2xl text-gray-500 text-center font-medium p-10">
                      Image Not Available
                    </p>
                  </div>
                ) : (
                  <img
                    className="w-full h-36 object-cover object-center rounded-lg shadow-md"
                    src={note.image}
                    alt="Note Cover Image"
                    onError={() => handleImageError(note._id)}
                  />
                )}
              </div>

              <p className="text-gray-500 text-sm mt-2">
                <span className="font-bold">Author:</span> {note.author}
              </p>
              <p className="text-gray-500 text-sm">
                <span className="font-bold">Published:</span>{" "}
                {moment(note.createdAt).format("YYYY-MM-DD")}
              </p>

              <hr className="my-4" />

              <div className="flex justify-center space-x-5">
                <MdDeleteOutline
                  className="text-red-500 hover:text-red-700 text-2xl cursor-pointer transition-all duration-200"
                  onClick={() => deleteNote(note._id)}
                />
                <MdEdit
                  className="text-blue-500 hover:text-blue-700 text-2xl cursor-pointer transition-all duration-200"
                  onClick={() => openEditModal(note)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {visibleNotes < filteredNotes.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreNotes}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}

      {isModalOpen && selectedNote && (
        <NoteEditModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          note={selectedNote}
          onUpdate={handleNoteUpdate}
        />
      )}
    </div>
  );
};

export default MyNotes;
