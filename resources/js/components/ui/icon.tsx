import type { LucideIcon } from 'lucide-react';

interface IconProps {
    node?: LucideIcon | null;
    className?: string;
}

export function Icon({ node: IconComponent, className }: IconProps) {
    if (!IconComponent) {
        return null;
    }

    return <IconComponent className={className} />;
}
