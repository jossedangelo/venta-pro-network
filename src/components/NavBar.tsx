
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, MessageSquare, Search, User, Briefcase, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import SidebarMenu from "@/components/SidebarMenu";

const NavBar = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-14 items-center px-2 md:px-4">
        {isMobile ? (
          <>
            <div className="flex items-center justify-between w-full">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(true)}
                className="text-primary hover:text-primary/80"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
              
              <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-1.5">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg text-primary">VentaPro</span>
              </Link>
              
              <div className="flex items-center space-x-1">
                <Link to="/notificaciones">
                  <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                    <Bell className="h-5 w-5" />
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="@usuario" />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/perfil">Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/configuracion">Configuración</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetContent side="left" className="p-0 w-[280px]">
                <div className="h-full py-4">
                  <SidebarMenu />
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <>
            <div className="mr-4 flex">
              <Link to="/" className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl text-primary">VentaPro</span>
              </Link>
            </div>
            
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full md:w-80 lg:w-96">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar vendedores, empresas, oportunidades..."
                    className="w-full bg-background pl-8 md:w-80 lg:w-96"
                  />
                </div>
              </div>
              
              <nav className="flex items-center space-x-1">
                <Link to="/empleos">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Briefcase className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/red">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/mensajes">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/notificaciones">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Bell className="h-5 w-5" />
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="@usuario" />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/perfil">Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/configuracion">Configuración</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
