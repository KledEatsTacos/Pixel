import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LocationContextType {
  location: string;
  setLocation: (location: string) => void;
  availableCities: string[];
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Available cities globally
const availableCities = [
  "new york",
  "los angeles",
  "chicago",
  "houston",
  "phoenix",
  "philadelphia",
  "san antonio",
  "san diego",
  "dallas",
  "san jose",
  "austin",
  "jacksonville",
  "san francisco",
  "seattle",
  "denver",
  "boston",
  "miami",
  "atlanta",
  "toronto",
  "vancouver",
  "montreal",
  "london",
  "paris",
  "berlin",
  "madrid",
  "rome",
  "amsterdam",
  "barcelona",
  "sydney",
  "melbourne",
  "tokyo",
  "singapore",
  "hong kong",
  "dubai",
  "istanbul",
  "mumbai"
];

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<string>("new york");

  useEffect(() => {
    // Get location from localStorage only
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const updateLocation = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("userLocation", newLocation);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation: updateLocation, availableCities }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within LocationProvider");
  }
  return context;
}
