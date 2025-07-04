import { useEffect, useState } from "react";
import CategoryNav from "./CategoryNav";
import CardsContainer from "./CardsContainer";

export default function Dashboard({ category }) {
  const [currentCategory, setCurrentCategory] = useState(category);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCurrentCategory(category);
    // Reset search when category changes
    setSearchTerm("");

    // Check if there's a global search term in sessionStorage
    const globalSearchTerm = sessionStorage.getItem("globalSearchTerm");
    if (globalSearchTerm) {
      setSearchTerm(globalSearchTerm);
      // Clear it after using it
      sessionStorage.removeItem("globalSearchTerm");
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
  }, [category]);

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
