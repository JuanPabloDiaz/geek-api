import { useEffect, useState } from "react";
import CategoryNav from "./CategoryNav";
import CardsContainer from "./CardsContainer";

export default function Dashboard({ category }) {
  const [currentCategory, setCurrentCategory] = useState(category);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentCategory(category);
    // Reset search when category changes
    setSearchTerm("");

    // Only run browser-specific code after mounting
    if (!isMounted) return;

    // Check if there's a global search term in sessionStorage
    try {
      const globalSearchTerm = sessionStorage.getItem("globalSearchTerm");
      if (globalSearchTerm) {
        setSearchTerm(globalSearchTerm);
        // Clear it after using it
        sessionStorage.removeItem("globalSearchTerm");
      }
    } catch (error) {
      // Handle cases where sessionStorage might not be available
      console.warn("SessionStorage not available:", error);
    }

    // Listen for global search events
    const handleGlobalSearch = (event) => {
      setSearchTerm(event.detail);
    };

    window.addEventListener("globalSearch", handleGlobalSearch);

    // Cleanup
    return () => {
      window.removeEventListener("globalSearch", handleGlobalSearch);
    };
  }, [category, isMounted]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <div className="dashboard-header">
        <CategoryNav filter={category} />
      </div>
      <CardsContainer filter={category} searchTerm={searchTerm} />
    </>
  );
}
