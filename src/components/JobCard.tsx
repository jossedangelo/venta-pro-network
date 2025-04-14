
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Building, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: {
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    postedTime: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
          <Briefcase className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <Link to="/empleos/detalle" className="font-semibold hover:underline text-lg">
            {job.title}
          </Link>
          <div className="flex items-center text-sm text-muted-foreground">
            <Building className="mr-1 h-4 w-4" />
            {job.company}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {job.location}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="font-medium">Salario estimado: {job.salary}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">
            {job.type}
          </Badge>
          <Badge variant="outline" className="text-xs flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {job.postedTime}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" size="sm">Guardar</Button>
        <Button size="sm">Aplicar ahora</Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
