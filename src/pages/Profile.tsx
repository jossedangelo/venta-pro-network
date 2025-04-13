
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, BriefcaseBusiness, Building, MapPin, ExternalLink, Mail, Phone, Edit2, Plus, Award } from "lucide-react";

const Profile = () => {
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
          {/* Profile Header */}
          <Card className="mb-6 overflow-hidden">
            <div className="h-32 md:h-48 bg-gradient-to-r from-sales-800 to-sales-600"></div>
            <div className="relative px-4 md:px-6 pb-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background absolute -top-12 md:-top-16">
                <AvatarImage src="/placeholder.svg" alt="Carlos Rodríguez" />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              
              <div className="pt-16 md:pt-20 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold">Carlos Rodríguez</h1>
                    <BadgeCheck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <h2 className="text-xl text-muted-foreground">Director de Ventas en TechSolutions</h2>
                  <div className="flex flex-wrap gap-y-1 gap-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Madrid, España
                    </div>
                    <div className="flex items-center">
                      <BriefcaseBusiness className="h-4 w-4 mr-1" />
                      Tecnología B2B
                    </div>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      512 conexiones
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Mensaje
                  </Button>
                  <Button>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Editar perfil
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Profile Content */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <Tabs defaultValue="sobre-mi">
                <TabsList className="mb-4">
                  <TabsTrigger value="sobre-mi">Sobre mí</TabsTrigger>
                  <TabsTrigger value="experiencia">Experiencia</TabsTrigger>
                  <TabsTrigger value="logros">Logros</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sobre-mi">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre mí</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        Profesional de ventas con más de 10 años de experiencia en tecnología B2B. 
                        Especializado en ventas consultivas y gestión de equipos comerciales de alto rendimiento.
                      </p>
                      <p className="mb-4">
                        En mi rol actual como Director de Ventas en TechSolutions, he liderado un equipo 
                        de 15 profesionales para superar consistentemente los objetivos anuales, logrando un crecimiento 
                        del 35% en los últimos 3 años.
                      </p>
                      <p>
                        Apasionado por la tecnología y la innovación en procesos de ventas, 
                        constantemente busco nuevas metodologías y herramientas para optimizar el rendimiento comercial.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Información de contacto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <span>carlos.rodriguez@mail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <span>+34 612 345 678</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-5 w-5 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">linkedin.com/in/carlos-rodriguez</a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="experiencia">
                  <Card>
                    <CardHeader>
                      <CardTitle>Experiencia laboral</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="border-l-2 pl-4 border-primary/70 relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                          <h3 className="text-xl font-semibold">Director de Ventas</h3>
                          <div className="flex items-center">
                            <h4 className="text-lg text-muted-foreground">TechSolutions</h4>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-muted-foreground">Tiempo completo</span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">
                            Ene 2020 - Actualidad · 3 años 4 meses
                          </div>
                          <p className="text-muted-foreground">
                            Liderazgo de un equipo de 15 profesionales de ventas, desarrollo de estrategias 
                            comerciales y consecución de objetivos de crecimiento con clientes enterprise.
                          </p>
                          <div className="mt-2">
                            <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded mr-2 mt-1">
                              Ventas B2B
                            </span>
                            <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded mr-2 mt-1">
                              Estrategia comercial
                            </span>
                            <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded mr-2 mt-1">
                              Liderazgo de equipos
                            </span>
                          </div>
                        </div>
                        
                        <div className="border-l-2 pl-4 border-primary/40 relative">
                          <div className="absolute w-3 h-3 bg-primary/60 rounded-full -left-[7px] top-1"></div>
                          <h3 className="text-xl font-semibold">Sales Manager</h3>
                          <div className="flex items-center">
                            <h4 className="text-lg text-muted-foreground">SoftInnovation</h4>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-muted-foreground">Tiempo completo</span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">
                            Mar 2016 - Dic 2019 · 3 años 10 meses
                          </div>
                          <p className="text-muted-foreground">
                            Gestión de un equipo regional de ventas, desarrollo de nuevas cuentas 
                            y mantenimiento de relaciones con clientes clave.
                          </p>
                        </div>
                        
                        <div className="border-l-2 pl-4 border-primary/20 relative">
                          <div className="absolute w-3 h-3 bg-primary/40 rounded-full -left-[7px] top-1"></div>
                          <h3 className="text-xl font-semibold">Account Executive</h3>
                          <div className="flex items-center">
                            <h4 className="text-lg text-muted-foreground">Global Tech</h4>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-muted-foreground">Tiempo completo</span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">
                            Jun 2013 - Feb 2016 · 2 años 9 meses
                          </div>
                          <p className="text-muted-foreground">
                            Desarrollo de nuevas cuentas y gestión del ciclo completo de ventas 
                            para soluciones tecnológicas empresariales.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="logros">
                  <Card>
                    <CardHeader>
                      <CardTitle>Logros y reconocimientos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 flex gap-4">
                          <div className="flex-shrink-0">
                            <Award className="h-12 w-12 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Vendedor del Año 2022</h3>
                            <p className="text-sm text-muted-foreground mb-2">TechSolutions · Dic 2022</p>
                            <p className="text-muted-foreground">
                              Reconocimiento al mayor volumen de ventas y cumplimiento de objetivos 
                              en la compañía durante el año fiscal 2022.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 flex gap-4">
                          <div className="flex-shrink-0">
                            <Award className="h-12 w-12 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">135% de Cumplimiento Q1 2023</h3>
                            <p className="text-sm text-muted-foreground mb-2">TechSolutions · Mar 2023</p>
                            <p className="text-muted-foreground">
                              Superación del 135% del objetivo trimestral con un equipo de 15 personas, 
                              liderando el ranking europeo de la compañía.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 flex gap-4">
                          <div className="flex-shrink-0">
                            <Award className="h-12 w-12 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Certificación en Ventas Consultivas</h3>
                            <p className="text-sm text-muted-foreground mb-2">Sales Excellence Institute · Sep 2021</p>
                            <p className="text-muted-foreground">
                              Certificación avanzada en metodologías de ventas consultivas para entornos B2B.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Habilidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span>Ventas Consultivas</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Gestión de Equipos</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Negociación</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>CRM Salesforce</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Análisis de Datos</span>
                      <span className="text-xs bg-secondary/80 text-secondary-foreground px-2 py-1 rounded">Intermedio</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Inglés Empresarial</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="mt-4 w-full" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Mostrar más habilidades
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas del perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Visitas al perfil</p>
                      <p className="text-2xl font-bold">782</p>
                      <p className="text-xs text-muted-foreground">
                        + 18% respecto al mes pasado
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Apariciones en búsquedas</p>
                      <p className="text-2xl font-bold">342</p>
                      <p className="text-xs text-muted-foreground">
                        + 5% respecto al mes pasado
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Índice de respuesta</p>
                      <p className="text-2xl font-bold">94%</p>
                      <p className="text-xs text-muted-foreground">
                        Respondes rápidamente a los mensajes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
