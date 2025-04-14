import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectionCard from "@/components/ConnectionCard";
import { Search } from "lucide-react";

const connections = [
  {
    name: "Luis Fernández",
    role: "Key Account Manager",
    company: "TechSolutions",
    mutualConnections: 23,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  },
  {
    name: "Carmen Jiménez",
    role: "Sales Director",
    company: "Global Tech",
    mutualConnections: 17,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    name: "Miguel Ángel López",
    role: "Business Development",
    company: "InnovaSales",
    mutualConnections: 9,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    name: "Sofía Martín",
    role: "Account Executive",
    company: "SalesForce",
    mutualConnections: 14,
    avatar: "https://images.unsplash.com/photo-1518005020951-eccb494ad742"
  },
  {
    name: "Pablo Ruiz",
    role: "Regional Sales Manager",
    company: "Enterprise Solutions",
    mutualConnections: 21,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80"
  },
  {
    name: "Laura Sánchez",
    role: "Sales Specialist",
    company: "Tech Innovations",
    mutualConnections: 7,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80"
  }
];

const pendingConnections = [
  {
    name: "Javier Torres",
    role: "Sales Manager",
    company: "NextGen Sales",
    mutualConnections: 5,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80"
  },
  {
    name: "Isabel Vega",
    role: "Account Manager",
    company: "Cloud Solutions",
    mutualConnections: 11,
    avatar: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80"
  }
];

const suggestions = [
  {
    name: "Elena García",
    role: "Senior Sales Executive",
    company: "SaaS Solutions",
    mutualConnections: 19,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=90"
  },
  {
    name: "Roberto Díaz",
    role: "Business Development Manager",
    company: "Tech Innovations",
    mutualConnections: 8,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=90"
  },
  {
    name: "Ana Rodríguez",
    role: "Sales Director",
    company: "Global Sales",
    mutualConnections: 24,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=90"
  },
  {
    name: "Carlos Martínez",
    role: "Account Executive",
    company: "Enterprise Solutions",
    mutualConnections: 13,
    avatar: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=90"
  }
];

const Network = () => {
  return (
    <div className="space-y-4 px-4 md:px-0">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Mi Red</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mi Red</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar en mi red..."
              className="pl-8 w-full lg:w-1/2"
            />
          </div>
          
          <Tabs defaultValue="conexiones">
            <TabsList className="mb-4">
              <TabsTrigger value="conexiones">Mis Conexiones</TabsTrigger>
              <TabsTrigger value="pendientes">Invitaciones Pendientes</TabsTrigger>
              <TabsTrigger value="sugerencias">Sugerencias</TabsTrigger>
            </TabsList>
            
            <TabsContent value="conexiones">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.map((person, index) => (
                  <ConnectionCard key={index} person={person} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pendientes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingConnections.map((person, index) => (
                  <ConnectionCard key={index} person={person} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sugerencias">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((person, index) => (
                  <ConnectionCard key={index} person={person} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Network;
