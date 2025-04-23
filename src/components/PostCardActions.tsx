
import { ThumbsUp, Award, MessageSquare, Share2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface PostCardActionsProps {
  liked: boolean;
  likeCount: number;
  toggleLike: () => void;
  recognize: boolean;
  recognizeCnt: number;
  toggleRecognize: () => void;
  showComments: boolean;
  comments: number;
  setShowComments: (fn: (prev: boolean) => boolean) => void;
  handleShare: () => void;
  shareWhatsapp: () => void;
  shareLinkedin: () => void;
}

const actionBtnStyle = (selected: boolean, outline?: boolean) =>
  `inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${outline 
      ? "border border-blue-400 text-blue-700 bg-transparent hover:bg-blue-50"
      : "bg-transparent"}
    ${selected ? "ring-2 ring-blue-500 border-blue-500" : "text-neutral-700"}
  `;

const PostCardActions = ({
  liked,
  likeCount,
  toggleLike,
  recognize,
  recognizeCnt,
  toggleRecognize,
  showComments,
  comments,
  setShowComments,
  handleShare,
  shareWhatsapp,
  shareLinkedin
}: PostCardActionsProps) => {

  return (
    <div className="border-t pt-4 flex flex-wrap items-center gap-2 bg-transparent">
      {/* "Me gusta" */}
      <button
        className={actionBtnStyle(liked)}
        onClick={toggleLike}
        type="button"
      >
        <ThumbsUp className={"h-5 w-5" + (liked ? " text-blue-600" : " text-neutral-700")} />
        <span className={liked ? "text-blue-600 font-medium" : "text-neutral-700"}>Me gusta</span>
        <span className={liked ? "text-blue-600 font-medium" : "text-neutral-700"}>{likeCount}</span>
      </button>
      {/* "Muy Top" */}
      <button
        className={actionBtnStyle(recognize)}
        onClick={toggleRecognize}
        type="button"
      >
        <Award className={"h-5 w-5" + (recognize ? " text-yellow-500" : " text-neutral-700")} />
        <span className={recognize ? "text-yellow-500 font-medium" : "text-neutral-700"}>Muy Top</span>
        <span className={recognize ? "text-yellow-500 font-medium" : "text-neutral-700"}>{recognizeCnt}</span>
      </button>
      {/* Comentario */}
      <button
        className={actionBtnStyle(showComments, true)}
        onClick={() => setShowComments(v => !v)}
        type="button"
        style={showComments ? { background: "#f2f7fb", borderColor: "#2563eb" } : {}}
      >
        <MessageSquare className="h-5 w-5 text-neutral-700" />
        <span className={showComments ? "text-blue-700 font-medium" : "text-neutral-700"}>Comentario</span>
        <span className={showComments ? "text-blue-700 font-medium" : "text-neutral-700"}>{comments}</span>
      </button>
      {/* Compartir */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <button
              className={actionBtnStyle(false, true)}
              type="button"
            >
              <Share2 className="h-5 w-5 text-neutral-700" />
              <span className="text-neutral-700">Compartir</span>
              <span className="text-neutral-700">{0}</span>
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleShare}>Copiar enlace</DropdownMenuItem>
          <DropdownMenuItem onClick={shareWhatsapp}>Compartir en WhatsApp</DropdownMenuItem>
          <DropdownMenuItem onClick={shareLinkedin}>Compartir en LinkedIn</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
};

export default PostCardActions;
