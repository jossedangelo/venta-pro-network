
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BadgeCheck, Edit2, Users, ImagePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const ProfileSummary = () => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Formato no válido",
          description: "Por favor, sube una imagen en formato JPG, PNG o WebP",
          variant: "destructive",
        });
        return;
      }

      // Verificar el tamaño del archivo (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "El tamaño máximo permitido es 5MB",
          variant: "destructive",
        });
        return;
      }

      // Crear URL para previsualización
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
      
      toast({
        title: "Banner actualizado",
        description: "Tu imagen de banner se ha actualizado correctamente",
      });
    }
  };

  return (
    <Card className="mb-4">
      <div 
        className="h-24 relative"
        style={{ 
          background: bannerImage 
            ? `url(${bannerImage}) center/cover no-repeat` 
            : 'linear-gradient(90deg, #4ade80 0%, #1a294c 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <label 
          htmlFor="banner-upload" 
          className="absolute bottom-2 right-2 cursor-pointer"
          title="Subir banner (Dimensiones recomendadas: 1500x400px)"
        >
          <div className="bg-background/70 p-1.5 rounded-full hover:bg-background/90 transition-colors">
            <ImagePlus className="h-5 w-5 text-foreground" />
          </div>
          <input 
            id="banner-upload" 
            type="file" 
            accept="image/jpeg,image/png,image/webp" 
            className="hidden" 
            onChange={handleBannerUpload}
          />
        </label>
      </div>
      <CardHeader className="relative pb-2">
        <Avatar className="h-24 w-24 absolute -top-12 border-4 border-background">
          <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" alt="@usuario" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <div className="pt-16">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">Carlos Rodríguez</h2>
                <BadgeCheck className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>Director de Ventas en TechSolutions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Edit2 className="mr-2 h-4 w-4" />
              Editar perfil
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1">Acerca de</p>
          <p className="text-sm text-muted-foreground">
            Profesional de ventas con más de 10 años de experiencia en tecnología B2B. 
            Especializado en ventas consultivas y gestión de equipos comerciales de alto rendimiento.
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">512 conexiones</span>
          </div>
          <Link to="/red" className="text-sm text-primary hover:underline">
            Ver todas
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full">
            Añadir sección
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            Más
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
