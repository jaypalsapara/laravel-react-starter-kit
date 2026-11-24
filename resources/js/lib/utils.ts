import type { InertiaLinkProps } from '@inertiajs/react';

export { cn } from 'cn';

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}
