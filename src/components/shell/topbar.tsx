'use client';

import { Menu } from "lucide-react";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Home, Users, Globe, Rocket, Car, MessageSquare } from "lucide-react";
import { NavigationItem, TopbarProps } from "@/lib/types";

const navigationItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", href: "/", icon: Home },
    { id: "people", label: "People", href: "/people", icon: Users },
    { id: "planets", label: "Planets", href: "/planets", icon: Globe },
    { id: "starships", label: "Starships", href: "/starships", icon: Rocket },
    { id: "vehicles", label: "Vehicles", href: "/vehicles", icon: Car },
    { id: "chat", label: "AI Chat", href: "/chat", icon: MessageSquare },
];

export function Topbar({ title = "Dashboard" }: TopbarProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <div className="h-16 glass-topbar flex items-center justify-between px-4 sm:px-6">
                <Button
                    variant="ghost"
                    size="icon"
                    className="sm:hidden text-[#94A3B8] hover:text-[#E5E7EB]"
                    onClick={() => setOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </Button>

                <div className="flex-1 sm:flex-none">
                    <h1 className="text-xl sm:text-[28px] font-semibold text-[#E5E7EB] text-center sm:text-left">
                        {title}
                    </h1>
                </div>
                <div className="w-10 sm:w-auto" />
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-[280px]">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <SheetDescription className="sr-only">
                            Navigate through different sections of the Galactic Console
                        </SheetDescription>
                        <div className="mb-6">
                            <div className="text-[22px] font-semibold uppercase tracking-widest text-[#E5E7EB] text-center">
                                GALACTIC
                            </div>
                            <div className="flex items-center justify-center mt-1">
                                <div className="w-[30px] h-[3px] bg-[#00D4FF] rounded-full shadow-[0_0_8px_#00D4FF]"></div>
                                <div className="text-[14px] uppercase tracking-wider text-[#94A3B8] mx-2">
                                    CONSOLE
                                </div>
                                <div className="w-[30px] h-[3px] bg-[#00D4FF] rounded-full shadow-[0_0_8px_#00D4FF]"></div>
                            </div>
                        </div>
                    </SheetHeader>

                    <nav className="mt-8">
                        <div className="space-y-3">
                            {navigationItems.map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
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
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    );
}
