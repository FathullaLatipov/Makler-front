import * as z from 'zod';

export const signUPScheme = z.object({
  phone_number: z.string().min(2, 'Telefon raqamni to`g`ri kiriting'),
  password: z.string().min(2, 'Parolni kiriting'),
});

export const otpScheme = z.object({
  confirmation_code: z.string().min(6, 'Parolni kiriting').max(6),
});
