import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface PostCommentsProps {
  postId: string;
  currentUserId: string | null;
}

export default function PostComments({ postId, currentUserId }: PostCommentsProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("post_comments")
      .select(`
        id, content, created_at, user_id,
        profiles (first_name, last_name, avatar_url, role, company)
      `)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (!error) setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  const handleAdd = async () => {
    if (!newComment.trim()) return;
    setPosting(true);
    
    try {
      const { error: commentError } = await supabase
        .from("post_comments")
        .insert({ post_id: postId, user_id: currentUserId, content: newComment.trim() });
      
      if (commentError) throw commentError;
      
      const { error: updateError } = await supabase
        .from('posts')
        .update({ comments_count: (await supabase.from('posts').select('comments_count').eq('id', postId).single()).data.comments_count + 1 })
        .eq('id', postId);
      
      if (updateError) {
        console.error("Error updating comment count:", updateError);
      }
      
      setNewComment("");
      fetchComments();
      toast({ title: "Comentario agregado" });
    } catch (error: any) {
      console.error("Error adding comment:", error);
      toast({ 
        title: "Error al agregar comentario", 
        description: error.message || "No se pudo agregar el comentario", 
        variant: "destructive" 
      });
    } finally {
      setPosting(false);
    }
  };

  const getDisplayName = (profile: any) => {
    if (!profile) return "Usuario";
    return `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    
    if (date.toDateString() === new Date().toDateString()) {
      return "hoy";
    }
    
    const yesterday = new Date(new Date().getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "ayer";
    }
    
    return date.toLocaleDateString("es-ES", { day: 'numeric', month: 'short' });
  };

  const visibleComments = showAllComments ? comments : (comments.length > 3 ? comments.slice(-3) : comments);
  const hasMoreComments = comments.length > 3 && !showAllComments;

  return (
    <div className="p-3 border-t bg-background">
      <div className="mb-4">
        <div className="flex items-start gap-2 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              className="mb-2 min-h-[60px]"
              rows={2}
              disabled={posting || !currentUserId}
            />
            <Button 
              size="sm" 
              onClick={handleAdd} 
              disabled={!newComment.trim() || posting || !currentUserId}
              className="ml-auto"
            >
              {posting ? "Publicando..." : "Comentar"}
            </Button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-xs text-muted-foreground py-2">Cargando comentarios...</div>
      ) : comments.length === 0 ? (
        <div className="text-xs text-muted-foreground py-2">Sé el primero en comentar.</div>
      ) : (
        <div className="space-y-4">
          {hasMoreComments && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-sm font-normal text-muted-foreground hover:text-primary"
              onClick={() => setShowAllComments(true)}
            >
              Ver {comments.length - 3} comentarios anteriores
            </Button>
          )}
          
          {visibleComments.map((comment, index) => (
            <div key={comment.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.profiles?.avatar_url} />
                  <AvatarFallback>
                    {(comment.profiles?.first_name?.[0] || "") + (comment.profiles?.last_name?.[0] || "")}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-sm">
                          {getDisplayName(comment.profiles)}
                        </div>
                        {comment.profiles?.role && (
                          <div className="text-xs text-muted-foreground">{comment.profiles.role}</div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(comment.created_at)}
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm whitespace-pre-line">{comment.content}</div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-2 mt-1 text-xs">
                    <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
                      Me gusta
                    </Button>
                    <span className="text-muted-foreground">·</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
                      Responder
                    </Button>
                  </div>
                </div>
              </div>
              
              {index < visibleComments.length - 1 && (
                <div className="pl-11">
                  <Separator className="my-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
