import { useState } from 'react';
import type { ZodSafeParseResult } from 'zod';

type ErrorBagProps = Record<string, string>;

export default function useZodValidator() {
    const [errors, setErrors] = useState<ErrorBagProps>({});

    // Validate safe and return boolean
    const validate = (parse: ZodSafeParseResult<unknown>): boolean => {
        if (!parse.success) {
            const errorBag: ErrorBagProps = {};

            parse.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (typeof field === 'string') {
                    errorBag[field] ??= issue.message;
                }
            });

            setErrors(errorBag);

            return false;
        } else {
            clear();

            return true;
        }
    };

    // Clear errors
    const clear = (key?: string | string[]) => {
        if (!key) return setErrors({});

        setErrors((prev) => {
            const keys = Array.isArray(key) ? key : [key];
            if (!keys.some((k) => k in prev)) return prev;

            const next = { ...prev };
            keys.forEach((k) => delete next[k]);
            return next;
        });
    };

    return { errors, validate, clear };
}
