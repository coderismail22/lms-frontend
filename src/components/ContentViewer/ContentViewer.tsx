import React from "react";

import { Lesson } from "@/types/course.type";

interface ContentViewerProps {
  lesson: Lesson | null;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ lesson }) => {
  if (!lesson) return <p>Select a lesson to view content</p>;

  return (
    <div className="w-[70%] p-4 bg-gray-100 rounded shadow-md h-full">
      <h3 className="font-semibold text-xl mb-2">{lesson.name}</h3>
      {lesson.type === "video" ? (
        <iframe
          width="100%"
          height="300px"
          src="https://www.youtube.com/embed/WZuRkn-LzvE"
          title="Maher Zain - Thank You Allah | Vocals Only (Lyrics)"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      ) : (
        <p>{lesson.content}</p>
      )}
    </div>
  );
};

export default ContentViewer;
