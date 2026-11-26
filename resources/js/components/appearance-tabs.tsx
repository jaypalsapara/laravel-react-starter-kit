import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <Tabs defaultValue={appearance} value={appearance}>
            <TabsList>
                {tabs.map(({ value, icon, label }) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        onClick={() => updateAppearance(value)}
                    >
                        <Icon node={icon} />
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
