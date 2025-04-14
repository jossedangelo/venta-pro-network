
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckSquare, Bot, Loader } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface PlanTask {
  id: string;
  text: string;
  completed: boolean;
}

interface ActionPlanData {
  id: string;
  date: Date;
  title: string;
  description: string;
  tasks: PlanTask[];
  completed: boolean;
  feedback: string;
}

// Simulación de almacenamiento local para persistir planes de acción
const getStoredPlans = (): ActionPlanData[] => {
  const storedPlans = localStorage.getItem('actionPlans');
  if (!storedPlans) return [];
  
  // Convertir las fechas de string a objetos Date
  try {
    const parsed = JSON.parse(storedPlans);
    return parsed.map((plan: any) => ({
      ...plan,
      date: new Date(plan.date)
    }));
  } catch (error) {
    console.error("Error al parsear planes guardados:", error);
    return [];
  }
};

const savePlans = (plans: ActionPlanData[]) => {
  localStorage.setItem('actionPlans', JSON.stringify(plans));
};

const ActionPlan = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Obtener los planes de acción desde localStorage
  const [actionPlans, setActionPlans] = useState<ActionPlanData[]>([]);

  useEffect(() => {
    // Simular tiempo de carga
    setTimeout(() => {
      const storedPlans = getStoredPlans();
      setActionPlans(storedPlans);
      
      // Si hay planes almacenados y venimos de crear uno nuevo,
      // establecer la fecha seleccionada como la del plan más reciente
      if (storedPlans.length > 0) {
        // Ordenar planes por fecha (más reciente primero)
        const sortedPlans = [...storedPlans].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setSelectedDate(new Date(sortedPlans[0].date));
      }
      
      setIsLoading(false);
    }, 1000);
  }, []);

  // Get the action plan for the selected date
  const currentPlan = actionPlans.find(plan => 
    plan.date.toDateString() === selectedDate.toDateString()
  );
  
  // Days with action plans for the calendar
  const datesWithPlans = actionPlans.map(plan => plan.date);

  // Handle task completion
  const handleTaskChange = (taskId: string, completed: boolean) => {
    if (!currentPlan) return;
    
    const updatedPlans = actionPlans.map(plan => {
      if (plan.id === currentPlan.id) {
        const updatedTasks = plan.tasks.map(task => 
          task.id === taskId ? { ...task, completed } : task
        );
        
        // Check if all tasks are completed
        const allCompleted = updatedTasks.every(task => task.completed);
        
        return { 
          ...plan, 
          tasks: updatedTasks,
          completed: allCompleted
        };
      }
      return plan;
    });
    
    setActionPlans(updatedPlans);
    savePlans(updatedPlans);
    
    // If all tasks are completed, show the feedback form
    const updatedPlan = updatedPlans.find(p => p.id === currentPlan.id);
    if (updatedPlan?.completed && !updatedPlan.feedback) {
      setShowFeedbackForm(true);
      toast({
        title: "¡Enhorabuena!",
        description: "Has completado todas las tareas de tu plan de acción. ¡Buen trabajo!",
      });
    }
  };
  
  // Save feedback
  const handleSaveFeedback = () => {
    if (!currentPlan) return;
    
    const updatedPlans = actionPlans.map(plan => {
      if (plan.id === currentPlan.id) {
        return { 
          ...plan, 
          feedback 
        };
      }
      return plan;
    });
    
    setActionPlans(updatedPlans);
    savePlans(updatedPlans);
    setShowFeedbackForm(false);
    
    toast({
      title: "Feedback guardado",
      description: "Tu feedback ha sido guardado correctamente.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Plan de Acción</h1>
      
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
              {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: es })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
              className="p-3 pointer-events-auto"
              modifiers={{
                highlighted: datesWithPlans
              }}
              modifiersClassNames={{
                highlighted: "bg-green-100 text-green-800 font-medium"
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {isLoading ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Cargando tu plan de acción...</p>
          </CardContent>
        </Card>
      ) : currentPlan ? (
        <Card>
          <CardHeader>
            <CardTitle>{currentPlan.title}</CardTitle>
            <CardDescription>
              {currentPlan.description}
            </CardDescription>
            <div className="text-sm text-muted-foreground">
              Creado: {format(currentPlan.date, "dd MMM yyyy", { locale: es })}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentPlan.tasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={task.id} 
                    checked={task.completed}
                    onCheckedChange={(checked) => handleTaskChange(task.id, checked === true)}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={task.id}
                    className={cn(
                      "text-base",
                      task.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {task.text}
                  </Label>
                </div>
              ))}
            </div>
            
            {currentPlan.completed && currentPlan.feedback && (
              <div className="mt-6 p-4 bg-green-50 rounded-md">
                <h3 className="font-medium text-green-900 mb-2">Tu feedback:</h3>
                <p className="text-green-800">{currentPlan.feedback}</p>
              </div>
            )}
            
            {showFeedbackForm && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">¡Enhorabuena por completar el plan! ¿Qué resultados has obtenido?</h3>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Comparte tus resultados y aprendizajes..."
                  className="w-full mb-2"
                />
                <Button onClick={handleSaveFeedback}>Guardar Feedback</Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No hay plan de acción para esta fecha</CardTitle>
            <CardDescription>
              Selecciona una fecha con un plan de acción o habla con Selly para crear uno nuevo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8 flex-col gap-4">
              <CheckSquare className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground text-center">
                Los días con planes de acción se muestran en verde en el calendario.
              </p>
              <Button className="mt-2" onClick={() => window.location.href = "/selly"}>
                <Bot className="mr-2 h-4 w-4" />
                Hablar con Selly
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ActionPlan;
