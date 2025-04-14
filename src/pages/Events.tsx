
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import CreateEventModal from "@/components/CreateEventModal";

// Datos de ejemplo para eventos
const sampleEvents = [
  {
    id: "1",
    title: "Taller de Inteligencia Artificial en Ventas & Marketing",
    date: new Date(2025, 3, 18, 19, 30),
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=1470&auto=format&fit=crop",
    organizer: "TechVentas Academy",
    attendees: 45,
    isOnline: true,
    country: "es"
  },
  {
    id: "2",
    title: "Salud Digital: Colaboración, Innovación y Desafíos en LATAM",
    date: new Date(2023, 11, 13, 17, 0),
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop",
    organizer: "Health Innovation Network",
    attendees: 78,
    isOnline: true,
    country: "co"
  },
  {
    id: "3",
    title: "Webinar: Lesiones de rodilla en deportistas",
    date: new Date(2023, 5, 28, 15, 0),
    imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop",
    organizer: "SportsMed Association",
    attendees: 120,
    isOnline: true,
    country: "mx"
  }
];

// Datos de ejemplo para eventos recomendados
const recommendedEvents = [
  {
    id: "4",
    title: "CEO Sleepout Aberdeen",
    date: new Date(2025, 3, 14, 21, 0),
    endDate: new Date(2025, 3, 15, 7, 30),
    imageUrl: "public/lovable-uploads/612e2083-1ad7-40ca-b31d-23ec42ed8378.png",
    organizer: "CEO Sleepout UK",
    attendees: 20,
    isOnline: false,
    location: "Balmoral Stadium, Aberdeen",
    country: "gb"
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
    country: "id"
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
    country: "us"
  }
];

// Simulamos una lista de eventos a los que el usuario está registrado
const registeredEventIds = ["2", "5"];

const Events = () => {
  const [myEvents, setMyEvents] = useState(sampleEvents);
  const [registeredEvents, setRegisteredEvents] = useState<Array<any>>([]);
  const [newEvents, setNewEvents] = useState<Array<any>>([]);
  
  useEffect(() => {
    // Simulamos la carga de datos desde una API
    // En una aplicación real, estos datos vendrían de un backend
    
    // Filtramos los eventos registrados por el usuario
    const userRegistered = [...sampleEvents, ...recommendedEvents].filter(
      event => registeredEventIds.includes(event.id)
    );
    setRegisteredEvents(userRegistered);
    
    // Identificamos eventos creados esta semana
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const recentEvents = [...sampleEvents, ...recommendedEvents].filter(event => {
      return event.date >= startOfWeek;
    });
    setNewEvents(recentEvents);
  }, []);
  
  const handleEventCreated = (eventData: any) => {
    // En una aplicación real, esto enviaría datos al backend
    // Aquí simplemente simulamos añadir un nuevo evento a la lista
    const newEvent = {
      id: String(myEvents.length + 1),
      title: eventData.title,
      date: eventData.startDate,
      endDate: eventData.endDate,
      imageUrl: eventData.coverImage ? URL.createObjectURL(eventData.coverImage) : "https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=1470&auto=format&fit=crop",
      organizer: eventData.organizer,
      attendees: 0,
      isOnline: eventData.eventType === "online",
      location: eventData.location,
      country: eventData.country
    };
    
    setMyEvents([newEvent, ...myEvents]);
    setNewEvents([newEvent, ...newEvents]);
  };

  const handleExploreEvents = () => {
    // Find the todos tab element and trigger a click event
    const todosTab = document.querySelector('[data-state="inactive"][data-value="todos"]');
    if (todosTab instanceof HTMLElement) {
      todosTab.click();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Eventos</CardTitle>
          <CreateEventModal 
            onEventCreated={handleEventCreated}
            trigger={<Button>Crear un evento</Button>}
          />
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="todos">
            <TabsList className="mb-4">
              <TabsTrigger value="todos">Mostrar todo</TabsTrigger>
              <TabsTrigger value="mis-eventos">Tus eventos</TabsTrigger>
              <TabsTrigger value="nuevos">Nuevos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...myEvents, ...recommendedEvents].slice(0, 6).map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mis-eventos" className="space-y-4">
              {registeredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {registeredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Aún no te has inscrito a ningún evento</p>
                  <Button className="mt-4" onClick={handleExploreEvents}>
                    Explorar eventos
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="nuevos" className="space-y-4">
              {newEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {newEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No hay eventos nuevos esta semana</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones para ti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Events;
