
import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import SidebarMenu from "@/components/SidebarMenu";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <div className="flex-1 flex">
        {/* Layout with sidebars and central content */}
        <div className="flex w-full bg-[#f6f7f8]">
          {/* Left sidebar */}
          <aside className="hidden md:block w-64 shrink-0 bg-white border-r">
            <div className="sticky top-16 overflow-auto h-[calc(100vh-4rem)] py-4">
              <SidebarMenu />
            </div>
          </aside>
          
          {/* Main content - wider central area with symmetric padding */}
          <main className="flex-1 p-4 md:p-6 overflow-x-hidden bg-[#f6f7f8]">
            <div className="mx-auto max-w-5xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
