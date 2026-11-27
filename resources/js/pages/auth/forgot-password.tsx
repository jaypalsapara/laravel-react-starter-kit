// Components
import { Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Icon } from '@/components/ui/icon';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Form } from '@/components/form';
import { forgotPasswordSchema } from '@/schema/auth';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()} schema={forgotPasswordSchema}>
                    {({ processing, errors }) => (
                        <>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Email address
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        autoFocus
                                        placeholder="email@example.com"
                                        aria-invalid={!!errors.email}
                                    />
                                    <FieldError>{errors.email}</FieldError>
                                </Field>
                                <Field>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={processing}
                                        data-test="email-password-reset-link-button"
                                    >
                                        {processing && (
                                            <Icon
                                                node={LoaderCircle}
                                                className="h-4 w-4 animate-spin"
                                            />
                                        )}
                                        Email password reset link
                                    </Button>
                                    <FieldDescription className="text-center">
                                        <span>Or, return to </span>
                                        <TextLink href={login()}>
                                            log in
                                        </TextLink>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};
