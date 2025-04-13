
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="flex items-center space-x-1">
          {trend === "up" && (
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          )}
          {percentage && <span className={trend === "up" ? "text-emerald-500" : "text-red-500"}>{percentage}</span>}
          <span>{description}</span>
        </CardDescription>
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
        icon={<Target className="h-4 w-4 text-muted-foreground" />}
        trend="up"
        percentage="+4%"
      />
      <MetricCard
        title="Visitas a tu perfil"
        value="289"
        description="últimos 7 días"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        trend="up"
        percentage="+12%"
      />
      <MetricCard
        title="Logros de ventas"
        value="4"
        description="este trimestre"
        icon={<Award className="h-4 w-4 text-muted-foreground" />}
        trend="up"
        percentage="+1"
      />
      <MetricCard
        title="Venta media"
        value="$8,942"
        description="vs. $7,651 anterior"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        trend="up"
        percentage="+16.8%"
      />
    </div>
  );
};

export default Metrics;
