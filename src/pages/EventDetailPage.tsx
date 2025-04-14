
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventDetail from "@/components/EventDetail";
import { Card, CardContent } from "@/components/ui/card";

// Estos eventos son solo para la demo, en una aplicación real vendrían de una API
const allEvents = [
  {
    id: "1",
    title: "Taller de Inteligencia Artificial en Ventas & Marketing",
    date: new Date(2025, 3, 18, 19, 30),
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=1470&auto=format&fit=crop",
    organizer: "TechVentas Academy",
    attendees: 45,
    isOnline: true,
    country: "es",
    description: "Aprende a utilizar las últimas tecnologías de IA para potenciar tus estrategias de ventas y marketing. En este taller práctico, exploraremos herramientas y técnicas que están revolucionando el sector.",
    website: "https://techventas.com/taller-ia"
  },
  {
    id: "2",
    title: "Salud Digital: Colaboración, Innovación y Desafíos en LATAM",
    date: new Date(2023, 11, 13, 17, 0),
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop",
    organizer: "Health Innovation Network",
    attendees: 78,
    isOnline: true,
    country: "co",
    description: "Un espacio para discutir los avances en salud digital en Latinoamérica, los desafíos actuales y las oportunidades de colaboración entre profesionales e instituciones.",
    website: "https://healthinnovation.net/latam"
  },
  {
    id: "3",
    title: "Webinar: Lesiones de rodilla en deportistas",
    date: new Date(2023, 5, 28, 15, 0),
    imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop",
    organizer: "SportsMed Association",
    attendees: 120,
    isOnline: true,
    country: "mx",
    description: "Webinar dirigido a profesionales de la salud y entrenadores deportivos. Abordaremos las lesiones más comunes en la rodilla, métodos de prevención y los últimos avances en tratamientos.",
    website: "https://sportsmed.org/webinars"
  },
  {
    id: "4",
    title: "CEO Sleepout Aberdeen",
    date: new Date(2025, 3, 14, 21, 0),
    endDate: new Date(2025, 3, 15, 7, 30),
    imageUrl: "public/lovable-uploads/612e2083-1ad7-40ca-b31d-23ec42ed8378.png",
    organizer: "CEO Sleepout UK",
    attendees: 20,
    isOnline: false,
    location: "Cove Rangers F.c., Balmoral Stadium Wellington Circle, Aberdeen, Scotland, GB, AB12 3JG",
    country: "gb",
    description: "CEO Sleepout es un evento benéfico donde directivos ejecutivos y líderes empresariales duermen a la intemperie durante una noche para recaudar fondos y concienciar sobre la situación de las personas sin hogar.",
    website: "https://ceosleepout.co.uk/aberdeen"
  },
  {
    id: "5",
    title: "Indo Intertex",
    date: new Date(2025, 3, 15, 5, 0),
    imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1636&auto=format&fit=crop",
    organizer: "Peraga Expo",
    attendees: 1,
    isOnline: false,
    location: "Jakarta International Expo",
    country: "id",
    description: "Feria internacional del textil que reúne a fabricantes, proveedores y compradores del sector textil y de la confección de toda Asia.",
    website: "https://indointertex.com"
  },
  {
    id: "6",
    title: "Quantum.Tech USA 2025",
    date: new Date(2025, 3, 14, 14, 30),
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1470&auto=format&fit=crop",
    organizer: "Quantum.Tech",
    attendees: 33,
    isOnline: false,
    location: "Conrad Hotel, Washington D.C.",
    country: "us",
    description: "La conferencia líder sobre tecnología cuántica en EE.UU. Reúne a investigadores, empresas y gobiernos para explorar los avances en computación cuántica, criptografía y comunicaciones.",
    website: "https://quantum-tech.co/usa"
  }
];

// Simulamos una lista de eventos a los que el usuario está registrado
const registeredEvents = ["2", "5"];

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [userEvents, setUserEvents] = useState<string[]>(registeredEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga de datos desde una API
    const loadEvent = async () => {
      setLoading(true);
      try {
        // En una aplicación real, aquí haríamos una llamada a la API
        const foundEvent = allEvents.find(e => e.id === id);
        
        if (foundEvent) {
          setEvent(foundEvent);
        }
      } catch (error) {
        console.error("Error cargando evento:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEvent();
    }
  }, [id]);

  const handleRegisterForEvent = (eventId: string) => {
    // En una aplicación real, enviaríamos esto a una API
    setUserEvents([...userEvents, eventId]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold">Evento no encontrado</h2>
            <p className="text-muted-foreground mt-2">El evento que buscas no existe o ha sido eliminado.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <EventDetail 
    event={event} 
    onRegister={handleRegisterForEvent} 
  />;
};

export default EventDetailPage;
