import z from 'zod';

export const nameRules = z.string().nonempty().max(255);
export const emailRules = z.email().nonempty().max(255);
export const passwordRules = z.string().nonempty().max(255);
export const otpStringRules = z.string().nonempty().min(6).max(6);
export const otpIntegerRules = z.int().nonnegative().min(6).max(6);
export const datetimeRules = z.iso.datetime();
