import { Head } from '@inertiajs/react';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form } from '@/components/form';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { registerSchema } from '@/schema/auth';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                schema={registerSchema}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
            >
                {({ processing, errors }) => (
                    <>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                    aria-invalid={!!errors.name}
                                />
                                <FieldError>{errors.name}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Email address
                                </FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    aria-invalid={!!errors.email}
                                />
                                <FieldError>{errors.email}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <PasswordInput
                                    id="password"
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    passwordrules={passwordRules}
                                    aria-invalid={!!errors.password}
                                />
                                <FieldError>{errors.password}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password_confirmation">
                                    Confirm password
                                </FieldLabel>
                                <PasswordInput
                                    id="password_confirmation"
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                    aria-invalid={
                                        !!errors.password_confirmation
                                    }
                                />
                                <FieldError>
                                    {errors.password_confirmation}
                                </FieldError>
                            </Field>
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    tabIndex={5}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    Create account
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{' '}
                                    <TextLink href={login()} tabIndex={6}>
                                        Log in
                                    </TextLink>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
