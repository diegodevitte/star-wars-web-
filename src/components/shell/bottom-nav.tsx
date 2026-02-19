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
    const activeIndex = navigationItems.findIndex(item =>
        pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
    );
    const totalItems = navigationItems.length;
    const leftPosition = activeIndex >= 0 ? `${(activeIndex / totalItems) * 100 + (100 / totalItems / 2)}%` : '50%';

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 sm:hidden z-50 h-16 bg-[#111827]/90 backdrop-blur-md"
            style={{ borderTop: '2px solid #60A5FA' }}
            aria-label="Bottom Navigation"
        >
            <div className="h-full flex items-center justify-around px-2 relative">
                {activeIndex >= 0 && (
                    <div
                        className="absolute top-0 w-16 h-[2px] bg-[#60A5FA] rounded-full shadow-[0_0_8px_#60A5FA] transition-all duration-300"
                        style={{ left: leftPosition, transform: 'translateX(-50%)' }}
                    />
                )}
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-1 transition-colors duration-200",
                                isActive ? "text-[#60A5FA]" : "text-[#94A3B8]"
                            )}
                            aria-current={isActive ? "page" : undefined}
                        >
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
