import z from 'zod';
import {
    emailRules,
    nameRules,
    otpStringRules,
    passwordRules,
} from './zod-rules';
import { passwordConfirmationSchema } from './zod-extendable';

// Login form
export const loginSchema = z.object({
    email: emailRules,
    password: passwordRules,
});

// Register form
export const registerSchema = passwordConfirmationSchema.safeExtend({
    name: nameRules,
    email: emailRules,
});

// Forgot password form
export const forgotPasswordSchema = z.object({ email: emailRules });

// Reest password form
export const resetPasswordSchema = passwordConfirmationSchema.safeExtend({
    token: z.string().nonempty(),
    email: emailRules,
});

// 2FA code form
export const twoFactorCodeSchema = z.object({
    code: otpStringRules,
});

// 2FA code form
export const twoFactorRecoveryCodeSchema = z.object({
    recovery_code: z.string().nonempty().max(255),
});

// Confirm password form
export const confirmPasswordSchema = z.object({ password: passwordRules });
