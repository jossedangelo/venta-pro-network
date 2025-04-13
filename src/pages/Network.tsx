
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";
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
    mutualConnections: 23
  },
  {
    name: "Carmen Jiménez",
    role: "Sales Director",
    company: "Global Tech",
    mutualConnections: 17
  },
  {
    name: "Miguel Ángel López",
    role: "Business Development",
    company: "InnovaSales",
    mutualConnections: 9
  },
  {
    name: "Sofía Martín",
    role: "Account Executive",
    company: "SalesForce",
    mutualConnections: 14
  },
  {
    name: "Pablo Ruiz",
    role: "Regional Sales Manager",
    company: "Enterprise Solutions",
    mutualConnections: 21
  },
  {
    name: "Laura Sánchez",
    role: "Sales Specialist",
    company: "Tech Innovations",
    mutualConnections: 7
  }
];

const pendingConnections = [
  {
    name: "Javier Torres",
    role: "Sales Manager",
    company: "NextGen Sales",
    mutualConnections: 5
  },
  {
    name: "Isabel Vega",
    role: "Account Manager",
    company: "Cloud Solutions",
    mutualConnections: 11
  }
];

const suggestions = [
  {
    name: "Elena García",
    role: "Senior Sales Executive",
    company: "SaaS Solutions",
    mutualConnections: 19
  },
  {
    name: "Roberto Díaz",
    role: "Business Development Manager",
    company: "Tech Innovations",
    mutualConnections: 8
  },
  {
    name: "Ana Rodríguez",
    role: "Sales Director",
    company: "Global Sales",
    mutualConnections: 24
  },
  {
    name: "Carlos Martínez",
    role: "Account Executive",
    company: "Enterprise Solutions",
    mutualConnections: 13
  }
];

const Network = () => {
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
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
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
        </main>
      </div>
    </div>
  );
};

export default Network;
