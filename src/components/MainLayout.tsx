
import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <div className="flex-1 flex">
        {/* Layout with minimal sidebar and expanded central content */}
        <div className="flex w-full bg-[#f6f7f8]">
          {/* Minimal sidebar in desktop */}
          <aside className="hidden md:block w-auto min-w-fit shrink-0 bg-white border-r">
            <div className="sticky top-16 overflow-auto h-[calc(100vh-4rem)] py-4">
              <SidebarMenu />
            </div>
          </aside>
          
          {/* Expanded main content */}
          <main className="flex-1 p-0 md:p-4 md:pt-6 overflow-x-hidden">
            <div className="mx-auto max-w-4xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
