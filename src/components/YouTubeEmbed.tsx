
import React from "react";

interface YouTubeEmbedProps {
  videoId: string;
  className?: string;
  title?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  className = "",
  title = "Reproductor de video de YouTube",
}) => (
  <div className={"w-full aspect-video bg-black rounded-md overflow-hidden " + className}>
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      className="w-full h-full rounded-md"
      allowFullScreen
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  </div>
);

export default YouTubeEmbed;
