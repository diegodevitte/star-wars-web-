'use client';

import { Card } from "@/components/ui/card";
import { ChevronRight, Globe } from "lucide-react";
import { NormalizedPlanet, RecentPlanetsProps } from "@/lib/types";

function PlanetItem({ planet, onClick }: { planet: NormalizedPlanet; onClick: () => void }) {
    return (
        <div
            className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer group"
            onClick={onClick}
        >
            <div className="w-8 h-8 rounded-full mr-3 overflow-hidden bg-gradient-to-br from-[#60A5FA] to-[#2DD4BF] flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#0B1020]" />
            </div>

            <div className="flex-1">
                <div className="text-sm font-medium text-[#E5E7EB]">
                    {planet.name}
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                    {planet.climate} - {planet.terrain}
                </div>
            </div>

            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#60A5FA] transition-colors duration-200" />
        </div>
    );
}

export function RecentPlanets({ planets, onPlanetClick }: RecentPlanetsProps) {
    return (
        <Card className="card-galactic p-4">
            <h3 className="text-base font-semibold text-[#E5E7EB] mb-3">
                Recent Planets
            </h3>

            <div className="space-y-1">
                {planets.map((planet) => (
                    <PlanetItem key={planet.id} planet={planet} onClick={() => onPlanetClick?.(planet)} />
                ))}
            </div>
        </Card>
    );
}