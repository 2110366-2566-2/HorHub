import { z } from "zod";

export const UserInfoSchema = z.object({
    id: z.string(),
    email: z.string().trim().email(),
    
    firstName: z.string().trim().min(1, {message: 'Fill your first name'}),
    lastName: z.string().trim().min(1, {message: 'Fill your last name'}),
    displayName: z.string().trim().min(1, {message: 'Fill display name'}),
    phoneNumber: z.string().trim().length(10, {message: 'Please fill valid phone number'})
                    .refine((value) => /[0-9]{10}/.test(value), {message: 'Please fill valid phone number'}),
    birthdate: z.coerce.date(),
    gender: z.enum(["Male", "Female", "Other"], {invalid_type_error: 'Gender is not valid, gender must be "Male", "Female", or "Other"'}),
    role: z.enum(["Customer", "Provider"], {invalid_type_error: 'Role is not valid, role must be "Customer" or "Provider"'}),
    imageURL : z.string().url(),
    isVerified : z.boolean(),
    balance : z.number().optional(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;
