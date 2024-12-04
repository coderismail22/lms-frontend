import React from "react";

interface ResponsiveVideoProps {
  url: string;
}

const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({ url }) => {
  // Check if the URL is a YouTube "watch" URL and convert it to an embed URL
  const embedUrl = url.includes("youtube.com/watch?v=")
    ? url.replace(
        "https://www.youtube.com/watch?v=",
        "https://www.youtube.com/embed/"
      )
    : url; // If it's already an embed URL, keep it as is.

  return (
    <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-md shadow-md">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        // src={url}
        src={embedUrl}
        title="Video Content"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default ResponsiveVideo;
