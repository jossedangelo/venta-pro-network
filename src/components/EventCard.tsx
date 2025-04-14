
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowUpRight, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventCardProps {
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
  };
  variant?: "horizontal" | "vertical";
}

const EventCard = ({ event, variant = "vertical" }: EventCardProps) => {
  const formatDate = (date: Date) => {
    return format(date, "EEE, d MMM yyyy, HH:mm", { locale: es });
  };
  
  const isVertical = variant === "vertical";
  
  // Find country name based on country code
  const getCountryName = (countryCode?: string) => {
    if (!countryCode) return null;
    
    const countryNames: { [key: string]: string } = {
      "es": "España",
      "ad": "Andorra",
      "ar": "Argentina",
      "au": "Australia",
      "at": "Austria",
      "be": "Bélgica",
      "br": "Brasil",
      "ca": "Canadá",
      "cl": "Chile",
      "cn": "China",
      "co": "Colombia",
      "cr": "Costa Rica",
      "hr": "Croacia",
      "cu": "Cuba",
      "cz": "República Checa",
      "dk": "Dinamarca",
      "do": "República Dominicana",
      "ec": "Ecuador",
      "eg": "Egipto",
      "fi": "Finlandia",
      "fr": "Francia",
      "de": "Alemania",
      "gr": "Grecia",
      "hk": "Hong Kong",
      "hu": "Hungría",
      "is": "Islandia",
      "in": "India",
      "id": "Indonesia",
      "ie": "Irlanda",
      "il": "Israel",
      "it": "Italia",
      "jp": "Japón",
      "kr": "Corea del Sur",
      "lu": "Luxemburgo",
      "my": "Malasia",
      "mx": "México",
      "ma": "Marruecos",
      "nl": "Países Bajos",
      "nz": "Nueva Zelanda",
      "no": "Noruega",
      "pa": "Panamá",
      "pe": "Perú",
      "ph": "Filipinas",
      "pl": "Polonia",
      "pt": "Portugal",
      "ro": "Rumanía",
      "ru": "Rusia",
      "sa": "Arabia Saudita",
      "sg": "Singapur",
      "za": "Sudáfrica",
      "se": "Suecia",
      "ch": "Suiza",
      "tw": "Taiwán",
      "th": "Tailandia",
      "tr": "Turquía",
      "ae": "Emiratos Árabes Unidos",
      "gb": "Reino Unido",
      "us": "Estados Unidos",
      "uy": "Uruguay",
      "ve": "Venezuela",
      "vn": "Vietnam"
    };
    
    return countryNames[countryCode] || countryCode;
  };

  return (
    <Card className={`overflow-hidden border hover:shadow-md transition-shadow ${isVertical ? "" : "flex h-32"}`}>
      <div className={`${isVertical ? "" : "w-36 shrink-0"}`}>
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className={`object-cover w-full ${isVertical ? "h-36" : "h-full"}`}
        />
      </div>
      <CardContent className={`p-3 ${isVertical ? "" : "flex-1"}`}>
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">
            {formatDate(event.date)}
          </p>
          <h3 className="font-semibold text-base line-clamp-2">{event.title}</h3>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <span>{event.organizer}</span>
          <span className="mx-1">•</span>
          <Users className="h-3 w-3 inline mr-1" />
          <span>{event.attendees} asistentes</span>
          {event.country && (
            <>
              <span className="mx-1">•</span>
              <MapPin className="h-3 w-3 inline mr-1" />
              <span>{getCountryName(event.country)}</span>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">Ver</Button>
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
