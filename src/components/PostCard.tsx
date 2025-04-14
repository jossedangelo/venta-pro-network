
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, Share2, Award, Play, Pause, MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PostCardProps {
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  hasImage?: boolean;
  imageUrl?: string;
  isVideo?: boolean;
  onDelete?: () => void;
  isCurrentUser?: boolean;
}

const PostCard = ({ 
  author, 
  content, 
  timestamp, 
  likes, 
  comments, 
  hasImage = false,
  imageUrl,
  isVideo = false,
  onDelete,
  isCurrentUser = true // For demo purposes, defaulting to true
}: PostCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const getYouTubeEmbedUrl = (url: string): string => {
    // Extract YouTube video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0`;
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

  return (
    <Card className="mb-4 shadow-light hover:shadow-medium transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
            <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <Link to="/perfil" className="font-semibold hover:underline">{author.name}</Link>
            <p className="text-sm text-muted-foreground">{author.role}</p>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        
        {isCurrentUser && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="pt-2">
        <p className="mb-4">{content}</p>
        {hasImage && imageUrl && (
          <div className="rounded-md overflow-hidden mb-2" ref={containerRef}>
            {isVideo && isYouTubeUrl(imageUrl) ? (
              <div className="w-full relative bg-black rounded-md">
                {!isPlaying ? (
                  <div className="relative">
                    <AspectRatio ratio={16/9}>
                      <div className="w-full h-full relative">
                        <img 
                          src={`https://img.youtube.com/vi/${getYouTubeVideoId(imageUrl)}/maxresdefault.jpg`} 
                          alt="YouTube video thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40">
                          <div className="absolute top-4 left-4 text-white text-2xl font-bold tracking-tight z-10">
                            <h3 className="text-4xl mb-2">Video de YouTube</h3>
                            <p className="text-xl font-normal opacity-80">Haz clic para reproducir este video</p>
                          </div>
                        </div>
                        <button 
                          className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer z-20"
                          onClick={() => setIsPlaying(true)}
                        >
                          <div className="rounded-full bg-black/70 w-16 h-16 flex items-center justify-center hover:bg-black/80 transition-colors">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </button>
                      </div>
                    </AspectRatio>
                    <p className="py-2 px-3 text-sm text-blue-600 overflow-hidden whitespace-nowrap text-ellipsis">
                      {imageUrl}
                    </p>
                  </div>
                ) : (
                  <div>
                    <AspectRatio ratio={16/9}>
                      <iframe 
                        src={`${getYouTubeEmbedUrl(imageUrl)}&autoplay=1`}
                        className="w-full h-full absolute inset-0 border-0"
                        allowFullScreen
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </AspectRatio>
                    <p className="py-2 px-3 text-sm text-blue-600 overflow-hidden whitespace-nowrap text-ellipsis">
                      {imageUrl}
                    </p>
                  </div>
                )}
              </div>
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
              <img src={imageUrl} alt="Post content" className="w-full object-cover rounded" />
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="ghost" size="sm" className="flex gap-1">
          <ThumbsUp className="h-4 w-4" />
          <span>{likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-1">
          <Award className="h-4 w-4" />
          <span>Reconocer</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-1">
          <Share2 className="h-4 w-4" />
          <span>Compartir</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
