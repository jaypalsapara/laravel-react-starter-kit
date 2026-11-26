import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

type Props = ComponentProps<typeof Link>;

export const textLinkVariants = cva(
    'text-foreground underline-offset-4 transition-colors duration-300 ease-out',
    {
        variants: {
            variant: {
                default:
                    'underline decoration-neutral-300 hover:decoration-current! dark:decoration-neutral-500',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export default function TextLink({
    className = '',
    variant = 'default',
    children,
    ...props
}: Props & VariantProps<typeof textLinkVariants>) {
    return (
        <Link
            className={cn(textLinkVariants({ variant, className }))}
            {...props}
        >
            {children}
        </Link>
    );
}
