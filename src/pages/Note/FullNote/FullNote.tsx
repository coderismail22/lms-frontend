/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import { TNote } from "../Notes/note.type";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/agate.css"; // For code block styling
import "github-markdown-css/github-markdown.css"; // For markdown-body styling
import html2pdf from "html2pdf.js";
import { MdDownloadForOffline } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const FullNote = () => {
  const { id } = useParams<{ id: string }>(); // Get the note ID from the URL
  const [note, setNote] = useState<TNote | null>(null); // TNote or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const pdfRef = useRef<HTMLDivElement | null>(null); // Reference to the markdown content

  const handleDownloadRequest = () => {
    // Show the modal first
    MySwal.fire({
      title: "Please Subscribe and Follow 😍",
      icon: "info",
      html: `
      <div style="display: flex; justify-content: center; gap: 20px; align-items: center; flex-wrap: wrap;">
        <a href="https://www.youtube.com/channel/YOUR_CHANNEL" target="_blank" 
           style="text-decoration: none;">
          <div style="display: flex; flex-direction: column; align-items: center; font-size: 18px; color: #ff0000;">
            <svg style="width: 40px; height: 40px; fill: currentColor;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.615 3.184C18.454 3 12 3 12 3s-6.454 0-7.615.184C2.776 3.383 2 4.296 2 6.027v11.946c0 1.73.776 2.644 2.385 2.843C5.546 21 12 21 12 21s6.454 0 7.615-.184C21.224 20.617 22 19.703 22 17.973V6.027c0-1.73-.776-2.644-2.385-2.843zM9.829 16.059v-8.12l6.41 4.08-6.41 4.04z"></path></svg>
            YouTube
          </div>
        </a>
        <a href="https://www.facebook.com/YOUR_PAGE" target="_blank" 
           style="text-decoration: none;">
          <div style="display: flex; flex-direction: column; align-items: center; font-size: 18px; color: #1877f2;">
            <svg style="width: 40px; height: 40px; fill: currentColor;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.042C6.477 2.042 2 6.519 2 12.042 2 16.991 5.657 21.019 10.438 21.96v-6.826h-3.149V12.04h3.149V9.69c0-3.117 1.9-4.833 4.672-4.833 1.328 0 2.468.098 2.798.143v3.245h-1.919c-1.509 0-1.803.718-1.803 1.769v2.317h3.601l-.469 3.094H15.21V21.96C19.991 21.02 23.648 16.991 23.648 12.042c0-5.522-4.478-10-10-10z"></path></svg>
            Facebook
          </div>
        </a>
        <a href="https://twitter.com/YOUR_HANDLE" target="_blank" 
           style="text-decoration: none;">
          <div style="display: flex; flex-direction: column; align-items: center; font-size: 18px; color: #1da1f2;">
            <svg style="width: 40px; height: 40px; fill: currentColor;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.723 9.846 9.846 0 01-3.127 1.195A4.921 4.921 0 0016.616 3c-2.722 0-4.927 2.206-4.927 4.927 0 .386.044.762.127 1.124-4.096-.206-7.728-2.17-10.158-5.152a4.916 4.916 0 00-.666 2.478c0 1.71.87 3.217 2.191 4.1A4.904 4.904 0 01.96 9.44v.062c0 2.388 1.698 4.379 3.95 4.83a4.93 4.93 0 01-2.224.085 4.927 4.927 0 004.6 3.42 9.866 9.866 0 01-6.102 2.104c-.397 0-.787-.023-1.175-.068a13.935 13.935 0 007.547 2.211c9.055 0 14.01-7.506 14.01-14.01 0-.213-.005-.426-.014-.637A10.025 10.025 0 0024 4.557z"></path></svg>
            Twitter
          </div>
        </a>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Download PDF",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with the file download after the modal
        downloadPdf();
      }
    });
  };

  const fetchNoteDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/note/${id}`
      ); // Fetch note by ID
      setNote(data.data); // Access data properly from the response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching note detail:", error);
      setError("Something went wrong while fetching the note.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchNoteDetail();
  }, [id]); // Fetch the note when component mounts

  const downloadPdf = async () => {
    const element = pdfRef.current;
    if (!element) return;

    // Set options for HTML2PDF
    const options = {
      margin: [10, 10, 10, 10],
      filename: `${note?.title || "note"}.pdf`,
      image: { type: "jpeg", quality: 1 }, // Ensure high quality image
      html2canvas: {
        scale: 2, // For better resolution
        useCORS: true, // Enable cross-origin resource sharing for images
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      // Wait for images to load
      const images = element.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (!img.complete) {
            return new Promise<void>((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = () => reject();
            });
          }
          return Promise.resolve();
        })
      );

      // Generate PDF
      html2pdf().from(element).set(options).save();
    } catch (error) {
      console.error("Error while generating PDF:", error);
    }
  };

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

  // Error Message
  if (error) {
    return (
      <p className="text-red-500 text-xl text-center font-bold py-10 border-2 border-red-500 rounded-md m-5">
        {error}
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {note ? (
        <div
          key={note._id}
          className="p-4 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:border-gray-300 bg-[#2D2E2F]"
        >
          {/* Full Note Markdown Preview */}
          <div
            ref={pdfRef}
            className="markdown-body markdown-preview border p-4 mb-4 rounded shadow bg-slate-200"
          >
            {/* Cover Image */}
            {note.image && !imgError && (
              <img
                id="cover-image"
                src={note.image}
                alt="Note Cover"
                className="w-full h-80 object-cover object-center"
                onError={() => setImgError(true)} // Set imgError to true if image fails to load
              />
            )}

            {/* Title, Author, and Date */}
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {note.title}
            </h1>
            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                marginBottom: "10px",
              }}
            >
              <strong>Author:</strong> {note.author}
            </p>
            <p style={{ fontSize: "14px", marginBottom: "20px" }}>
              <strong>Published:</strong>{" "}
              {moment(note.createdAt).format("YYYY-MM-DD")}
            </p>

            {/* Markdown Content */}
            <ReactMarkdown
              children={note.body}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                ul: ({ children }) => (
                  <ul className="list-disc pl-6">{children}</ul>
                ), // Ensures bullet points show up
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6">{children}</ol>
                ), // For ordered lists
              }}
            />
          </div>

          {/* Download PDF Button */}
          <div className="flex flex-col justify-center items-center my-10">
            <button
              onClick={handleDownloadRequest}
              // className={`${
              //   canDownload
              //     ? "bg-blue-500 hover:bg-blue-600"
              //     : "bg-gray-400 cursor-not-allowed"
              // } text-white font-semibold py-2 px-4 rounded`}
              // disabled={!canDownload}
              className="flex gap-2 items-center justify-center rounded-lg border border-blue-400 shadow-md bg-blue-700 hover:bg-blue-600 text-white font-bold p-3 mt-4 text-lg  transition-colors duration-300"
            >
              Download PDF
              <MdDownloadForOffline className="animate-bounce size-5" />
            </button>
          </div>
        </div>
      ) : (
        <p>Note not found.</p>
      )}
    </div>
  );
};

export default FullNote;
