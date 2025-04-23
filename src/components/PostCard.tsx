
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PostComments from "./PostComments";
import { toast } from "@/hooks/use-toast";
import PostCardHeader from "./PostCardHeader";
import PostCardContent from "./PostCardContent";
import PostCardActions from "./PostCardActions";
import {
  extractYouTubeIdFromText
} from "@/utils/youtube";

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
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [recognize, setRecognize] = useState(false);
  const [recognizeCnt, setRecognizeCnt] = useState(recognizeCount);
  // By default show comments if there are any
  const [showComments, setShowComments] = useState(comments > 0);

  useEffect(() => {
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
    // Show comments by default if there are any
    setShowComments(comments > 0);
  }, [currentUserId, postId, likes, recognizeCount, comments]);

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

  return (
    <Card className="mb-4 shadow-light hover:shadow-medium transition-shadow duration-300" id={postId ? `post-${postId}` : undefined}>
      <CardHeader>
        <PostCardHeader
          author={author}
          timestamp={timestamp}
          isCurrentUser={isCurrentUser!}
          onDelete={onDelete}
        />
      </CardHeader>
      <CardContent className="pt-2">
        <PostCardContent 
          content={content}
          hasImage={hasImage}
          imageUrl={imageUrl}
          isVideo={isVideo}
        />
      </CardContent>
      <CardFooter className="">
        <PostCardActions
          liked={liked}
          likeCount={likeCount}
          toggleLike={toggleLike}
          recognize={recognize}
          recognizeCnt={recognizeCnt}
          toggleRecognize={toggleRecognize}
          showComments={showComments}
          comments={comments}
          setShowComments={setShowComments}
          handleShare={handleShare}
          shareWhatsapp={shareWhatsapp}
          shareLinkedin={shareLinkedin}
        />
      </CardFooter>
      {/* Always render comments panel if there are any, or if showComments is on */}
      {(showComments && postId && currentUserId) && (
        <PostComments postId={postId} currentUserId={currentUserId} />
      )}
    </Card>
  );
};

export default PostCard;
