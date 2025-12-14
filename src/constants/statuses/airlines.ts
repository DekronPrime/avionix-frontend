export const airlineStatusColors: Record<
  string,
  { text: string; bg: string; tooltip?: string }
> = {
  ACTIVE: {
    text: "text-success",
    bg: "bg-success",
    tooltip: "The airline operates, has a license and can operate flights",
  },
  SUSPENDED: {
    text: "text-danger",
    bg: "bg-danger",
    tooltip: "Temporarily suspended (due to violation or inspection)",
  },
  BANKRUPT: {
    text: "text-limited",
    bg: "bg-limited",
    tooltip: "Bankruptcy has been declared, the company does not fly",
  },
  CLOSED: {
    text: "text-dark",
    bg: "bg-dark",
    tooltip: "The company ceased operations",
  },
};
