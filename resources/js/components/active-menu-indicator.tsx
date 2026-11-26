import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

const activeMenuIndicatorVariants = cva('absolute bg-primary', {
    variants: {
        variant: {
            default: 'rounded-sm',
            raised: 'data-[orientation=horizontal]:rounded-t-sm data-[orientation=vertical]:rounded-e-sm',
        },
        size: {
            default:
                'data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1',
            sm: 'data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5',
        },
        orientation: {
            horizontal: 'bottom-0 left-1/2 w-full -translate-x-1/2',
            vertical: 'top-1/2 left-0 h-full -translate-y-1/2',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        orientation: 'horizontal',
    },
});

function ActiveMenuIndicator({
    className,
    variant = 'default',
    size = 'default',
    orientation = 'horizontal',
    ...props
}: React.ComponentProps<'div'> &
    VariantProps<typeof activeMenuIndicatorVariants>) {
    return (
        <div
            data-slot="active-menu-indicator"
            data-orientation={orientation}
            className={cn(
                activeMenuIndicatorVariants({
                    variant,
                    size,
                    orientation,
                    className,
                }),
            )}
            {...props}
        />
    );
}

export { ActiveMenuIndicator };
