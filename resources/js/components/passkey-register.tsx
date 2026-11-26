import { usePasskeyRegister } from '@laravel/passkeys/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from './ui/field';
import { Card, CardContent, CardFooter } from './ui/card';

type Props = {
    onSuccess: () => void;
};

export default function PasskeyRegistration({ onSuccess }: Props) {
    const [name, setName] = useState(() => {
        const ua = navigator.userAgent;

        const browser = [
            { pattern: /Edg|Edge/, name: 'Edge' },
            { pattern: /OPR|Opera|OPiOS/, name: 'Opera' },
            { pattern: /Firefox|FxiOS/, name: 'Firefox' },
            { pattern: /Chrome|CriOS/, name: 'Chrome' },
            { pattern: /Safari/, name: 'Safari' },
        ].find(({ pattern }) => pattern.test(ua))?.name;

        const os = [
            { pattern: /iPhone/, name: 'iPhone' },
            { pattern: /iPad|Macintosh(?=.*Mobile)/, name: 'iPad' },
            { pattern: /Android/, name: 'Android' },
            { pattern: /Mac/, name: 'Mac' },
            { pattern: /Windows/, name: 'Windows' },
        ].find(({ pattern }) => pattern.test(ua))?.name;

        return [browser, os].filter(Boolean).join(' on ') || '';
    });

    const [showForm, setShowForm] = useState(false);
    const { register, isLoading, error, isSupported } = usePasskeyRegister({
        onSuccess: () => {
            setName('');
            setShowForm(false);
            onSuccess();
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        await register(name);
    };

    const handleCancel = () => {
        setShowForm(false);
        setName('');
    };

    if (!isSupported) {
        return (
            <div className="text-sm text-muted-foreground">
                Passkeys are not supported in this browser.
            </div>
        );
    }

    if (!showForm) {
        return (
            <Button variant="outline" onClick={() => setShowForm(true)}>
                Add passkey
            </Button>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card size="sm">
                <CardContent>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="passkey-name">
                                Passkey name
                            </FieldLabel>

                            <Input
                                id="passkey-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., MacBook Pro, iPhone"
                                autoFocus
                            />

                            <FieldDescription>
                                A name helps you identify this passkey later.
                            </FieldDescription>

                            <FieldError>{error}</FieldError>
                        </Field>
                    </FieldGroup>
                </CardContent>
                <CardFooter>
                    <Field orientation={'horizontal'}>
                        <Button
                            type="submit"
                            disabled={isLoading || !name.trim()}
                        >
                            {isLoading ? 'Registering...' : 'Register passkey'}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleCancel}
                            className={'text-foreground'}
                        >
                            Cancel
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </form>
    );
}
