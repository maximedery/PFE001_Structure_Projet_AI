'use client';

import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { getTailwindColorValue } from '@/helpers/get-tailwind-color-value';
import { useQueryParam } from '@/helpers/use-query-param';
import { cn } from '@/lib/utils';

const Routes = [
  {
    name: 'Settings',
    href: '/settings',
  },
  {
    name: 'AI Planner',
    href: '/ai-planner',
    icon: <Sparkles size={18} color={getTailwindColorValue('cyan-500')} />,
  },
  {
    name: 'History',
    href: '/history',
  },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const workspaceId = useQueryParam('workspaceId');

  const urlFirstPart = `/workspace/${workspaceId}`;

  return (
    <nav className={cn('flex items-center', className)} {...props}>
      {Routes.map((route) => {
        const isActive = pathname === urlFirstPart + route.href;

        return (
          <Link
            key={route.href}
            href={urlFirstPart + route.href}
            className={cn(
              'text-sm font-medium transition-colors flex items-center gap-1 py-2 px-4 border-b-2',
              isActive
                ? ' border-cyan-500 text-primary'
                : 'text-muted-foreground hover:text-primary border-transparent',
            )}
          >
            {route.name}
            {route.icon}
          </Link>
        );
      })}
    </nav>
  );
}
