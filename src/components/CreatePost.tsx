
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageUpload } from "./ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Image as ImageIcon } from "lucide-react";

interface CreatePostProps {
  onPostCreated?: () => void;
}

export const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUserProfile(profile);
      }
    };
    getUserData();
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
      
      // Insert the post
      const { data, error } = await supabase
        .from('posts')
        .insert({
          content: content.trim(),
          image_url: imageUrl,
          user_id: userId
        });

      if (error) {
        console.error("Error creating post:", error);
        throw error;
      }

      // Limpiar campos e informar éxito
      setContent("");
      setImageUrl(null);
      setPreviewImage(null);
      setShowImageUpload(false);

      toast({
        title: "Post creado",
        description: "Tu publicación se ha creado correctamente."
      });

      // Llamar al callback para refrescar el feed inmediatamente
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
        <div className="flex gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userProfile?.avatar_url} />
            <AvatarFallback>
              {userProfile?.first_name?.[0]}
              {userProfile?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="¿Sobre qué quieres hablar?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[60px] flex-1"
            disabled={publishing}
          />
        </div>

        {previewImage && (
          <div className="mb-4 relative">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full rounded-md max-h-96 object-contain"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
              onClick={() => {
                setPreviewImage(null);
                setImageUrl(null);
              }}
              disabled={publishing}
            >
              &times;
            </Button>
          </div>
        )}

        {showImageUpload && !previewImage && (
          <div className="mb-4">
            <ImageUpload
              bucketName="post-images"
              folderPath={userId || 'default'}
              onUploadComplete={(url) => {
                setImageUrl(url);
                setPreviewImage(url);
                setShowImageUpload(false);
              }}
            />
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => {
                if (!previewImage) {
                  setShowImageUpload(!showImageUpload);
                }
              }}
              disabled={!!previewImage || publishing}
            >
              <ImageIcon className="h-5 w-5 mr-2" />
              Imagen
            </Button>
          </div>
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
