import { ScreenIndicator } from '@/components/screen-indicator';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    const { isProduction } = usePage().props;
    return (
        <>
            {children}
            {!isProduction && <ScreenIndicator position={'bottom-right'} />}
        </>
    );
}
