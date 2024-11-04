import { useRef, useEffect, useState } from "react";

const VideoPlayer = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track if video is playing

  useEffect(() => {
    // Load the YouTube Iframe API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize the player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      const ytPlayer = new (window as any).YT.Player(iframeRef.current, {
        events: {
          onReady: (event: any) => setPlayer(event.target),
        },
      });
    };
  }, []);

  const handleContainerClick = () => {
    if (player) {
      if (player.getPlayerState() === 1) {
        // 1 = playing
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true); // Hide poster when video starts playing
      }
    }
  };

  return (
    <div
      className="w-[300px] h-[200px] md:w-[390px] md:h-[224px] rounded-2xl overflow-hidden border-blue-500 hover:border-stone-500 border-[5px] flex items-center justify-center relative cursor-pointer"
      onClick={handleContainerClick}
    >
      {/* Poster image */}
      {!isPlaying && (
        <img
          src="/poster-video.gif"
          alt="Video Poster"
          className="absolute top-0 left-0 w-[390px] h-[300px] object-cover z-10"
        />
      )}
      {/* YouTube Iframe */}
      <iframe
        ref={iframeRef}
        width="4"
        height="100"
        src="https://www.youtube.com/embed/SkggsBfJ7IQ?enablejsapi=1"
        title="portfolio-intro"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
