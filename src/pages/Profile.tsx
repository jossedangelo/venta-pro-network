
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, BriefcaseBusiness, Building, MapPin, ExternalLink, Mail, Phone, Edit2, Plus, Award, ImagePlus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Profile = () => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Formato no válido",
          description: "Por favor, sube una imagen en formato JPG, PNG o WebP",
          variant: "destructive",
        });
        return;
      }

      // Verificar el tamaño del archivo (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "El tamaño máximo permitido es 5MB",
          variant: "destructive",
        });
        return;
      }

      // Crear URL para previsualización
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
      
      toast({
        title: "Banner actualizado",
        description: "Tu imagen de banner se ha actualizado correctamente",
      });
    }
  };

  return (
    <div className="px-4 md:px-0 pb-8 md:pb-0">
      {/* Profile Header */}
      <Card className="mb-6 overflow-hidden rounded-xl shadow-sm border-0 md:border">
        <div 
          className="h-32 relative"
          style={{ 
            background: bannerImage 
              ? `url(${bannerImage}) center/cover no-repeat` 
              : '#1a294c',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <label 
            htmlFor="profile-banner-upload" 
            className="absolute bottom-2 right-2 cursor-pointer"
            title="Subir banner (Dimensiones recomendadas: 1500x400px)"
          >
            <div className="bg-background/70 p-1.5 rounded-full hover:bg-background/90 transition-colors">
              <ImagePlus className="h-5 w-5 text-foreground" />
            </div>
            <input 
              id="profile-banner-upload" 
              type="file" 
              accept="image/jpeg,image/png,image/webp" 
              className="hidden" 
              onChange={handleBannerUpload}
            />
          </label>
        </div>
        <div className="relative px-4 pb-6">
          <Avatar className="h-24 w-24 border-4 border-background absolute -top-12">
            <AvatarImage src="/placeholder.svg" alt="Carlos Rodríguez" />
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
          
          <div className="pt-16 flex flex-col">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Carlos Rodríguez</h1>
                <BadgeCheck className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg text-muted-foreground">Director de Ventas en TechSolutions</h2>
              <div className="flex flex-col gap-y-1 mt-2 text-sm text-muted-foreground">
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
            
            <div className="flex gap-2 mt-4 w-full">
              <Button variant="outline" className="flex-1 rounded-full h-12">
                <Mail className="mr-2 h-4 w-4" />
                Mensaje
              </Button>
              <Button className="flex-1 rounded-full h-12">
                <Edit2 className="mr-2 h-4 w-4" />
                Editar perfil
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Profile Content */}
      <div className="space-y-6">
        <Tabs defaultValue="sobre-mi" className="overflow-x-auto no-scrollbar">
          <TabsList className="mb-4 w-full justify-start p-0 h-auto bg-transparent border-b rounded-none space-x-6">
            <TabsTrigger value="sobre-mi" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-1">
              Sobre mí
            </TabsTrigger>
            <TabsTrigger value="experiencia" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-1">
              Experiencia
            </TabsTrigger>
            <TabsTrigger value="logros" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-1">
              Logros
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sobre-mi">
            <Card className="rounded-xl shadow-sm border-0 md:border">
              <CardHeader className="pb-2">
                <CardTitle>Sobre mí</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-base">
                  Profesional de ventas con más de 10 años de experiencia en tecnología B2B. 
                  Especializado en ventas consultivas y gestión de equipos comerciales de alto rendimiento.
                </p>
                <p className="mb-4 text-base">
                  En mi rol actual como Director de Ventas en TechSolutions, he liderado un equipo 
                  de 15 profesionales para superar consistentemente los objetivos anuales, logrando un crecimiento 
                  del 35% en los últimos 3 años.
                </p>
                <p className="text-base">
                  Apasionado por la tecnología y la innovación en procesos de ventas, 
                  constantemente busco nuevas metodologías y herramientas para optimizar el rendimiento comercial.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mt-6 rounded-xl shadow-sm border-0 md:border">
              <CardHeader className="pb-2">
                <CardTitle>Información de contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-base">carlos.rodriguez@mail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-base">+34 612 345 678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline text-base">linkedin.com/in/carlos-rodriguez</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="experiencia">
            <Card className="rounded-xl shadow-sm border-0 md:border">
              <CardHeader className="pb-2">
                <CardTitle>Experiencia laboral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="border-l-2 pl-4 border-primary/70 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <h3 className="text-xl font-semibold">Director de Ventas</h3>
                    <div className="flex items-center flex-wrap">
                      <h4 className="text-lg text-muted-foreground">TechSolutions</h4>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-muted-foreground">Tiempo completo</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Ene 2020 - Actualidad · 3 años 4 meses
                    </div>
                    <p className="text-muted-foreground text-base">
                      Liderazgo de un equipo de 15 profesionales de ventas, desarrollo de estrategias 
                      comerciales y consecución de objetivos de crecimiento con clientes enterprise.
                    </p>
                    <div className="mt-2 flex flex-wrap">
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
                    <p className="text-muted-foreground text-base">
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
                    <p className="text-muted-foreground text-base">
                      Desarrollo de nuevas cuentas y gestión del ciclo completo de ventas 
                      para soluciones tecnológicas empresariales.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logros">
            <Card className="rounded-xl shadow-sm border-0 md:border">
              <CardHeader className="pb-2">
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
                      <p className="text-muted-foreground text-base">
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
                      <p className="text-muted-foreground text-base">
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
                      <p className="text-muted-foreground text-base">
                        Certificación avanzada en metodologías de ventas consultivas para entornos B2B.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="rounded-xl shadow-sm border-0 md:border">
          <CardHeader className="pb-2">
            <CardTitle>Habilidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base">Ventas Consultivas</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base">Gestión de Equipos</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base">Negociación</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base">CRM Salesforce</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base">Análisis de Datos</span>
                <span className="text-xs bg-secondary/80 text-secondary-foreground px-2 py-1 rounded">Intermedio</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base">Inglés Empresarial</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Avanzado</span>
              </div>
            </div>
            <Button variant="ghost" className="mt-4 w-full rounded-full" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Mostrar más habilidades
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
