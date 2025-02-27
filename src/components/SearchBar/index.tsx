import { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onSearch: (value: string) => void;
  resultsCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  resultsCount,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(search);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, onSearch]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="SEARCH A CHARACTER"
      />
      <div className={styles.resultsCount}>{resultsCount} RESULTS</div>
    </div>
  );
};
