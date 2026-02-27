import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  className?: string;
  onSearch: (text: string) => void;
}

const Searchbar = ({ className, onSearch }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(e.currentTarget.value);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-color-muted)] group-focus-within:text-[var(--secondary-500)]"
      />
      <input
        onKeyDown={handleKeyDown}
        className="w-full bg-[var(--bg-chatlist-search-input)] rounded-2xl 
        placeholder-[var(--text-color-muted)] outline-none border-[1.5px] border-transparent
        focus:border-[var(--secondary-500)]
        py-2 pr-12 pl-4"
        placeholder="Search"
      />
    </div>
  );
};

export default Searchbar;
