import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
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
import ActionPlan from "./pages/ActionPlan";
import Events from "./pages/Events";
import EventDetailPage from "./pages/EventDetailPage";
import { SearchProvider } from "./contexts/SearchContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isAuthenticated } from "./lib/auth";
import { Navigate, useLocation } from "react-router-dom";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
              <Route path="/" element={<Index />} />
              <Route path="/red" element={<Network />} />
              <Route path="/empleos" element={<Jobs />} />
              <Route path="/mensajes" element={<Messages />} />
              <Route path="/notificaciones" element={<Notifications />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/eventos/:id" element={<EventDetailPage />} />
              <Route path="/estadisticas" element={<Statistics />} />
              <Route path="/resultados" element={<Results />} />
              <Route path="/objetivos" element={<Goals />} />
              <Route path="/selly" element={<Selly />} />
              <Route path="/plan-accion" element={<ActionPlan />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SearchProvider>
  </QueryClientProvider>
);

export default App;
