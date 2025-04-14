
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings, 
  TrendingUp,
  LineChart,
  Target,
  BarChart,
  Bot,
  CheckSquare,
  Calendar
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet } from "@/components/ui/sheet";
import { useContext } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  closeSidebar?: () => void;
}

export function SidebarMenu({ className, closeSidebar }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleMenuClick = (path: string) => {
    if (closeSidebar) {
      closeSidebar();
    }
    navigate(path);
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {/* Grupo 1: Navegación principal */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Principal
          </h2>
          <div className="space-y-1">
            <Button 
              variant={isActive("/") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Button>
            <Button 
              variant={isActive("/red") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/red")}
            >
              <Users className="mr-2 h-4 w-4" />
              Mi Red
            </Button>
            <Button 
              variant={isActive("/empleos") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/empleos")}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Empleos
            </Button>
            <Button 
              variant={isActive("/mensajes") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/mensajes")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Mensajes
            </Button>
            <Button 
              variant={isActive("/notificaciones") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/notificaciones")}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notificaciones
            </Button>
            <Button 
              variant={isActive("/eventos") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/eventos")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Eventos
            </Button>
          </div>
        </div>

        {/* Grupo 2: Performance */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Performance
          </h2>
          <div className="space-y-1">
            <Button 
              variant={isActive("/resultados") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/resultados")}
            >
              <LineChart className="mr-2 h-4 w-4" />
              Mis Resultados
            </Button>
            <Button 
              variant={isActive("/objetivos") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/objetivos")}
            >
              <Target className="mr-2 h-4 w-4" />
              Objetivos
            </Button>
            <Button 
              variant={isActive("/estadisticas") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/estadisticas")}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Estadísticas
            </Button>
            <Button 
              variant={isActive("/plan-accion") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/plan-accion")}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Mi Plan de Acción
            </Button>
          </div>
        </div>

        {/* Grupo 3: Asistente IA */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Asistente
          </h2>
          <div className="space-y-1">
            <Button 
              variant={isActive("/selly") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/selly")}
            >
              <Bot className="mr-2 h-4 w-4" />
              Selly
            </Button>
          </div>
        </div>

        {/* Grupo 4: Configuración */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Configuración
          </h2>
          <div className="space-y-1">
            <Button 
              variant={isActive("/configuracion") ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleMenuClick("/configuracion")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Ajustes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
