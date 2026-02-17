'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import { PlanetCardProps } from '@/lib/types';

export default function PlanetCard({ planet, onClick }: PlanetCardProps) {
    const getClimateColor = (climate: string) => {
        if (climate.includes('arid') || climate.includes('desert')) return 'from-[#F87171] to-[#EF4444]';
        if (climate.includes('tropical') || climate.includes('temperate')) return 'from-[#10B981] to-[#059669]';
        if (climate.includes('frozen') || climate.includes('frigid')) return 'from-[#60A5FA] to-[#3B82F6]';
        return 'from-[#8B5CF6] to-[#7C3AED]';
    };

    return (
        <Card
            className="card-galactic p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative group"
            onClick={() => onClick(planet)}
        >
            <div className="flex items-start space-x-3 mb-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getClimateColor(planet.climate)} flex items-center justify-center shadow-[0_0_20px_rgba(96,165,250,0.3)]`}>
                    <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#E5E7EB] group-hover:text-[#60A5FA] transition-colors">
                        {planet.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                            {planet.climate}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {planet.terrain}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Diameter:</span>
                    <span className="text-sm text-[#E5E7EB]">{planet.diameter} km</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Population:</span>
                    <span className="text-sm text-[#E5E7EB]">{planet.population}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Gravity:</span>
                    <span className="text-sm text-[#E5E7EB]">{planet.gravity}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Rotation:</span>
                    <span className="text-sm text-[#E5E7EB]">{planet.rotation_period}h</span>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/5 to-[#2DD4BF]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
    );
}