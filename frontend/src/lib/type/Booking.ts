import { z } from "zod";

export type BookingType = {
  id: string;
  bookAt: Date;
  customerId: string;
  roomTypeId: string;
  roomType: {
    name: string;
    dormId: string;
    dorm: {
      name: string;
    };
  };
  startAt: Date;
  endAt: Date;
  price: number;
  status: string;
};

export const BookingProviderSchema = z.object({
  id: z.string(),
  customer: z.object({
    firstName: z.string(),
    lastName: z.string(),
    displayName: z.string(),
    gender: z.enum(["Male", "Female", "Other"]),
    phoneNumber: z.string(),
  }),
  price: z.number(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  bookAt: z.coerce.date(),
  status: z.enum(["Pending", "InProcess", "Completed", "Cancelled"]),
});
export const BookingsSchema = BookingProviderSchema.array();

export type BookingProviderType = z.infer<typeof BookingProviderSchema>;
