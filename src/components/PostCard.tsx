import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, Share2, Award } from "lucide-react";
import { Link } from "react-router-dom";

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
}

const PostCard = ({ 
  author, 
  content, 
  timestamp, 
  likes, 
  comments, 
  hasImage = false,
  imageUrl
}: PostCardProps) => {
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
            <img src={imageUrl} alt="Post content" className="w-full object-cover" />
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
