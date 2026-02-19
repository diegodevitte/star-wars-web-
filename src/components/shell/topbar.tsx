'use client';

import { TopbarProps } from "@/lib/types";

export function Topbar({ title = "Dashboard" }: TopbarProps) {
    return (
        <div className="fixed top-0 right-0 left-0 sm:left-[72px] lg:left-[260px] h-16 glass-topbar flex items-center px-4 sm:px-6 z-30">
            <div className="flex items-center sm:hidden">
                <div className="text-center">
                    <div className="text-[18px] font-bold text-[#E5E7EB]">
                        GC
                    </div>
                    <div className="w-8 h-[3px] bg-[#00D4FF] rounded-full mt-1 shadow-[0_0_8px_#00D4FF]"></div>
                </div>
            </div>
            <h1 className="text-xl sm:text-[28px] font-semibold text-[#E5E7EB] text-center sm:text-left absolute left-1/2 -translate-x-1/2 sm:relative sm:left-auto sm:translate-x-0">
                {title}
            </h1>
        </div>
    );
}
