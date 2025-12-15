import { z } from "zod";

export const aircraftSchema = z.object({
  model: z
    .string()
    .min(2, "Model name is too short")
    .max(100, "Model name is too long"),
  capacity: z
    .number()
    .int("Capacity must be an integer")
    .positive("Capacity must be greater than 0"),
  airlineId: z.string(),

  /*
   * 🔮 Future seat capacity fields
   *
   * economySeats: z.number().int().nonnegative(),
   * premiumEconomySeats: z.number().int().nonnegative(),
   * businessSeats: z.number().int().nonnegative(),
   * firstClassSeats: z.number().int().nonnegative(),
   *
   * + refinement:
   * economy + premium + business + first === total capacity
   */
});
