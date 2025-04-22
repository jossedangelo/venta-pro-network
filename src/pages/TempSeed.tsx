
import { createFakeUsers } from "@/lib/seedUsers";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const TempSeed = () => {
  const navigate = useNavigate();

  const handleCreateUsers = async () => {
    try {
      await createFakeUsers();
      toast({
        title: "Usuarios creados con éxito",
        description: "Los usuarios de prueba han sido creados"
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating users:", error);
      toast({
        title: "Error",
        description: "Hubo un error al crear los usuarios",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e9e9f7] to-[#f2f5fa]">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Crear Usuarios de Prueba</h1>
        <Button onClick={handleCreateUsers}>
          Crear Usuarios
        </Button>
      </div>
    </div>
  );
};

export default TempSeed;
