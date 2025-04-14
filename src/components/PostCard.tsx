
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, Share2, Award, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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
}

const PostCard = ({ 
  author, 
  content, 
  timestamp, 
  likes, 
  comments, 
  hasImage = false,
  imageUrl,
  isVideo = false
}: PostCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  const handlePlayClick = () => {
    if (!videoElement) return;
    
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    
    setIsPlaying(!isPlaying);
  };

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

  return (
    <Card className="mb-4 shadow-light hover:shadow-medium transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
        <Avatar>
          <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
          <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <Link to="/perfil" className="font-semibold hover:underline">{author.name}</Link>
          <p className="text-sm text-muted-foreground">{author.role}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="mb-4">{content}</p>
        {hasImage && imageUrl && (
          <div className="rounded-md overflow-hidden mb-2">
            <div className="relative">
              {isVideo && isYouTubeUrl(imageUrl) ? (
                <iframe 
                  src={getYouTubeEmbedUrl(imageUrl)} 
                  className="w-full aspect-video" 
                  allowFullScreen
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              ) : isVideo ? (
                <div className="relative">
                  <video 
                    ref={(el) => setVideoElement(el)} 
                    src={imageUrl} 
                    className="w-full object-cover" 
                    controls={false}
                    poster={imageUrl}
                  />
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={handlePlayClick}
                    >
                      <div className="rounded-full bg-black/70 w-16 h-16 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <img src={imageUrl} alt="Post content" className="w-full object-cover" />
              )}
            </div>
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
