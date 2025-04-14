
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";
import PostCard from "@/components/PostCard";
import ProfileSummary from "@/components/ProfileSummary";
import ConnectionCard from "@/components/ConnectionCard";
import { Share2, Image, BarChart, Award } from "lucide-react";

const posts = [
  {
    author: {
      name: "María García",
      role: "Directora de Ventas en TechCorp",
      avatar: "/placeholder.svg"
    },
    content: "Acabo de cerrar el trimestre con un 135% de cumplimiento! Todo el esfuerzo valió la pena. Gracias a mi equipo por el increíble trabajo.",
    timestamp: "Hace 2 horas",
    likes: 34,
    comments: 8,
    hasImage: false
  },
  {
    author: {
      name: "Juan Martínez",
      role: "Account Executive en SaaS Solutions",
      avatar: "/placeholder.svg"
    },
    content: "Compartiendo mi experiencia en el evento de ventas consultivas de ayer. Aprendí técnicas revolucionarias para entender las necesidades ocultas de los clientes.",
    timestamp: "Hace 5 horas",
    likes: 22,
    comments: 4,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1974&auto=format&fit=crop"
  }
];

const suggestedConnections = [
  {
    name: "Ana Pérez",
    role: "Sales Manager",
    company: "InnovaTech",
    mutualConnections: 12
  },
  {
    name: "Roberto Silva",
    role: "Account Executive",
    company: "GlobalSoft",
    mutualConnections: 8
  },
  {
    name: "Elena Torres",
    role: "Business Development",
    company: "SalesForce",
    mutualConnections: 15
  }
];

const Index = () => {
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
        <main className="col-span-12 md:col-span-6 lg:col-span-7">
          <ProfileSummary />
          
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex gap-4 items-center mb-4">
                <Input placeholder="Comparte una actualización o noticia..." className="flex-grow" />
                <Button>Publicar</Button>
              </div>
              <div className="flex justify-between">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Image className="mr-2 h-4 w-4" />
                  Foto
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  Estadística
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Award className="mr-2 h-4 w-4" />
                  Logro
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="destacado" className="mb-4">
            <TabsList>
              <TabsTrigger value="destacado">Destacado</TabsTrigger>
              <TabsTrigger value="reciente">Reciente</TabsTrigger>
              <TabsTrigger value="siguiendo">Siguiendo</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </main>
        
        {/* Right sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-16 overflow-auto h-[calc(100vh-4rem)]">
            <Card className="mb-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Conexiones recomendadas</h3>
                <div className="grid gap-4">
                  {suggestedConnections.map((person, index) => (
                    <ConnectionCard key={index} person={person} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;
