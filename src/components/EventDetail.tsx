
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Users, 
  MoreHorizontal,
  Share2 
} from "lucide-react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface EventDetailProps {
  event: {
    id: string;
    title: string;
    date: Date;
    endDate?: Date;
    imageUrl: string;
    organizer: string;
    attendees: number;
    isOnline?: boolean;
    location?: string;
    country?: string;
    description?: string;
    website?: string;
  };
  onRegister?: (eventId: string) => void;
}

const EventDetail = ({ event, onRegister }: EventDetailProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return format(date, "d MMM yyyy, HH:mm", { locale: es });
  };

  const formatFullDate = (date: Date) => {
    return format(date, "d MMM yyyy", { locale: es });
  };
  
  const handleRegister = () => {
    if (onRegister) {
      onRegister(event.id);
    }
    
    setIsRegistered(true);
    toast({
      title: "¡Genial!",
      description: "Te has inscrito al evento correctamente.",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Enlace copiado",
      description: "El enlace ha sido copiado al portapapeles.",
    });
  };
  
  const getFullLocation = () => {
    if (event.isOnline) return "Evento online";
    if (!event.location) return "Ubicación no especificada";
    return event.location;
  };
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-64 object-cover rounded-xl"
        />
        <Button 
          variant="outline" 
          className="absolute top-4 left-4"
          onClick={() => navigate("/eventos")}
        >
          Volver
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-lg text-muted-foreground">{formatDate(new Date())}</p>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-xl text-muted-foreground">Evento de {event.organizer}</p>
        </div>
        
        <div className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5" />
          <span>
            {formatFullDate(event.date)}
            {event.endDate && ` - ${formatFullDate(event.endDate)}`}
            {event.date instanceof Date && 
              ` (${format(event.date, "HH:mm", { locale: es })} - ${
                event.endDate 
                  ? format(event.endDate, "HH:mm", { locale: es })
                  : "??:??"
              }) (hora local)`}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5" />
          <span>{getFullLocation()}</span>
        </div>
        
        {event.website && (
          <div className="flex items-center gap-2 text-lg">
            <LinkIcon className="h-5 w-5" />
            <span>Enlace al evento · <a href={event.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{event.website}</a></span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5" />
          <span>{event.attendees} asistentes</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          size="lg" 
          disabled={isRegistered}
          className="flex-1"
          onClick={handleRegister}
        >
          {isRegistered ? "Inscrito" : "Asistir"}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShare}>
              Compartir enlace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Reportar evento</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="detalles">
            <TabsList className="mb-4">
              <TabsTrigger value="detalles">Detalles</TabsTrigger>
              <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
            </TabsList>
            <TabsContent value="detalles">
              <div className="prose max-w-none">
                <p>{event.description || "No hay descripción disponible para este evento."}</p>
                
                {!event.isOnline && event.location && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium">Ubicación</h3>
                    <p>{event.location}</p>
                    {/* Aquí se podría agregar un mapa si se dispone de coordenadas */}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="comentarios">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No hay comentarios todavía</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <img 
              src={event.imageUrl} 
              alt={event.organizer}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{event.organizer}</h3>
              <p className="text-muted-foreground">Organizador</p>
            </div>
            <Button variant="outline" className="ml-auto">Seguir</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetail;
