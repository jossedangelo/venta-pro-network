
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Metrics from "@/components/Metrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Ene', ventas: 4000, leads: 2400, objetivos: 5000 },
  { month: 'Feb', ventas: 3000, leads: 1398, objetivos: 5000 },
  { month: 'Mar', ventas: 5000, leads: 3800, objetivos: 5000 },
  { month: 'Abr', ventas: 2780, leads: 3908, objetivos: 5000 },
  { month: 'May', ventas: 5890, leads: 4800, objetivos: 5000 },
  { month: 'Jun', ventas: 4390, leads: 3800, objetivos: 5000 },
  { month: 'Jul', ventas: 3490, leads: 4300, objetivos: 5000 },
];

const activityData = [
  { name: 'Llamadas', total: 34 },
  { name: 'Reuniones', total: 12 },
  { name: 'Propuestas', total: 8 },
  { name: 'Emails', total: 67 },
  { name: 'Demos', total: 5 },
];

const Statistics = () => {
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
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Estadísticas de Ventas</h2>
              <p className="text-muted-foreground">
                Visualiza tus métricas y rendimiento de ventas
              </p>
            </div>
            
            <Metrics />
            
            <Tabs defaultValue="ventas">
              <TabsList>
                <TabsTrigger value="ventas">Ventas</TabsTrigger>
                <TabsTrigger value="actividad">Actividad</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ventas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Rendimiento de Ventas</CardTitle>
                    <CardDescription>
                      Comparativa de ventas mensuales vs. objetivos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={salesData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="ventas" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="objetivos" stroke="#94a3b8" strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="actividad" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Actividad de Ventas</CardTitle>
                    <CardDescription>
                      Desglose de actividades en los últimos 30 días
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={activityData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="total" fill="#0ea5e9" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="leads" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Generación de Leads</CardTitle>
                    <CardDescription>
                      Tendencias de generación de leads a lo largo del tiempo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={salesData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="leads" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Statistics;
