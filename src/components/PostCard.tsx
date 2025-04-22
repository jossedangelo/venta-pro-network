import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, Share2, Award, Play, Pause, MoreVertical, Trash2, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { supabase } from "@/integrations/supabase/client";
import PostComments from "./PostComments";
import { toast } from "@/hooks/use-toast";

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
  postId?: string;
  recognizeCount?: number;
  currentUserId?: string | null;
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
  isCurrentUser = true,
  postId,
  recognizeCount = 0,
  currentUserId
}: PostCardProps) => {
  // Estados de likes y reconocimientos
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [recognize, setRecognize] = useState(false);
  const [recognizeCnt, setRecognizeCnt] = useState(recognizeCount);
  const [showComments, setShowComments] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Consultar si el usuario ya dio like/recognize
    async function checkStatus() {
      if (!currentUserId || !postId) return;
      const { data: likedRow } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", currentUserId)
        .maybeSingle();
      setLiked(Boolean(likedRow));
      const { data: recogRow } = await supabase
        .from("post_recognitions")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", currentUserId)
        .maybeSingle();
      setRecognize(Boolean(recogRow));
    }
    checkStatus();
    setLikeCount(likes);
    setRecognizeCnt(recognizeCount);
  }, [currentUserId, postId, likes, recognizeCount]);

  // LIKE
  const toggleLike = async () => {
    if (!currentUserId || !postId) return;
    if (!liked) {
      const { error } = await supabase
        .from("post_likes")
        .insert({ post_id: postId, user_id: currentUserId });
      if (!error) {
        setLiked(true);
        setLikeCount(v => v + 1);
        toast({ title: "Te ha gustado la publicación" });
      }
    } else {
      // Remove like
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", currentUserId);
      if (!error) {
        setLiked(false);
        setLikeCount(v => v - 1 >= 0 ? v - 1 : 0);
        toast({ title: "Ya no te gusta la publicación" });
      }
    }
  };

  // RECOGNIZE
  const toggleRecognize = async () => {
    if (!currentUserId || !postId) return;
    if (!recognize) {
      const { error } = await supabase
        .from("post_recognitions")
        .insert({ post_id: postId, user_id: currentUserId });
      if (!error) {
        setRecognize(true);
        setRecognizeCnt(v => v + 1);
        toast({ title: "Has reconocido esta publicación" });
      }
    } else {
      const { error } = await supabase
        .from("post_recognitions")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", currentUserId);
      if (!error) {
        setRecognize(false);
        setRecognizeCnt(v => v - 1 >= 0 ? v - 1 : 0);
        toast({ title: "Has quitado el reconocimiento" });
      }
    }
  };

  // COMPARTIR
  const handleShare = async () => {
    const url = window.location.origin + "#post-" + postId;
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "¡Enlace copiado!", description: url });
    } catch (e) {
      toast({ title: "Error al copiar el enlace", variant: "destructive" });
    }
  };

  const shareWhatsapp = () => {
    const url = encodeURIComponent(window.location.origin + "#post-" + postId);
    window.open(`https://wa.me/?text=${url}`, "_blank");
  };

  const shareLinkedin = () => {
    const url = encodeURIComponent(window.location.origin + "#post-" + postId);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  // Video y utilidades igual que antes
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

  return (
    <Card className="mb-4 shadow-light hover:shadow-medium transition-shadow duration-300" id={postId ? `post-${postId}` : undefined}>
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
                <span className="sr-only">Más opciones</span>
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
        {content && <p className="mb-4">{content}</p>}
        {hasImage && imageUrl && isYouTubeUrl(imageUrl) && (
          <p className="mb-4 text-blue-600 break-words">{imageUrl}</p>
        )}
        {hasImage && imageUrl && (
          <div className="rounded-md overflow-hidden mb-2" ref={containerRef}>
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
                        src={`${getYouTubeEmbedUrl(imageUrl)}`}
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
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-wrap items-center gap-2">
        <Button
          variant={liked ? "default" : "ghost"}
          size="sm"
          className={`flex gap-1 ${liked ? "text-blue-600" : ""}`}
          onClick={toggleLike}
        >
          <ThumbsUp className={`h-4 w-4 ${liked ? "fill-blue-600" : ""}`} />
          <span>{likeCount}</span>
        </Button>
        <Button
          variant={recognize ? "custom" : "ghost"}
          size="sm"
          className={`flex gap-1 ${recognize ? "text-yellow-500" : ""}`}
          onClick={toggleRecognize}
        >
          <Award className={`h-4 w-4 ${recognize ? "fill-yellow-500 text-yellow-500" : ""}`} />
          <span>{recognizeCnt}</span>
        </Button>
        <Button
          variant={showComments ? "secondary" : "ghost"}
          size="sm"
          className="flex gap-1"
          onClick={() => setShowComments(v => !v)}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex gap-1">
              <Share2 className="h-4 w-4" />
              <span>Compartir</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleShare}>Copiar enlace</DropdownMenuItem>
            <DropdownMenuItem onClick={shareWhatsapp}>Compartir en WhatsApp</DropdownMenuItem>
            <DropdownMenuItem onClick={shareLinkedin}>Compartir en LinkedIn</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
      {showComments && postId && currentUserId && (
        <PostComments postId={postId} currentUserId={currentUserId} />
      )}
    </Card>
  );
};

export default PostCard;
