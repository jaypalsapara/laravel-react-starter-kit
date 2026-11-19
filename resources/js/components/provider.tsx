import { PropsWithChildren } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toast';

export default function Provider({ children }: PropsWithChildren) {
    return (
        <>
            <TooltipProvider delay={0}>
                {children}
                <Toaster />
            </TooltipProvider>
        </>
    );
}
