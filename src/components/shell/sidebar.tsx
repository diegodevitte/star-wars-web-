'use client';

import { cn } from "@/lib/utils";
import {
    Home,
    Users,
    Globe,
    Rocket,
    Car,
    MessageSquare
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavigationItem, SidebarProps } from "@/lib/types";

const navigationItems: NavigationItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: Home,
        active: true,
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
        id: "starships",
        label: "Starships",
        href: "/starships",
        icon: Rocket,
    },
    {
        id: "vehicles",
        label: "Vehicles",
        href: "/vehicles",
        icon: Car,
    },
    {
        id: "chat",
        label: "AI Chat",
        href: "/chat",
        icon: MessageSquare,
    },
];

export function Sidebar({ variant = 'full' }: SidebarProps) {
    const pathname = usePathname();
    const isRail = variant === 'rail';

    if (isRail) {
        return (
            <TooltipProvider delayDuration={0}>
                <div className="w-[72px] h-screen sticky top-0 glass-sidebar flex flex-col py-6 items-center">
                    <div className="mb-8 text-center">
                        <div className="text-[18px] font-bold text-[#E5E7EB]">
                            GC
                        </div>
                        <div className="w-8 h-[3px] bg-[#00D4FF] rounded-full mt-1 shadow-[0_0_8px_#00D4FF]"></div>
                    </div>

                    <nav className="flex-1 w-full">
                        <div className="space-y-2 px-2">
                            {navigationItems.map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                                const Icon = item.icon;

                                return (
                                    <Tooltip key={item.id}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center justify-center h-11 w-full rounded-xl transition-all duration-200 relative",
                                                    isActive
                                                        ? "bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/30"
                                                        : "text-[#94A3B8] hover:bg-white/5 hover:text-[#E5E7EB]"
                                                )}
                                                aria-label={item.label}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="glass-sidebar border-[#1F2937]/80">
                                            <p>{item.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </TooltipProvider>
        );
    }

    return (
        <div className="w-[260px] h-screen sticky top-0 glass-sidebar flex flex-col py-6 px-5">
            <div className="mb-8 text-center">
                <div className="text-[22px] font-semibold uppercase tracking-widest text-[#E5E7EB]">
                    GALACTIC
                </div>
                <div className="flex items-center justify-center mt-1">
                    <div className="w-[30px] h-[3px] bg-[#00D4FF] rounded-full shadow-[0_0_8px_#00D4FF,0_0_16px_#00D4FF,0_0_24px_#00D4FF]"></div>
                    <div className="text-[14px] uppercase tracking-wider text-[#94A3B8] mx-2">
                        CONSOLE
                    </div>
                    <div className="w-[30px] h-[3px] bg-[#00D4FF] rounded-full shadow-[0_0_8px_#00D4FF,0_0_16px_#00D4FF,0_0_24px_#00D4FF]"></div>
                </div>
            </div>

            <nav className="flex-1">
                <div className="space-y-3">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={cn(
                                    "flex items-center h-11 px-4 rounded-xl text-sm font-medium transition-all duration-200 relative",
                                    isActive
                                        ? "nav-item-active"
                                        : "text-[#94A3B8] hover:bg-white/5 hover:text-[#E5E7EB]"
                                )}
                            >
                                <Icon className="w-[18px] h-[18px] mr-3" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav >
        </div >
    );
}