
import { Card, CardContent } from "@/components/ui/card";
import ConnectionCard from "@/components/ConnectionCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SuggestedConnectionsProps {
  userCity: string;
  suggestedConnections: Array<any>;
}

const SuggestedConnections = ({ userCity, suggestedConnections }: SuggestedConnectionsProps) => {
  const cityConnections = suggestedConnections.filter(conn => conn.city === userCity).slice(0, 4);

  return (
    <Card className="mb-4 mt-4 bg-white rounded-lg shadow-sm">
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Conexiones en {userCity}</h3>
        <div className="grid gap-4">
          {cityConnections.map((person, index) => (
            <ConnectionCard key={index} person={person} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" asChild className="w-full mt-2">
            <Link to="/red" className="flex items-center justify-center">
              Ver más
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedConnections;
