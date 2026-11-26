import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { Icon } from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

type Variant = 'default' | 'icon';

export default function AppearanceToggleTab({
    variant = 'default',
}: {
    variant?: Variant;
}) {
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
                        title={variant === 'icon' ? label : undefined}
                    >
                        <Icon node={icon} />
                        {variant !== 'icon' && label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
