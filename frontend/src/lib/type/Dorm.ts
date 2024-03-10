import { z } from "zod";

const dormFacilities = [
  "pet",
  "wifi",
  "parking",
  "elevator",
  "fitness",
  "swimming",
  "shuttle",
  "laundry",
  "guard",
  "keycard",
  "fingerprint",
  "cctv",
  "coworking",
  "kitchen",
  "smoking",
  "vending",
  "dispenser",
  "frontdesk",
  "television",
] as const;

export const dormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Fill dorm name" })
    .max(100, { message: "Your dorm name must not exceed 100 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Fill description" })
    .max(5000, { message: "Description must not exceed 5000 characters" }),
  contractNumber: z
    .string()
    .trim()
    .refine((value) => /^[0-9]{9,10}$/.test(value), {
      message: "Please fill valid number",
    }),
  images: z
    .string()
    .array()
    .max(10, { message: "The images must not exceed 10 files" }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Fill dorm address" })
    .max(300, { message: "Address must not exceed 300 characters" }),
  latitude: z.coerce
    .number()
    .min(-90.0, { message: "The value must be between -90.00000 to 90.00000" })
    .max(90.0, { message: "The value must be between -90.00000 to 90.00000" }),
  longitude: z.coerce
    .number()
    .min(-180.0, {
      message: "The value must be between -180.00000 to 180.00000",
    })
    .max(180.0, {
      message: "The value must be between -180.00000 to 180.00000",
    }),
  dormFacilities: z.enum(dormFacilities).array(),
  provider: z.object({
    displayName: z.string(),
  }),
  roomTypes: z
    .object({
      capacity: z.number(),
      cost: z.number(),
      description: z.string(),
      images: z.string().url().array(),
      name: z.string(),
      numberOfAvailableRoom: z.number(),
      numberOfRoom: z.number(),
      roomFacilities: z.enum(dormFacilities).array(),
      size: z.number(),
    })
    .array(),
});

export type Dorm = z.infer<typeof dormSchema>;