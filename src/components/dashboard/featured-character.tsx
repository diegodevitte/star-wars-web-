'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Character } from "@/lib/types";

interface FeaturedCharacterProps {
    character: Character;
}

export function FeaturedCharacter({ character }: FeaturedCharacterProps) {
    return (
        <Card className="card-galactic p-6">
            <h3 className="text-sm font-semibold text-[#E5E7EB] mb-6">
                Featured Character
            </h3>

            <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#2DD4BF] flex items-center justify-center shadow-[0_0_20px_rgba(96,165,250,0.3)] mr-4">
                    <User className="w-8 h-8 text-[#0B1020]" />
                </div>
                <div>
                    <h4 className="text-xl font-semibold text-[#E5E7EB]">
                        {character.name}
                    </h4>
                    <p className="text-sm text-[#94A3B8]">Galactic Hero</p>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-3 px-4 rounded bg-[#0F172A]/30">
                    <span className="text-sm text-[#94A3B8]">Height</span>
                    <span className="text-sm text-[#E5E7EB]">{character.height} cm</span>
                </div>
                <div className="flex items-center justify-between py-3 px-4 rounded bg-[#0F172A]/30">
                    <span className="text-sm text-[#94A3B8]">Homeworld</span>
                    <span className="text-sm text-[#E5E7EB]">{character.homeworld}</span>
                </div>
            </div>

            <Button
                className={`
                    w-full 
                    bg-[#60A5FA] 
                    hover:bg-[#3B82F6] 
                    text-[#0B1020] 
                    font-semibold
                    transition-all 
                    duration-200
                    hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]
                    hover:scale-[1.02]
                    h-10
                `}
            >
                View Details
            </Button>
        </Card>
    );
}