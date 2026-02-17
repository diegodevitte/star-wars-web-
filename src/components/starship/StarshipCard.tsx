'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket } from 'lucide-react';
import { StarshipCardProps } from '@/lib/types';

export default function StarshipCard({ starship, onClick }: StarshipCardProps) {
    const getStarshipClassColor = (starshipClass: string) => {
        if (starshipClass.includes('fighter') || starshipClass.includes('Fighter')) return 'from-[#F87171] to-[#EF4444]';
        if (starshipClass.includes('cruiser') || starshipClass.includes('Cruiser')) return 'from-[#8B5CF6] to-[#7C3AED]';
        if (starshipClass.includes('frigate') || starshipClass.includes('corvette')) return 'from-[#10B981] to-[#059669]';
        if (starshipClass.includes('freighter') || starshipClass.includes('transport')) return 'from-[#F59E0B] to-[#D97706]';
        return 'from-[#60A5FA] to-[#3B82F6]';
    };

    return (
        <Card
            className="card-galactic p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative group"
            onClick={() => onClick(starship)}
        >
            <div className="flex items-start space-x-3 mb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getStarshipClassColor(starship.starship_class)} flex items-center justify-center shadow-[0_0_20px_rgba(96,165,250,0.3)]`}>
                    <Rocket className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#E5E7EB] group-hover:text-[#60A5FA] transition-colors">
                        {starship.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                            {starship.starship_class}
                        </Badge>
                        {starship.hyperdrive_rating && starship.hyperdrive_rating !== 'unknown' && (
                            <Badge variant="outline" className="text-xs">
                                Class {starship.hyperdrive_rating}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Model:</span>
                    <span className="text-sm text-[#E5E7EB] truncate ml-2">{starship.model}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Length:</span>
                    <span className="text-sm text-[#E5E7EB]">{starship.length} m</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Crew:</span>
                    <span className="text-sm text-[#E5E7EB]">{starship.crew}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Passengers:</span>
                    <span className="text-sm text-[#E5E7EB]">{starship.passengers}</span>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/5 to-[#2DD4BF]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
    );
}