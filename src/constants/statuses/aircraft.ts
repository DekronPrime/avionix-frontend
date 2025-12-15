export const aircraftStatusColors: Record<
  string,
  { text: string; bg: string; tooltip?: string }
> = {
  AVAILABLE: {
    text: "text-success",
    bg: "bg-success",
    tooltip: "The aircraft is ready for use, can be assigned to the flight",
  },
  IN_FLIGHT: {
    text: "text-warning",
    bg: "bg-warning",
    tooltip: "The aircraft is in flight",
  },
  MAINTENANCE: {
    text: "text-limited",
    bg: "bg-limited",
    tooltip: "The aircraft is on maintenance, not available for flights",
  },
  INACTIVE: {
    text: "text-danger",
    bg: "bg-danger",
    tooltip: "The aircraft is temporarily not used (reserve, storage)",
  },
  DECOMMISSIONED: {
    text: "text-dark",
    bg: "bg-dark",
    tooltip: "The aircraft is taken out of service",
  },
};
