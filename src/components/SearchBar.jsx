import { useState, useEffect } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch = null }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGlobal, setIsGlobal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine if this is the global search in the header
  useEffect(() => {
    setIsGlobal(onSearch === null);
  }, [onSearch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Only run browser-specific code after mounting
    if (!isMounted) return;

    // If this is used in Dashboard with onSearch prop
    if (onSearch) {
      onSearch(value);
    } else {
      // For global search in header, store in sessionStorage
      try {
        sessionStorage.setItem("globalSearchTerm", value);
        // Dispatch a custom event that Dashboard can listen for
        window.dispatchEvent(
          new CustomEvent("globalSearch", { detail: value }),
        );
      } catch (error) {
        // Handle cases where sessionStorage might not be available
        console.warn("SessionStorage not available:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isMounted) return;

    if (onSearch) {
      onSearch(searchTerm);
    } else {
      try {
        sessionStorage.setItem("globalSearchTerm", searchTerm);
        window.dispatchEvent(
          new CustomEvent("globalSearch", { detail: searchTerm }),
        );
      } catch (error) {
        console.warn("Error handling search:", error);
      }
    }
  };

  return (
    <div className="search-container" suppressHydrationWarning={true}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <span className="terminal-prompt search-prompt">
            {isGlobal ? ">" : "$"}
          </span>
          <input
            type="text"
            className="search-input"
            placeholder={isGlobal ? "find api..." : "search apis..."}
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search APIs"
            suppressHydrationWarning={true}
          />
        </div>
        <button type="submit" className="search-button" title="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  );
}
