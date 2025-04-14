import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface ConnectionCardProps {
  person: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
    mutualConnections: number;
  };
}

const ConnectionCard = ({ person }: ConnectionCardProps) => {
  return (
    <Card className="h-full shadow-light hover:shadow-medium transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
          <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center pb-2">
        <Link to="/perfil" className="font-medium hover:underline">{person.name}</Link>
        <p className="text-sm text-muted-foreground">{person.role}</p>
        <p className="text-sm text-muted-foreground">{person.company}</p>
        <p className="text-xs mt-2 text-muted-foreground">
          {person.mutualConnections} conexiones en común
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pt-2">
        <Button 
          variant="custom" 
          className="w-full" 
          size="sm"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Conectar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectionCard;
