
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container flex">
        {/* Sidebar para móvil (Sheet) */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[280px]">
            <div className="h-full py-4">
              <SidebarMenu />
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Botón para abrir sidebar en móvil */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-20 z-40 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>
        
        {/* Layout principal con sidebar fijo y contenido */}
        <div className="flex w-full">
          {/* Sidebar fijo en desktop */}
          <aside className="hidden md:block w-[280px] shrink-0">
            <div className="sticky top-16 overflow-auto h-[calc(100vh-4rem)] py-4 pr-6">
              <SidebarMenu />
            </div>
          </aside>
          
          {/* Contenido principal */}
          <main className="flex-1 py-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
