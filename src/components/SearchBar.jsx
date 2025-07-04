import { useState, useEffect } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch = null }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGlobal, setIsGlobal] = useState(false);

  // Determine if this is the global search in the header
  useEffect(() => {
    setIsGlobal(onSearch === null);
  }, [onSearch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If this is used in Dashboard with onSearch prop
    if (onSearch) {
      onSearch(value);
    } else {
      // For global search in header, store in sessionStorage
      sessionStorage.setItem("globalSearchTerm", value);
      // Dispatch a custom event that Dashboard can listen for
      window.dispatchEvent(new CustomEvent("globalSearch", { detail: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(searchTerm);
    } else {
      sessionStorage.setItem("globalSearchTerm", searchTerm);
      window.dispatchEvent(
        new CustomEvent("globalSearch", { detail: searchTerm }),
      );
    }
  };

  return (
    <div className="search-container">
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
