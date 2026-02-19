'use client';

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { BottomNav } from "./bottom-nav";
import { AppShellProps } from "@/lib/types";

export function AppShell({ children, title }: AppShellProps) {
    return (
        <div className="min-h-screen bg-[#0B1020] relative overflow-hidden">
            <div className="space-background" />

            <div className="hidden lg:block">
                <Sidebar variant="full" />
            </div>

            <div className="hidden sm:block lg:hidden">
                <Sidebar variant="rail" />
            </div>

            <div className="relative z-10">
                <div className="sm:pl-[72px] lg:pl-[260px]">
                    <Topbar title={title} />
                    <main className="flex-1 p-4 pb-20 sm:pb-8 pt-20">
                        {children}
                    </main>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}