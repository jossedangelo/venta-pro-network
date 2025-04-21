
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ImageUploadProps {
  bucketName: string;
  folderPath: string;
  onUploadComplete: (url: string) => void;
  className?: string;
}

export const ImageUpload = ({ bucketName, folderPath, onUploadComplete, className }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${folderPath}/${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      onUploadComplete(publicUrl);
      toast({
        title: "Imagen subida correctamente",
        description: "Tu imagen se ha guardado con éxito."
      });

    } catch (error: any) {
      toast({
        title: "Error al subir la imagen",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        variant="outline"
        className="w-full h-32 flex flex-col gap-2"
        disabled={uploading}
      >
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        <ImagePlus className="h-8 w-8" />
        <span className="text-sm">
          {uploading ? 'Subiendo...' : 'Haz clic para subir una imagen'}
        </span>
      </Button>
    </div>
  );
};
