
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const CreatePost = () => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) {
      toast({
        title: "Error al crear el post",
        description: "Debes escribir algo o subir una imagen para publicar.",
        variant: "destructive"
      });
      return;
    }

    try {
      setPublishing(true);
      const user = supabase.auth.getUser();
      
      if (!user) throw new Error("Debes iniciar sesión para publicar.");

      const { error } = await supabase
        .from('posts')
        .insert({
          content: content.trim(),
          image_url: imageUrl,
          user_id: user.data.user?.id
        });

      if (error) throw error;

      setContent("");
      setImageUrl(null);
      
      toast({
        title: "Post creado",
        description: "Tu publicación se ha creado correctamente."
      });
    } catch (error: any) {
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
            folderPath={supabase.auth.getUser()?.user?.id || 'default'}
            onUploadComplete={setImageUrl}
            className="flex-1"
          />
          
          <Button 
            onClick={handleSubmit} 
            disabled={publishing || (!content.trim() && !imageUrl)}
          >
            {publishing ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
