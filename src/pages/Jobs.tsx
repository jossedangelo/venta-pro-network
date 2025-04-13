
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "@/components/JobCard";
import { Search } from "lucide-react";

const recentJobs = [
  {
    title: "Director de Ventas",
    company: "TechSolutions",
    location: "Madrid, España",
    salary: "65.000€ - 80.000€ al año",
    type: "Tiempo completo",
    postedTime: "Hace 2 días"
  },
  {
    title: "Key Account Manager",
    company: "SaaS Enterprise",
    location: "Barcelona, España",
    salary: "45.000€ - 60.000€ al año",
    type: "Tiempo completo",
    postedTime: "Hace 3 días"
  },
  {
    title: "Business Development Representative",
    company: "Cloud Services",
    location: "Remoto",
    salary: "35.000€ - 45.000€ al año",
    type: "Tiempo completo",
    postedTime: "Hace 5 días"
  },
  {
    title: "Sales Operations Manager",
    company: "InnovaTech",
    location: "Valencia, España",
    salary: "50.000€ - 65.000€ al año",
    type: "Tiempo completo",
    postedTime: "Hace 1 semana"
  }
];

const savedJobs = [
  {
    title: "Enterprise Account Executive",
    company: "Global Solutions",
    location: "Madrid, España",
    salary: "55.000€ - 75.000€ al año",
    type: "Tiempo completo",
    postedTime: "Hace 1 semana"
  },
  {
    title: "Sales Manager - Sector Tecnológico",
    company: "Tech Innovations",
    location: "Sevilla, España",
    salary: "60.000€ - 70.000€ al año",
    type: "Tiempo completo",
    postedTime: "Hace 2 semanas"
  }
];

const Jobs = () => {
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
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Oportunidades de Empleo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Puesto, empresa o palabra clave..."
                    className="pl-8"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las ubicaciones</SelectItem>
                      <SelectItem value="remote">Remoto</SelectItem>
                      <SelectItem value="madrid">Madrid</SelectItem>
                      <SelectItem value="barcelona">Barcelona</SelectItem>
                      <SelectItem value="valencia">Valencia</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Experiencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cualquier experiencia</SelectItem>
                      <SelectItem value="entry">Entry level</SelectItem>
                      <SelectItem value="mid">Mid-Senior level</SelectItem>
                      <SelectItem value="senior">Director level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Tabs defaultValue="recientes">
                <TabsList className="mb-4">
                  <TabsTrigger value="recientes">Empleos Recientes</TabsTrigger>
                  <TabsTrigger value="guardados">Guardados</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recientes">
                  <div className="space-y-4">
                    {recentJobs.map((job, index) => (
                      <JobCard key={index} job={job} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="guardados">
                  <div className="space-y-4">
                    {savedJobs.map((job, index) => (
                      <JobCard key={index} job={job} />
                    ))}
                  </div>
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
                <CardTitle className="text-base">Mi perfil de empleo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete su perfil para recibir recomendaciones de empleo personalizadas.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Preferencias de empleo</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tipo: Tiempo completo</li>
                    <li>• Ubicación: Madrid, Barcelona, Remoto</li>
                    <li>• Sector: Tecnología, SaaS</li>
                    <li>• Salario: 60.000€ - 80.000€</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Jobs;
