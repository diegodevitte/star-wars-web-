'use client';

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { BottomNav } from "./bottom-nav";
import { AppShellProps } from "@/lib/types";

export function AppShell({ children, title }: AppShellProps) {
    return (
        <div className="min-h-screen bg-[#0B1020] relative overflow-hidden">
            <div className="space-background" />
            <div className="relative z-10 flex">
                <div className="hidden lg:block">
                    <Sidebar variant="full" />
                </div>

                <div className="hidden sm:block lg:hidden">
                    <Sidebar variant="rail" />
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    <Topbar title={title} />
                    <main className="flex-1 p-4 pb-20 sm:pb-8">
                        {children}
                    </main>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}