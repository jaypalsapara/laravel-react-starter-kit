import useZodValidator from '@/hooks/use-zod-validator';
import { Form as InertiaForm } from '@inertiajs/react';
import { ComponentProps, ComponentRef, useRef } from 'react';
import { ZodType } from 'zod';

interface Props {
    schema: ZodType;
}

function Form<TForm extends object = Record<string, any>>({
    schema,
    children,
    onBefore,
    ...props
}: Props & ComponentProps<typeof InertiaForm<TForm>>) {
    // Hooks
    const formRef = useRef<ComponentRef<typeof InertiaForm<TForm>> | null>(
        null,
    );

    const { validate, errors: clientErrors } = useZodValidator();

    return (
        <InertiaForm<TForm>
            ref={formRef}
            onBefore={(visit) => {
                const result = schema.safeParse(visit.data);
                const isValid = validate(result);

                formRef.current?.clearErrors();

                if (!isValid) {
                    return false;
                }

                return onBefore?.(visit);
            }}
            {...props}
        >
            {(slot) => {
                if (typeof children !== 'function') {
                    return children;
                }

                return children({
                    ...slot,
                    errors: {
                        ...clientErrors,
                        ...slot.errors,
                    } as typeof slot.errors,
                });
            }}
        </InertiaForm>
    );
}

export { Form };
