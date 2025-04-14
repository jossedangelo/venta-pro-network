
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-4 px-4 md:px-0">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Estadísticas de Ventas</h1>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Visualiza tus métricas y rendimiento de ventas
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, index) => (
          <Card key={index} className="overflow-hidden border shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <h3 className="text-sm font-medium mb-2">{kpi.title}</h3>
              <div className="text-2xl font-bold mb-1">{kpi.value}</div>
              {kpi.comparison && (
                <p className="text-xs text-muted-foreground">{kpi.comparison}</p>
              )}
              <p className="text-xs mt-1">
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
            <CardContent className="p-6">
              <h2 className="font-semibold mb-2">Rendimiento de Ventas</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Comparativa de ventas mensuales vs. objetivos
              </p>
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
            <CardContent className="p-6">
              <h2 className="font-semibold mb-2">Actividad Comercial</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Resumen de tu actividad comercial
              </p>
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
            <CardContent className="p-6">
              <h2 className="font-semibold mb-2">Nuevos Leads</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Análisis de adquisición de leads
              </p>
              <p>Contenido de análisis de leads en desarrollo.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
