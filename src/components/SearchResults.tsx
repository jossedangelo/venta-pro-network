
import { useSearch, SearchResultPerson } from "@/contexts/SearchContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserPlus, X, Briefcase, Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SearchResults = () => {
  const { results, closeSearch } = useSearch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalResults = results.people.length + results.jobs.length + results.companies.length;
  
  const handleConnect = (person: SearchResultPerson) => {
    toast({
      title: "Invitación enviada",
      description: `Se ha enviado una invitación a ${person.name}`,
    });
  };
  
  const handlePersonClick = (personId: string) => {
    closeSearch();
    navigate("/perfil");
  };
  
  const handleJobClick = (jobId: string) => {
    closeSearch();
    navigate("/empleos");
  };
  
  const handleCompanyClick = (companyId: string) => {
    closeSearch();
    navigate("/empresas");
  };
  
  if (totalResults === 0) {
    return null;
  }
  
  return (
    <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-[80vh] overflow-y-auto shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Resultados de búsqueda</h3>
          <Button variant="ghost" size="icon" onClick={closeSearch}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue={results.people.length > 0 ? "people" : results.jobs.length > 0 ? "jobs" : "companies"}>
          <TabsList className="mb-4">
            <TabsTrigger value="people" disabled={results.people.length === 0}>
              Personas ({results.people.length})
            </TabsTrigger>
            <TabsTrigger value="jobs" disabled={results.jobs.length === 0}>
              Empleos ({results.jobs.length})
            </TabsTrigger>
            <TabsTrigger value="companies" disabled={results.companies.length === 0}>
              Empresas ({results.companies.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="people">
            <div className="space-y-4">
              {results.people.map((person) => (
                <div key={person.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center cursor-pointer" onClick={() => handlePersonClick(person.id)}>
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{person.name}</h4>
                      <p className="text-sm text-muted-foreground">{person.role} en {person.company}</p>
                      <p className="text-xs text-muted-foreground">{person.mutualConnections} conexiones en común</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    onClick={() => handleConnect(person)}
                  >
                    <UserPlus className="mr-1 h-4 w-4" />
                    Conectar
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="jobs">
            <div className="space-y-4">
              {results.jobs.map((job) => (
                <div key={job.id} className="flex items-start justify-between border-b pb-3 cursor-pointer" onClick={() => handleJobClick(job.id)}>
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-md mr-3">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm">{job.company} · {job.location}</p>
                      <p className="text-sm text-muted-foreground">{job.salary}</p>
                      <p className="text-xs text-muted-foreground">{job.postedTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="companies">
            <div className="space-y-4">
              {results.companies.map((company) => (
                <div key={company.id} className="flex items-center justify-between border-b pb-3 cursor-pointer" onClick={() => handleCompanyClick(company.id)}>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md overflow-hidden mr-3">
                      <img src={company.logo} alt={company.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">{company.name}</h4>
                      <p className="text-sm text-muted-foreground">{company.industry}</p>
                      <p className="text-xs text-muted-foreground">{company.employees} empleados</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="mr-1 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SearchResults;
