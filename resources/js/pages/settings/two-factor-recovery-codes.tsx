import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { regenerateRecoveryCodes } from '@/routes/two-factor';
import { Form, Head } from '@inertiajs/react';
import { Download, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
} from '@/components/ui/code-block';
import { cn } from 'cn';
import AlertError from '@/components/alert-error';
import security, { edit } from '@/routes/security';

export default function TwoFactorRecoveryCodes() {
    const { recoveryCodesList, fetchRecoveryCodes, errors } =
        useTwoFactorAuth();

    const canRegenerateCodes = recoveryCodesList.length > 0;

    useEffect(() => {
        if (!recoveryCodesList.length) {
            void fetchRecoveryCodes();
        }
    }, [recoveryCodesList.length, fetchRecoveryCodes]);

    function download(value: string, filename: string) {
        const url = URL.createObjectURL(
            new Blob([value], { type: 'text/plain' }),
        );
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }

    const codes = (
        recoveryCodesList.length
            ? recoveryCodesList.reduce((init, code) => `${init}\n${code}`, '')
            : Array.from({ length: 8 }).reduce(
                  (init: string) => `${init}\nxxxxxxxxxx-xxxxxxxxxx`,
                  '',
              )
    ).trim();

    return (
        <>
            <Head title="2FA Recovery codes" />

            <h1 className="sr-only">2FA Recovery codes</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="2FA recovery codes"
                    description="Recovery codes let you regain access if you lose your 2FA
                    device. Store them in a secure password manager."
                />

                <Form
                    {...regenerateRecoveryCodes.form()}
                    options={{ preserveScroll: true }}
                    onSuccess={fetchRecoveryCodes}
                    onBefore={() => canRegenerateCodes}
                >
                    {({ processing }) => (
                        <Button
                            variant="secondary"
                            type="submit"
                            disabled={processing || !canRegenerateCodes}
                            aria-describedby="regenerate-warning"
                        >
                            <Icon
                                node={RefreshCw}
                                className={cn(processing && 'animate-spin')}
                            />{' '}
                            Regenerate codes
                        </Button>
                    )}
                </Form>

                {errors?.length ? (
                    <AlertError errors={errors} />
                ) : (
                    <>
                        <CodeBlock className="bg-muted">
                            <CodeBlockActions>
                                <Button
                                    variant="ghost"
                                    size="icon-xs"
                                    aria-label="Download"
                                    onClick={() =>
                                        download(
                                            codes,
                                            'two-factor-recovery-codes.txt',
                                        )
                                    }
                                >
                                    <Icon node={Download} />
                                </Button>
                                <CodeBlockCopyButton value={codes} />
                            </CodeBlockActions>
                            <CodeBlockContent
                                className={cn(
                                    !canRegenerateCodes && 'animate-pulse',
                                )}
                            >
                                {codes}
                            </CodeBlockContent>
                        </CodeBlock>

                        <div>
                            <p className="text-xs leading-snug text-muted-foreground select-none">
                                Each recovery code can be used once to access
                                your account and will be removed after use. If
                                you need more, click{' '}
                                <span className="font-bold">
                                    Regenerate codes
                                </span>{' '}
                                above.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

TwoFactorRecoveryCodes.layout = {
    breadcrumbs: [
        {
            title: 'Security settings',
            href: edit(),
        },
        {
            title: 'Two factor recovery codes',
            href: security.twoFactorRecoveryCodes(),
        },
    ],
};
