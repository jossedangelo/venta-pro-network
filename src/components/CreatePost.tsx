
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CreatePostProps {
  onPostCreated?: () => void;
}

export const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el ID del usuario al cargar el componente
    const getUserId = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id || null);
    };
    
    getUserId();
  }, []);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) {
      toast({
        title: "Error al crear el post",
        description: "Debes escribir algo o subir una imagen para publicar.",
        variant: "destructive"
      });
      return;
    }

    if (!userId) {
      toast({
        title: "Error al crear el post",
        description: "Debes iniciar sesión para publicar.",
        variant: "destructive"
      });
      return;
    }

    try {
      setPublishing(true);
      
      const { error } = await supabase
        .from('posts')
        .insert({
          content: content.trim(),
          image_url: imageUrl,
          user_id: userId
        });

      if (error) throw error;

      setContent("");
      setImageUrl(null);
      
      toast({
        title: "Post creado",
        description: "Tu publicación se ha creado correctamente."
      });

      // Llamar al callback si existe
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        title: "Error al crear el post",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <Textarea
          placeholder="¿Qué quieres compartir?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4 min-h-[100px]"
        />
        
        <div className="flex gap-4 items-start">
          <ImageUpload
            bucketName="post-images"
            folderPath={userId || 'default'}
            onUploadComplete={setImageUrl}
            className="flex-1"
          />
          
          <Button 
            onClick={handleSubmit} 
            disabled={publishing || (!content.trim() && !imageUrl) || !userId}
          >
            {publishing ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
