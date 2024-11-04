/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import MdEditor from "react-markdown-editor-lite"; // Ensure you have this library installed
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import Swal from "sweetalert2";
import ImageUpload from "../ImageUpload/ImageUpload";

const NoteEditModal = ({ isOpen, onClose, note, onUpdate }: any) => {
  const [title, setTitle] = useState(note.title || "");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(note.title || "");
  const [markdownContent, setMarkdownContent] = useState(note.body || "");

  useEffect(() => {
    setTitle(note.title || "");
    setMarkdownContent(note.body || "");
  }, [note]);

  const handleEditorChange = ({ text }: any) => {
    setMarkdownContent(text); // Update markdown content
  };

  const handleUpdate = async () => {
    const updatedNoteData = {
      title,
      image: uploadedImageUrl,
      body: markdownContent,
    };

    try {
      // Replace with your server URL
      await axios.patch(
        `https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/note/${note._id}`,
        updatedNoteData
      );
      Swal.fire("Success!", "Note updated successfully.", "success");
      onUpdate(); // Notify parent of the update
      onClose(); // Close the modal
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Failed to update note.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Image Upload Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload Cover Image
          </label>
          <ImageUpload setUploadedImageUrl={setUploadedImageUrl} />
          {uploadedImageUrl === "" && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Markdown Editor */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <MdEditor
            className="bg-gray-900"
            value={markdownContent}
            style={{ height: "500px" }}
            renderHTML={(text) => (
              <ReactMarkdown
                children={text}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              />
            )}
            onChange={handleEditorChange}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditModal;
