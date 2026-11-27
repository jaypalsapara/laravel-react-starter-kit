import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import Heading from '@/components/heading';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { edit } from '@/routes/security';
import type { Props as ManagePasskeysProps } from '@/components/manage-passkeys';
import ManagePasskeys from '@/components/manage-passkeys';
import type { Props as ManageTwoFactorProps } from '@/components/manage-two-factor';
import ManageTwoFactor from '@/components/manage-two-factor';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Form } from '@/components/form';
import { updatePasswordSchema } from '@/schema/user';

// oxfmt-ignore
type Props = {
    passwordRules: string;
} & ManagePasskeysProps &
    ManageTwoFactorProps;

export default function Security(props: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <Head title="Security settings" />

            <h1 className="sr-only">Security settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Update password"
                    description="Ensure your account is using a long, random password to stay secure"
                />

                <Form
                    {...SecurityController.update.form()}
                    schema={updatePasswordSchema}
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnError={[
                        'password',
                        'password_confirmation',
                        'current_password',
                    ]}
                    resetOnSuccess
                    onError={(errors) => {
                        if (errors.password) {
                            passwordInput.current?.focus();
                        }

                        if (errors.current_password) {
                            currentPasswordInput.current?.focus();
                        }
                    }}
                    className="space-y-6"
                >
                    {({ errors, processing }) => (
                        <>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="current_password">
                                        Current password
                                    </FieldLabel>

                                    <PasswordInput
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        name="current_password"
                                        className="block w-full"
                                        autoComplete="current-password"
                                        placeholder="Current password"
                                        aria-invalid={!!errors.current_password}
                                    />

                                    <FieldError>
                                        {errors.current_password}
                                    </FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">
                                        New password
                                    </FieldLabel>

                                    <PasswordInput
                                        id="password"
                                        ref={passwordInput}
                                        name="password"
                                        className="block w-full"
                                        autoComplete="new-password"
                                        placeholder="New password"
                                        passwordrules={props.passwordRules}
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
                                        name="password_confirmation"
                                        className="block w-full"
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                        passwordrules={props.passwordRules}
                                        aria-invalid={
                                            !!errors.password_confirmation
                                        }
                                    />

                                    <FieldError>
                                        {errors.password_confirmation}
                                    </FieldError>
                                </Field>
                                <Field orientation={'horizontal'}>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        data-test="update-password-button"
                                    >
                                        Save
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </>
                    )}
                </Form>
            </div>

            <ManageTwoFactor
                canManageTwoFactor={props.canManageTwoFactor}
                requiresConfirmation={props.requiresConfirmation}
                twoFactorEnabled={props.twoFactorEnabled}
            />

            <ManagePasskeys
                canManagePasskeys={props.canManagePasskeys}
                passkeys={props.passkeys}
            />
        </>
    );
}

Security.layout = {
    breadcrumbs: [
        {
            title: 'Security settings',
            href: edit(),
        },
    ],
};
