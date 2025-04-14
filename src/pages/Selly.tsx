
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, CheckSquare, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: Date;
  showActionPlanButtons?: boolean;
}

interface ActionTask {
  id: string;
  text: string;
  completed: false;
}

interface ActionPlan {
  id: string;
  date: Date;
  title: string;
  description: string;
  tasks: ActionTask[];
  completed: false;
  feedback: string;
}

// Simulación de almacenamiento local para persistir el plan creado
const getStoredPlans = (): ActionPlan[] => {
  const storedPlans = localStorage.getItem('actionPlans');
  return storedPlans ? JSON.parse(storedPlans) : [];
};

const savePlans = (plans: ActionPlan[]) => {
  localStorage.setItem('actionPlans', JSON.stringify(plans));
};

const Selly = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "¡Hola! Soy Selly, tu asistente virtual para ventas. ¿En qué puedo ayudarte hoy? Puedo ofrecerte consejos para mejorar tus ventas, ayudarte a crear rutinas de trabajo efectivas, recomendarte cursos de formación o analizar tus métricas para brindarte insights valiosos.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ejemplos de cómo Selly puede ayudar
  const suggestions = [
    "¿Cómo puedo mejorar mi tasa de conversión?",
    "Necesito una rutina diaria para optimizar mis ventas",
    "Recomiéndame cursos para mejorar mis habilidades de negociación",
    "Ayúdame a analizar mis resultados de ventas",
    "Consejos para cerrar ventas con clientes difíciles"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    // Simular respuesta del asistente (en una aplicación real, esto se conectaría a una API)
    setTimeout(() => {
      const response = getAIResponse(input);
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: suggestion,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Simular respuesta del asistente
    setTimeout(() => {
      const response = getAIResponse(suggestion);
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleCreateActionPlan = () => {
    setIsCreatingPlan(true);
    
    // Extraer la última consulta del usuario para personalizar el plan
    const lastUserMessageContent = messages
      .filter(m => m.sender === "user")
      .pop()?.content || "mejorar ventas";
    
    // En una aplicación real, crearías un plan de acción basado en la conversación actual
    // y lo guardarías en una base de datos
    const today = new Date();
    const newActionPlan: ActionPlan = {
      id: Date.now().toString(),
      date: today,
      title: lastUserMessageContent.includes("conversión") 
        ? "Plan para mejorar tasa de conversión"
        : lastUserMessageContent.includes("rutina")
        ? "Plan de rutina diaria para ventas" 
        : lastUserMessageContent.includes("difíciles")
        ? "Plan para manejar clientes difíciles"
        : "Plan para mejorar resultados de ventas",
      description: "Basado en nuestra conversación sobre estrategias de ventas",
      tasks: lastUserMessageContent.includes("difíciles") ? [
        { id: "t1", text: "Escucha activamente sus preocupaciones sin interrumpir", completed: false },
        { id: "t2", text: "Reconoce sus objeciones como válidas", completed: false },
        { id: "t3", text: "Haz preguntas para entender el verdadero problema", completed: false },
        { id: "t4", text: "Personaliza tu solución a sus necesidades específicas", completed: false },
        { id: "t5", text: "Ofrece testimonios o casos de éxito similares", completed: false },
        { id: "t6", text: "No presiones, pero mantén el control", completed: false },
        { id: "t7", text: "Considera opciones flexibles si el precio es un obstáculo", completed: false }
      ] : [
        { id: "t1", text: "Analizar los últimos 20 casos perdidos", completed: false },
        { id: "t2", text: "Revisar el script de la primera llamada", completed: false },
        { id: "t3", text: "Preparar 3 nuevos argumentos de venta", completed: false },
        { id: "t4", text: "Practicar manejo de objeciones comunes", completed: false },
        { id: "t5", text: "Implementar seguimiento automatizado", completed: false }
      ],
      completed: false,
      feedback: ""
    };

    // Guardar el plan en localStorage
    const existingPlans = getStoredPlans();
    const updatedPlans = [newActionPlan, ...existingPlans];
    savePlans(updatedPlans);
    
    // Añadir mensaje de confirmación con estado de carga
    const loadingMessage: Message = {
      id: Date.now().toString(),
      sender: "assistant",
      content: `Estoy creando tu plan de acción personalizado...`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, loadingMessage]);
    
    // Simular tiempo de creación del plan
    setTimeout(() => {
      // Reemplazar mensaje de carga con confirmación
      setMessages((prev) => {
        const withoutLoading = prev.filter(msg => msg.id !== loadingMessage.id);
        return [...withoutLoading, {
          id: Date.now().toString(),
          sender: "assistant",
          content: `¡Perfecto! He creado un plan de acción para ti con ${newActionPlan.tasks.length} tareas específicas. Puedes verlo en la sección "Mi Plan de Acción".`,
          timestamp: new Date(),
        }];
      });
      
      setIsCreatingPlan(false);
      
      toast({
        title: "Plan de acción creado",
        description: "Tu nuevo plan de acción está disponible en la sección 'Mi Plan de Acción'.",
      });
      
      // En una app real, podrías redirigir al usuario a la página del plan de acción
      setTimeout(() => {
        navigate("/plan-accion");
      }, 2000);
    }, 2000);
  };

  const handleSkipActionPlan = () => {
    const message: Message = {
      id: Date.now().toString(),
      sender: "assistant",
      content: "Sin problema. Si cambias de opinión, puedes pedirme en cualquier momento que cree un plan de acción para ti.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
  };

  // Función que simula respuestas de IA (en una app real se conectaría a una API)
  const getAIResponse = (userMessage: string): Message => {
    let responseContent = "";
    let showActionPlanButtons = false;

    if (userMessage.toLowerCase().includes("tasa de conversión")) {
      responseContent = "Para mejorar tu tasa de conversión, te recomiendo:\n\n1. Califica mejor a tus prospectos antes de dedicarles tiempo\n2. Personaliza tu propuesta de valor para cada cliente\n3. Haz seguimiento constante y estructurado\n4. Analiza dónde pierdes más clientes en tu embudo de ventas\n5. Prueba diferentes enfoques y mide los resultados\n\n¿Quieres que te prepare un plan de acción con tareas específicas para mejorar tu tasa de conversión?";
      showActionPlanButtons = true;
    } 
    else if (userMessage.toLowerCase().includes("rutina")) {
      responseContent = "Una rutina diaria efectiva para vendedores profesionales:\n\n7:00-8:00 - Planificación del día y revisión de objetivos\n8:00-9:00 - Investigación de prospectos prioritarios\n9:00-12:00 - Llamadas y reuniones con clientes potenciales\n12:00-13:00 - Almuerzo y descanso mental\n13:00-15:00 - Seguimiento de propuestas enviadas\n15:00-16:00 - Administración y CRM\n16:00-17:00 - Prospección para el día siguiente\n17:00-18:00 - Análisis de resultados y planificación\n\n¿Te gustaría que cree un plan de acción con esta rutina para que puedas implementarla?";
      showActionPlanButtons = true;
    }
    else if (userMessage.toLowerCase().includes("curso") || userMessage.toLowerCase().includes("formación")) {
      responseContent = "Cursos recomendados para mejorar tus habilidades:\n\n1. \"Técnicas avanzadas de negociación\" - Universidad de Harvard (online)\n2. \"Venta consultiva en entornos B2B\" - ESADE\n3. \"Prospección estratégica en ventas\" - LinkedIn Learning\n4. \"Gestión de objeciones y cierre de ventas\" - Coursera\n5. \"Storytelling para vendedores\" - Udemy\n\n¿Quieres que prepare un plan de acción para que sigas estos cursos de manera estructurada?";
      showActionPlanButtons = true;
    }
    else if (userMessage.toLowerCase().includes("analizar") || userMessage.toLowerCase().includes("resultados")) {
      responseContent = "Basándome en tus datos recientes, observo que:\n\n- Tu ratio de conversión de llamadas a reuniones es del 18%, por debajo del objetivo del 25%\n- Tu ciclo de venta promedio es de 45 días, lo cual es excelente\n- Tus ventas son más efectivas en martes y jueves\n- El sector donde más cierras es tecnología\n\nRecomendaría enfocar más esfuerzo en la primera etapa de cualificación y mejorar tu discurso inicial para conseguir más reuniones.\n\n¿Quieres que prepare un plan de acción para mejorar estas métricas?";
      showActionPlanButtons = true;
    }
    else if (userMessage.toLowerCase().includes("clientes difíciles")) {
      responseContent = "Para cerrar ventas con clientes difíciles:\n\n1. Escucha activamente sus preocupaciones sin interrumpir\n2. Reconoce sus objeciones como válidas\n3. Haz preguntas para entender el verdadero problema\n4. Personaliza tu solución a sus necesidades específicas\n5. Ofrece testimonios o casos de éxito similares\n6. No presiones, pero mantén el control de los siguientes pasos\n7. Considera opciones flexibles si el precio es un obstáculo\n\n¿Te gustaría que cree un plan de acción con estos puntos para que puedas implementarlos?";
      showActionPlanButtons = true;
    }
    else {
      responseContent = "Gracias por tu pregunta. Como asistente especializado en ventas, puedo ayudarte con:\n\n- Análisis de tus métricas de ventas\n- Recomendaciones para mejorar tu proceso comercial\n- Estrategias de prospección y cualificación\n- Técnicas de negociación y cierre\n- Cursos y recursos de formación\n\n¿Podrías ser más específico sobre qué área de ventas te gustaría mejorar?";
    }

    return {
      id: (Date.now() + 1).toString(),
      sender: "assistant",
      content: responseContent,
      timestamp: new Date(),
      showActionPlanButtons
    };
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex flex-col h-[calc(100vh-12rem)] border rounded-lg overflow-hidden">
        <div className="bg-primary p-4 text-white flex items-center">
          <Bot className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-bold">Selly</h2>
          <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">Asistente de ventas IA</span>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.sender === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    
                    {message.showActionPlanButtons && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          onClick={handleCreateActionPlan}
                          className="flex items-center gap-1"
                          disabled={isCreatingPlan}
                        >
                          {isCreatingPlan ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckSquare className="h-4 w-4" />
                          )}
                          {isCreatingPlan ? "Creando plan..." : "Sí, crea un plan de acción"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={handleSkipActionPlan}
                          disabled={isCreatingPlan}
                        >
                          No hace falta
                        </Button>
                      </div>
                    )}
                    
                    <div className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                  </div>
                  
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length === 1 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Prueba estas preguntas:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje a Selly..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selly;
