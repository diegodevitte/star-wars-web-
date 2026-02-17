import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PageHeaderProps } from "@/lib/types";

export function PageHeader({
    title,
    loading,
    totalCount,
    countLabel,
    search,
    searchPlaceholder,
    onSearchChange
}: PageHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-[#E5E7EB] mb-2">{title}</h2>
                <p className="text-[#94A3B8]">
                    {loading ? 'Loading...' : `${totalCount} ${countLabel}`}
                </p>
            </div>

            <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <Input
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>
        </div>
    );
}
