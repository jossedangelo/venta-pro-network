
import { createContext, useContext, useState, ReactNode } from "react";

// Define types for our search results
export type SearchResultPerson = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  mutualConnections: number;
  isConnected: boolean;
};

export type SearchResultJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedTime: string;
};

export type SearchResultCompany = {
  id: string;
  name: string;
  industry: string;
  logo: string;
  employees: number;
};

export type SearchResults = {
  people: SearchResultPerson[];
  jobs: SearchResultJob[];
  companies: SearchResultCompany[];
};

interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  results: SearchResults;
  setResults: (results: SearchResults) => void;
  performSearch: (searchQuery: string) => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// Mock data for search results
const mockPeople: SearchResultPerson[] = [
  {
    id: "1",
    name: "Luis Fernández",
    role: "Key Account Manager",
    company: "TechSolutions",
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    mutualConnections: 23,
    isConnected: false
  },
  {
    id: "2",
    name: "Carmen Jiménez",
    role: "Sales Director",
    company: "Global Tech",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    mutualConnections: 17,
    isConnected: false
  },
  {
    id: "3",
    name: "Miguel Ángel López",
    role: "Business Development",
    company: "InnovaSales",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    mutualConnections: 9,
    isConnected: false
  },
  {
    id: "4",
    name: "Sofía Martín",
    role: "Account Executive",
    company: "SalesForce",
    avatar: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    mutualConnections: 14,
    isConnected: false
  },
  {
    id: "5",
    name: "Pablo Ruiz",
    role: "Regional Sales Manager",
    company: "Enterprise Solutions",
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80",
    mutualConnections: 21,
    isConnected: false
  }
];

const mockJobs: SearchResultJob[] = [
  {
    id: "1",
    title: "Director de Ventas",
    company: "TechSolutions",
    location: "Madrid, España",
    salary: "65.000€ - 80.000€ al año",
    type: "Tiempo completo",
    postedTime: "Hace 2 días"
  },
  {
    id: "2",
    title: "Key Account Manager",
    company: "SaaS Enterprise",
    location: "Barcelona, España",
    salary: "45.000€ - 60.000€ al año",
    type: "Tiempo completo",
    postedTime: "Hace 3 días"
  },
  {
    id: "3",
    title: "Business Development Representative",
    company: "Cloud Services",
    location: "Remoto",
    salary: "35.000€ - 45.000€ al año",
    type: "Tiempo completo",
    postedTime: "Hace 5 días"
  }
];

const mockCompanies: SearchResultCompany[] = [
  {
    id: "1",
    name: "TechSolutions",
    industry: "Tecnología",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1974&auto=format&fit=crop",
    employees: 500
  },
  {
    id: "2",
    name: "Global Tech",
    industry: "Software",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1974&auto=format&fit=crop",
    employees: 1200
  },
  {
    id: "3",
    name: "InnovaSales",
    industry: "Ventas",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1974&auto=format&fit=crop",
    employees: 120
  }
];

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults>({
    people: [],
    jobs: [],
    companies: []
  });

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults({ people: [], jobs: [], companies: [] });
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    
    // Filter people by name, role, or company
    const filteredPeople = mockPeople.filter(
      person => 
        person.name.toLowerCase().includes(lowercasedQuery) ||
        person.role.toLowerCase().includes(lowercasedQuery) ||
        person.company.toLowerCase().includes(lowercasedQuery)
    );
    
    // Filter jobs by title, company, or location
    const filteredJobs = mockJobs.filter(
      job => 
        job.title.toLowerCase().includes(lowercasedQuery) ||
        job.company.toLowerCase().includes(lowercasedQuery) ||
        job.location.toLowerCase().includes(lowercasedQuery)
    );
    
    // Filter companies by name or industry
    const filteredCompanies = mockCompanies.filter(
      company => 
        company.name.toLowerCase().includes(lowercasedQuery) ||
        company.industry.toLowerCase().includes(lowercasedQuery)
    );
    
    setResults({
      people: filteredPeople,
      jobs: filteredJobs,
      companies: filteredCompanies
    });
  };

  const closeSearch = () => {
    setQuery("");
    setIsSearching(false);
    setResults({ people: [], jobs: [], companies: [] });
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        isSearching,
        setIsSearching,
        results,
        setResults,
        performSearch,
        closeSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
