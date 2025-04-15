
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
    <div className={cn("pb-12 w-auto", className)}>
      <div className="space-y-4 py-4">
        {/* Groups with minimal width */}
        <div className="px-1">
          <div className="space-y-1">
            <Button 
              variant={isActive("/") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/")}
            >
              <Home className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Inicio</span>
            </Button>
            <Button 
              variant={isActive("/red") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/red")}
            >
              <Users className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Red</span>
            </Button>
            <Button 
              variant={isActive("/empleos") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/empleos")}
            >
              <Briefcase className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Empleos</span>
            </Button>
            <Button 
              variant={isActive("/mensajes") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/mensajes")}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Mensajes</span>
            </Button>
            <Button 
              variant={isActive("/notificaciones") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/notificaciones")}
            >
              <Bell className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Notif.</span>
            </Button>
            <Button 
              variant={isActive("/eventos") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/eventos")}
            >
              <Calendar className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Eventos</span>
            </Button>
          </div>
        </div>

        {/* Performance group with minimal width */}
        <div className="px-1">
          <div className="space-y-1">
            <Button 
              variant={isActive("/resultados") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/resultados")}
            >
              <LineChart className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Result.</span>
            </Button>
            <Button 
              variant={isActive("/objetivos") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/objetivos")}
            >
              <Target className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Obj.</span>
            </Button>
            <Button 
              variant={isActive("/estadisticas") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/estadisticas")}
            >
              <BarChart className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Estad.</span>
            </Button>
            <Button 
              variant={isActive("/plan-accion") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/plan-accion")}
            >
              <CheckSquare className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Plan</span>
            </Button>
          </div>
        </div>

        {/* Minimal IA Assistant and Settings groups */}
        <div className="px-1">
          <div className="space-y-1">
            <Button 
              variant={isActive("/selly") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/selly")}
            >
              <Bot className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Selly</span>
            </Button>
            <Button 
              variant={isActive("/configuracion") ? "default" : "ghost"} 
              className="w-full justify-start px-2"
              onClick={() => handleMenuClick("/configuracion")}
            >
              <Settings className="mr-1 h-4 w-4" />
              <span className="text-xs truncate">Config</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
