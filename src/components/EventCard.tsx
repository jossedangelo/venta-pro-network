
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowUpRight, Users } from "lucide-react";
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
  };
  variant?: "horizontal" | "vertical";
}

const EventCard = ({ event, variant = "vertical" }: EventCardProps) => {
  const formatDate = (date: Date) => {
    return format(date, "EEE, d MMM yyyy, HH:mm", { locale: es });
  };
  
  const isVertical = variant === "vertical";

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
