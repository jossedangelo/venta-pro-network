
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
    <div className="px-4 pb-8 md:px-0">
      <h1 className="text-2xl md:text-3xl font-bold my-5">Mis Resultados</h1>
      
      <div className="mb-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal rounded-full h-12",
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5" />
              {format(date, "dd 'de' MMMM 'de' yyyy", { locale: es })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-xl border shadow-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
              className="p-3 pointer-events-auto rounded-xl"
            />
          </PopoverContent>
        </Popover>
      </div>

      <Card className="rounded-xl shadow-sm border-0 md:border overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl md:text-2xl">Resultados del día</CardTitle>
          <CardDescription>
            Introduce los resultados obtenidos el {format(date, "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-4 md:px-6">
          <div className="space-y-3">
            <Label htmlFor="calls" className="text-base font-medium">Llamadas realizadas</Label>
            <Input 
              id="calls" 
              type="number" 
              value={metrics.calls || ""}
              onChange={(e) => handleMetricChange("calls", e.target.value)}
              className="rounded-xl h-12 text-base"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="meetings" className="text-base font-medium">Reuniones</Label>
            <Input 
              id="meetings" 
              type="number" 
              value={metrics.meetings || ""}
              onChange={(e) => handleMetricChange("meetings", e.target.value)}
              className="rounded-xl h-12 text-base"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="proposals" className="text-base font-medium">Propuestas enviadas</Label>
            <Input 
              id="proposals" 
              type="number" 
              value={metrics.proposals || ""}
              onChange={(e) => handleMetricChange("proposals", e.target.value)}
              className="rounded-xl h-12 text-base"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="sales" className="text-base font-medium">Ventas cerradas</Label>
            <Input 
              id="sales" 
              type="number" 
              value={metrics.sales || ""}
              onChange={(e) => handleMetricChange("sales", e.target.value)}
              className="rounded-xl h-12 text-base"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="revenue" className="text-base font-medium">Facturación (€)</Label>
            <Input 
              id="revenue" 
              type="number" 
              value={metrics.revenue || ""}
              onChange={(e) => handleMetricChange("revenue", e.target.value)}
              className="rounded-xl h-12 text-base"
            />
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-6 px-4 md:px-6">
          <Button onClick={handleSave} className="w-full rounded-full h-12 shadow-sm">
            <Save className="mr-2 h-5 w-5" />
            Guardar resultados
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Results;
