import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
import debounce from "lodash.debounce";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
// import { BsCalendar } from "react-icons/bs";
import { FaImage, FaSearch } from "react-icons/fa";
import { TNote } from "./note.type";

// Notes Component
const Notes = () => {
  // State with types
  const [notes, setNotes] = useState<TNote[]>([]); // Initialized as an empty array of notes
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [visibleNotes, setVisibleNotes] = useState<number>(6); // Initial 6 visible notes
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [imgErrors, setImgErrors] = useState<{ [key: string]: boolean }>({}); // Track image errors per note ID

  // Fetch Notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/note"
      );
      console.log(data);
      setNotes(data.data);
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

  // Load More Button Handler
  const loadMore = () => {
    setVisibleNotes((prevVisibleNotes) => prevVisibleNotes + 6); // Load 6 more notes
  };

  // Debounced Search Handler
  const debouncedSearch = useCallback(
    debounce((query: string) => setSearchQuery(query), 300), // Debouncing search input
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Filter Notes Based on Search Query and Date Range
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase());

    const noteDate = moment(note.createdAt);
    const matchesDateRange =
      (!startDate || noteDate.isSameOrAfter(moment(startDate))) &&
      (!endDate || noteDate.isSameOrBefore(moment(endDate)));

    return matchesSearch && matchesDateRange;
  });

  // Handle image load error
  const handleImageError = (id: string) => {
    setImgErrors((prevErrors) => ({
      ...prevErrors,
      [id]: true,
    }));
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <RotatingLines
          visible={true}
          width="46"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  // Error Message
  if (error) {
    return (
      <p className="text-red-500 text-xl text-center font-bold py-10 border-2 border-red-500 rounded-md m-5">
        {error}
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search notes by title or content..."
            className="border px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleSearchChange}
          />
        </div>

        {/* Date Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative w-full md:w-auto">
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border px-10 py-2 text-center rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholderText="Start Date"
              isClearable
            />
          </div>
          <div className="relative w-full md:w-auto">
            <DatePicker
              showIcon
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {filteredNotes.slice(0, visibleNotes).map((note) => (
            <div
              key={note._id}
              className="p-4 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:border-gray-300 bg-slate-300 "
            >
              {/* Title */}
              <div className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                {note.title}
              </div>
              {/* Image */}
              <div>
                {imgErrors[note._id] ? (
                  <div className="my-2 w-full h-36 flex flex-col items-center justify-center bg-gray-200 border border-dashed border-gray-400 rounded-lg shadow-md">
                    <FaImage className="size-8" />
                    <p className="text-xl text-gray-500 text-center font-medium">
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
              {/* Author */}
              <p className="text-gray-500 text-sm">
                <span className="font-bold">Author:</span> {note.author}
              </p>
              {/* Published */}
              <p className="text-gray-500 text-sm">
                <span className="font-bold">Published:</span>{" "}
                {moment(note.createdAt).format("YYYY-MM-DD")}
              </p>
              <Link
                to={`/note/${note._id}`}
                className="flex gap-2 items-center justify-center bg-black text-white p-3 mt-4 hover:bg-gray-800 transition-colors duration-300"
              >
                <button className="font-palanquin">Get Full Note</button>
                <FaArrowRightLong />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* More Notes Button */}
      {visibleNotes < filteredNotes.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            More Notes
          </button>
        </div>
      )}
    </div>
  );
};

export default Notes;
