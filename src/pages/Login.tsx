
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(values.email, values.password);
      toast({
        title: "Has iniciado sesión",
        description: "Bienvenido/a de nuevo"
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e9e9f7] to-[#f2f5fa] py-8">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <LogIn className="mx-auto mb-2 text-primary" size={32}/>
          <CardTitle>Iniciar sesión</CardTitle>
          <p className="text-muted-foreground text-sm mt-1">Accede a tu cuenta</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Correo electrónico</label>
              <Input type="email" name="email" placeholder="tu@email.com" value={values.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <Input type="password" name="password" placeholder="••••••••" value={values.password} onChange={handleChange} required />
            </div>
            {error && <div className="text-sm text-destructive">{error}</div>}
            <Button className="w-full mt-2" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <div className="text-center text-sm mt-4">
            ¿No tienes cuenta?{" "}
            <Link className="text-primary underline hover:opacity-90" to="/register">Regístrate</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
