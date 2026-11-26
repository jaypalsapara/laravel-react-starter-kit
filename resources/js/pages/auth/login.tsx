import { Form, Head } from '@inertiajs/react';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import PasskeyVerify from '@/components/passkey-verify';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <FieldGroup>
                <PasskeyVerify />
                <FieldSeparator>Or continue with email</FieldSeparator>
                <Form {...store.form()} resetOnSuccess={['password']}>
                    {({ processing, errors }) => (
                        <>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="email">
                                                Email address
                                            </FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                            />
                                            <FieldError>
                                                {errors.email}
                                            </FieldError>
                                        </Field>
                                        <Field>
                                            <div className="flex items-center">
                                                <FieldLabel htmlFor="password">
                                                    Password
                                                </FieldLabel>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="ml-auto text-sm"
                                                        tabIndex={5}
                                                    >
                                                        Forgot your password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Password"
                                            />
                                            <FieldError>
                                                {errors.password}
                                            </FieldError>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                                <FieldSet>
                                    <FieldGroup>
                                        <Field orientation={'horizontal'}>
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                            />
                                            <FieldLabel htmlFor="remember">
                                                Remember me
                                            </FieldLabel>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                                <FieldSet>
                                    <FieldGroup>
                                        <Field>
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                tabIndex={4}
                                                disabled={processing}
                                                data-test="login-button"
                                            >
                                                {processing && <Spinner />}
                                                Log in
                                            </Button>
                                            <FieldDescription className="text-center">
                                                Don't have an account?{' '}
                                                <TextLink
                                                    href={register()}
                                                    tabIndex={5}
                                                >
                                                    Create account
                                                </TextLink>
                                            </FieldDescription>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                            </FieldGroup>
                        </>
                    )}
                </Form>
            </FieldGroup>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
