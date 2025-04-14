
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, MessageSquare, User } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "connection",
    user: {
      name: "María García",
      avatar: "/placeholder.svg"
    },
    content: "te ha enviado una solicitud de conexión",
    time: "Hace 1 hora",
    icon: <User className="h-4 w-4" />
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Pedro Sánchez",
      avatar: "/placeholder.svg"
    },
    content: "te ha mencionado en un comentario",
    time: "Hace 3 horas",
    icon: <MessageSquare className="h-4 w-4" />
  },
  {
    id: 3,
    type: "job",
    user: {
      name: "TechSolutions",
      avatar: "/placeholder.svg"
    },
    content: "ha publicado una oferta de empleo que podría interesarte \"Director de Ventas\"",
    time: "Hace 5 horas",
    icon: <Briefcase className="h-4 w-4" />
  }
];

const Notifications = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Button asChild variant="outline" size="sm" className="mr-2">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Inicio
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Notificaciones</h1>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="no-leidas">
                <TabsList className="mb-4">
                  <TabsTrigger value="no-leidas">No leídas (3)</TabsTrigger>
                  <TabsTrigger value="todas">Todas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="no-leidas">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-4 p-4 rounded-md border">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                          <AvatarFallback>{notification.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{notification.user.name}</span>
                            <span className="text-muted-foreground">{notification.content}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {notification.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="todas">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-4 p-4 rounded-md border">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                          <AvatarFallback>{notification.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{notification.user.name}</span>
                            <span className="text-muted-foreground">{notification.content}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {notification.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="hidden lg:block lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preferencias de notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Personaliza qué notificaciones quieres recibir y cómo.
              </p>
              <Button className="w-full">Configurar notificaciones</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
