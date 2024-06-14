import z from "zod";

export const tripSchema = z.object({
  user: z.string().min(1, "User is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  coverPhoto: z.string(),
  tripPhotos: z.string().array(),
});

export const partialTripSchema = tripSchema.partial();
