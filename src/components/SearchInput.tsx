
import { useSearch } from "@/contexts/SearchContext";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SearchResults from "./SearchResults";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
}

const SearchInput = ({ placeholder = "Buscar...", className = "", onFocus }: SearchInputProps) => {
  const { query, setQuery, performSearch, isSearching, setIsSearching, closeSearch } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle search query changes
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      performSearch(query);
    }, 300);
    
    return () => clearTimeout(delaySearch);
  }, [query, performSearch]);
  
  // Handle clicks outside the search area to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleFocus = () => {
    setIsFocused(true);
    setIsSearching(true);
    if (onFocus) onFocus();
  };
  
  const handleClearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };
  
  return (
    <div className="relative" ref={inputRef}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className={`pl-8 pr-8 ${className}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
        />
        {query && (
          <button 
            className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {isFocused && isSearching && <SearchResults />}
    </div>
  );
};

export default SearchInput;
