import z from 'zod';
import {
    datetimeRules,
    emailRules,
    nameRules,
    passwordRules,
} from './zod-rules';
import { passwordConfirmationSchema } from './zod-extendable';

// User table
export const userSchema = z.object({
    id: z.uuidv7(),
    name: nameRules,
    email: emailRules,
    email_verified_at: z.iso.datetime().nullable(),
    created_at: datetimeRules.nullable(),
    updated_at: datetimeRules.nullable(),
});

// Profile form
export const profileSchema = userSchema.pick({ name: true, email: true });

// Security form
export const updatePasswordSchema = passwordConfirmationSchema.safeExtend({
    current_password: passwordRules,
});
