
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Plus, Save } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

const Results = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [metrics, setMetrics] = useState({
    calls: 0,
    meetings: 0,
    proposals: 0,
    sales: 0,
    revenue: 0,
  });

  const handleMetricChange = (key: keyof typeof metrics, value: string) => {
    const numValue = value === "" ? 0 : Number(value);
    
    if (!isNaN(numValue)) {
      setMetrics({
        ...metrics,
        [key]: numValue,
      });
    }
  };

  const handleSave = () => {
    // Aquí se implementaría la lógica para guardar los resultados
    console.log("Guardando resultados para:", format(date, "dd/MM/yyyy"));
    console.log("Métricas:", metrics);
    
    // Mostrar notificación de éxito (aquí se implementaría con toast)
    alert("Resultados guardados correctamente");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Resultados</h1>
      
      <div className="mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "dd 'de' MMMM 'de' yyyy", { locale: es })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados del día</CardTitle>
          <CardDescription>
            Introduce los resultados obtenidos el {format(date, "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calls">Llamadas realizadas</Label>
              <Input 
                id="calls" 
                type="number" 
                value={metrics.calls || ""}
                onChange={(e) => handleMetricChange("calls", e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meetings">Reuniones</Label>
              <Input 
                id="meetings" 
                type="number" 
                value={metrics.meetings || ""}
                onChange={(e) => handleMetricChange("meetings", e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="proposals">Propuestas enviadas</Label>
              <Input 
                id="proposals" 
                type="number" 
                value={metrics.proposals || ""}
                onChange={(e) => handleMetricChange("proposals", e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sales">Ventas cerradas</Label>
              <Input 
                id="sales" 
                type="number" 
                value={metrics.sales || ""}
                onChange={(e) => handleMetricChange("sales", e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="revenue">Facturación (€)</Label>
              <Input 
                id="revenue" 
                type="number" 
                value={metrics.revenue || ""}
                onChange={(e) => handleMetricChange("revenue", e.target.value)} 
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="ml-auto">
            <Save className="mr-2 h-4 w-4" />
            Guardar resultados
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Results;
