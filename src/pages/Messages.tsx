
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Paperclip, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ConversationProps {
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
}

const conversations: ConversationProps[] = [
  {
    name: "Ana Pérez",
    lastMessage: "Gracias por la información sobre el nuevo CRM",
    time: "10:42",
    unread: true
  },
  {
    name: "Carlos López",
    lastMessage: "¿Podemos agendar una llamada para mañana?",
    time: "Ayer",
    unread: true
  },
  {
    name: "María García",
    lastMessage: "Acabo de enviar la propuesta al cliente",
    time: "Ayer"
  },
  {
    name: "Juan Rodríguez",
    lastMessage: "Los números del Q2 son excelentes",
    time: "2 días"
  },
  {
    name: "Laura Martínez",
    lastMessage: "¿Qué te pareció la reunión con el equipo de marketing?",
    time: "3 días"
  }
];

const messages = [
  {
    sender: "Ana Pérez",
    content: "Hola Carlos, ¿cómo va todo con la implementación del nuevo CRM?",
    time: "10:30",
    isMe: false
  },
  {
    sender: "Me",
    content: "Hola Ana, va bien. Ya tenemos configurada la mayoría de los módulos.",
    time: "10:34",
    isMe: true
  },
  {
    sender: "Ana Pérez",
    content: "Excelente. ¿Tienes alguna documentación que pueda revisar antes de la próxima reunión?",
    time: "10:36",
    isMe: false
  },
  {
    sender: "Me",
    content: "Sí, puedo compartirte la guía de implementación y algunos casos de éxito que pueden ser útiles.",
    time: "10:38",
    isMe: true
  },
  {
    sender: "Ana Pérez",
    content: "Perfecto, eso sería muy útil. También me gustaría saber si podemos programar una breve demostración para el equipo de ventas la próxima semana.",
    time: "10:40",
    isMe: false
  },
  {
    sender: "Me",
    content: "Claro que sí. Tengo disponibilidad el martes y jueves. ¿Qué día les vendría mejor?",
    time: "10:41",
    isMe: true
  },
  {
    sender: "Ana Pérez",
    content: "Gracias por la información sobre el nuevo CRM. El jueves sería ideal para nosotros.",
    time: "10:42",
    isMe: false
  }
];

const ConversationItem = ({ name, avatar, lastMessage, time, unread }: ConversationProps) => (
  <div className={`flex items-center gap-3 p-3 cursor-pointer ${unread ? 'bg-primary/5' : 'hover:bg-secondary/50'}`}>
    <Avatar>
      <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
      <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
    </Avatar>
    <div className="flex-1 overflow-hidden">
      <div className="flex justify-between items-center">
        <span className={`font-medium ${unread ? 'text-primary font-semibold' : ''}`}>{name}</span>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
    </div>
    {unread && <div className="w-2 h-2 rounded-full bg-primary"></div>}
  </div>
);

const Messages = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Button asChild variant="outline" size="sm" className="mr-2">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Inicio
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Mensajes</h1>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Messages list */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <Card className="h-[calc(100vh-8rem)]">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar mensajes..."
                  className="pl-8"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-12rem)]">
              {conversations.map((conversation, index) => (
                <ConversationItem key={index} {...conversation} />
              ))}
            </div>
          </Card>
        </div>
        
        {/* Message content */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <Card className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="p-3 border-b flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="Ana Pérez" />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">Ana Pérez</h2>
                <p className="text-xs text-muted-foreground">Enterprise Sales Manager • TechSolutions</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isMe 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-secondary text-secondary-foreground rounded-tl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input placeholder="Escribe un mensaje..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
