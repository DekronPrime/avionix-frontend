import { getNestedValue } from "./loadNestedValue";

export function filter<T>(
  data: T[],
  selectedStatus: string,
  searchQuery: string,
  searchFields: string[]
) {
  const q = searchQuery.trim().toLowerCase();

  return data.filter((item: any) => {
    const matchStatus =
      selectedStatus === "ALL" || item.status === selectedStatus;

    const matchSearch =
      q === "" ||
      searchFields.some((path) => {
        const value = getNestedValue(item, path);
        return String(value ?? "")
          .toLowerCase()
          .includes(q);
      });

    return matchStatus && matchSearch;
  });
}
