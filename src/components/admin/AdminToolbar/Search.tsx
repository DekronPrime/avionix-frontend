"use client";

import { useEffect, useState } from "react";

type SearchProps = {
  onSearch?: (value: string) => void;
  placeholder?: string;
  delay?: number;
};

export const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder,
  delay = 500,
}: SearchProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch?.(value);
    }, delay);

    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="flex flex-1 h-full">
      <input
        className="border-l-4 border-r-4 border-light focus:border-dark rounded-md p-4 pl-6 text-xl font-ptSerif font-semibold italic text-dark bg-light w-full h-full focus:ring-0 outline-none transition-all"
        placeholder={placeholder ? placeholder : "Search..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
