import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit2, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ImageUpload } from "./ImageUpload";

interface Profile {
  first_name: string;
  last_name: string;
  role?: string | null;
  company?: string | null;
  about?: string | null;
  avatar_url?: string | null;
}

export function EditProfileDialog() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    first_name: "",
    last_name: "",
    role: "",
    company: "",
    about: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          role: data.role || "",
          company: data.company || "",
          about: data.about || "",
          avatar_url: data.avatar_url || "",
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Formato no válido",
          description: "Por favor, sube una imagen en formato JPG, PNG o WebP",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "El tamaño máximo permitido es 5MB",
          variant: "destructive",
        });
        return;
      }

      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-banner.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('profile-images')
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('profile-images')
          .getPublicUrl(fileName);

        setBannerImage(publicUrl);
        
        toast({
          title: "Banner actualizado",
          description: "Tu imagen de banner se ha actualizado correctamente",
        });
      } catch (error: any) {
        toast({
          title: "Error al actualizar el banner",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          role: profile.role,
          company: profile.company,
          about: profile.about,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Perfil actualizado",
        description: "Tu información se ha guardado correctamente",
      });
      setOpen(false);
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error al actualizar el perfil",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (publicUrl: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      toast({
        title: "Foto de perfil actualizada",
        description: "Tu foto de perfil se ha actualizado correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar la foto de perfil",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2 className="mr-2 h-4 w-4" />
          Editar perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Foto de perfil</Label>
              <ImageUpload
                bucketName="profile-images"
                folderPath="avatars"
                onUploadComplete={handleAvatarUpload}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Banner</Label>
              <div className="relative h-24 bg-secondary rounded-lg overflow-hidden">
                {bannerImage && (
                  <img 
                    src={bannerImage} 
                    alt="Banner" 
                    className="w-full h-full object-cover"
                  />
                )}
                <label 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                >
                  <ImagePlus className="h-6 w-6 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerUpload}
                    disabled={loading}
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="firstName">Nombre*</Label>
              <Input
                id="firstName"
                value={profile.first_name}
                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Apellidos*</Label>
              <Input
                id="lastName"
                value={profile.last_name}
                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Cargo</Label>
              <Input
                id="role"
                value={profile.role || ""}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={profile.company || ""}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="about">Sobre mí</Label>
              <Textarea
                id="about"
                value={profile.about || ""}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
