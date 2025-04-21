
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, User, Briefcase, Menu, LogIn, UserPlus } from "lucide-react";
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
import SearchInput from "@/components/SearchInput";
import { isAuthenticated, logout } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

const NavBar = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const authed = isAuthenticated();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast({ title: "Sesión cerrada", description: "Has cerrado sesión exitosamente." });
    navigate("/login");
  };

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
                <Briefcase className="h-5 w-5 text-secondary" />
                <span className="font-bold text-lg" style={{color: '#1a294c'}}>Backxy</span>
              </Link>
              
              <div className="flex items-center space-x-1">
                {authed ? (
                  <>
                    <Link to="/notificaciones">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                        <Bell className="h-5 w-5" />
                      </Button>
                    </Link>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" alt="@usuario" />
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
                        <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                        <LogIn className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                        <UserPlus className="h-5 w-5" />
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetContent side="left" className="p-0 w-[280px]">
                <div className="h-full py-4">
                  <SidebarMenu closeSidebar={closeSidebar} />
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <>
            <div className="mr-4 flex">
              <Link to="/" className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6 text-secondary" />
                <span className="font-bold text-xl" style={{color: '#1a294c'}}>Backxy</span>
              </Link>
            </div>
            
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full md:w-80 lg:w-96">
                <SearchInput 
                  placeholder="Buscar vendedores, empresas, oportunidades..." 
                  className="w-full bg-background md:w-80 lg:w-96" 
                />
              </div>
              
              <nav className="flex items-center space-x-1">
                {authed ? (
                  <>
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
                            <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" alt="@usuario" />
                            <AvatarFallback>CR</AvatarFallback>
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
                        <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                        <LogIn className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                        <UserPlus className="h-5 w-5" />
                      </Button>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
