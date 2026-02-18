'use client';

import { cn } from "@/lib/utils";
import { Home, Users, Globe, Rocket, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/lib/types";

const navigationItems: NavigationItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: Home,
    },
    {
        id: "people",
        label: "People",
        href: "/people",
        icon: Users,
    },
    {
        id: "planets",
        label: "Planets",
        href: "/planets",
        icon: Globe,
    },
    {
        id: "craft",
        label: "Craft",
        href: "/starships",
        icon: Rocket,
    },
    {
        id: "chat",
        label: "AI Chat",
        href: "/chat",
        icon: MessageSquare,
    },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 sm:hidden z-50 h-16 bg-[#111827]/90 backdrop-blur-md border-t border-[#1F2937]/80"
            aria-label="Bottom Navigation"
        >
            <div className="h-full flex items-center justify-around px-2">
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-1 transition-colors duration-200 relative",
                                isActive ? "text-[#60A5FA]" : "text-[#94A3B8]"
                            )}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {isActive && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#60A5FA] rounded-full shadow-[0_0_8px_#60A5FA]" />
                            )}
                            <Icon className="w-5 h-5 mb-0.5" />
                            <span className="text-[10px] font-medium truncate max-w-full">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
