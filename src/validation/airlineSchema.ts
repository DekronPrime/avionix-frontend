import { z } from "zod";

export const airlineSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  iataCode: z
    .string()
    .length(2, "IATA code must contain only 2 characters")
    .toUpperCase(),
  countryId: z.string(),
});
