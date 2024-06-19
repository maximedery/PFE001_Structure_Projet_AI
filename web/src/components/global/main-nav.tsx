"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { cn } from "@/lib/utils";
import { Sparkles } from 'lucide-react';
import { getTailwindColorValue } from "@/helpers/getTailwindColorValue";

const Routes = [
  {
    name: 'Settings',
    href: '/',
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

  return (
    <nav
      className={cn("flex items-center", className)}
      {...props}
    >
      {Routes.map((route) => {
        const isActive = pathname === route.href;

        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors flex items-center gap-1 py-2 px-4 border-b-2",
              isActive? " border-cyan-500 text-primary" : "text-muted-foreground hover:text-primary border-transparent",
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
