import type { UrlMethodPair } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import { usePasskeyVerify } from '@laravel/passkeys/react';
import { KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Icon } from '@/components/ui/icon';
import { Field, FieldError } from '@/components/ui/field';

type Props = {
    routes?: {
        options: UrlMethodPair;
        submit: UrlMethodPair;
    };
    label?: string;
    loadingLabel?: string;
};

export default function PasskeyVerify({
    routes,
    label,
    loadingLabel,
}: Props = {}) {
    const { verify, isLoading, error, isSupported } = usePasskeyVerify({
        ...(routes && {
            routes: {
                options: routes.options.url,
                submit: routes.submit.url,
            },
        }),
        onSuccess: (response) => {
            router.visit(response.redirect ?? '/dashboard');
        },
    });

    return (
        <>
            <Field>
                <Button
                    type="button"
                    variant="outline"
                    className={'w-full'}
                    onClick={verify}
                    disabled={isLoading || !isSupported}
                >
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <Icon node={KeyRound} className="h-4 w-4" />
                    )}
                    {isLoading
                        ? (loadingLabel ?? 'Authenticating...')
                        : (label ?? 'Log in with a passkey')}
                </Button>
                <FieldError className="text-center">{error}</FieldError>
            </Field>
        </>
    );
}
