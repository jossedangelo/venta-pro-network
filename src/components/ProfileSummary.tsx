
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BadgeCheck, Edit2, Users } from "lucide-react";

const ProfileSummary = () => {
  return (
    <Card className="mb-4">
      <div className="h-24 bg-gradient-to-r from-secondary to-[#1a294c] rounded-t-lg"></div>
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
