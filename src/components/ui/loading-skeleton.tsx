import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { LoadingSkeletonProps } from "@/lib/types";

export function LoadingSkeleton({
    type = 'grid',
    message = 'Loading...',
    count = 8
}: LoadingSkeletonProps) {
    if (type === 'spinner') {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="card-galactic p-8">
                    <div className="flex items-center space-x-4 text-[#94A3B8]">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-lg">{message}</span>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <Card className="card-galactic p-4 h-64">
                        <div className="flex items-start space-x-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-[#374151]" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-[#374151] rounded w-3/4" />
                                <div className="h-3 bg-[#374151] rounded w-1/2" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-[#374151] rounded" />
                            <div className="h-3 bg-[#374151] rounded" />
                            <div className="h-3 bg-[#374151] rounded" />
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
}
