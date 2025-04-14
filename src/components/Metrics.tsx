
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Target, Award } from "lucide-react";

interface MetricProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
  percentage?: string;
}

const MetricCard = ({ title, value, description, icon, trend, percentage }: MetricProps) => {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
        <div className="mb-2 flex items-center justify-center">{icon}</div>
        <h3 className="text-sm font-medium mb-1">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-center space-x-1 text-xs mt-1">
          {trend === "up" && (
            <TrendingUp className="h-3 w-3 text-emerald-500" />
          )}
          {percentage && <span className={trend === "up" ? "text-emerald-500" : "text-red-500"}>{percentage}</span>}
          <span className="text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Metrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Conversiones"
        value="68%"
        description="vs. 64% el mes pasado"
        icon={<Target className="h-4 w-4 text-primary" />}
        trend="up"
        percentage="+4%"
      />
      <MetricCard
        title="Visitas a tu perfil"
        value="289"
        description="últimos 7 días"
        icon={<Users className="h-4 w-4 text-primary" />}
        trend="up"
        percentage="+12%"
      />
      <MetricCard
        title="Logros de ventas"
        value="4"
        description="este trimestre"
        icon={<Award className="h-4 w-4 text-primary" />}
        trend="up"
        percentage="+1"
      />
      <MetricCard
        title="Venta media"
        value="$8,942"
        description="vs. $7,651 anterior"
        icon={<TrendingUp className="h-4 w-4 text-primary" />}
        trend="up"
        percentage="+16.8%"
      />
    </div>
  );
};

export default Metrics;
