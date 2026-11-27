import z from 'zod';
import { passwordRules } from './zod-rules';

// Password confirmation
export const passwordConfirmationSchema = z
    .object({
        password: passwordRules,
        password_confirmation: passwordRules,
    })
    .refine((data) => data.password === data.password_confirmation, {
        error: 'Confirm password not match',
        path: ['password_confirmation'],
    });
