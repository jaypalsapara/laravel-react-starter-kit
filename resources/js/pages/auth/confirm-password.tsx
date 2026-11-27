import { Head } from '@inertiajs/react';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import PasskeyVerify from '@/components/passkey-verify';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';
import { Form } from '@/components/form';
import { confirmPasswordSchema } from '@/schema/auth';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />
            <FieldGroup>
                <PasskeyVerify
                    routes={{
                        options: confirmOptions(),
                        submit: confirmStore(),
                    }}
                    label="Confirm with passkey"
                    loadingLabel="Confirming..."
                />
                <FieldSeparator>Or confirm with password</FieldSeparator>

                <Form
                    {...store.form()}
                    schema={confirmPasswordSchema}
                    resetOnSuccess={['password']}
                >
                    {({ processing, errors }) => (
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            autoFocus
                                            aria-invalid={!!errors.password}
                                        />
                                        <FieldError>
                                            {errors.password}
                                        </FieldError>
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={processing}
                                            data-test="confirm-password-button"
                                        >
                                            {processing && <Spinner />}
                                            Confirm password
                                        </Button>
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                    )}
                </Form>
            </FieldGroup>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
};
