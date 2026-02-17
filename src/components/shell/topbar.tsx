'use client';

interface TopbarProps {
    title?: string;
}

export function Topbar({ title = "Dashboard" }: TopbarProps) {
    return (
        <div className="h-16 glass-topbar flex items-center justify-between px-6">
            <div>
                <h1 className="text-[28px] font-semibold text-[#E5E7EB]">
                    {title}
                </h1>
            </div>
        </div>
    );
}