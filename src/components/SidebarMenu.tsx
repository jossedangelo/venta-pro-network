
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, 
  BriefcaseBusiness, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings, 
  TrendingUp 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Home className="mr-2 h-4 w-4" />
                Inicio
              </Button>
            </Link>
            <Link to="/red">
              <Button 
                variant={isActive("/red") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Mi Red
              </Button>
            </Link>
            <Link to="/empleos">
              <Button 
                variant={isActive("/empleos") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                Empleos
              </Button>
            </Link>
            <Link to="/mensajes">
              <Button 
                variant={isActive("/mensajes") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Mensajes
              </Button>
            </Link>
            <Link to="/notificaciones">
              <Button 
                variant={isActive("/notificaciones") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notificaciones
              </Button>
            </Link>
            <Link to="/estadisticas">
              <Button 
                variant={isActive("/estadisticas") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Estadísticas
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Configuración
          </h2>
          <div className="space-y-1">
            <Link to="/configuracion">
              <Button 
                variant={isActive("/configuracion") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Ajustes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
