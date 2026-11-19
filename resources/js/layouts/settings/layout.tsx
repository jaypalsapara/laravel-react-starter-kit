import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';
import { Palette, Shield, SquareUserRound } from 'lucide-react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: SquareUserRound,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: Shield,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: Palette,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="px-4 py-6">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav
                        className="flex scroll-fade-x scrollbar-none space-x-1 max-lg:scroll-fade-x max-lg:overflow-x-auto lg:flex-col lg:space-y-1 lg:space-x-0"
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => (
                            <Link
                                href={item.href}
                                key={`${toUrl(item.href)}-${index}`}
                                className={cn(
                                    buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                    }),
                                    'justify-start',
                                    {
                                        'bg-muted': isCurrentOrParentUrl(
                                            item.href,
                                        ),
                                    },
                                )}
                            >
                                {item.icon && <item.icon className="h-4 w-4" />}
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
