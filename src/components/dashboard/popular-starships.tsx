'use client';

import { Card } from "@/components/ui/card";
import { ChevronRight, Rocket } from "lucide-react";
import { NormalizedStarship, PopularStarshipsProps } from "@/lib/types";

function StarshipCard({ starship, onClick }: { starship: NormalizedStarship; onClick: () => void }) {
    return (
        <Card
            onClick={onClick}
            className="card-galactic p-0 h-[180px] overflow-hidden cursor-pointer group transition-all duration-300 hover:border-[#60A5FA] hover:shadow-lg hover:shadow-[#60A5FA]/20 hover:-translate-y-1"
        >
            <div className="h-[120px] bg-gradient-to-br from-[#60A5FA] to-[#2DD4BF] flex items-center justify-center relative overflow-hidden">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <Rocket className="w-7 h-7 text-[#0B1020]/80 transform rotate-45" />
                </div>

                <div className="absolute inset-0 opacity-40">
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full absolute top-2 left-3"></div>
                    <div className="w-0.5 h-0.5 bg-white/40 rounded-full absolute top-6 right-4"></div>
                    <div className="w-0.5 h-0.5 bg-white/50 rounded-full absolute bottom-3 left-6"></div>
                    <div className="w-0.5 h-0.5 bg-white/30 rounded-full absolute bottom-8 right-2"></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
            </div>

            <div className="p-4 flex items-center justify-between">
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-[#E5E7EB] group-hover:text-[#60A5FA] transition-colors duration-200 truncate">
                        {starship.name}
                    </h4>
                    <p className="text-xs text-[#94A3B8] mt-1 truncate">
                        {starship.model.split(' ').slice(0, 2).join(' ')}
                    </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#60A5FA] transition-colors duration-200 ml-2 flex-shrink-0" />
            </div>
        </Card>
    );
}

export function PopularStarships({ starships, onStarshipClick }: PopularStarshipsProps) {
    return (
        <Card className="card-galactic p-6">
            <h3 className="text-base font-semibold text-[#E5E7EB] mb-4">
                Popular Starships
            </h3>

            <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 scrollbar-hide">
                {starships.map((starship) => (
                    <div key={starship.id} className="snap-start shrink-0 w-[220px]">
                        <StarshipCard starship={starship} onClick={() => onStarshipClick?.(starship)} />
                    </div>
                ))}
            </div>

            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {starships.map((starship) => (
                    <StarshipCard key={starship.id} starship={starship} onClick={() => onStarshipClick?.(starship)} />
                ))}
            </div>
        </Card>
    );
}