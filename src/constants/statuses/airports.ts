export const airportStatusColors: Record<
  string,
  { text: string; bg: string; tooltip?: string }
> = {
  ACTIVE: {
    text: "text-success",
    bg: "bg-success",
    tooltip: "The airport works as usual, receives and sends flights",
  },
  INACTIVE: {
    text: "text-danger",
    bg: "bg-danger",
    tooltip:
      "The airport is temporarily inactive (closed for repairs, or does not accept flights)",
  },
  MAINTENANCE: {
    text: "text-limited",
    bg: "bg-limited",
    tooltip:
      "Technical work is carried out at the airport, flights may be limited",
  },
  CLOSED: {
    text: "text-dark",
    bg: "bg-dark",
    tooltip: "The airport is completely closed",
  },
};
