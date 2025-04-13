
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, User, Briefcase, Award, MessageSquare } from "lucide-react";

interface NotificationProps {
  avatar?: string;
  name: string;
  action: string;
  target?: string;
  time: string;
  type: "connection" | "message" | "job" | "achievement";
  read: boolean;
}

const notifications: NotificationProps[] = [
  {
    name: "María García",
    action: "te ha enviado una solicitud de conexión",
    time: "Hace 1 hora",
    type: "connection",
    read: false
  },
  {
    name: "Pedro Sánchez",
    action: "te ha mencionado en un comentario",
    time: "Hace 3 horas",
    type: "message",
    read: false
  },
  {
    name: "TechSolutions",
    action: "ha publicado una oferta de empleo que podría interesarte",
    target: "Director de Ventas",
    time: "Hace 5 horas",
    type: "job",
    read: false
  },
  {
    name: "Ana Rodríguez",
    action: "ha valorado tu publicación sobre estrategias de ventas",
    time: "Hace 1 día",
    type: "message",
    read: true
  },
  {
    name: "Carlos Martínez",
    action: "ha compartido una de tus publicaciones",
    time: "Hace 2 días",
    type: "message",
    read: true
  },
  {
    name: "Sistema VentaPro",
    action: "¡Felicidades! Has alcanzado un nuevo logro",
    target: "100 conexiones de calidad",
    time: "Hace 3 días",
    type: "achievement",
    read: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "connection":
      return <User className="h-4 w-4" />;
    case "message":
      return <MessageSquare className="h-4 w-4" />;
    case "job":
      return <Briefcase className="h-4 w-4" />;
    case "achievement":
      return <Award className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const NotificationItem = ({ avatar, name, action, target, time, type, read }: NotificationProps) => (
  <div className={`p-4 border-b last:border-b-0 ${!read ? 'bg-primary/5' : ''}`}>
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <Avatar>
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={`${!read ? 'font-medium' : ''}`}>
              <span className="font-semibold">{name}</span> {action}
              {target && <span className="font-medium"> "{target}"</span>}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{time}</p>
          </div>
          <div className="flex-shrink-0">
            <div className={`p-2 rounded-full ${!read ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
              {getNotificationIcon(type)}
            </div>
          </div>
        </div>
        
        {type === "connection" && !read && (
          <div className="flex gap-2 mt-3">
            <Button size="sm">Aceptar</Button>
            <Button variant="outline" size="sm">Ignorar</Button>
          </div>
        )}
        
        {type === "job" && !read && (
          <div className="mt-3">
            <Button size="sm">Ver oferta</Button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Notifications = () => {
  const unreadNotifications = notifications.filter(n => !n.read);
  const allNotifications = notifications;
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container grid grid-cols-12 gap-6 py-4">
        {/* Sidebar */}
        <aside className="hidden md:block md:col-span-3 lg:col-span-2">
          <div className="sticky top-16 overflow-auto h-[calc(100vh-4rem)]">
            <SidebarMenu />
          </div>
        </aside>
        
        {/* Main content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="no-leidas">
                <div className="border-b px-4">
                  <TabsList className="mb-px">
                    <TabsTrigger value="no-leidas">
                      No leídas ({unreadNotifications.length})
                    </TabsTrigger>
                    <TabsTrigger value="todas">
                      Todas
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="no-leidas" className="pt-0">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification, index) => (
                      <NotificationItem key={index} {...notification} />
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-lg mb-1">No tienes notificaciones sin leer</h3>
                      <p className="text-muted-foreground">
                        Todas tus notificaciones están al día
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="todas" className="pt-0">
                  {allNotifications.map((notification, index) => (
                    <NotificationItem key={index} {...notification} />
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
        
        {/* Right sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-16 overflow-auto h-[calc(100vh-4rem)]">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preferencias de notificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Personaliza qué notificaciones quieres recibir y cómo.
                  </p>
                  <Button className="w-full" variant="outline">
                    Configurar notificaciones
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Notifications;
