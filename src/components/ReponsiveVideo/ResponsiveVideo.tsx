import React from "react";

interface ResponsiveVideoProps {
  url: string;
}

const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({ url }) => {
  // Extract video ID from YouTube "watch" URL
  const extractVideoId = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.*\/|(?:v|e(?:mbed)?)\/|\S+?[?&]v=))([A-Za-z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  // Check if the URL is a YouTube "watch" URL and convert it to an embed URL
  const videoId = extractVideoId(url);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}${
        url.includes("?") ? url.substring(url.indexOf("?")) : ""
      }`
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
