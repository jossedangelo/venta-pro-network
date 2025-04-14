
import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container flex">
        {/* Layout principal con sidebar fijo y contenido */}
        <div className="flex w-full">
          {/* Sidebar fijo en desktop */}
          <aside className="hidden md:block w-[280px] shrink-0">
            <div className="sticky top-16 overflow-auto h-[calc(100vh-4rem)] py-4 pr-6">
              <SidebarMenu />
            </div>
          </aside>
          
          {/* Contenido principal */}
          <main className="flex-1 py-4 px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
