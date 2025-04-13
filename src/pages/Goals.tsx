
import React, { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Save, Target } from "lucide-react";

const Goals = () => {
  const [goalType, setGoalType] = useState("sales");
  const [period, setPeriod] = useState("month");
  const [goalValue, setGoalValue] = useState("");
  const [progress, setProgress] = useState(35); // Valor de ejemplo

  const handleSaveGoal = () => {
    // Aquí se implementaría la lógica para guardar el objetivo
    console.log("Guardando objetivo:", {
      type: goalType,
      period: period,
      value: goalValue
    });
    
    // Mostrar notificación de éxito (aquí se implementaría con toast)
    alert("Objetivo guardado correctamente");
  };

  const goalTypes = [
    { value: "sales", label: "Ventas cerradas" },
    { value: "calls", label: "Llamadas realizadas" },
    { value: "meetings", label: "Reuniones" },
    { value: "revenue", label: "Facturación" }
  ];

  const periods = [
    { value: "week", label: "Semanal" },
    { value: "month", label: "Mensual" },
    { value: "quarter", label: "Trimestral" },
    { value: "year", label: "Anual" }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Objetivos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Establecer nuevo objetivo</CardTitle>
            <CardDescription>
              Define tus metas de ventas, llamadas, reuniones o facturación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal-type">Tipo de objetivo</Label>
              <Select value={goalType} onValueChange={setGoalType}>
                <SelectTrigger id="goal-type">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {goalTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="period">Periodo</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger id="period">
                  <SelectValue placeholder="Selecciona un periodo" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal-value">Valor del objetivo</Label>
              <Input
                id="goal-value"
                type="number"
                value={goalValue}
                onChange={(e) => setGoalValue(e.target.value)}
                placeholder="Ejemplo: 10 ventas, 100 llamadas, 50.000€"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveGoal} className="ml-auto">
              <Save className="mr-2 h-4 w-4" />
              Guardar objetivo
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Progreso actual</CardTitle>
            <CardDescription>
              Visualiza tu avance hacia las metas establecidas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between mb-1">
                <h3 className="font-medium">Ventas mensuales</h3>
                <span className="text-sm text-muted-foreground">7 de 20</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between mb-1">
                <h3 className="font-medium">Llamadas semanales</h3>
                <span className="text-sm text-muted-foreground">45 de 50</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between mb-1">
                <h3 className="font-medium">Facturación trimestral</h3>
                <span className="text-sm text-muted-foreground">35.000€ de 100.000€</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Goals;
