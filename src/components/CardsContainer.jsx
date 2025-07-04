import { useMemo, useState } from "react";
import Card from "./Card";
import "./CardsContainer.css";
// import data from "../data/tools.json";
import data from "../data/resources.json";

export default function CardsContainer({ filter, searchTerm = "" }) {
  const [resultsCount, setResultsCount] = useState(0);

  const filteredCards = useMemo(() => {
    // First filter by category
    const categoryFiltered = data.entries.filter((item) => {
      if (filter === "all") return true;
      // Convert filter back to original category format for comparison
      const originalCategory = item.Category;
      const normalizedFilter = originalCategory
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");
      return filter === normalizedFilter;
    });

    // Then filter by search term if provided
    const searchFiltered =
      searchTerm.trim() !== ""
        ? categoryFiltered.filter((item) => {
            const searchLower = searchTerm.toLowerCase();
            return (
              item.API.toLowerCase().includes(searchLower) ||
              item.Description.toLowerCase().includes(searchLower) ||
              item.Category.toLowerCase().includes(searchLower)
            );
          })
        : categoryFiltered;

    // Update results count
    setTimeout(() => setResultsCount(searchFiltered.length), 0);

    // Map and sort the results
    return searchFiltered
      .map((item) => ({
        url: item.Link,
        title: item.API,
        body: item.Description,
        category: item.Category,
        tag: item.Auth || "No Auth",
        auth: item.Auth,
        https: item.HTTPS,
        cors: item.Cors,
        "date-added": null, // resources.json doesn't have date-added field
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [filter, searchTerm]);

  return (
    <section>
      {searchTerm.trim() !== "" && (
        <div className="search-results-info">
          <span className="terminal-prompt">$</span> Found {resultsCount} result
          {resultsCount !== 1 ? "s" : ""} for "{searchTerm}"
        </div>
      )}

      {filteredCards.length > 0 ? (
        <ul role="list" className="link-card-grid">
          {filteredCards.map(
            (
              {
                url,
                title,
                body,
                category,
                tag,
                auth,
                https,
                cors,
                "date-added": dateAdded,
              },
              i,
            ) => (
              <Card
                key={`${title}-${i}`}
                href={url}
                title={title}
                body={body}
                category={category}
                tag={tag}
                auth={auth}
                https={https}
                cors={cors}
                dateAdded={dateAdded}
              />
            ),
          )}
        </ul>
      ) : (
        <div className="no-results">
          <p>
            <span className="terminal-prompt">$</span> No APIs found matching
            your search criteria
          </p>
          <p>
            <span className="terminal-prompt">&gt;</span> Try adjusting your
            search term or category
          </p>
        </div>
      )}
    </section>
  );
}
