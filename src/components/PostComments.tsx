
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface PostCommentsProps {
  postId: string;
  currentUserId: string | null;
}

export default function PostComments({ postId, currentUserId }: PostCommentsProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("post_comments")
      .select(`
        id, content, created_at, user_id,
        profiles (first_name, last_name, avatar_url)
      `)
      .eq("post_id", postId)
      .order("created_at", { ascending: false });
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
    const { error } = await supabase
      .from("post_comments")
      .insert({ post_id: postId, user_id: currentUserId, content: newComment.trim() });
    setPosting(false);
    if (!error) {
      setNewComment("");
      fetchComments();
      toast({ title: "Comentario agregado" });
    } else {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="p-3 border-t bg-background">
      <div className="mb-2">
        <Textarea
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className="mb-2"
          rows={2}
          disabled={posting || !currentUserId}
        />
        <Button size="sm" onClick={handleAdd} disabled={!newComment.trim() || posting || !currentUserId}>
          {posting ? "Publicando..." : "Comentar"}
        </Button>
      </div>
      {loading ? (
        <div className="text-xs text-muted-foreground">Cargando comentarios...</div>
      ) : comments.length === 0 ? (
        <div className="text-xs text-muted-foreground">Sin comentarios aún.</div>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {comments.map(c => (
            <div key={c.id} className="flex items-start gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={c.profiles?.avatar_url} />
                <AvatarFallback>
                  {(c.profiles?.first_name?.[0] || "") + (c.profiles?.last_name?.[0] || "")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-xs">{(c.profiles?.first_name || "Usuario") + " " + (c.profiles?.last_name || "")}</div>
                <div className="text-xs">{c.content}</div>
                <div className="text-[10px] text-muted-foreground">
                  {c.created_at && new Date(c.created_at).toLocaleString("es-ES", { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
