import { z } from "zod";

export const airportSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  city: z.string().min(2, "City is too short"),
  iataCode: z
    .string()
    .length(3, "IATA code must contain only 3 characters")
    .toUpperCase(),
  countryId: z.string(),
});
