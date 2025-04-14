
import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <div className="flex-1 flex">
        {/* Layout principal con sidebar fijo y contenido */}
        <div className="flex w-full">
          {/* Sidebar fijo en desktop */}
          <aside className="hidden md:block w-[280px] shrink-0">
            <div className="sticky top-16 overflow-auto h-[calc(100vh-4rem)] py-4 pr-6">
              <SidebarMenu />
            </div>
          </aside>
          
          {/* Contenido principal */}
          <main className="flex-1 p-0 md:p-4 md:pt-6 overflow-x-hidden">
            <div className="md:max-w-4xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
