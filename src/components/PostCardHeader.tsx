
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface PostCardHeaderProps {
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  timestamp: string;
  isCurrentUser: boolean;
  onDelete?: () => void;
}

const PostCardHeader = ({
  author,
  timestamp,
  isCurrentUser,
  onDelete
}: PostCardHeaderProps) => (
  <div className="flex flex-row items-start justify-between pb-2">
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
  </div>
);

export default PostCardHeader;
