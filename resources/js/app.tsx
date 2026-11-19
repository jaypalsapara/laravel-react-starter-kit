import { createInertiaApp } from '@inertiajs/react';

import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import Provider from '@/components/provider';
import Layout from '@/layouts/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return Layout;
            case name.startsWith('auth/'):
                return [Layout, AuthLayout];
            case name.startsWith('settings/'):
                return [Layout, AppLayout, SettingsLayout];
            default:
                return [Layout, AppLayout];
        }
    },
    strictMode: true,
    withApp(app) {
        return <Provider>{app}</Provider>;
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
