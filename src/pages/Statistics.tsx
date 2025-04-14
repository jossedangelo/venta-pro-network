
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Ene", ventas: 4000, objetivo: 4500 },
  { month: "Feb", ventas: 3000, objetivo: 3500 },
  { month: "Mar", ventas: 5000, objetivo: 4500 },
  { month: "Abr", ventas: 2800, objetivo: 3000 },
  { month: "May", ventas: 6000, objetivo: 5500 },
  { month: "Jun", ventas: 4500, objetivo: 5000 },
  { month: "Jul", ventas: 3500, objetivo: 4000 },
];

const kpis = [
  {
    title: "Conversiones",
    value: "68%",
    change: "+4%",
    changeType: "increase",
    changePeriod: "el mes pasado",
    comparison: "vs. 64%",
  },
  {
    title: "Visitas a tu perfil",
    value: "289",
    change: "+12%",
    changeType: "increase",
    changePeriod: "últimos 7 días",
  },
  {
    title: "Logros de ventas",
    value: "4",
    change: "+1",
    changeType: "increase",
    changePeriod: "este trimestre",
  },
  {
    title: "Venta media",
    value: "$8,942",
    change: "+16.8%",
    changeType: "increase",
    changePeriod: "anterior",
    comparison: "vs. $7,651",
  },
];

const Statistics = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Button asChild variant="outline" size="sm" className="mr-2">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Inicio
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Estadísticas de Ventas</h1>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Visualiza tus métricas y rendimiento de ventas
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              {kpi.comparison && (
                <p className="text-xs text-muted-foreground">{kpi.comparison}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                <span className={`text-${kpi.changeType === "increase" ? "emerald" : "rose"}-500 font-medium`}>
                  {kpi.change}
                </span>{" "}
                {kpi.changePeriod}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="ventas">
        <TabsList>
          <TabsTrigger value="ventas">Ventas</TabsTrigger>
          <TabsTrigger value="actividad">Actividad</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ventas" className="space-y-4">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Rendimiento de Ventas</CardTitle>
              <p className="text-sm text-muted-foreground">
                Comparativa de ventas mensuales vs. objetivos
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={data}
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
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="objetivo" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="actividad">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Comercial</CardTitle>
              <p className="text-sm text-muted-foreground">
                Resumen de tu actividad comercial
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={data}
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
                  <Bar dataKey="ventas" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Nuevos Leads</CardTitle>
              <p className="text-sm text-muted-foreground">
                Análisis de adquisición de leads
              </p>
            </CardHeader>
            <CardContent>
              <p>Contenido de análisis de leads en desarrollo.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
