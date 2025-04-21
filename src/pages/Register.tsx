
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { register } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(values.email, values.password, values.name);
      toast({
        title: "Registro exitoso",
        description: "Revisa tu correo para confirmar tu cuenta."
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e9e9f7] to-[#f2f5fa] py-8">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto mb-2 text-primary" size={32}/>
          <CardTitle>Crear cuenta</CardTitle>
          <p className="text-muted-foreground text-sm mt-1">Regístrate para acceder a la comunidad</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <Input type="text" name="name" placeholder="Tu nombre" value={values.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo electrónico</label>
              <Input type="email" name="email" placeholder="tu@email.com" value={values.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <Input type="password" name="password" placeholder="••••••••" value={values.password} onChange={handleChange} required minLength={4}/>
            </div>
            {error && <div className="text-sm text-destructive">{error}</div>}
            <Button className="w-full mt-2" type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
          <div className="text-center text-sm mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link className="text-primary underline hover:opacity-90" to="/login">Iniciar sesión</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
