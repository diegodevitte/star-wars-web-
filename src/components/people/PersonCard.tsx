'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { PersonCardProps } from '@/lib/types';

export default function PersonCard({ person, onClick }: PersonCardProps) {
    return (
        <Card
            className="card-galactic p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative group"
            onClick={() => onClick(person)}
        >
            <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#2DD4BF] flex items-center justify-center shadow-[0_0_20px_rgba(96,165,250,0.3)]">
                    <User className="w-6 h-6 text-[#0B1020]" />
                </div>
                <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#E5E7EB] group-hover:text-[#60A5FA] transition-colors">
                        {person.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                            {person.gender}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {person.birth_year}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Height:</span>
                    <span className="text-sm text-[#E5E7EB]">{person.height} cm</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Mass:</span>
                    <span className="text-sm text-[#E5E7EB]">{person.mass} kg</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Hair:</span>
                    <span className="text-sm text-[#E5E7EB]">{person.hair_color}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Eyes:</span>
                    <span className="text-sm text-[#E5E7EB]">{person.eye_color}</span>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/5 to-[#2DD4BF]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
    );
}