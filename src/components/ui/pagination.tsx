import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "@/lib/types";

export function Pagination({
    currentPage,
    pageLabel,
    hasNext,
    hasPrevious,
    onPageChange
}: PaginationProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-[#94A3B8]">
                Showing page {currentPage} {pageLabel}
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrevious}
                    className="flex items-center space-x-1"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNext}
                    className="flex items-center space-x-1"
                >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
