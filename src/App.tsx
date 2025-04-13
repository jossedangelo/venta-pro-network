
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Network from "./pages/Network";
import Jobs from "./pages/Jobs";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Results from "./pages/Results";
import Goals from "./pages/Goals";
import Selly from "./pages/Selly";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/red" element={<Network />} />
          <Route path="/empleos" element={<Jobs />} />
          <Route path="/mensajes" element={<Messages />} />
          <Route path="/notificaciones" element={<Notifications />} />
          <Route path="/estadisticas" element={<Statistics />} />
          <Route path="/resultados" element={<Results />} />
          <Route path="/objetivos" element={<Goals />} />
          <Route path="/selly" element={<Selly />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
