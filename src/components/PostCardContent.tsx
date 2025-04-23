
import { AspectRatio } from "@/components/ui/aspect-ratio";
import YouTubeEmbed from './YouTubeEmbed';
import { Card } from "@/components/ui/card";
import { Play, Pause, Youtube } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import {
  extractYouTubeIdFromText,
} from "@/utils/youtube";
import { Button } from "@/components/ui/button";

interface PostCardContentProps {
  content: string;
  hasImage?: boolean;
  imageUrl?: string;
  isVideo?: boolean;
}

const PostCardContent = ({
  content,
  hasImage = false,
  imageUrl,
  isVideo = false,
}: PostCardContentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const getYouTubeEmbedUrl = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return url;
  };
  const isYouTubeUrl = (url?: string): boolean => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };
  const getYouTubeVideoId = (url?: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlayClick = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);
    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, []);

  const youTubeVideoIdFromContent = extractYouTubeIdFromText(content);

  return (
    <>
      {content && <p className="mb-4 whitespace-pre-line break-words">{content}</p>}
      {youTubeVideoIdFromContent && (
        <div className="rounded-md overflow-hidden mb-2">
          <YouTubeEmbed videoId={youTubeVideoIdFromContent} />
        </div>
      )}
      {hasImage && imageUrl && isYouTubeUrl(imageUrl) && (
        <p className="mb-4 text-blue-600 break-words">{imageUrl}</p>
      )}
      {hasImage && imageUrl && (
        <div className="rounded-md overflow-hidden mb-2">
          {isVideo && isYouTubeUrl(imageUrl) ? (
            <Card className="border overflow-hidden">
              {!isPlaying ? (
                <div>
                  <AspectRatio ratio={16/9}>
                    <div className="w-full h-full relative">
                      <img 
                        src={`https://img.youtube.com/vi/${getYouTubeVideoId(imageUrl)}/maxresdefault.jpg`} 
                        alt="Miniatura de video de YouTube"
                        className="w-full h-full object-cover"
                      />
                      <button 
                        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer bg-black/20"
                        onClick={() => setIsPlaying(true)}
                      >
                        <div className="rounded-full bg-black/70 w-16 h-16 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" fill="white" />
                        </div>
                      </button>
                    </div>
                  </AspectRatio>
                  <div className="p-4 bg-white">
                    <div className="flex items-start">
                      <Youtube className="h-5 w-5 mr-3 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base">Video de YouTube</h3>
                        <p className="text-muted-foreground text-sm">Haz clic para reproducir este video</p>
                        <p className="text-blue-600 text-sm mt-1">{imageUrl}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <AspectRatio ratio={16/9}>
                    <iframe 
                      src={getYouTubeEmbedUrl(imageUrl)}
                      className="w-full h-full absolute inset-0 border-0"
                      allowFullScreen
                      title="Reproductor de video de YouTube"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </AspectRatio>
                </div>
              )}
            </Card>
          ) : isVideo ? (
            <div className="w-full relative bg-black rounded-md">
              <AspectRatio ratio={16/9}>
                <div className="absolute inset-0">
                  <video 
                    ref={videoRef}
                    src={imageUrl} 
                    className="w-full h-full object-cover" 
                    playsInline
                  />
                  {!isPlaying && (
                    <div className="absolute inset-0">
                      <div className="absolute top-4 left-4 text-white text-2xl font-bold tracking-tight">
                        <h3 className="text-4xl mb-2">Video</h3>
                        <p className="text-xl font-normal opacity-80">Haz clic para reproducir</p>
                      </div>
                      <button 
                        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
                        onClick={handlePlayClick}
                      >
                        <div className="rounded-full bg-black/70 w-16 h-16 flex items-center justify-center hover:bg-black/80 transition-colors">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </button>
                    </div>
                  )}
                  {isPlaying && (
                    <div className="absolute bottom-4 right-4">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full bg-black/70 border-0 hover:bg-black/80"
                        onClick={handlePlayClick}
                      >
                        <Pause className="h-5 w-5 text-white" />
                      </Button>
                    </div>
                  )}
                </div>
              </AspectRatio>
            </div>
          ) : (
            <img src={imageUrl} alt="Contenido del post" className="w-full object-cover rounded" />
          )}
        </div>
      )}
    </>
  )
}

export default PostCardContent;
