'use client';

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { ReactNode } from "react";

interface AppShellProps {
    children: ReactNode;
    title?: string;
}

export function AppShell({ children, title }: AppShellProps) {
    return (
        <div className="min-h-screen bg-[#0B1020] relative overflow-hidden">
            <div className="space-background" />
            <div className="relative z-10 flex">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Topbar title={title} />
                    <main className="flex-1 p-4 pb-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}