import React from "react";

interface ResponsiveVideoProps {
  url: string;
}

const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({ url }) => {
  return (
    <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-md shadow-md">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={url}
        title="Video Content"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default ResponsiveVideo;
