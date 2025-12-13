import { getNestedValue } from "./loadNestedValue";

export function sort(
  data: any[],
  sortField: string,
  sortDir: "asc" | "desc" | null
) {
  return data.sort((a, b) => {
    if (!sortField || !sortDir) return 0;

    const valA = getNestedValue(a, sortField);
    const valB = getNestedValue(b, sortField);

    if (valA == null && valB != null) return sortDir === "asc" ? -1 : 1;
    if (valA != null && valB == null) return sortDir === "asc" ? 1 : -1;

    const numA = Number(valA);
    const numB = Number(valB);

    const isNumber = !isNaN(numA) && !isNaN(numB) && valA !== "" && valB !== "";

    if (isNumber) {
      return sortDir === "asc" ? numA - numB : numB - numA;
    }

    const dateA = new Date(valA);
    const dateB = new Date(valB);

    const isDate = !isNaN(dateA.getTime()) && !isNaN(dateB.getTime());

    if (isDate) {
      return sortDir === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }

    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();

    if (strA < strB) return sortDir === "asc" ? -1 : 1;
    if (strA > strB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
}
