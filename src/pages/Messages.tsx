
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Paperclip, ArrowLeft, Clock, ThumbsUp, Smile, RotateCcw, MoreHorizontal } from "lucide-react";

interface ConversationProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
}

const conversations: ConversationProps[] = [
  {
    id: "1",
    name: "Ana Pérez",
    lastMessage: "Gracias por la información sobre el nuevo CRM",
    time: "10:42",
    unread: true
  },
  {
    id: "2",
    name: "Carlos López",
    lastMessage: "¿Podemos agendar una llamada para mañana?",
    time: "Ayer",
    unread: true
  },
  {
    id: "3",
    name: "María García",
    lastMessage: "Acabo de enviar la propuesta al cliente",
    time: "Ayer"
  },
  {
    id: "4",
    name: "Juan Rodríguez",
    lastMessage: "Los números del Q2 son excelentes",
    time: "2 días"
  },
  {
    id: "5",
    name: "Laura Martínez",
    lastMessage: "¿Qué te pareció la reunión con el equipo de marketing?",
    time: "3 días"
  }
];

interface MessageProps {
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
}

const messagesData: Record<string, MessageProps[]> = {
  "1": [
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
  ],
  "2": [
    {
      sender: "Carlos López",
      content: "Hola, estoy revisando el informe de ventas del último trimestre.",
      time: "Ayer 15:20",
      isMe: false
    },
    {
      sender: "Me",
      content: "¡Hola Carlos! Sí, acabo de finalizar ese informe. ¿Tienes alguna pregunta específica?",
      time: "Ayer 15:25",
      isMe: true
    },
    {
      sender: "Carlos López",
      content: "Me gustaría revisar algunos puntos contigo. ¿Podemos agendar una llamada para mañana?",
      time: "Ayer 15:30",
      isMe: false
    }
  ]
};

const ConversationItem = ({ conversation, onClick }: { conversation: ConversationProps, onClick: () => void }) => (
  <div 
    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b ${conversation.unread ? 'bg-white font-medium' : ''}`}
    onClick={onClick}
  >
    <Avatar className="h-12 w-12">
      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
      <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
    </Avatar>
    <div className="flex-1 overflow-hidden">
      <div className="flex justify-between items-center">
        <span className={`text-base ${conversation.unread ? 'font-semibold' : 'font-medium'}`}>{conversation.name}</span>
        <span className="text-xs text-gray-500">{conversation.time}</span>
      </div>
      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
    </div>
    {conversation.unread && <div className="w-2 h-2 rounded-full bg-primary"></div>}
  </div>
);

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<ConversationProps | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(
    conversation => conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold">Mensajes</h1>
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        {/* Messages list - always visible on desktop, hidden on mobile when conversation is selected */}
        <div className={`col-span-12 md:col-span-4 ${selectedConversation ? 'hidden md:block' : ''}`}>
          <Card className="h-[calc(100vh-8rem)] bg-white">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar mensajes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-12rem)]">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <ConversationItem 
                    key={conversation.id} 
                    conversation={conversation} 
                    onClick={() => setSelectedConversation(conversation)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <p className="text-gray-500">No hay mensajes disponibles</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Message content - visible when conversation is selected or on desktop */}
        {selectedConversation ? (
          <div className="col-span-12 md:col-span-8">
            <Card className="h-[calc(100vh-8rem)] flex flex-col bg-white shadow-sm">
              <div className="p-3 border-b flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBackToList}
                  className="md:hidden"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} alt={selectedConversation.name} />
                  <AvatarFallback>{selectedConversation.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-base">{selectedConversation.name}</h2>
                  <p className="text-xs text-gray-500">Enterprise Sales Manager • TechSolutions</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {messagesData[selectedConversation.id] ? (
                  messagesData[selectedConversation.id].map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!message.isMe && (
                        <Avatar className="h-10 w-10 mr-2 mt-1">
                          <AvatarImage src="/placeholder.svg" alt={message.sender} />
                          <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div 
                        className={`max-w-[80%] ${
                          message.isMe 
                            ? 'bg-[#1a294c] text-white rounded-2xl rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none'
                        }`}
                      >
                        {!message.isMe && (
                          <div className="px-3 pt-2">
                            <p className="font-medium">{message.sender} • {message.time}</p>
                          </div>
                        )}
                        <div className="p-3 pt-1">
                          <p>{message.content}</p>
                          {message.isMe && (
                            <p className="text-xs mt-1 text-right opacity-80">{message.time}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <p className="text-gray-500">No hay mensajes en esta conversación</p>
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t bg-white">
                <div className="flex gap-2 items-center">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Input placeholder="Escribe un mensaje..." className="flex-1 bg-gray-100 border-0" />
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Smile className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ThumbsUp className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button size="icon" className="rounded-full bg-primary">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="col-span-12 md:col-span-8 hidden md:flex">
            <Card className="h-[calc(100vh-8rem)] w-full flex flex-col items-center justify-center p-6 text-center bg-white">
              <p className="text-lg font-medium mb-2">Selecciona una conversación</p>
              <p className="text-gray-500">Elige un chat de la lista para ver los mensajes</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
